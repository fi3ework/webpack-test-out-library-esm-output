import { concatUint8Arrays } from '../utils/stream.js';
import { joinPath, filePathToFileURL, fileURLToFilePath } from '../utils/path.js';
import { encodeInput, hasStatusCode } from './utils.js';
// HACK for react-server-dom-webpack without webpack
globalThis.__webpack_module_loading__ ||= new Map();
globalThis.__webpack_module_cache__ ||= new Map();
globalThis.__webpack_chunk_load__ ||= async (id)=>globalThis.__webpack_module_loading__.get(id);
globalThis.__webpack_require__ ||= (id)=>globalThis.__webpack_module_cache__.get(id);
const moduleLoading = globalThis.__webpack_module_loading__;
const moduleCache = globalThis.__webpack_module_cache__;
const fakeFetchCode = `
Promise.resolve(new Response(new ReadableStream({
  start(c) {
    const f = (s) => new TextEncoder().encode(decodeURI(s));
    globalThis.__WAKU_PUSH__ = (s) => s ? c.enqueue(f(s)) : c.close();
  }
})))
`.split('\n').map((line)=>line.trim()).join('');
const injectRscPayload = (readable, urlForFakeFetch)=>{
    const chunks = [];
    const copied = readable.pipeThrough(new TransformStream({
        transform (chunk, controller) {
            if (!(chunk instanceof Uint8Array)) {
                throw new Error('Unknown chunk type');
            }
            chunks.push(chunk);
            controller.enqueue(chunk);
        }
    }));
    const modifyHead = (data)=>{
        const matchPrefetched = data.match(// HACK This is very brittle
        /(.*<script[^>]*>\nglobalThis\.__WAKU_PREFETCHED__ = {\n)(.*?)(\n};.*)/s);
        if (matchPrefetched) {
            data = matchPrefetched[1] + `  '${urlForFakeFetch}': ${fakeFetchCode},` + matchPrefetched[3];
        }
        const closingHeadIndex = data.indexOf('</head>');
        if (closingHeadIndex === -1) {
            throw new Error('closing head not found');
        }
        let code = '';
        if (!matchPrefetched) {
            code += `
globalThis.__WAKU_PREFETCHED__ = {
  '${urlForFakeFetch}': ${fakeFetchCode},
};
`;
        }
        if (code) {
            data = data.slice(0, closingHeadIndex) + `<script type="module" async>${code}</script>` + data.slice(closingHeadIndex);
        }
        return data;
    };
    const interleave = ()=>{
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        let headSent = false;
        let data = '';
        let scriptsClosed = false;
        const sendScripts = (controller, close)=>{
            if (scriptsClosed) {
                return;
            }
            const scripts = chunks.splice(0).map((chunk)=>`
<script type="module" async>globalThis.__WAKU_PUSH__("${encodeURI(decoder.decode(chunk))}")</script>`);
            if (close) {
                scriptsClosed = true;
                scripts.push(`
<script type="module" async>globalThis.__WAKU_PUSH__()</script>`);
            }
            if (scripts.length) {
                controller.enqueue(encoder.encode(scripts.join('')));
            }
        };
        return new TransformStream({
            transform (chunk, controller) {
                if (!(chunk instanceof Uint8Array)) {
                    throw new Error('Unknown chunk type');
                }
                data += decoder.decode(chunk);
                if (!headSent) {
                    if (!data.includes('</head>')) {
                        return;
                    }
                    headSent = true;
                    data = modifyHead(data);
                }
                const closingBodyIndex = data.lastIndexOf('</body>');
                if (closingBodyIndex === -1) {
                    controller.enqueue(encoder.encode(data));
                    data = '';
                    sendScripts(controller);
                } else {
                    controller.enqueue(encoder.encode(data.slice(0, closingBodyIndex)));
                    sendScripts(controller, true);
                    controller.enqueue(encoder.encode(data.slice(closingBodyIndex)));
                    data = '';
                }
            }
        });
    };
    return [
        copied,
        interleave
    ];
};
// HACK for now, do we want to use HTML parser?
const rectifyHtml = ()=>{
    const pending = [];
    const decoder = new TextDecoder();
    let timer;
    return new TransformStream({
        transform (chunk, controller) {
            if (!(chunk instanceof Uint8Array)) {
                throw new Error('Unknown chunk type');
            }
            pending.push(chunk);
            if (/<\/\w+>$/.test(decoder.decode(chunk))) {
                clearTimeout(timer);
                timer = setTimeout(()=>{
                    controller.enqueue(concatUint8Arrays(pending.splice(0)));
                });
            }
        },
        flush (controller) {
            clearTimeout(timer);
            if (pending.length) {
                controller.enqueue(concatUint8Arrays(pending.splice(0)));
            }
        }
    });
};
const buildHtml = (createElement, head, body)=>createElement('html', null, createElement('head', {
        dangerouslySetInnerHTML: {
            __html: head
        }
    }), createElement('body', null, body));
export const renderHtml = async (opts)=>{
    const { config, pathname, searchParams, htmlHead, renderRscForHtml, getSsrConfigForHtml, loadClientModule, isDev } = opts;
    const [{ default: { createElement } }, { default: { renderToReadableStream } }, { default: { createFromReadableStream } }, { ServerRoot }] = await Promise.all([
        loadClientModule('react'),
        loadClientModule('rd-server'),
        loadClientModule('rsdw-client'),
        loadClientModule('waku-client')
    ]);
    const ssrConfig = await getSsrConfigForHtml?.(pathname, searchParams);
    if (!ssrConfig) {
        return null;
    }
    let stream;
    try {
        stream = await renderRscForHtml(ssrConfig.input, ssrConfig.searchParams || searchParams);
    } catch (e) {
        if (hasStatusCode(e) && e.statusCode === 404) {
            return null;
        }
        throw e;
    }
    const moduleMap = new Proxy({}, {
        get (_target, filePath) {
            return new Proxy({}, {
                get (_target, name) {
                    const file = filePath.slice(config.basePath.length);
                    // TODO too long, we need to refactor this logic
                    if (isDev) {
                        const filePath = file.startsWith('@fs/') ? file.slice('@fs'.length) : joinPath(opts.rootDir, file);
                        const wakuDist = joinPath(fileURLToFilePath(import.meta.url), '../../..');
                        if (filePath.startsWith(wakuDist)) {
                            const id = 'waku' + filePath.slice(wakuDist.length).replace(/\.\w+$/, '');
                            if (!moduleLoading.has(id)) {
                                moduleLoading.set(id, import(id).then((m)=>{
                                    moduleCache.set(id, m);
                                }));
                            }
                            return {
                                id,
                                chunks: [
                                    id
                                ],
                                name
                            };
                        }
                        const id = filePathToFileURL(filePath);
                        if (!moduleLoading.has(id)) {
                            moduleLoading.set(id, opts.loadServerFile(id).then((m)=>{
                                moduleCache.set(id, m);
                            }));
                        }
                        return {
                            id,
                            chunks: [
                                id
                            ],
                            name
                        };
                    }
                    // !isDev
                    const id = file;
                    if (!moduleLoading.has(id)) {
                        moduleLoading.set(id, opts.loadModule(joinPath(config.ssrDir, id)).then((m)=>{
                            moduleCache.set(id, m);
                        }));
                    }
                    return {
                        id,
                        chunks: [
                            id
                        ],
                        name
                    };
                }
            });
        }
    });
    const [copied, interleave] = injectRscPayload(stream, config.basePath + config.rscPath + '/' + encodeInput(ssrConfig.input));
    const elements = createFromReadableStream(copied, {
        ssrManifest: {
            moduleMap,
            moduleLoading: null
        }
    });
    const body = createFromReadableStream(ssrConfig.body, {
        ssrManifest: {
            moduleMap,
            moduleLoading: null
        }
    });
    const readable = (await renderToReadableStream(buildHtml(createElement, htmlHead, createElement(ServerRoot, {
        elements
    }, body)), {
        onError (err) {
            console.error(err);
        }
    })).pipeThrough(rectifyHtml()).pipeThrough(interleave());
    return readable;
};

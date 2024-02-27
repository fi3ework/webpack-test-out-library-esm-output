import { filePathToFileURL } from '../utils/path.js';
import { parseFormData } from '../utils/form.js';
import { streamToString } from '../utils/stream.js';
import { decodeActionId } from '../renderers/utils.js';
export const RSDW_SERVER_MODULE = 'rsdw-server';
export const RSDW_SERVER_MODULE_VALUE = 'react-server-dom-webpack/server.edge';
const resolveClientEntryForPrd = (id, config)=>{
    if (!id.startsWith('@id/')) {
        throw new Error('Unexpected client entry in PRD');
    }
    return config.basePath + id.slice('@id/'.length);
};
export async function renderRsc(opts) {
    const { config, input, searchParams, method, contentType, context, body, moduleIdCallback, isDev, entries } = opts;
    const resolveClientEntry = isDev ? opts.resolveClientEntry : resolveClientEntryForPrd;
    const { default: { renderEntries }, loadModule } = entries;
    const { default: { renderToReadableStream, decodeReply } } = await (isDev ? import(RSDW_SERVER_MODULE_VALUE) : loadModule(RSDW_SERVER_MODULE));
    const render = async (renderContext, input, searchParams)=>{
        const elements = await renderEntries.call(renderContext, input, searchParams);
        if (elements === null) {
            const err = new Error('No function component found');
            err.statusCode = 404; // HACK our convention for NotFound
            throw err;
        }
        if (Object.keys(elements).some((key)=>key.startsWith('_'))) {
            throw new Error('"_" prefix is reserved');
        }
        return elements;
    };
    const bundlerConfig = new Proxy({}, {
        get (_target, encodedId) {
            const [file, name] = encodedId.split('#');
            const id = resolveClientEntry(file, config);
            moduleIdCallback?.(id);
            return {
                id,
                chunks: [
                    id
                ],
                name,
                async: true
            };
        }
    });
    if (method === 'POST') {
        const rsfId = decodeActionId(input);
        let args = [];
        let bodyStr = '';
        if (body) {
            bodyStr = await streamToString(body);
        }
        if (typeof contentType === 'string' && contentType.startsWith('multipart/form-data')) {
            // XXX This doesn't support streaming unlike busboy
            const formData = parseFormData(bodyStr, contentType);
            args = await decodeReply(formData);
        } else if (bodyStr) {
            args = await decodeReply(bodyStr);
        }
        const [fileId, name] = rsfId.split('#');
        let mod;
        if (isDev) {
            mod = await opts.customImport(filePathToFileURL(fileId));
        } else {
            if (!fileId.startsWith('@id/')) {
                throw new Error('Unexpected server entry in PRD');
            }
            mod = await loadModule(fileId.slice('@id/'.length));
        }
        const fn = mod[name] || mod;
        let elements = Promise.resolve({});
        let rendered = false;
        const rerender = (input, searchParams = new URLSearchParams())=>{
            if (rendered) {
                throw new Error('already rendered');
            }
            const renderContext = {
                rerender,
                context
            };
            elements = Promise.all([
                elements,
                render(renderContext, input, searchParams)
            ]).then(([oldElements, newElements])=>({
                    ...oldElements,
                    ...newElements
                }));
        };
        const renderContext = {
            rerender,
            context
        };
        const data = await fn.apply(renderContext, args);
        const resolvedElements = await elements;
        rendered = true;
        return renderToReadableStream({
            ...resolvedElements,
            _value: data
        }, bundlerConfig);
    }
    // method === 'GET'
    const renderContext = {
        rerender: ()=>{
            throw new Error('Cannot rerender');
        },
        context
    };
    const elements = await render(renderContext, input, searchParams);
    return renderToReadableStream(elements, bundlerConfig);
}
export async function getBuildConfig(opts) {
    const { config, entries } = opts;
    const { default: { getBuildConfig } } = entries;
    if (!getBuildConfig) {
        console.warn("getBuildConfig is undefined. It's recommended for optimization and sometimes required.");
        return [];
    }
    const unstable_collectClientModules = async (input)=>{
        const idSet = new Set();
        const readable = await renderRsc({
            config,
            input,
            searchParams: new URLSearchParams(),
            method: 'GET',
            context: null,
            moduleIdCallback: (id)=>idSet.add(id),
            isDev: false,
            entries
        });
        await new Promise((resolve, reject)=>{
            const writable = new WritableStream({
                close () {
                    resolve();
                },
                abort (reason) {
                    reject(reason);
                }
            });
            readable.pipeTo(writable);
        });
        return Array.from(idSet);
    };
    const output = await getBuildConfig(unstable_collectClientModules);
    return output;
}
export async function getSsrConfig(opts) {
    const { config, pathname, searchParams, isDev, entries } = opts;
    const resolveClientEntry = isDev ? opts.resolveClientEntry : resolveClientEntryForPrd;
    const { default: { getSsrConfig }, loadModule } = entries;
    const { renderToReadableStream } = await (isDev ? import(RSDW_SERVER_MODULE_VALUE) : loadModule(RSDW_SERVER_MODULE).then((m)=>m.default));
    const ssrConfig = await getSsrConfig?.(pathname, {
        searchParams
    });
    if (!ssrConfig) {
        return null;
    }
    const bundlerConfig = new Proxy({}, {
        get (_target, encodedId) {
            const [file, name] = encodedId.split('#');
            const id = resolveClientEntry(file, config);
            return {
                id,
                chunks: [
                    id
                ],
                name,
                async: true
            };
        }
    });
    return {
        ...ssrConfig,
        body: renderToReadableStream(ssrConfig.body, bundlerConfig)
    };
}

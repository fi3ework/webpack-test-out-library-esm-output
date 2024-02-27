import { resolveConfig } from '../config.js';
import { getPathMapping } from '../utils/path.js';
import { endStream } from '../utils/stream.js';
import { renderHtml } from '../renderers/html-renderer.js';
import { decodeInput, hasStatusCode, deepFreeze } from '../renderers/utils.js';
import { renderRsc, getSsrConfig } from '../renderers/rsc-renderer.js';
export const CLIENT_PREFIX = 'client/';
export function createHandler(options) {
    const { config, ssr, unstable_prehook, unstable_posthook, loadEntries } = options;
    if (!unstable_prehook && unstable_posthook) {
        throw new Error('prehook is required if posthook is provided');
    }
    globalThis.__WAKU_PRIVATE_ENV__ = options.env || {};
    const configPromise = resolveConfig(config || {});
    const entries = loadEntries();
    return async (req, res, next)=>{
        const config = await configPromise;
        const basePrefix = config.basePath + config.rscPath + '/';
        const handleError = (err)=>{
            if (hasStatusCode(err)) {
                res.setStatus(err.statusCode);
            } else {
                console.info('Cannot render RSC', err);
                res.setStatus(500);
            }
            endStream(res.stream);
        };
        let context;
        try {
            context = unstable_prehook?.(req, res);
        } catch (e) {
            handleError(e);
            return;
        }
        if (ssr) {
            try {
                const resolvedEntries = await entries;
                const { dynamicHtmlPaths } = resolvedEntries;
                const htmlHead = dynamicHtmlPaths.find(([pathSpec])=>getPathMapping(pathSpec, req.url.pathname))?.[1];
                if (htmlHead) {
                    const readable = await renderHtml({
                        config,
                        pathname: req.url.pathname,
                        searchParams: req.url.searchParams,
                        htmlHead,
                        renderRscForHtml: (input, searchParams)=>renderRsc({
                                entries: resolvedEntries,
                                config,
                                input,
                                searchParams,
                                method: 'GET',
                                context,
                                isDev: false
                            }),
                        getSsrConfigForHtml: (pathname, searchParams)=>getSsrConfig({
                                config,
                                pathname,
                                searchParams,
                                isDev: false,
                                entries: resolvedEntries
                            }),
                        loadClientModule: (key)=>resolvedEntries.loadModule(CLIENT_PREFIX + key),
                        isDev: false,
                        loadModule: resolvedEntries.loadModule
                    });
                    if (readable) {
                        unstable_posthook?.(req, res, context);
                        deepFreeze(context);
                        res.setHeader('content-type', 'text/html; charset=utf-8');
                        readable.pipeTo(res.stream);
                        return;
                    }
                }
            } catch (e) {
                handleError(e);
                return;
            }
        }
        if (req.url.pathname.startsWith(basePrefix)) {
            const { method, contentType } = req;
            if (method !== 'GET' && method !== 'POST') {
                throw new Error(`Unsupported method '${method}'`);
            }
            try {
                const input = decodeInput(req.url.pathname.slice(basePrefix.length));
                const readable = await renderRsc({
                    config,
                    input,
                    searchParams: req.url.searchParams,
                    method,
                    context,
                    body: req.stream,
                    contentType,
                    isDev: false,
                    entries: await entries
                });
                unstable_posthook?.(req, res, context);
                deepFreeze(context);
                readable.pipeTo(res.stream);
                return;
            } catch (e) {
                handleError(e);
                return;
            }
        }
        next();
    };
}

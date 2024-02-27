// This file can depend on Node.js
import { pathToFileURL } from 'node:url';
import { parentPort, getEnvironmentData } from 'node:worker_threads';
import { Server } from 'node:http';
import { createServer as createViteServer } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { joinPath, fileURLToFilePath, encodeFilePathToAbsolute } from '../utils/path.js';
import { deepFreeze, hasStatusCode } from '../renderers/utils.js';
import { renderRsc, getSsrConfig } from '../renderers/rsc-renderer.js';
import { nonjsResolvePlugin } from '../plugins/vite-plugin-nonjs-resolve.js';
import { rscTransformPlugin } from '../plugins/vite-plugin-rsc-transform.js';
import { rscEnvPlugin } from '../plugins/vite-plugin-rsc-env.js';
import { rscDelegatePlugin } from '../plugins/vite-plugin-rsc-delegate.js';
import { mergeUserViteConfig } from '../utils/merge-vite-config.js';
const { default: module } = await import('node:module');
const HAS_MODULE_REGISTER = typeof module.register === 'function';
if (HAS_MODULE_REGISTER) {
    module.register('waku/node-loader', pathToFileURL('./'));
}
globalThis.__WAKU_PRIVATE_ENV__ = getEnvironmentData('__WAKU_PRIVATE_ENV__');
const configSrcDir = getEnvironmentData('CONFIG_SRC_DIR');
const configEntriesJs = getEnvironmentData('CONFIG_ENTRIES_JS');
const resolveClientEntryForDev = (id, config)=>{
    const filePath = id.startsWith('file://') ? fileURLToFilePath(id) : id;
    // HACK this relies on Vite's internal implementation detail.
    return config.basePath + '@fs' + encodeFilePathToAbsolute(filePath);
};
const handleRender = async (mesg)=>{
    const { id, type: _removed, hasModuleIdCallback, ...rest } = mesg;
    const rr = rest;
    try {
        if (hasModuleIdCallback) {
            rr.moduleIdCallback = (moduleId)=>{
                const mesg = {
                    id,
                    type: 'moduleId',
                    moduleId
                };
                parentPort.postMessage(mesg);
            };
        }
        const readable = await renderRsc({
            config: rr.config,
            input: rr.input,
            searchParams: new URLSearchParams(rr.searchParamsString),
            method: rr.method,
            context: rr.context,
            body: rr.stream,
            contentType: rr.contentType,
            moduleIdCallback: rr.moduleIdCallback,
            isDev: true,
            customImport: loadServerFile,
            resolveClientEntry: (id)=>resolveClientEntryForDev(id, rr.config),
            entries: await loadEntries(rr.config)
        });
        const mesg = {
            id,
            type: 'start',
            context: rr.context,
            stream: readable
        };
        parentPort.postMessage(mesg, [
            readable
        ]);
        deepFreeze(rr.context);
    } catch (err) {
        const mesg = {
            id,
            type: 'err',
            err: `${err}`
        };
        if (hasStatusCode(err)) {
            mesg.statusCode = err.statusCode;
        }
        parentPort.postMessage(mesg);
    }
};
const handleGetSsrConfig = async (mesg)=>{
    const { id, config, pathname, searchParamsString } = mesg;
    const searchParams = new URLSearchParams(searchParamsString);
    try {
        const ssrConfig = await getSsrConfig({
            config,
            pathname,
            searchParams,
            isDev: true,
            resolveClientEntry: (id)=>resolveClientEntryForDev(id, config),
            entries: await loadEntries(config)
        });
        const mesg = ssrConfig ? {
            id,
            type: 'ssrConfig',
            ...ssrConfig
        } : {
            id,
            type: 'noSsrConfig'
        };
        parentPort.postMessage(mesg, ssrConfig ? [
            ssrConfig.body
        ] : undefined);
    } catch (err) {
        const mesg = {
            id,
            type: 'err',
            err: `${err}`
        };
        if (hasStatusCode(err)) {
            mesg.statusCode = err.statusCode;
        }
        parentPort.postMessage(mesg);
    }
};
const dummyServer = new Server(); // FIXME we hope to avoid this hack
const mergedViteConfig = await mergeUserViteConfig({
    plugins: [
        viteReact(),
        rscEnvPlugin({}),
        {
            name: 'rsc-index-plugin'
        },
        {
            name: 'rsc-hmr-plugin',
            enforce: 'post'
        },
        nonjsResolvePlugin(),
        rscTransformPlugin({
            isBuild: false
        }),
        rscDelegatePlugin((payload)=>{
            const mesg = {
                type: 'hot-update',
                payload
            };
            parentPort.postMessage(mesg);
        })
    ],
    optimizeDeps: {
        include: [
            'react-server-dom-webpack/client',
            'react-dom'
        ],
        exclude: [
            'waku'
        ],
        entries: [
            `${configSrcDir}/${configEntriesJs}`.replace(/\.js$/, '.*')
        ]
    },
    ssr: {
        resolve: {
            conditions: [
                'react-server',
                'workerd'
            ],
            externalConditions: [
                'react-server',
                'workerd'
            ]
        },
        external: [],
        // FIXME We want to externalize waku, but it fails on windows.
        noExternal: [
            'waku'
        ]
    },
    appType: 'custom',
    server: {
        middlewareMode: true,
        hmr: {
            server: dummyServer
        }
    }
});
const vitePromise = createViteServer(mergedViteConfig).then(async (vite)=>{
    await vite.ws.close();
    return vite;
});
const loadServerFile = async (fileURL)=>{
    const vite = await vitePromise;
    return vite.ssrLoadModule(fileURLToFilePath(fileURL));
};
const loadEntries = async (config)=>{
    const vite = await vitePromise;
    const filePath = joinPath(vite.config.root, config.srcDir, config.entriesJs);
    return vite.ssrLoadModule(filePath);
};
parentPort.on('message', (mesg)=>{
    if (mesg.type === 'render') {
        handleRender(mesg);
    } else if (mesg.type === 'getSsrConfig') {
        handleGetSsrConfig(mesg);
    }
});

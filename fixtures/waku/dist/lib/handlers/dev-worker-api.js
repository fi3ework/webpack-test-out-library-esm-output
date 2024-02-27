const messageCallbacks = new Map();
let workerPromise;
export function initializeWorker(config) {
    if (workerPromise) {
        throw new Error('Worker already initialized');
    }
    workerPromise = new Promise((resolve, reject)=>{
        Promise.all([
            import('node:worker_threads').catch((e)=>{
                throw e;
            }),
            import('node:module').catch((e)=>{
                throw e;
            })
        ]).then(([{ Worker, setEnvironmentData }, { default: module }])=>{
            const HAS_MODULE_REGISTER = typeof module.register === 'function';
            setEnvironmentData('__WAKU_PRIVATE_ENV__', globalThis.__WAKU_PRIVATE_ENV__);
            setEnvironmentData('CONFIG_SRC_DIR', config.srcDir);
            setEnvironmentData('CONFIG_ENTRIES_JS', config.entriesJs);
            const worker = new Worker(new URL('dev-worker-impl.js', import.meta.url), {
                execArgv: [
                    ...HAS_MODULE_REGISTER ? [] : [
                        '--experimental-loader',
                        'waku/node-loader'
                    ],
                    '--conditions',
                    'react-server',
                    'workerd'
                ]
            });
            worker.on('message', (mesg)=>{
                if ('id' in mesg) {
                    messageCallbacks.get(mesg.id)?.(mesg);
                }
            });
            resolve(worker);
        }).catch((e)=>reject(e));
    });
}
const getWorker = ()=>{
    if (!workerPromise) {
        throw new Error('Worker not initialized');
    }
    return workerPromise;
};
export async function registerHotUpdateCallback(fn) {
    const worker = await getWorker();
    const listener = (mesg)=>{
        if (mesg.type === 'hot-update') {
            fn(mesg.payload);
        }
    };
    worker.on('message', listener);
    return ()=>worker.off('message', listener);
}
let nextId = 1;
export async function renderRscWithWorker(rr) {
    const worker = await getWorker();
    const id = nextId++;
    let started = false;
    return new Promise((resolve, reject)=>{
        messageCallbacks.set(id, (mesg)=>{
            if (mesg.type === 'start') {
                if (!started) {
                    started = true;
                    const bridge = new TransformStream({
                        flush () {
                            messageCallbacks.delete(id);
                        }
                    });
                    resolve([
                        mesg.stream.pipeThrough(bridge),
                        mesg.context
                    ]);
                } else {
                    throw new Error('already started');
                }
            } else if (mesg.type === 'moduleId') {
                rr.moduleIdCallback?.(mesg.moduleId);
            } else if (mesg.type === 'err') {
                const err = typeof mesg.err === 'string' ? new Error(mesg.err) : mesg.err;
                if (mesg.statusCode) {
                    err.statusCode = mesg.statusCode;
                }
                if (!started) {
                    reject(err);
                }
                messageCallbacks.delete(id);
            }
        });
        const { ssr: _removed, ...copiedConfig } = rr.config; // HACK type
        const copied = {
            ...rr,
            config: copiedConfig
        };
        delete copied.stream;
        delete copied.moduleIdCallback;
        const mesg = {
            id,
            type: 'render',
            hasModuleIdCallback: !!rr.moduleIdCallback,
            stream: rr.stream,
            ...copied
        };
        worker.postMessage(mesg, rr.stream ? [
            rr.stream
        ] : undefined);
    });
}
export async function getSsrConfigWithWorker(config, pathname, searchParams) {
    const worker = await getWorker();
    const id = nextId++;
    return new Promise((resolve, reject)=>{
        messageCallbacks.set(id, (mesg)=>{
            if (mesg.type === 'ssrConfig') {
                resolve({
                    input: mesg.input,
                    ...mesg.searchParamsString ? {
                        searchParams: new URLSearchParams(mesg.searchParamsString)
                    } : {},
                    body: mesg.body
                });
                messageCallbacks.delete(id);
            } else if (mesg.type === 'noSsrConfig') {
                resolve(null);
                messageCallbacks.delete(id);
            } else if (mesg.type === 'err') {
                const err = typeof mesg.err === 'string' ? new Error(mesg.err) : mesg.err;
                if (mesg.statusCode) {
                    err.statusCode = mesg.statusCode;
                }
                reject(err);
                messageCallbacks.delete(id);
            }
        });
        const mesg = {
            id,
            type: 'getSsrConfig',
            config,
            pathname,
            searchParamsString: searchParams.toString()
        };
        worker.postMessage(mesg);
    });
}

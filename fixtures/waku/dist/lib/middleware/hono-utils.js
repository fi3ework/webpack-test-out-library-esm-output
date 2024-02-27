const createEmptyReadableStream = ()=>new ReadableStream({
        start (controller) {
            controller.close();
        }
    });
const createStreamPair = (callback)=>{
    let controller;
    const readable = new ReadableStream({
        start (c) {
            controller = c;
        },
        cancel () {
            controller = undefined;
        }
    });
    let hasData = false;
    const writable = new WritableStream({
        write (chunk) {
            if (!controller) {
                return;
            }
            controller.enqueue(chunk);
            if (!hasData) {
                hasData = true;
                callback(readable);
            }
        },
        close () {
            if (!controller) {
                return;
            }
            controller.close();
            if (!hasData) {
                callback(null);
            }
        }
    });
    return writable;
};
export const honoWrapper = (m)=>{
    return (c, next)=>new Promise((resolve)=>{
            const req = {
                stream: c.req.raw.body || createEmptyReadableStream(),
                method: c.req.method,
                url: new URL(c.req.url),
                contentType: c.req.header('content-type'),
                c
            };
            const writable = createStreamPair((readable)=>{
                resolve(c.body(readable));
            });
            const res = {
                stream: writable,
                setStatus: (code)=>c.status(code),
                setHeader: (name, value)=>c.header(name, value),
                c
            };
            m(req, res, ()=>next().then(resolve));
        });
};

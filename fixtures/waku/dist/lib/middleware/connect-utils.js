export const connectWrapper = (m)=>{
    return async (connectReq, connectRes, next)=>{
        const { Readable, Writable } = await import('node:stream');
        const req = {
            stream: Readable.toWeb(connectReq),
            method: connectReq.method || '',
            url: new URL(connectReq.url || '', `http://${connectReq.headers.host}`),
            contentType: connectReq.headers['content-type'],
            orig: connectReq
        };
        const res = {
            stream: Writable.toWeb(connectRes),
            setStatus: (code)=>connectRes.statusCode = code,
            setHeader: (name, value)=>connectRes.setHeader(name, value),
            orig: connectRes
        };
        m(req, res, next);
    };
};

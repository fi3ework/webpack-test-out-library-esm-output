export const endStream = async (stream, message)=>{
    const writer = stream.getWriter();
    await writer.ready;
    if (message) {
        await writer.write(new TextEncoder().encode(message));
    }
    await writer.close();
};
export const concatUint8Arrays = (arrs)=>{
    const len = arrs.reduce((acc, arr)=>acc + arr.length, 0);
    const array = new Uint8Array(len);
    let offset = 0;
    for (const arr of arrs){
        array.set(arr, offset);
        offset += arr.length;
    }
    return array;
};
export const streamToString = async (stream)=>{
    const decoder = new TextDecoder();
    const reader = stream.getReader();
    const outs = [];
    let result;
    do {
        result = await reader.read();
        if (result.value) {
            if (!(result.value instanceof Uint8Array)) {
                throw new Error('Unexepected buffer type');
            }
            outs.push(decoder.decode(result.value, {
                stream: true
            }));
        }
    }while (!result.done)
    outs.push(decoder.decode());
    return outs.join('');
};

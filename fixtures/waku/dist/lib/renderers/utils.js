// This file should not include Node specific code.
export const encodeInput = (input)=>{
    if (input === '') {
        return 'index.txt';
    }
    if (input === 'index') {
        throw new Error('Input should not be `index`');
    }
    if (input.startsWith('/')) {
        throw new Error('Input should not start with `/`');
    }
    if (input.endsWith('/')) {
        throw new Error('Input should not end with `/`');
    }
    return input + '.txt';
};
export const decodeInput = (encodedInput)=>{
    if (encodedInput === 'index.txt') {
        return '';
    }
    if (encodedInput?.endsWith('.txt')) {
        return encodedInput.slice(0, -'.txt'.length);
    }
    const err = new Error('Invalid encoded input');
    err.statusCode = 400;
    throw err;
};
export const encodeActionId = (actionId)=>{
    const [file, name] = actionId.split('#');
    if (name.includes('/')) {
        throw new Error('Unsupported action name');
    }
    return '_' + file + '/' + name;
};
export const decodeActionId = (encoded)=>{
    const index = encoded.lastIndexOf('/');
    return encoded.slice(1, index) + '#' + encoded.slice(index + 1);
};
export const hasStatusCode = (x)=>typeof x?.statusCode === 'number';
export const codeToInject = `
globalThis.__waku_module_cache__ = new Map();
globalThis.__webpack_chunk_load__ = (id) => import(id).then((m) => globalThis.__waku_module_cache__.set(id, m));
globalThis.__webpack_require__ = (id) => globalThis.__waku_module_cache__.get(id);`;
export const generatePrefetchCode = (basePrefix, inputs, moduleIds)=>{
    const inputsArray = Array.from(inputs);
    let code = '';
    if (inputsArray.length) {
        code += `
globalThis.__WAKU_PREFETCHED__ = {
${inputsArray.map((input)=>{
            const url = basePrefix + encodeInput(input);
            return `  '${url}': fetch('${url}'),`;
        }).join('\n')}
};`;
    }
    for (const moduleId of moduleIds){
        code += `
import('${moduleId}');`;
    }
    return code;
};
export const deepFreeze = (x)=>{
    if (typeof x === 'object' && x !== null) {
        Object.freeze(x);
        for (const value of Object.values(x)){
            deepFreeze(value);
        }
    }
};
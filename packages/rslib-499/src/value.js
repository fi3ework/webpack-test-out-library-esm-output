import url from 'node:url';
const packageDirectory = url.fileURLToPath(new URL('.', import.meta.url));
export const foo = 'foo';

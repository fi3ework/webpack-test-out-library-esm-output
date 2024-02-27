// Terminology:
// - filePath: posix-like file path, e.g. `/foo/bar.js` or `c:/foo/bar.js`
//   This is used by Vite.
// - fileURL: file URL, e.g. `file:///foo/bar.js` or `file:///c:/foo/bar.js`
//   This is used by import().
// - osPath: os dependent path, e.g. `/foo/bar.js` or `c:\foo\bar.js`
//   This is used by node:fs.
const ABSOLUTE_WIN32_PATH_REGEXP = /^\/[a-zA-Z]:\//;
export const encodeFilePathToAbsolute = (filePath)=>{
    if (ABSOLUTE_WIN32_PATH_REGEXP.test(filePath)) {
        throw new Error('Unsupported absolute file path');
    }
    if (filePath.startsWith('/')) {
        return filePath;
    }
    return '/' + filePath;
};
export const decodeFilePathFromAbsolute = (filePath)=>{
    if (ABSOLUTE_WIN32_PATH_REGEXP.test(filePath)) {
        return filePath.slice(1);
    }
    return filePath;
};
export const filePathToFileURL = (filePath)=>'file://' + encodeURI(filePath);
export const fileURLToFilePath = (fileURL)=>{
    if (!fileURL.startsWith('file://')) {
        throw new Error('Not a file URL');
    }
    return decodeURI(fileURL.slice('file://'.length));
};
// for filePath
export const joinPath = (...paths)=>{
    const isAbsolute = paths[0]?.startsWith('/');
    const items = [].concat(...paths.map((path)=>path.split('/')));
    let i = 0;
    while(i < items.length){
        if (items[i] === '.' || items[i] === '') {
            items.splice(i, 1);
        } else if (items[i] === '..') {
            if (i > 0) {
                items.splice(i - 1, 2);
                --i;
            } else {
                items.splice(i, 1);
            }
        } else {
            ++i;
        }
    }
    return (isAbsolute ? '/' : '') + items.join('/') || '.';
};
export const extname = (filePath)=>{
    const index = filePath.lastIndexOf('.');
    return index > 0 ? filePath.slice(index) : '';
};
export const parsePathWithSlug = (path)=>path.split('/').filter(Boolean).map((name)=>{
        let type = 'literal';
        const isSlug = name.startsWith('[') && name.endsWith(']');
        if (isSlug) {
            type = 'group';
            name = name.slice(1, -1);
        }
        const isWildcard = name.startsWith('...');
        if (isWildcard) {
            type = 'wildcard';
            name = name.slice(3);
        }
        return {
            type,
            name
        };
    });
export const getPathMapping = (pathSpec, pathname)=>{
    const actual = pathname.split('/').filter(Boolean);
    if (pathSpec.length > actual.length) {
        return null;
    }
    const mapping = {};
    let wildcardStartIndex = -1;
    for(let i = 0; i < pathSpec.length; i++){
        const { type, name } = pathSpec[i];
        if (type === 'literal') {
            if (name !== actual[i]) {
                return null;
            }
        } else if (type === 'wildcard') {
            wildcardStartIndex = i;
            break;
        } else if (name) {
            mapping[name] = actual[i];
        }
    }
    if (wildcardStartIndex === -1) {
        if (pathSpec.length !== actual.length) {
            return null;
        }
        return mapping;
    }
    let wildcardEndIndex = -1;
    for(let i = 0; i < pathSpec.length; i++){
        const { type, name } = pathSpec[pathSpec.length - i - 1];
        if (type === 'literal') {
            if (name !== actual[actual.length - i - 1]) {
                return null;
            }
        } else if (type === 'wildcard') {
            wildcardEndIndex = actual.length - i - 1;
            break;
        } else if (name) {
            mapping[name] = actual[actual.length - i - 1];
        }
    }
    if (wildcardStartIndex === -1 || wildcardEndIndex === -1) {
        throw new Error('Invalid wildcard path');
    }
    const wildcardName = pathSpec[wildcardStartIndex].name;
    if (wildcardName) {
        mapping[wildcardName] = actual.slice(wildcardStartIndex, wildcardEndIndex + 1);
    }
    return mapping;
};

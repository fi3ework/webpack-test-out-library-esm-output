import { createElement, Fragment } from 'react';
import { Children, Slot } from '../client.js';
import { getComponentIds, getInputString, parseInputString, PARAM_KEY_SKIP, SHOULD_SKIP_ID } from './common.js';
import { joinPath, parsePathWithSlug, getPathMapping } from '../lib/utils/path.js';
const ShoudSkipComponent = ({ shouldSkip })=>createElement('meta', {
        name: 'waku-should-skip',
        content: JSON.stringify(shouldSkip)
    });
export function unstable_defineRouter(getPathConfig, getComponent) {
    const pathConfigPromise = getPathConfig().then((pathConfig)=>Array.from(pathConfig));
    const existsPath = async (pathname)=>{
        const pathConfig = await pathConfigPromise;
        return pathConfig.some(({ path: pathSpec })=>getPathMapping(pathSpec, pathname));
    };
    const shouldSkip = {};
    const renderEntries = async (input, searchParams)=>{
        const pathname = parseInputString(input);
        if (!existsPath(pathname)) {
            return null;
        }
        const skip = searchParams.getAll(PARAM_KEY_SKIP) || [];
        const componentIds = getComponentIds(pathname);
        const props = {
            path: pathname,
            searchParams
        };
        const entries = (await Promise.all(componentIds.map(async (id)=>{
            if (skip?.includes(id)) {
                return [];
            }
            const mod = await getComponent(id, (val)=>{
                if (val) {
                    shouldSkip[id] = val;
                } else {
                    delete shouldSkip[id];
                }
            });
            const component = mod && 'default' in mod ? mod.default : mod;
            if (!component) {
                return [];
            }
            const element = createElement(component, props, createElement(Children));
            return [
                [
                    id,
                    element
                ]
            ];
        }))).flat();
        entries.push([
            SHOULD_SKIP_ID,
            createElement(ShoudSkipComponent, {
                shouldSkip
            })
        ]);
        return Object.fromEntries(entries);
    };
    const getBuildConfig = async (unstable_collectClientModules)=>{
        const pathConfig = await pathConfigPromise;
        const path2moduleIds = {};
        for (const { path: pathSpec } of pathConfig){
            if (pathSpec.some(({ type })=>type !== 'literal')) {
                continue;
            }
            const pathname = '/' + pathSpec.map(({ name })=>name).join('/');
            const input = getInputString(pathname);
            const moduleIds = await unstable_collectClientModules(input);
            path2moduleIds[pathname] = moduleIds;
        }
        const customCode = `
globalThis.__WAKU_ROUTER_PREFETCH__ = (path) => {
  const path2ids = ${JSON.stringify(path2moduleIds)};
  for (const id of path2ids[path] || []) {
    import(id);
  }
};`;
        const buildConfig = [];
        for (const { path: pathSpec, isStatic = false } of pathConfig){
            const entries = [];
            if (pathSpec.every(({ type })=>type === 'literal')) {
                const pathname = '/' + pathSpec.map(({ name })=>name).join('/');
                const input = getInputString(pathname);
                entries.push({
                    input,
                    isStatic
                });
            }
            buildConfig.push({
                pathname: pathSpec,
                isStatic,
                entries,
                customCode
            });
        }
        return buildConfig;
    };
    const getSsrConfig = async (pathname)=>{
        if (!await existsPath(pathname)) {
            return null;
        }
        const componentIds = getComponentIds(pathname);
        const input = getInputString(pathname);
        const body = createElement(Fragment, null, createElement(Slot, {
            id: SHOULD_SKIP_ID
        }), componentIds.reduceRight((acc, id)=>createElement(Slot, {
                id,
                fallback: acc
            }, acc), null));
        return {
            input,
            body
        };
    };
    return {
        renderEntries,
        getBuildConfig,
        getSsrConfig
    };
}
export function createPages(fn) {
    let configured = false;
    const staticPathSet = new Set();
    const dynamicPathMap = new Map();
    const wildcardPathMap = new Map();
    const staticComponentMap = new Map();
    const registerStaticComponent = (id, component)=>{
        if (staticComponentMap.has(id) && staticComponentMap.get(id) !== component) {
            throw new Error(`Duplicated component for: ${id}`);
        }
        staticComponentMap.set(id, component);
    };
    const createPage = (page)=>{
        if (configured) {
            throw new Error('no longer available');
        }
        const pathSpec = parsePathWithSlug(page.path);
        const numSlugs = pathSpec.filter(({ type })=>type !== 'literal').length;
        const numWildcards = pathSpec.filter(({ type })=>type === 'wildcard').length;
        if (page.render === 'static' && numSlugs === 0) {
            staticPathSet.add(pathSpec);
            const id = joinPath(page.path, 'page').replace(/^\//, '');
            registerStaticComponent(id, page.component);
        } else if (page.render === 'static' && numSlugs > 0 && numWildcards === 0) {
            const staticPaths = page.staticPaths.map((item)=>Array.isArray(item) ? item : [
                    item
                ]);
            for (const staticPath of staticPaths){
                if (staticPath.length !== numSlugs) {
                    throw new Error('staticPaths does not match with slug pattern');
                }
                const mapping = {};
                let slugIndex = 0;
                const pathItems = pathSpec.map(({ type, name })=>{
                    if (type !== 'literal') {
                        const actualName = staticPath[slugIndex++];
                        if (name) {
                            mapping[name] = actualName;
                        }
                        return actualName;
                    }
                    return name;
                });
                staticPathSet.add(pathItems.map((name)=>({
                        type: 'literal',
                        name
                    })));
                const id = joinPath(...pathItems, 'page');
                const WrappedComponent = (props)=>createElement(page.component, {
                        ...props,
                        ...mapping
                    });
                registerStaticComponent(id, WrappedComponent);
            }
        } else if (page.render === 'dynamic' && numWildcards === 0) {
            if (dynamicPathMap.has(page.path)) {
                throw new Error(`Duplicated dynamic path: ${page.path}`);
            }
            dynamicPathMap.set(page.path, [
                pathSpec,
                page.component
            ]);
        } else if (page.render === 'dynamic' && numWildcards === 1) {
            if (wildcardPathMap.has(page.path)) {
                throw new Error(`Duplicated dynamic path: ${page.path}`);
            }
            wildcardPathMap.set(page.path, [
                pathSpec,
                page.component
            ]);
        } else {
            throw new Error('Invalid page configuration');
        }
    };
    const createLayout = (layout)=>{
        if (configured) {
            throw new Error('no longer available');
        }
        const id = joinPath(layout.path, 'layout').replace(/^\//, '');
        registerStaticComponent(id, layout.component);
    };
    const ready = fn({
        createPage,
        createLayout
    }).then(()=>{
        configured = true;
    });
    return unstable_defineRouter(async ()=>{
        await ready;
        const paths = [];
        for (const pathSpec of staticPathSet){
            paths.push({
                path: pathSpec,
                isStatic: true
            });
        }
        for (const [pathSpec] of dynamicPathMap.values()){
            paths.push({
                path: pathSpec,
                isStatic: false
            });
        }
        for (const [pathSpec] of wildcardPathMap.values()){
            paths.push({
                path: pathSpec,
                isStatic: false
            });
        }
        return paths;
    }, async (id, unstable_setShouldSkip)=>{
        await ready;
        const staticComponent = staticComponentMap.get(id);
        if (staticComponent) {
            unstable_setShouldSkip({});
            return staticComponent;
        }
        for (const [pathSpec, Component] of dynamicPathMap.values()){
            const mapping = getPathMapping([
                ...pathSpec,
                {
                    type: 'literal',
                    name: 'page'
                }
            ], id);
            if (mapping) {
                if (Object.keys(mapping).length === 0) {
                    unstable_setShouldSkip();
                    return Component;
                }
                const WrappedComponent = (props)=>createElement(Component, {
                        ...props,
                        ...mapping
                    });
                unstable_setShouldSkip();
                return WrappedComponent;
            }
        }
        for (const [pathSpec, Component] of wildcardPathMap.values()){
            const mapping = getPathMapping([
                ...pathSpec,
                {
                    type: 'literal',
                    name: 'page'
                }
            ], id);
            if (mapping) {
                const WrappedComponent = (props)=>createElement(Component, {
                        ...props,
                        ...mapping
                    });
                unstable_setShouldSkip();
                return WrappedComponent;
            }
        }
        unstable_setShouldSkip({}); // negative cache
        return null; // not found
    });
}

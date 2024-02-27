/// <reference types="react/canary" />
'use client';
import { createContext, createElement, memo, use, useCallback, useState, startTransition } from 'react';
import RSDWClient from 'react-server-dom-webpack/client';
import { encodeInput, encodeActionId } from './lib/renderers/utils.js';
const { createFromFetch, encodeReply } = RSDWClient;
const BASE_PATH = `${import.meta.env?.WAKU_CONFIG_BASE_PATH}${import.meta.env?.WAKU_CONFIG_RSC_PATH}/`;
const checkStatus = async (responsePromise)=>{
    const response = await responsePromise;
    if (!response.ok) {
        const err = new Error(response.statusText);
        err.statusCode = response.status;
        throw err;
    }
    return response;
};
const getCached = (c, m, k)=>(m.has(k) ? m : m.set(k, c())).get(k);
const cache1 = new WeakMap();
const mergeElements = (a, b)=>{
    const getResult = async ()=>{
        const nextElements = {
            ...await a,
            ...await b
        };
        delete nextElements._value;
        return nextElements;
    };
    const cache2 = getCached(()=>new WeakMap(), cache1, a);
    return getCached(getResult, cache2, b);
};
const fetchCache = [];
export const fetchRSC = (input, searchParamsString, setElements, cache = fetchCache)=>{
    let entry = cache[0];
    if (entry && entry[0] === input && entry[1] === searchParamsString) {
        entry[2] = setElements;
        return entry[3];
    }
    const options = {
        async callServer (actionId, args) {
            const response = fetch(BASE_PATH + encodeInput(encodeActionId(actionId)), {
                method: 'POST',
                body: await encodeReply(args)
            });
            const data = createFromFetch(checkStatus(response), options);
            const setElements = entry[2];
            startTransition(()=>{
                // FIXME this causes rerenders even if data is empty
                setElements((prev)=>mergeElements(prev, data));
            });
            return (await data)._value;
        }
    };
    const prefetched = globalThis.__WAKU_PREFETCHED__ ||= {};
    const url = BASE_PATH + encodeInput(input) + (searchParamsString ? '?' + searchParamsString : '');
    const response = prefetched[url] || fetch(url);
    delete prefetched[url];
    const data = createFromFetch(checkStatus(response), options);
    cache[0] = entry = [
        input,
        searchParamsString,
        setElements,
        data
    ];
    return data;
};
export const prefetchRSC = (input, searchParamsString)=>{
    const prefetched = globalThis.__WAKU_PREFETCHED__ ||= {};
    const url = BASE_PATH + encodeInput(input) + (searchParamsString ? '?' + searchParamsString : '');
    if (!(url in prefetched)) {
        prefetched[url] = fetch(url);
    }
};
const RefetchContext = createContext(()=>{
    throw new Error('Missing Root component');
});
const ElementsContext = createContext(null);
export const Root = ({ initialInput, initialSearchParamsString, cache, children })=>{
    const [elements, setElements] = useState(()=>fetchRSC(initialInput || '', initialSearchParamsString || '', (fn)=>setElements(fn), cache));
    const refetch = useCallback((input, searchParams)=>{
        const data = fetchRSC(input, searchParams?.toString() || '', setElements, cache);
        setElements((prev)=>mergeElements(prev, data));
    }, [
        cache
    ]);
    return createElement(RefetchContext.Provider, {
        value: refetch
    }, createElement(ElementsContext.Provider, {
        value: elements
    }, children));
};
export const useRefetch = ()=>use(RefetchContext);
const ChildrenContext = createContext(undefined);
const ChildrenContextProvider = memo(ChildrenContext.Provider);
export const Slot = ({ id, children, fallback })=>{
    const elementsPromise = use(ElementsContext);
    if (!elementsPromise) {
        throw new Error('Missing Root component');
    }
    const elements = use(elementsPromise);
    if (!(id in elements)) {
        if (fallback) {
            return fallback;
        }
        throw new Error('Not found: ' + id);
    }
    return createElement(ChildrenContextProvider, {
        value: children
    }, elements[id]);
};
export const Children = ()=>use(ChildrenContext);
export const ServerRoot = ({ elements, children })=>createElement(ElementsContext.Provider, {
        value: elements
    }, children);

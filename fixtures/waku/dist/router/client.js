'use client';
import { createContext, createElement, useCallback, useContext, useEffect, useRef, useState, useTransition, Fragment } from 'react';
import { prefetchRSC, Root, Slot, useRefetch } from '../client.js';
import { getComponentIds, getInputString, PARAM_KEY_SKIP, SHOULD_SKIP_ID } from './common.js';
const parseLocation = ()=>{
    const { pathname, search } = window.location;
    const searchParams = new URLSearchParams(search);
    if (searchParams.has(PARAM_KEY_SKIP)) {
        console.warn(`The search param "${PARAM_KEY_SKIP}" is reserved`);
    }
    return {
        path: pathname,
        searchParams
    };
};
const RouterContext = createContext(null);
export function useChangeLocation() {
    const value = useContext(RouterContext);
    if (!value) {
        return ()=>{
            throw new Error('Missing Router');
        };
    }
    return value.changeLocation;
}
export function useLocation() {
    const value = useContext(RouterContext);
    if (!value) {
        throw new Error('Missing Router');
    }
    return value.loc;
}
export function Link({ to, children, pending, notPending, unstable_prefetchOnEnter, ...props }) {
    if (!to.startsWith('/')) {
        throw new Error('Link must start with "/"');
    }
    const value = useContext(RouterContext);
    const changeLocation = value ? value.changeLocation : ()=>{
        throw new Error('Missing Router');
    };
    const prefetchLocation = value ? value.prefetchLocation : ()=>{
        throw new Error('Missing Router');
    };
    const [isPending, startTransition] = useTransition();
    const onClick = (event)=>{
        event.preventDefault();
        const url = new URL(to, window.location.href);
        if (url.href !== window.location.href) {
            prefetchLocation(url.pathname, url.searchParams);
            startTransition(()=>{
                changeLocation(url.pathname, url.searchParams);
            });
        }
        props.onClick?.(event);
    };
    const onMouseEnter = unstable_prefetchOnEnter ? (event)=>{
        const url = new URL(to, window.location.href);
        if (url.href !== window.location.href) {
            prefetchLocation(url.pathname, url.searchParams);
        }
        props.onMouseEnter?.(event);
    } : props.onMouseEnter;
    const ele = createElement('a', {
        ...props,
        href: to,
        onClick,
        onMouseEnter
    }, children);
    if (isPending && pending !== undefined) {
        return createElement(Fragment, null, ele, pending);
    }
    if (!isPending && notPending !== undefined) {
        return createElement(Fragment, null, ele, notPending);
    }
    return ele;
}
const getSkipList = (componentIds, props, cached)=>{
    const ele = document.querySelector('meta[name="waku-should-skip"]');
    if (!ele) {
        return [];
    }
    const shouldSkip = JSON.parse(ele.content);
    return componentIds.filter((id)=>{
        const prevProps = cached[id];
        if (!prevProps) {
            return false;
        }
        const shouldCheck = shouldSkip?.[id];
        if (!shouldCheck) {
            return false;
        }
        if (shouldCheck.path && props.path !== prevProps.path) {
            return false;
        }
        if (shouldCheck.keys?.some((key)=>props.searchParams.get(key) !== prevProps.searchParams.get(key))) {
            return false;
        }
        return true;
    });
};
const equalRouteProps = (a, b)=>{
    if (a.path !== b.path) {
        return false;
    }
    if (a.searchParams.size !== b.searchParams.size) {
        return false;
    }
    if (Array.from(a.searchParams.entries()).some(([key, value])=>value !== b.searchParams.get(key))) {
        return false;
    }
    return true;
};
function InnerRouter() {
    const refetch = useRefetch();
    const [loc, setLoc] = useState(parseLocation);
    const componentIds = getComponentIds(loc.path);
    const [cached, setCached] = useState(()=>{
        return Object.fromEntries(componentIds.map((id)=>[
                id,
                loc
            ]));
    });
    const cachedRef = useRef(cached);
    useEffect(()=>{
        cachedRef.current = cached;
    }, [
        cached
    ]);
    const changeLocation = useCallback((path, searchParams, method = 'pushState', scrollTo = {
        top: 0,
        left: 0
    })=>{
        const url = new URL(window.location.href);
        if (path) {
            url.pathname = path;
        }
        if (searchParams) {
            url.search = '?' + searchParams.toString();
        }
        if (method) {
            window.history[method](window.history.state, '', url);
        }
        const loc = parseLocation();
        setLoc(loc);
        if (scrollTo) {
            window.scrollTo(scrollTo);
        }
        const componentIds = getComponentIds(loc.path);
        if (!method && componentIds.every((id)=>{
            const cachedLoc = cachedRef.current[id];
            return cachedLoc && equalRouteProps(cachedLoc, loc);
        })) {
            return; // everything is cached
        }
        const skip = getSkipList(componentIds, loc, cachedRef.current);
        if (componentIds.every((id)=>skip.includes(id))) {
            return; // everything is skipped
        }
        const input = getInputString(loc.path);
        refetch(input, new URLSearchParams([
            ...Array.from(loc.searchParams.entries()),
            ...skip.map((id)=>[
                    PARAM_KEY_SKIP,
                    id
                ])
        ]));
        setCached((prev)=>({
                ...prev,
                ...Object.fromEntries(componentIds.flatMap((id)=>skip.includes(id) ? [] : [
                        [
                            id,
                            loc
                        ]
                    ]))
            }));
    }, [
        refetch
    ]);
    const prefetchLocation = useCallback((path, searchParams)=>{
        const componentIds = getComponentIds(path);
        const routeProps = {
            path,
            searchParams
        };
        const skip = getSkipList(componentIds, routeProps, cachedRef.current);
        if (componentIds.every((id)=>skip.includes(id))) {
            return; // everything is cached
        }
        const input = getInputString(path);
        const searchParamsString = new URLSearchParams([
            ...Array.from(searchParams.entries()),
            ...skip.map((id)=>[
                    PARAM_KEY_SKIP,
                    id
                ])
        ]).toString();
        prefetchRSC(input, searchParamsString);
        globalThis.__WAKU_ROUTER_PREFETCH__?.(path);
    }, []);
    useEffect(()=>{
        const callback = ()=>{
            const loc = parseLocation();
            changeLocation(loc.path, loc.searchParams, false, false);
        };
        window.addEventListener('popstate', callback);
        return ()=>window.removeEventListener('popstate', callback);
    }, [
        changeLocation
    ]);
    const children = componentIds.reduceRight((acc, id)=>createElement(Slot, {
            id,
            fallback: acc
        }, acc), null);
    return createElement(Fragment, null, createElement(Slot, {
        id: SHOULD_SKIP_ID
    }), createElement(RouterContext.Provider, {
        value: {
            loc,
            changeLocation,
            prefetchLocation
        }
    }, children));
}
export function Router() {
    const loc = parseLocation();
    const initialInput = getInputString(loc.path);
    const initialSearchParamsString = loc.searchParams.toString();
    return createElement(Root, {
        initialInput,
        initialSearchParamsString
    }, createElement(InnerRouter));
}

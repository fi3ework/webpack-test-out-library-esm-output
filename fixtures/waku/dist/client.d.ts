import type { ReactNode } from 'react';
declare global {
    interface ImportMeta {
        readonly env: Record<string, string>;
    }
}
type Elements = Promise<Record<string, ReactNode>>;
type SetElements = (updater: Elements | ((prev: Elements) => Elements)) => void;
type CacheEntry = [
    input: string,
    searchParamsString: string,
    setElements: SetElements,
    elements: Elements
];
declare const fetchCache: [CacheEntry?];
export declare const fetchRSC: (input: string, searchParamsString: string, setElements: SetElements, cache?: [CacheEntry?]) => Elements;
export declare const prefetchRSC: (input: string, searchParamsString: string) => void;
export declare const Root: ({ initialInput, initialSearchParamsString, cache, children, }: {
    initialInput?: string;
    initialSearchParamsString?: string;
    cache?: typeof fetchCache;
    children: ReactNode;
}) => import("react").FunctionComponentElement<import("react").ProviderProps<(input: string, searchParams?: URLSearchParams) => void>>;
export declare const useRefetch: () => (input: string, searchParams?: URLSearchParams) => void;
export declare const Slot: ({ id, children, fallback, }: {
    id: string;
    children?: ReactNode;
    fallback?: ReactNode;
}) => string | number | true | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | import("react").FunctionComponentElement<import("react").ProviderProps<ReactNode>>;
export declare const Children: () => ReactNode;
export declare const ServerRoot: ({ elements, children, }: {
    elements: Elements;
    children: ReactNode;
}) => import("react").FunctionComponentElement<import("react").ProviderProps<Elements | null>>;
export {};

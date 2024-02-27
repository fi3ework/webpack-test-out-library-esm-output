import type { EntriesDev, EntriesPrd } from '../../server.js';
import type { ResolvedConfig } from '../config.js';
export declare const RSDW_SERVER_MODULE = "rsdw-server";
export declare const RSDW_SERVER_MODULE_VALUE = "react-server-dom-webpack/server.edge";
export declare function renderRsc(opts: {
    config: ResolvedConfig;
    input: string;
    searchParams: URLSearchParams;
    method: 'GET' | 'POST';
    context: unknown;
    body?: ReadableStream | undefined;
    contentType?: string | undefined;
    moduleIdCallback?: ((id: string) => void) | undefined;
} & ({
    isDev: false;
    entries: EntriesPrd;
} | {
    isDev: true;
    entries: EntriesDev;
    customImport: (fileURL: string) => Promise<unknown>;
    resolveClientEntry: (id: string) => string;
})): Promise<ReadableStream>;
export declare function getBuildConfig(opts: {
    config: ResolvedConfig;
    entries: EntriesPrd;
}): Promise<Iterable<{
    pathname: string | import("../utils/path.js").PathSpec;
    isStatic?: boolean;
    entries?: Iterable<{
        input: string;
        skipPrefetch?: boolean;
        isStatic?: boolean;
    }>;
    customCode?: string;
    context?: unknown;
}>>;
export declare function getSsrConfig(opts: {
    config: ResolvedConfig;
    pathname: string;
    searchParams: URLSearchParams;
} & ({
    isDev: false;
    entries: EntriesPrd;
} | {
    isDev: true;
    entries: EntriesDev;
    resolveClientEntry: (id: string) => string;
})): Promise<{
    body: any;
    input: string;
    searchParams?: URLSearchParams;
} | null>;

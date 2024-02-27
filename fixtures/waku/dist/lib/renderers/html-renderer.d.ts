import type { EntriesPrd } from '../../server.js';
import type { ResolvedConfig } from '../config.js';
import type { CLIENT_MODULE_KEY } from '../handlers/handler-dev.js';
export declare const renderHtml: (opts: {
    config: ResolvedConfig;
    pathname: string;
    searchParams: URLSearchParams;
    htmlHead: string;
    renderRscForHtml: (input: string, searchParams: URLSearchParams) => Promise<ReadableStream>;
    getSsrConfigForHtml: (pathname: string, searchParams: URLSearchParams) => Promise<{
        input: string;
        searchParams?: URLSearchParams;
        body: ReadableStream;
    } | null>;
    loadClientModule: (key: CLIENT_MODULE_KEY) => Promise<unknown>;
} & ({
    isDev: false;
    loadModule: EntriesPrd['loadModule'];
} | {
    isDev: true;
    rootDir: string;
    loadServerFile: (fileURL: string) => Promise<unknown>;
})) => Promise<ReadableStream | null>;

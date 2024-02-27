import type { ReactNode } from 'react';
import type { PathSpec } from './lib/utils/path.js';
type Elements = Record<string, ReactNode>;
export interface RenderContext<T = unknown> {
    rerender: (input: string, searchParams?: URLSearchParams) => void;
    context: T;
}
export type RenderEntries = (this: RenderContext, input: string, searchParams: URLSearchParams) => Promise<Elements | null>;
export type GetBuildConfig = (unstable_collectClientModules: (input: string) => Promise<string[]>) => Promise<Iterable<{
    pathname: string | PathSpec;
    isStatic?: boolean;
    entries?: Iterable<{
        input: string;
        skipPrefetch?: boolean;
        isStatic?: boolean;
    }>;
    customCode?: string;
    context?: unknown;
}>>;
export type GetSsrConfig = (pathname: string, options: {
    searchParams: URLSearchParams;
}) => Promise<{
    input: string;
    searchParams?: URLSearchParams;
    body: ReactNode;
} | null>;
export declare function defineEntries(renderEntries: RenderEntries, getBuildConfig?: GetBuildConfig, getSsrConfig?: GetSsrConfig): {
    renderEntries: RenderEntries;
    getBuildConfig: GetBuildConfig | undefined;
    getSsrConfig: GetSsrConfig | undefined;
};
export type EntriesDev = {
    default: ReturnType<typeof defineEntries>;
};
export type EntriesPrd = EntriesDev & {
    loadModule: (id: string) => Promise<unknown>;
    dynamicHtmlPaths: [pathSpec: PathSpec, htmlHead: string][];
};
export declare function getEnv(key: string): string | undefined;
export {};

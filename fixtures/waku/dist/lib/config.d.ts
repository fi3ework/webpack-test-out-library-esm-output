import type { Config } from '../config.js';
type DeepRequired<T> = T extends (...args: any[]) => any ? T : T extends object ? {
    [P in keyof T]-?: DeepRequired<T[P]>;
} : T;
export type ResolvedConfig = DeepRequired<Config>;
export declare function resolveConfig(config: Config): Promise<{
    basePath: string;
    srcDir: string;
    distDir: string;
    publicDir: string;
    assetsDir: string;
    ssrDir: string;
    indexHtml: string;
    mainJs: string;
    entriesJs: string;
    serveJs: string;
    rscPath: string;
    htmlHead: string;
}>;
export {};

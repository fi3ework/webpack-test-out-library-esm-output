import type { Plugin } from 'vite';
export declare function rscIndexPlugin(config: {
    basePath: string;
    srcDir: string;
    mainJs: string;
    htmlHead: string;
    indexHtml: string;
    cssAssets?: string[];
}): Plugin;

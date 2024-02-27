import type { Plugin } from 'vite';
export declare function rscServePlugin(opts: {
    serveJs: string;
    distDir: string;
    publicDir: string;
    indexHtml: string;
    entriesFile: string;
    srcServeFile: string;
    ssr: boolean;
    serve: 'vercel' | 'cloudflare' | 'deno' | 'netlify' | 'aws-lambda';
}): Plugin;

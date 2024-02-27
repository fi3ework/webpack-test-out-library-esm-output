import type { Plugin } from 'vite';
export declare function rscTransformPlugin(opts: {
    isBuild: false;
} | {
    isBuild: true;
    assetsDir: string;
    wakuClientId: string;
    wakuClientPath: string;
    clientEntryFiles: Record<string, string>;
    serverEntryFiles: Record<string, string>;
}): Plugin;

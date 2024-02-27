import type { Plugin } from 'vite';
export declare function rscEnvPlugin({ config, hydrate, }: {
    config?: {
        basePath: string;
        rscPath: string;
    };
    hydrate?: boolean | undefined;
}): Plugin;

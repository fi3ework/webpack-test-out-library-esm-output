import type { Config } from '../../config.js';
export declare function build(options: {
    config?: Config;
    ssr?: boolean;
    env?: Record<string, string>;
    deploy?: 'vercel-static' | 'vercel-serverless' | 'cloudflare' | 'deno' | 'netlify-static' | 'netlify-functions' | 'aws-lambda' | undefined;
}): Promise<void>;

import type { ResolvedConfig } from '../config.js';
export declare const emitVercelOutput: (rootDir: string, config: ResolvedConfig, type: 'static' | 'serverless') => Promise<void>;

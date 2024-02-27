import type { ResolvedConfig } from '../config.js';
export declare const emitNetlifyOutput: (rootDir: string, config: ResolvedConfig, type: 'static' | 'functions') => Promise<void>;

/// <reference types="node" resolution-mode="require"/>
import type { Worker as WorkerType } from 'node:worker_threads';
import type { ResolvedConfig } from '../config.js';
import type { HotUpdatePayload } from '../plugins/vite-plugin-rsc-hmr.js';
export type RenderRequest = {
    input: string;
    searchParamsString: string;
    method: 'GET' | 'POST';
    contentType: string | undefined;
    config: ResolvedConfig;
    context: unknown;
    stream?: ReadableStream | undefined;
    moduleIdCallback?: (id: string) => void;
};
export type BuildOutput = {
    rscFiles: string[];
    htmlFiles: string[];
};
export type MessageReq = ({
    id: number;
    type: 'render';
    hasModuleIdCallback: boolean;
} & Omit<RenderRequest, 'moduleIdCallback'>) | {
    id: number;
    type: 'getSsrConfig';
    config: ResolvedConfig;
    pathname: string;
    searchParamsString: string;
};
export type MessageRes = {
    type: 'hot-update';
    payload: HotUpdatePayload;
} | {
    id: number;
    type: 'start';
    context: unknown;
    stream: ReadableStream;
} | {
    id: number;
    type: 'err';
    err: unknown;
    statusCode?: number;
} | {
    id: number;
    type: 'moduleId';
    moduleId: string;
} | {
    id: number;
    type: 'ssrConfig';
    input: string;
    searchParamsString?: string | undefined;
    body: ReadableStream;
} | {
    id: number;
    type: 'noSsrConfig';
};
export declare function initializeWorker(config: ResolvedConfig): void;
export declare function registerHotUpdateCallback(fn: (payload: HotUpdatePayload) => void): Promise<() => WorkerType>;
export declare function renderRscWithWorker<Context>(rr: RenderRequest): Promise<readonly [ReadableStream, Context]>;
export declare function getSsrConfigWithWorker(config: ResolvedConfig, pathname: string, searchParams: URLSearchParams): Promise<{
    input: string;
    searchParams?: URLSearchParams;
    body: ReadableStream;
} | null>;

import type { Env, Input } from 'hono';
import { createHandler } from '../handlers/handler-prd.js';
export declare function honoMiddleware<E extends Env = never, P extends string = string, I extends Input = Record<string, never>>(...args: Parameters<typeof createHandler>): import("hono").MiddlewareHandler<E, P, I>;
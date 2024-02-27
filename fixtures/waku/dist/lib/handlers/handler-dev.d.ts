import type { Config } from '../../config.js';
import type { BaseReq, BaseRes, Handler } from './types.js';
export declare const CLIENT_MODULE_MAP: {
    react: string;
    'rd-server': string;
    'rsdw-client': string;
    'waku-client': string;
};
export type CLIENT_MODULE_KEY = keyof typeof CLIENT_MODULE_MAP;
export declare function createHandler<Context, Req extends BaseReq, Res extends BaseRes>(options: {
    config?: Config;
    ssr?: boolean;
    env?: Record<string, string>;
    unstable_prehook?: (req: Req, res: Res) => Context;
    unstable_posthook?: (req: Req, res: Res, ctx: Context) => void;
}): Handler<Req, Res>;

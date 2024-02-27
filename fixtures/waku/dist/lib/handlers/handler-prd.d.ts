import type { EntriesPrd } from '../../server.js';
import type { Config } from '../../config.js';
import type { BaseReq, BaseRes, Handler } from './types.js';
export declare const CLIENT_PREFIX = "client/";
export declare function createHandler<Context, Req extends BaseReq, Res extends BaseRes>(options: {
    config?: Config;
    ssr?: boolean;
    env?: Record<string, string>;
    unstable_prehook?: (req: Req, res: Res) => Context;
    unstable_posthook?: (req: Req, res: Res, ctx: Context) => void;
    loadEntries: () => Promise<EntriesPrd>;
}): Handler<Req, Res>;

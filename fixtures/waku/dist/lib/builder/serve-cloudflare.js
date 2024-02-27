import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
// @ts-expect-error no types
// eslint-disable-next-line import/no-unresolved
import manifest from '__STATIC_CONTENT_MANIFEST';
import { honoMiddleware } from '../middleware/hono-prd.js';
const ssr = !!import.meta.env.WAKU_BUILD_SSR;
const loadEntries = ()=>import(import.meta.env.WAKU_ENTRIES_FILE);
let serveWaku;
const app = new Hono();
app.use('*', serveStatic({
    root: './',
    manifest
}));
app.use('*', (c, next)=>serveWaku(c, next));
export default {
    async fetch (request, env, ctx) {
        if (!serveWaku) {
            serveWaku = honoMiddleware({
                loadEntries,
                ssr,
                env
            });
        }
        return app.fetch(request, env, ctx);
    }
};

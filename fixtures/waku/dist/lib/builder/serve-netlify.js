import { Hono } from 'hono';
import { honoMiddleware } from '../middleware/hono-prd.js';
const ssr = !!import.meta.env.WAKU_BUILD_SSR;
const loadEntries = ()=>import(import.meta.env.WAKU_ENTRIES_FILE);
const env = process.env;
const app = new Hono();
app.use('*', honoMiddleware({
    loadEntries,
    ssr,
    env
}));
export default (async (req, context)=>app.fetch(req, {
        context
    }));

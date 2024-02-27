import { honoWrapper } from './hono-utils.js';
import { createHandler } from '../handlers/handler-dev.js';
export function honoMiddleware(...args) {
    return honoWrapper(createHandler(...args));
}

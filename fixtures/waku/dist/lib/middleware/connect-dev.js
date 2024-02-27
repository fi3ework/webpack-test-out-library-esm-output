import { connectWrapper } from './connect-utils.js';
import { createHandler } from '../handlers/handler-dev.js';
export function connectMiddleware(...args) {
    return connectWrapper(createHandler(...args));
}
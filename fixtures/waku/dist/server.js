export function defineEntries(renderEntries, getBuildConfig, getSsrConfig) {
    return {
        renderEntries,
        getBuildConfig,
        getSsrConfig
    };
}
export function getEnv(key) {
    // HACK we may want to use a server-side context or something
    return globalThis.__WAKU_PRIVATE_ENV__[key];
}

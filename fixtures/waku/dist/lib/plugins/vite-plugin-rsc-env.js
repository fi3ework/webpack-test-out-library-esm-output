export function rscEnvPlugin({ config, hydrate }) {
    return {
        name: 'rsc-env-plugin',
        config (viteConfig) {
            viteConfig.define = {
                ...viteConfig.define,
                ...Object.fromEntries([
                    ...config ? [
                        [
                            'import.meta.env.WAKU_CONFIG_BASE_PATH',
                            JSON.stringify(config.basePath)
                        ],
                        [
                            'import.meta.env.WAKU_CONFIG_RSC_PATH',
                            JSON.stringify(config.rscPath)
                        ]
                    ] : [],
                    ...hydrate ? [
                        [
                            'import.meta.env.WAKU_HYDRATE',
                            JSON.stringify('true')
                        ]
                    ] : [],
                    ...Object.entries(globalThis.__WAKU_PRIVATE_ENV__).flatMap(([k, v])=>k.startsWith('WAKU_PUBLIC_') ? [
                            [
                                `import.meta.env.${k}`,
                                JSON.stringify(v)
                            ]
                        ] : []),
                    // Node style `process.env` for traditional compatibility
                    ...Object.entries(globalThis.__WAKU_PRIVATE_ENV__).flatMap(([k, v])=>k.startsWith('WAKU_PUBLIC_') ? [
                            [
                                `process.env.${k}`,
                                JSON.stringify(v)
                            ]
                        ] : [])
                ])
            };
        }
    };
}

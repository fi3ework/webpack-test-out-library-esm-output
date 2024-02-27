const DEFAULT_HTML_HEAD = `
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
`.trim();
// Keep async function for future extension
export async function resolveConfig(config) {
    const resolvedConfig = {
        basePath: '/',
        srcDir: 'src',
        distDir: 'dist',
        publicDir: 'public',
        assetsDir: 'assets',
        ssrDir: 'ssr',
        indexHtml: 'index.html',
        mainJs: 'main.tsx',
        entriesJs: 'entries.js',
        serveJs: 'serve.js',
        rscPath: 'RSC',
        htmlHead: DEFAULT_HTML_HEAD,
        ...config
    };
    return resolvedConfig;
}

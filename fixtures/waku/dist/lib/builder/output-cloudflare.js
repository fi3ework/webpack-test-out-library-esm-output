import path from 'node:path';
import { existsSync, writeFileSync } from 'node:fs';
// XXX this can be very limited. FIXME if anyone has better knowledge.
export const emitCloudflareOutput = async (rootDir, config)=>{
    const wranglerTomlFile = path.join(rootDir, 'wrangler.toml');
    if (!existsSync(wranglerTomlFile)) {
        writeFileSync(wranglerTomlFile, `
name = "waku-project"
main = "${config.distDir}/${config.serveJs}"
compatibility_date = "2023-12-06"

[site]
bucket = "./${config.distDir}/${config.publicDir}"
`);
    }
};

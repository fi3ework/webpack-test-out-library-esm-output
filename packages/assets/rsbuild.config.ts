import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  source: {
    entry: { esm: './src/index.js' },
  },
  output: {
    filenameHash: false,
    // TODO: easy to development at the moment
    minify: false,
    distPath: {
      js: './',
    },
    dataUriLimit: 0,
  },
  tools: {
    htmlPlugin: false,
    rspack: {
      output: {
        publicPath: false,
        module: true,
        iife: false,
        library: { type: 'modern-module' },
      },
      optimization: { concatenateModules: true },
      experiments: { outputModule: true },
    },
  },
})

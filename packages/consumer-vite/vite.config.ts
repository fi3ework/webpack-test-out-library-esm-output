import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    polyfillModulePreload: false,
    // minify: false,
    // do not add hash to output file
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
      },
    },
  },
})

import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  source: {
    entry: {
      //   index: './index.js',
      logo: './react-logo.png',
    },
  },
  output: {
    minify: false,
  },
})

const path = require('path')

/** @type {function(any, any): import("@rspack/core").Configuration[]} */
module.exports = (env, { testPath }) => [
  {
    mode: 'development',
    devtool: false,
    entry: {
      main: './index.js',
    },
    output: {
      module: true,
      chunkFormat: 'module',
      filename: '[name].mjs',
    },
    optimization: {
      concatenateModules: true,
      // minimize: true,
    },
    experiments: {
      outputModule: true,
    },
  },
]

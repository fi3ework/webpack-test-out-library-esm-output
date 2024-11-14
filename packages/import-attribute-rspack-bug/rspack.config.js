const path = require('path')
const fs = require('fs')
const {
  Compilation,
  sources: { RawSource },
} = require('@rspack/core')

/** @type {import("../../../../").Configuration} */
module.exports = {
  mode: 'production',
  output: {
    filename: 'bundle0.mjs',
    library: {
      type: 'module',
    },
  },
  target: ['web', 'es2020'],
  experiments: {
    outputModule: true,
  },
  optimization: { minimize: false },
  entry: './index.js',
  devtool: false,
  externals: {
    // './static-package.json': 'module ./static-package.json',
    // './static-package-str.json': 'module ./static-package-str.json',
    // './dynamic-package.json': 'import ./dynamic-package.json',
    // './dynamic-package-str.json': 'import ./dynamic-package-str.json',
    // './eager.json': 'import ./eager.json',
    // './weak.json': 'import ./weak.json',
    // './pkg.json': 'import ./pkg.json',
    './pkg': 'import ./pkg',
    // './re-export.json': 'module ./re-export.json',
    // './re-export-directly.json': 'module ./re-export-directly.json',
  },
}

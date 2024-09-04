/** @type {import("@rspack/core").Configuration} */
module.exports = {
  devtool: false,
  entry: {
    main: './main.js',
  },
  output: {
    filename: `[name].js`,
    chunkFilename: `async.js`,
    module: true,
    libraryTarget: 'modern-module',
    iife: false,
    chunkFormat: 'module',
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
  },
  externals: {
    react: 'react-alias',
    vue: 'vue-alias',
    angular: 'angular-alias',
    svelte: 'svelte-alias',
    lit: 'lit-alias',
    solid: 'solid-alias',
  },
  externalsType: 'module-import',
  experiments: {
    outputModule: true,
  },
  optimization: {
    concatenateModules: true,
    minimize: false,
  },
}

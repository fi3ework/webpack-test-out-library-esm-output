const path = require('path')
const moduleRoot = path.resolve(process.cwd())

class EntryChunkPlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tap('111', (compilation) => {
      const contextDep = compilation.contextDependencies
      contextDep.add(
        '/Users/bytedance/Projects/webpack-test-out-library-esm-output/packages/context-dependency/to'
      )
    })
  }
}

/** @type {import("@rspack/core").Configuration} */
module.exports = {
  mode: 'production',
  plugins: [new EntryChunkPlugin()],
  devtool: false,
  entry: {
    main: './main.js',
  },
  output: {
    module: true,
    // filename: `[name].mjs`,
    iife: true,
    chunkFormat: 'module',
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
  },

  externals: {
    got: 'import got',
  },
  externalsType: 'import',
  experiments: {
    outputModule: true,
  },
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 0,
    //   maxInitialRequests: Number.POSITIVE_INFINITY,
    //   cacheGroups: {
    //     single: {
    //       priority: -9,
    //       test: /.*/,
    //       name: (module) => {
    //         const identifier = module?.userRequest

    //         return identifier
    //           ? path.relative(moduleRoot, identifier)
    //           : undefined
    //       },
    //     },
    //   },
    // },
    concatenateModules: false,
    minimize: false,
    // runtimeChunk: true,
  },
}

import * as path from 'path'
import * as webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

class DisableHarmonyPlugin {
  apply(compiler: webpack.Compiler) {
    const { RuntimeGlobals } = compiler.webpack

    compiler.hooks.compilation.tap('rslib', (compilation) => {
      compilation.hooks.runtimeRequirementInTree
        .for(RuntimeGlobals.definePropertyGetters)
        .tap('rslib', (chunk) => {
          // compilation.addRuntimeModule(
          //   chunk,
          //   LoadScriptRuntimeModule(
          //     compiler.webpack,
          //     compilation.outputOptions.environment &&
          //       compilation.outputOptions.environment.dynamicImport,
          //     this.weakRuntimeCheck,
          //     RuntimeGlobals.loadScript
          //   )
          // )
          return true
        })
    })
  }
}

export default {
  // plugins: [new DisableHarmonyPlugin()],
  mode: 'none',
  devtool: 'source-map',
  entry: {
    main: './src/index.ts',
  },
  module: {
    rules: [
      // ts-loader
      // {
      //   test: /\.ts$/,
      //   loader: 'ts-loader',
      //   options: {
      //     transpileOnly: false,
      //   },
      // },
      // swc-loader
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              // minify: true,
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
              },
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-dist.mjs',
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    // libraryTarget: 'modern-module',
    library: {
      type: 'modern-module',
    },
  },
  optimization: {
    concatenateModules: true,
    // concatenateModules: false,
    // mangleExports: false,
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        // minify: TerserPlugin.swcMinify,
        // `terserOptions` options will be passed to `swc` (`@swc/core`)
        // Link to options - https://swc.rs/docs/config-js-minify
        terserOptions: {
          compress: false,
          mangle: false,
          format: { comments: false },
        },
        // extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: {
    outputModule: true,
  },
}

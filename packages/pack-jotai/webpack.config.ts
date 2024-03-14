import * as path from 'path'
import * as webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
import { Compiler } from 'webpack'
import * as JavascriptModulesPlugin from 'webpack/lib/javascript/JavascriptModulesPlugin'

type ConcatSource = webpack.sources.ConcatSource
type Source = webpack.sources.Source
type CachedSource = webpack.sources.CachedSource

class BundlelessPlugin {
  apply(compiler: Compiler) {
    const { RuntimeGlobals } = compiler.webpack
    compiler.hooks.compilation.tap('rslib', function (compilation) {
      const {
        renderStartup,
        renderMain,
        renderChunk,
        renderModuleContent,
        renderRequire,
      } = JavascriptModulesPlugin.getCompilationHooks(compilation)

      renderMain.tap('rslib', (source: ConcatSource, renderContext) => {
        console.log('🧙‍♂️ renderMain')
        source.add('\n\n// rslib: custom export here\n')
        source.add('\n// rslib: renderMain\n')
        return source
      })

      renderStartup.tap('rslib', (source: ConcatSource, renderContext) => {
        console.log('🧙‍♂️ renderStartup')
        source.add('// rslib: renderStartup')
        return source
      })

      renderRequire.tap('rslib', (source: ConcatSource, renderContext) => {
        console.log('🧙‍♂️ renderRequire')
        const result = new webpack.sources.ConcatSource(source)
        result.add('\n// rslib: renderRequire\n')
        return result.source()
      })

      compilation.hooks.runtimeRequirementInTree
        .for(RuntimeGlobals.definePropertyGetters)
        .tap('rslib', (chunk) => {
          return true
        })
    })
  }
}

export default {
  plugins: [new BundlelessPlugin()],
  mode: 'none',
  devtool: 'source-map',
  externals: {
    react: 'module react',
  },
  entry: {
    main: '../../submodules/jotai/src/index.ts',
  },
  module: {
    rules: [
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
                // minify: {
                //   compress: false,
                //   mangle: false,
                // },
                // transform: {
                //   react: {
                //     runtime: 'automatic',
                //     development: isDev,
                //     refresh: isDev,
                //   },
                // },
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
    libraryTarget: 'module',
    library: {
      type: 'module',
    },
  },
  optimization: {
    concatenateModules: true,
    splitChunks: false,
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

import path from 'path'
import webpack from 'webpack'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PLUGIN_NAME = 'PreserveDynamicRequireWebpackPlugin'

class IgnoreDynamicRequire {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(
      'IgnoreDynamicRequire',
      (factory) => {
        factory.hooks.parser
          .for('javascript/auto')
          .tap('IgnoreDynamicRequire', (parser, options) => {
            parser.hooks.call
              .for('require')
              .tap('IgnoreDynamicRequire', (expression) => {
                // This is a SyncBailHook, so returning anything stops the parser, and nothing allows to continue
                if (
                  expression.arguments.length !== 1 ||
                  expression.arguments[0].type === 'Literal'
                ) {
                  return
                }
                const arg = parser.evaluateExpression(expression.arguments[0])
                if (!arg.isString() && !arg.isConditional()) {
                  return true
                }
              })
          })
      }
    )
  }
}

/**
 * @public
 */
export class PreserveDynamicRequireWebpackPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      function processDependencies(block) {
        const { dependencies } = block
        for (let i = dependencies.length - 1; i >= 0; i--) {
          const dep = dependencies[i]
          // Disable processing of dynamic require
          if (dep.constructor.name === 'CommonJsRequireContextDependency') {
            dependencies.splice(i, 1)
          }
        }

        for (const child of block.blocks) {
          processDependencies(child)
        }
      }

      compilation.hooks.succeedModule.tap(PLUGIN_NAME, (mod) => {
        processDependencies(mod)
      })
    })
  }
}

export default {
  target: ['node', 'es2020'],
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  plugins: [
    // new IgnoreDynamicRequire(),
    // new PreserveDynamicRequireWebpackPlugin(),
  ],
  // plugins: [new PreserveDynamicRequireWebpackPlugin()],
  // plugins: [
  //   new webpack.ContextReplacementPlugin(
  //     /\.\/locale/,
  //     new RegExp(`xasdfasdf.mjs$`)
  //   ),
  // ],
  // externals: [
  //   (data, callback) => {
  //     console.log('🧣', data.context, callback)
  //     if (
  //       data.context.startsWith(
  //         '/Users/bytedance/Projects/webpack-test-out-library-esm-output/packages/context-require/src/locales'
  //       )
  //     ) {
  //       return callback(null, 'commonjs ' + data.request)
  //     }
  //     //   return callback(null, 'commonjs fs')
  //     // }
  //     callback()
  //   },
  // ],
  module: {
    noParse: [/\.\/locales/],
    rules: [
      {
        test: /\js$/,
        parser: {
          // importMeta: false,
          // createRequire: false,
          // requireResolve: false,
          requireDynamic: false,
        },
        type: 'javascript/auto',
        exclude: [/node_modules/],
        loader: isRspack ? 'builtin:swc-loader' : 'swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
          env: {
            targets: ['chrome >= 107'],
          },
        },
      },
      // {
      //   test: /\.js$/,
      //   type: 'javascript/esm',
      //   exclude: [/node_modules/],
      //   loader: isRspack ? 'builtin:swc-loader' : 'swc-loader',
      //   options: {
      //     sourceMap: true,
      //     jsc: {
      //       parser: {
      //         syntax: 'typescript',
      //       },
      //     },
      //     env: {
      //       targets: ['chrome >= 107'],
      //     },
      //   },
      // },
    ],
  },
  output: {
    // environment: {
    //   dynamicImport: false,
    // },
    publicPath: '/',
    clean: true,
    // module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    // chunkFormat: 'module',
    // chunkFormat: 'commonjs',
    // chunkLoading: 'jsonp',
    // chunkLoading: 'import',
    library: {
      type: 'commonjs',
      // type: 'modern-module',
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    splitChunks: false,
    minimize: false,
    moduleIds: 'deterministic',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}

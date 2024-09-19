import path from 'path'
import webpack from 'webpack'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PLUGIN_NAME = 'PreserveDynamicRequireWebpackPlugin'

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
        // console.log('😓', mod)
        processDependencies(mod)
      })
    })
  }
}

export default {
  target: ['web', 'es2020'],
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.js',
  },
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
    // parser: {
    //   'javascript/auto': {
    //     wrappedContextRecursive: false,
    //   },
    //   javascript: {
    //     wrappedContextRecursive: false,
    //   },
    //   'javascript/dynamic': {
    //     wrappedContextRecursive: false,
    //   },
    //   'javascript/esm': {
    //     wrappedContextRecursive: false,
    //   },
    // },
    noParse: [/\.\/locales/],
    rules: [
      {
        test: /\.cjs$/,
        type: 'javascript/dynamic',
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
      {
        test: /\.js$/,
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
    ],
  },
  output: {
    publicPath: '/',
    clean: true,
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    // chunkFormat: 'module',
    // chunkFormat: 'commonjs',
    // chunkLoading: 'jsonp',
    // chunkLoading: 'import',
    library: {
      // type: 'commonjs',
      type: 'module',
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

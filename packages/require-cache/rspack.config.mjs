import path from 'path'
import webpack from 'webpack'
import rspack from '@rspack/core'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PLUGIN_NAME = 'PreserveDynamicRequireWebpackPlugin'

class EnvironmentPlugin {
  constructor(env) {
    this.env = env
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap(PLUGIN_NAME, (compilation) => {
      console.log('💇', compilation.options.plugins)
      // webpack.DefinePlugin.prototype.apply.call(this, compilation)
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
  plugins: [new EnvironmentPlugin()],
  //   new rspack.DefinePlugin({
  //     'require.cache': 'require.cache',
  //     '__webpack_require__.c': 'require.cache',
  //   }),
  // ],
  module: {
    rules: [
      {
        test: /js$/,
        parser: {
          // importMeta: false,
          // importDynamic: false,
          // requireResolve: false,
          // requireDynamic: false,
          requireAsExpression: false,
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
    ],
  },
  externals: {
    react: 'react',
    vue: 'vue',
    solid: 'solid',
  },
  output: {
    publicPath: '/',
    clean: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    library: {
      type: 'module',
      // type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    concatenateModules: true,
    splitChunks: false,
    minimize: false,
    moduleIds: 'named',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}

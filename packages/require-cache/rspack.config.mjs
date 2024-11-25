import path from 'path'
import webpack from 'webpack'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PLUGIN_NAME = 'PreserveDynamicRequireWebpackPlugin'

export default {
  target: ['node', 'es2020'],
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\js$/,
        parser: {
          requireResolve: false,
          requireDynamic: false,
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
      type: 'modern-module',
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

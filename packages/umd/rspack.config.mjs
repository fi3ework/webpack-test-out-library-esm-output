import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: 'node14',
  mode: 'production',
  devtool: false,
  entry: {
    index: './src/index.js',
  },
  optimization: {
    minimize: false,
  },
  externals: {
    external4: 'external444',
  },
  output: {
    uniqueName: 'false-iife-umd',
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    library: {
      type: 'umd',
    },
    iife: false,
  },
  module: {
    rules: [
      {
        test: /\s$/,
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
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: isRspack
    ? {
        // topLevelAwait: false,
        // outputModule: true,
        rspackFuture: {
          bundlerInfo: {
            force: false,
          },
        },
      }
    : {
        // outputModule: true,
      },
}

import rspack from '@rspack/core'
import webpack from 'webpack'
import { plugins } from '@swc/core'
import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'production',
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  plugins: [
    isRspack
      ? new rspack.DefinePlugin({
          'process.env.NODE_ENV': 'process.env.NODE_ENV',
        })
      : new webpack.DefinePlugin({
          'process.env.NODE_ENV': 'process.env.NODE_ENV',
        }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
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
  output: {
    clean: true,
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    library: {
      type: 'module',
    },
  },
  optimization: {
    concatenateModules: true,
    minimize: false,
    nodeEnv: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  experiments: isRspack
    ? {
        outputModule: true,
        rspackFuture: {
          bundlerInfo: {
            force: false,
          },
        },
      }
    : {
        outputModule: true,
      },
}

import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'none',
  target: 'node',
  devtool: false,
  entry: {
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
    publicPath: '/',
    clean: true,
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkFormat: 'module',
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    library: {
      type: 'module',
    },
  },
  optimization: {
    moduleIds: 'named',
    concatenateModules: true,
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: {
    outputModule: true,
  },
}

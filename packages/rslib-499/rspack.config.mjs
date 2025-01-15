import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: 'node20',
  mode: 'production',
  devtool: false,
  entry: {
    index: './src/index.js?__rslib_entry__',
  },
  externals: [],
  externalsType: 'module-import',
  module: {
    parser: {
      javascript: {
        url: false,
        requireResolve: false,
        requireDynamic: false,
        requireAsExpression: false,
        importMeta: false,
        importDynamic: false,
      },
    },
    rules: [
      {
        test: /js$/,
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
    assetModuleFilename: 'static/assets/[name][ext]',
    // publicPath: 'https://cdn.example.com/assets/',
    clean: true,
    // module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'require', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    library: {
      type: 'modern-module',
    },
  },
  optimization: {
    // concatenateModules: false,
    concatenateModules: true,
    minimize: false,
    splitChunks: {
      chunks: 'async',
    },
    moduleIds: 'named',
    chunkIds: 'named',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: isRspack
    ? {
        topLevelAwait: false,
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

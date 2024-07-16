import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'none',
  devtool: false,
  entry: {
    main: ['./src/index.ts'],
  },
  // target: ['es2016'],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        exclude: [/node_modules/],
        loader: isRspack ? 'builtin:swc-loader' : 'swc-loader',
        options: {
          jsc: {
            externalHelpers: true,
            parser: {
              tsx: false,
              syntax: 'typescript',
              decorators: true,
            },
            preserveAllComments: true,
            transform: {
              legacyDecorator: false,
              decoratorVersion: '2022-03',
            },
            target: 'es2021',
          },
          isModule: 'unknown',
        },
        type: 'javascript/auto',
      },
    ],
  },
  output: {
    clean: true,
    publicPath: '/',
    pathInfo: false,
    hashFunction: 'xxhash64',
    webassemblyModuleFilename: 'static/wasm/[hash].module.wasm',
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    library: {
      type: 'modern-module',
    },
  },
  optimization: {
    minimize: false,
    splitChunks: false,
    concatenateModules: true,
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

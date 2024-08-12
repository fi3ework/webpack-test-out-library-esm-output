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
    main: './src/index.mjs',
  },
  externalsType: 'commonjs',
  module: {
    parser: {
      javascript: {
        importMeta: false,
      },
    },
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
        exclude: [/node_modules/],
        loader: isRspack ? 'builtin:swc-loader' : 'swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
              topLevelAwait: true,
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
    // module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    library: {
      // type: 'umd',
      type: 'commonjs',
    },
  },
  optimization: {
    concatenateModules: true,
    // concatenateModules: false,
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mts'],
  },
  // node: {
  //   __dirname: 'node-module',
  //   __filename: 'node-module',
  // },
  experiments: isRspack
    ? {
        topLevelAwait: true,
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

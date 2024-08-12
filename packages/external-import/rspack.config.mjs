import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: 'node',
  node: {
    __dirname: 'node-module',
  },
  target: 'es2020',
  mode: 'none',
  devtool: false,
  entry: {
    // main: './src/extra.js',
    main: './src/index.mjs',
  },
  externals: {
    // path: 'path node-commonjs',
    react: 'react233',
    fs: 'fs233',
    'node:fs': 'node:fs233',
    'node-fs': 'fs233',
    // path: 'module path',
  },
  externalsType: 'module-import',
  // externalsType: 'node-commonjs',
  module: {
    parser: {
      javascript: {
        preserveImport: true,
      },
    },
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
    publicPath: 'https://cdn.example.com/assets/',
    clean: true,
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
    // concatenateModules: false,
    concatenateModules: true,
    minimize: false,
    moduleIds: 'named',
    chunkIds: 'named',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: isRspack
    ? {
        topLevelAwait: true,
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

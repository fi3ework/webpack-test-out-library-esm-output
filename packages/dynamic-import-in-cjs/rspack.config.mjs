import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: 'node14',
  mode: 'none',
  devtool: false,
  entry: {
    index: './src/index.js',
  },
  externals: {
    react: 'react233',
    vue: 'vue233',
    fs: 'fs',
    angular: 'angular233',
    solid: 'solid233',
  },
  externalsType: 'commonjs',
  module: {
    parser: {
      javascript: {
        // dynamicImportMode: 'raw',
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
    environment: {
      dynamicImport: true,
    },
    publicPath: 'https://cdn.example.com/assets/',
    clean: true,
    module: false,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    // chunkFormat: 'module',
    library: {
      type: 'commonjs',
      // type: 'modern-module',
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

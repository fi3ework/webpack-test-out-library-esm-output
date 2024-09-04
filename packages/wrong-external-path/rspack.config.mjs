import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: 'web',
  mode: 'none',
  devtool: false,
  entry: {
    index: './index.ts',
  },
  externals: [
    {
      react: 'react233',
      vue: 'vue233',
      fs: 'fs',
      angular: 'angular233',
      solid: 'solid233',
    },
  ],
  externalsPresets: {
    // node: true,
    web: true,
  },
  externalsType: 'module-import',
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
    publicPath: 'https://cdn.example.com/assets/',
    clean: true,
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    // chunkFormat: 'module',
    library: {
      type: 'module',
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

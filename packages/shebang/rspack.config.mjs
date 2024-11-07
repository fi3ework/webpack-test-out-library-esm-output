import path from 'path'
import { fileURLToPath } from 'url'
import { BannerPlugin } from '@rspack/core'
import { createRequire } from 'module'

const _require = createRequire(import.meta.url)
const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'none',
  plugins: [
    new BannerPlugin((...args) => {
      // console.log('💂‍♀️', args[0], args[0].chunk.files)
      return '// ok'
    }),
  ],
  devtool: false,
  entry: {
    main: { import: './src/index.ts', layer: 'shebang' },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        type: 'javascript/auto',
        use: [
          {
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
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        type: 'javascript/auto',
        issuer: (value) => {
          return false
          // console.log('🤒', value)
        },
        layer: 'shebang',
        use: [
          {
            loader: _require.resolve(
              path.resolve(__dirname, 'shebang-loader.js')
            ),
            options: {},
          },
          {
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
      type: 'modern-module',
      // type: 'module',
    },
  },
  optimization: {
    concatenateModules: true,
    minimize: false,
    moduleIds: 'named',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: {
    path: 'node-commonjs path',
  },
  experiments: isRspack
    ? {
        topLevelAwait: true,
        outputModule: true,
        layers: true,
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

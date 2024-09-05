import path from 'path'
import { fileURLToPath } from 'url'
import rspack from '@rspack/core'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)

export default {
  mode: 'none',
  target: 'node',
  plugins: [new RemoveEmptyScriptsPlugin(), new MiniCssExtractPlugin()],
  devtool: false,
  entry: {
    'my-style': './src/style.css',
    'my-js': './src/index.js',
  },
  externalsType: 'module',
  externals: {
    './style.css': './my-style.css',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
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
      // emit svg
      {
        test: /\.svg$/,
        type: 'asset',
        generator: {
          publicPath: 'assets_sub/',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 400,
          },
          // dataUrlCondition: (source, { filename, module }) => {
          //   if (filename.includes('big')) {
          //     return false
          //   }
          //   return true
          // },
        },
      },
      // inline svg
      // {
      //   test: /\.svg$/,
      //   type: 'asset/inline',
      // },
    ],
  },
  output: {
    publicPath: '/pub/',
    clean: true,
    module: true,
    filename: '[name].js',
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    library: {
      type: 'module',
      // type: 'modern-module',
    },
  },
  optimization: {
    splitChunks: false,
    concatenateModules: true,
    minimize: false,
    providedExports: true,
    usedExports: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__filename, '../src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: isRspack
    ? {
        // css: true,
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

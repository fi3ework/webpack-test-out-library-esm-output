import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)

export default {
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  externalsType: 'module',
  externals: [
    function ({ context, request }, callback) {
      if (/\.\/x/.test(request)) {
        console.log('🥵', context, request)
        return callback(null, 'module ' + request)
      }

      callback()
    },
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
      // emit svg
      {
        test: /\.svg$/,
        type: 'asset',
        generator: {
          publicPath: 'assets/',
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
    publicPath: '/',
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

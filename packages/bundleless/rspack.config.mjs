import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import fg from 'fast-glob'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)

const getEntries = (entryDir) => {
  const files = fg.sync('./src/**/*.js', {})
  const result = Object.fromEntries(
    files.map((file) => {
      const name = path.basename(file, '.js')
      return [name, file]
    })
  )

  return {
    'barrel-constants': ['./src/barrel-constants.js'],
    constants: ['./src/constants.js'],
    'some-cjs': ['./src/some-cjs.cjs'],
    lib: ['./src/lib.js'],
    'no-export': ['./src/no-export.js'],
    'cjs-export': ['./src/cjs-exports.js'],
  }
  return result
}

export default {
  mode: 'none',
  devtool: false,
  entry: getEntries(),
  externalsType: 'module',
  externals: [
    (data, callback) => {
      if (data.contextInfo.issuer) {
        // if (data.request.includes('data:text/javascript')) {
        //   return callback()
        // }
        return callback(null, data.request)
      }
      callback()
    },
  ],
  module: {
    rules: [
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
          {
            loader: path.resolve(__filename, '../my-loader.js'),
            options: {},
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
      type: 'modern-module',
      // type: 'module',
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

import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import fg from 'fast-glob'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)

class ImportAdderPlugin {
  constructor(options) {
    this.options = options || {}
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('ImportAdderPlugin', (compilation) => {
      compilation.hooks.succeedModule.tap('ImportAdderPlugin', (module) => {
        compilation.processModuleDependencies(module, (cb) => {
          console.log('🦷', module)
        })
        // console.log('🔥')
        // module.useSourceMap = true
      })
    })

    // compiler.hooks.normalModuleFactory.tap(
    //   'ImportAdderPlugin',
    //   (normalModuleFactory) => {
    //     normalModuleFactory.hooks.parser
    //       .for('javascript/auto')
    //       .tap('ImportAdderPlugin', (parser) => {
    //         parser.hooks.import.tap(
    //           'ImportAdderPlugin',
    //           (statement, source) => {
    //             // if (parser.state.module.resource === this.options.targetModule) {
    //             // const importStatement = `import '${this.options.importPath}';`
    //             console.log('💏', statement)
    //             // parser.state.source = importStatement + '\n' + parser.state.source
    //             // }
    //           }
    //         )
    //       })
    //   }
    // )
  }
}

const getEntries = (entryDir) => {
  const files = fg.sync('./src/**/*.js', {})
  const result = Object.fromEntries(
    files.map((file) => {
      const name = path.basename(file, '.js')
      return [name, file]
    })
  )

  console.log('😡', result, path.resolve(__filename, '../my-loader.js'))

  return {
    'barrel-constants': './src/barrel-constants.js',
    constants: './src/constants.js',
    // empty: './src/empty.js',
    lib: './src/lib.js',
  }
  return result
}

export default {
  plugins: [
    new ImportAdderPlugin({
      importPath: './empty.js',
    }),
  ],
  mode: 'none',
  devtool: false,
  entry: getEntries(),
  externalsType: 'module',
  externals: [
    (data, callback) => {
      if (data.contextInfo.issuer) {
        if (data.request.includes('data:text/javascript')) {
          return callback()
        }
        return callback(null, 'module ' + data.request)
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
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    library: {
      type: 'modern-module',
      // type: 'modern-module',
    },
  },
  optimization: {
    splitChunks: false,
    concatenateModules: true,
    minimize: false,
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

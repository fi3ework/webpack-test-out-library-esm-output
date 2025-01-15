import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class TaroSingleEntryPlugin {
  constructor(context, entry, name, miniType, options = {}) {
    this.context = context
    this.entry = entry
    this.name = name
    this.miniType = miniType
    this.options = options
  }

  apply(compiler) {
    // compiler.hooks.compilation.tap(
    //   'TaroSingleEntryDependency',
    //   (compilation, { normalModuleFactory }) => {
    //     compilation.dependencyFactories.set(
    //       TaroSingleEntryDependency,
    //       normalModuleFactory
    //     )
    //   }
    // )

    compiler.hooks.make.tapAsync(
      'SingleEntryPlugin',
      (compilation, callback) => {
        const { entry, name, context, miniType, options } = this

        // const dep = TaroSingleEntryPlugin.createDependency(
        //   entry,
        //   name,
        //   miniType,
        //   options
        // )

        console.log('💇', compilation)
        // compilation.addEntry(context, dep, name, callback)
      }
    )
  }

  // static createDependency(entry, name, miniType, options) {
  //   return new TaroSingleEntryDependency(
  //     entry,
  //     name,
  //     { name },
  //     miniType,
  //     options
  //   )
  // }
}

let count = 0

export default {
  // plugins: [new TaroSingleEntryPlugin()],
  mode: 'none',
  devtool: false,
  entry: (...args) => {
    if (count > 0) {
      console.log('😤', count)
      return {
        main: './src/index.js',
        foo: './src/foo.js',
      }
    }

    count++
    return {
      main: './src/index.js',
    }
  },
  externals: [
    /.*hook.*/,
    {
      './hook': './hook',
      '../hook': '../hook',
    },
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
        // type: 'javascript/auto',
        type: 'javascript/auto',
      },
    ],
  },
  output: {
    clean: true,
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    // chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    // chunkFormat: 'module',
    // library: {
    //   type: 'modern-module',
    // },
  },
  optimization: {
    avoidEntryIife: true,
    concatenateModules: true,
    minimize: false,
  },
  // resolve: {
  //   extensions: ['.ts', '.tsx', '.js'],
  // },
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

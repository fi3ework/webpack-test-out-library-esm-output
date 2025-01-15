import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  externals: [
    async ({ request, contextInfo, getResolve, context }, callback) => {
      if (!request || !contextInfo.issuer) {
        return callback()
      }

      if (request.startsWith('@src')) {
        console.log('🧐', request)
        const resolve = getResolve()
        const result = await resolve(context, request)
        console.log('🥰1', result)
      }

      return callback()
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

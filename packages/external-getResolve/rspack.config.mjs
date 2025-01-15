// import { Configuration, ExternalItem } from '@rspack/core'
import // Configuration as WebpackConfiguration,
// Externals,
// ExternalItem as WebpackExternalItem,
'webpack'
import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let resolve = undefined

// const f: Externals = async (data) => {
//   const { context, request, contextInfo, getResolve } = data
//   console.log('👱‍♀️', context, request, contextInfo, getResolve)
//   console.log('🎩', request)

//   // let resolve = getResolve()
//   if (!resolve) {
//     resolve = getResolve()
//   }

//   const realReact = getResolve('react')
//   const resolved = await resolve(context, request)
//   console.log('🟢', resolved, realReact)
//   if (request === 'react') {
//     // return callback(null, 'react233')
//     return 'react233'
//   }

//   // if (/^yourregex$/.test(request)) {
//   //   return callback(null, 'commonjs ' + request)
//   // }

//   // Continue without externalizing the import
//   // callback()
// }

const x = {
  target: 'node20',
  mode: 'production',
  devtool: false,
  entry: {
    index: './src/index.js',
  },
  externals: [
    // {
    //   react: 'react233',
    // },
    async (data, callback) => {
      const { context, request, contextInfo, getResolve } = data
      console.log('👱‍♀️', context, request, contextInfo, getResolve)
      console.log('🎩', request)

      // let resolve = getResolve()
      if (!resolve) {
        resolve = getResolve()
      }

      const resolved = await resolve(context, request)
      console.log('🟢', resolved)
      if (request === 'react') {
        // return callback(null, 'react233')
        return 'react233'
      }

      // if (/^yourregex$/.test(request)) {
      //   return callback(null, 'commonjs ' + request)
      // }

      // Continue without externalizing the import
      // callback()
    },
  ],
  externalsType: 'module-import',
  module: {
    rules: [
      {
        test: /\s$/,
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
    // publicPath: 'https://cdn.example.com/assets/',
    clean: true,
    // module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    // chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    // chunkFormat: 'module',
    library: {
      type: 'system',
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
        // topLevelAwait: false,
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

export default x

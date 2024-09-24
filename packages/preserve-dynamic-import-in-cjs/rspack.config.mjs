import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: ['node20', 'es2020'],
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.mjs',
  },
  externalsType: 'commonjs',
  externals: {
    react: 'react233',
    vue: 'vue233',
  },
  // externals: [
  //   {
  //     react: 'react233',
  //   },
  //   (data, callback) => {
  //     const { request, dependencyType, contextInfo } = data
  //     console.log('✊', data)

  //     if (data.type2 === 'import()') {
  //       return callback(null, `import vue233`)
  //     }

  //     callback()
  //   },
  // ],
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
    ],
  },
  output: {
    publicPath: '/',
    clean: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    // chunkFormat: 'commonjs',
    // chunkLoading: 'jsonp',
    chunkLoading: 'import',
    library: {
      type: 'commonjs',
    },
  },
  optimization: {
    concatenateModules: true,
    splitChunks: false,
    minimize: false,
    moduleIds: 'deterministic',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}

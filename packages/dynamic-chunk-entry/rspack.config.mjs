import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: ['node', 'es2020'],
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.mjs',
  },
  externals: [
    {
      AAA: 'A',
    },
  ],
  externalsType: 'module-import',
  module: {
    // parser: {
    //   javascript: {
    //     dynamicImportMode: 'eager',
    //   },
    //   'javascript/auto': {
    //     dynamicImportMode: 'eager',
    //   },
    //   'javascript/dynamic': {
    //     dynamicImportMode: 'eager',
    //   },
    //   'javascript/esm': {
    //     dynamicImportMode: 'eager',
    //   },
    // },
    rules: [
      // {
      //   test: /\.ts$/,
      //   // exclude: [/node_modules/],
      //   loader: isRspack ? 'builtin:swc-loader' : 'swc-loader',
      //   options: {
      //     sourceMap: true,
      //     jsc: {
      //       parser: {
      //         syntax: 'typescript',
      //       },
      //     },
      //     env: {
      //       targets: ['chrome >= 107'],
      //     },
      //   },
      //   // type: 'javascript/auto',
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
    chunkFormat: 'module',
    chunkLoading: 'import',
    library: {
      // type: 'module',
      type: 'modern-module',
    },
  },
  optimization: {
    concatenateModules: true,
    splitChunks: false,
    minimize: false,
    moduleIds: 'named',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: {
    topLevelAwait: false,
    outputModule: true,
  },
}

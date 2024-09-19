import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: [
    'browserslist:Chrome >= 91.0.0',
    'browserslist:Edge >= 94.0.0',
    'browserslist:Firefox >= 93.0.0',
    'browserslist:iOS >= 16.4.0',
    'browserslist:Node >= 16.11.0',
    'browserslist:Opera >= 80.0.0',
    'browserslist:Safari >= 16.4.0',
  ],
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.mjs',
  },
  externals: {
    react: 'module react233',
    svelte: 'module svelte233',
    vue: 'import vue233',
  },
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
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkFormat: 'module',
    wasmLoading: 'fetch',
    // chunkFormat: 'commonjs',
    // chunkLoading: 'jsonp',
    chunkLoading: 'import',
    library: {
      type: 'modern-module',
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
  experiments: {
    outputModule: true,
  },
}

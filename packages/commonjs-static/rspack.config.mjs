import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'production',
  target: ['node', 'es2020'],
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  externals: [
    {
      './foo.js': './foo.js',
      react: 'react233',
      vue: 'vue233',
      lodash: 'lodash',
      jquery: 'jquery',
    },
  ],
  output: {
    publicPath: '/',
    clean: true,
    module: false,
    iife: false,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    // chunkFormat: 'module',
    // chunkLoading: 'import',
    library: {
      type: 'commonjs-static',
      // type: 'commonjs',
    },
  },
  optimization: {
    concatenateModules: false,
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

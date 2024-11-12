import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: ['node', 'es2020'],
  devtool: false,
  entry: {
    main: './src/index.mjs',
  },
  externals: [
    {
      react: 'react233',
      vue: 'vue233',
      lodash: 'lodash233',
      jquery: 'jquery',
    },
  ],
  externalsType: 'module-import',
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

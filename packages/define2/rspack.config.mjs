import rspack from '@rspack/core'
import webpack from 'webpack'
import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  optimization: {
    nodeEnv: 'development',
  },
  plugins: [
    isRspack
      ? new rspack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      : new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
  ],
}

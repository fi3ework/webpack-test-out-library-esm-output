import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const isRspack = process.argv[1].split('/').pop().includes('rspack')

export default {
  mode: 'none',
  devtool: false,
  entry: {
    myLib: ['./iife-cjs/index.cjs'],
  },
  module: {
    parser: {
      javascript: {
        strict: true,
      },
    },
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(
      __filename,
      `../${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    clean: true,
    iife: false,
    chunkFormat: 'module',
    module: true,
    library: {
      type: 'module',
    },
  },
  target: 'es2022',
  optimization: {
    minimize: false,
    concatenateModules: true,
    splitChunks: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: {
    outputModule: true,
  },
  stats: {
    optimizationBailout: true,
  },
}

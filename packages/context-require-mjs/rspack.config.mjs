import path from 'path'
import webpack from 'webpack'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: ['web', 'es2022'],
  mode: 'none',
  // mode: 'production',
  devtool: false,
  entry: {
    main: './src/index.mjs',
  },
  module: {
    parser: {
      javascript: {
        requireResolve: false,
        // requireDynamic: false,
        requireAsExpression: false,
        // importDynamic: false,
      },
    },
    rules: [
      {
        test: /\m?js$/,
        type: 'javascript/auto',
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
      },
    ],
  },
  output: {
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    publicPath: '/',
    clean: true,
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    // chunkFormat: 'module',
    // chunkFormat: 'commonjs',
    // chunkLoading: 'jsonp',
    // chunkLoading: 'import',
    library: {
      // type: 'commonjs',
      type: 'modern-module',
    },
  },
  experiments: {
    outputModule: true,
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

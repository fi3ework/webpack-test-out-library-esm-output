import path from 'path'
import { defineConfig } from '@rspack/cli'
import rspack from '@rspack/core'

export default defineConfig({
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: '../../submodules/redux/src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rspack-dist.mjs',
    libraryTarget: 'module',
    library: {
      type: 'module',
    },
  },
  optimization: {
    concatenateModules: true,
    minimize: false,
    // minimizer: [
    //   new rspack.SwcJsMinimizerRspackPlugin({
    //     compress: false,
    //     mangle: false,
    //     format: { comments: false },
    //   }),
    // ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: {
    outputModule: true,
  },
})

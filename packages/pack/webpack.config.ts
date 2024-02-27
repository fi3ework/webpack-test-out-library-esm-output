import path from 'path'
import webpack from 'webpack'

export default {
  mode: 'none',
  devtool: 'source-map',
  entry: {
    main: '../../submodules/redux/src/index.ts',
  },
  module: {
    rules: [
      // Use esbuild to compile JavaScript & TypeScript
      {
        // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          // JavaScript version to compile to
          target: 'es2015',
          tsconfig: '../../submodules/redux/tsconfig.json',
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'webpack-dist.mjs',
    libraryTarget: 'module',
    library: {
      type: 'module',
    },
  },
  optimization: {
    concatenateModules: true,
    minimize: false,
    mangleExports: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: {
    outputModule: true,
  },
}

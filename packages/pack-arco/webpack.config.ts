import path from 'path'
import webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

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
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              // minify: true,
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                // minify: {
                //   compress: false,
                //   mangle: false,
                // },
                // transform: {
                //   react: {
                //     runtime: 'automatic',
                //     development: isDev,
                //     refresh: isDev,
                //   },
                // },
              },
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-dist.mjs',
    libraryTarget: 'module',
    library: {
      type: 'module',
    },
  },
  optimization: {
    concatenateModules: true,
    // mangleExports: false,
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        // minify: TerserPlugin.swcMinify,
        // `terserOptions` options will be passed to `swc` (`@swc/core`)
        // Link to options - https://swc.rs/docs/config-js-minify
        terserOptions: {
          compress: false,
          mangle: false,
          format: { comments: false },
        },
        // extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: {
    outputModule: true,
  },
}

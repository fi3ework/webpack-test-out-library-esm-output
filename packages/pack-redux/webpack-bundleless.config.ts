import path from 'path'
import webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
import fg from 'fast-glob'

export default async () => {
  const entries = await fg(['**/*.ts'], {
    cwd: path.resolve(__dirname, '../../submodules/redux/src'),
  })

  const webpackEntry = entries.reduce((acc, entry) => {
    return {
      [entry]: path.resolve(__dirname, '../../submodules/redux/src/' + entry),
      ...acc,
    }
  }, {})

  return {
    mode: 'none',
    // devtool: 'source-map',
    // context: path.resolve(__dirname, '../../submodules/redux'),
    entry: webpackEntry,
    // entry: [
    //   path.resolve(
    //     __dirname,
    //     '../../submodules/redux/src/bindActionCreators.ts'
    //   ),
    // ],
    externals: [
      // @ts-ignore
      ({ context, request }, callback) => {
        if (request.startsWith('.')) {
          // Externalize to a commonjs module using the request path
          return callback(null, 'module ' + request)
        }

        // Continue without externalizing the import
        callback()
      },
    ],
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
      path: path.resolve(__dirname, 'dist/bundleless-webpack'),
      // chunkFilename: 'chunks/[name].[chunkhash].js',
      // @ts-ignore
      filename: (pathData) => {
        const fileName = pathData.chunk.name
        return `${fileName.replace(/\.ts$/, '')}.js`
        // return `[name].mjs`
      },
      libraryTarget: 'module',
      library: {
        type: 'module',
      },
    },
    optimization: {
      concatenateModules: true,
      mangleExports: false,
      // minimize: true,
      // minimizer: [
      //   new TerserPlugin({
      //     // minify: TerserPlugin.swcMinify,
      //     // `terserOptions` options will be passed to `swc` (`@swc/core`)
      //     // Link to options - https://swc.rs/docs/config-js-minify
      //     terserOptions: {
      //       compress: false,
      //       mangle: false,
      //       format: { comments: false },
      //     },
      //     // extractComments: false,
      //   }),
      // ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    experiments: {
      outputModule: true,
    },
  }
}

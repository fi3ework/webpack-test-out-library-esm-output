import path from 'path'
import webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
import fg from 'fast-glob'

// https://github.com/webpack/webpack/issues/15189
class DisableHarmonyPlugin {
  // @ts-ignore
  apply(compiler) {
    compiler.hooks.compilation.tap(
      'DisableHarmonyPlugin',
      // @ts-ignore
      (compilation, { normalModuleFactory }) => {
        // @ts-ignore
        const handler = (parser, parserOptions) => {
          parserOptions.harmony = false
        }

        normalModuleFactory.hooks.parser
          .for('javascript/auto')
          .tap('HarmonyModulesPlugin', handler)
        normalModuleFactory.hooks.parser
          .for('javascript/esm')
          .tap('HarmonyModulesPlugin', handler)
      }
    )
  }
}

export default async () => {
  const entries = (
    await fg(
      ['./components/**/*.ts', './components/**/*.tsx', 'hooks/**/*.ts'],
      {
        cwd: path.resolve(__dirname, '../../submodules/arco-design'),
      }
    )
  ).filter((item) => !item.includes('__test__'))

  const webpackEntry = entries.reduce((acc, entry) => {
    return {
      [entry]: path.resolve(__dirname, '../../submodules/arco-design', entry),
      ...acc,
    }
  }, {})

  return {
    // plugins: [new DisableHarmonyPlugin()],
    mode: 'none',
    // devtool: 'source-map',
    // context: path.resolve(__dirname, '../../submodules/arco-design'),
    entry: webpackEntry,
    externals: [
      // @ts-ignore
      ({ context, request }, callback) => {
        // relative imports
        if (request.startsWith('.')) {
          return callback(null, ['module ' + request])
        }

        // bare imports
        if (/^[^./].*/.test(request)) {
          return callback(null, ['module ' + request])
        }

        return callback()
      },
    ],
    module: {
      rules: [
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
      clean: true,
      path: path.resolve(__dirname, 'dist/bundleless-webpack'),
      // @ts-ignore
      filename: (pathData) => {
        const fileName = pathData.chunk.name
        return `${fileName.replace(/\.ts[x]$/, '')}.js`
      },
      libraryTarget: 'module',
      library: {
        type: 'module',
      },
    },
    optimization: {
      concatenateModules: false,
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

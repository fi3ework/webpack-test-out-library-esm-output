import * as path from 'path'
import * as webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const { ConcatSource, CachedSource } = require('webpack-sources')
import * as fg from 'fast-glob'
import { Compiler } from 'webpack'
import * as JavascriptModulesPlugin from 'webpack/lib/javascript/JavascriptModulesPlugin'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { OriginalSource, RawSource } = require('webpack-sources')
const Module = require('webpack/lib/Module')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

type ConcatSource = webpack.sources.ConcatSource
type Source = webpack.sources.Source
type CachedSource = webpack.sources.CachedSource

class DisableHarmonyPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      'DisableHarmonyPlugin',
      (compilation, { normalModuleFactory }) => {
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

class MySimpleModule extends Module {
  constructor(request) {
    super('javascript/auto', null)
    this.request = request
    this.buildInfo = {}
    this.buildMeta = {}
  }

  identifier() {
    return './asdfasdf'
  }

  size(type) {
    return 42
  }

  // updateHash(hash, chunkGraph) {
  //   super.updateHash(hash)
  // }

  readableIdentifier(requestShortener) {
    return './asdfasd2222f'
  }

  build(options, compilation, resolver, fs, callback) {
    callback()
  }

  // needBuild(context, callback) {
  //   return callback(null, true)
  // }

  getSourceTypes() {
    return new Set(['javascript'])
  }

  codeGeneration({
    runtimeTemplate,
    moduleGraph,
    chunkGraph,
    runtime,
    concatenationScope,
  }) {
    const sources = new Map()
    sources.set('javascript', new RawSource('// fuck'))
    return { sources, runtimeRequirements: new Set([]) }
  }
}

class ExternalModuleFactoryPlugin {
  apply(normalModuleFactory) {
    normalModuleFactory.hooks.factorize.tapAsync(
      'ExternalModuleFactoryPlugin111',
      (data, callback) => {
        // callback()
        if (data.request.includes('constants')) {
          return callback(null, new MySimpleModule('./constant'))
        } else {
          return callback()
        }
      }
    )
  }
}

class BundlelessPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compile.tap(
      'RslibExternalPlugin',
      ({ normalModuleFactory }) => {
        new ExternalModuleFactoryPlugin().apply(normalModuleFactory)
      }
    )
  }
}

export default async () => {
  const entries = await fg(['**/*.js'], {
    cwd: './src',
  })

  const webpackEntry = entries.reduce((acc, entry) => {
    return {
      'component.js': './component.js',
      ...acc,
      [entry]: './' + entry,
      'style.css': './style.css',
      'theme.less': './theme.less',
    }
  }, {})

  console.log('👾', webpackEntry)

  return {
    plugins: [
      new RemoveEmptyScriptsPlugin(),
      // new webpack.BannerPlugin('// This file is created by rslib'),
      // new webpack.DefinePlugin({
      //   // 'import.meta.url': `import.meta.url`,
      // }),
      // new BundlelessPlugin(),
      //  new DisableHarmonyPlugin()
      new MiniCssExtractPlugin(),
    ],
    mode: 'none',
    // mode: 'production',
    // mode: 'development',
    node: {
      __dirname: 'node-module',
    },
    context: path.resolve(__dirname, './src'),
    entry: webpackEntry,
    externals: [
      // @ts-ignore
      async ({ context, request, contextInfo, getResolve }) => {
        // console.log('🐷', request, myPath)

        if (
          // request.startsWith('.') &&
          contextInfo.issuer &&
          !request.includes('node_modules') &&
          !request.includes('.svg')
        ) {
          const resolve = getResolve({
            alias: {
              '@/': './src/',
            },
            preferAbsolute: false,
            preferRelative: true,
            roots: [context],
          })

          const resolvedPath = await resolve(context, request)

          let relativeToIssuer = path.relative(
            path.dirname(contextInfo.issuer),
            resolvedPath
          )

          if (
            !relativeToIssuer.startsWith('.') &&
            !relativeToIssuer.startsWith('..')
          ) {
            relativeToIssuer = './' + relativeToIssuer
          }

          console.log('🙌', relativeToIssuer)
          return 'module ' + relativeToIssuer
        }

        return
      },
    ],
    module: {
      parser: {
        javascript: {
          importMeta: false,
        },
      },
      rules: [
        // {
        //   test: /\.svg$/,
        //   use: ['@svgr/webpack'],
        // },
        {
          test: /\.svg$/,
          oneOf: [
            {
              type: 'asset/inline',
              resourceQuery: /inline/,
            },
            {
              type: 'asset/resource',
              generator: {
                publicPath: 'my-assets/',
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
          // type: 'css', // set to 'css/auto' if you want to support '*.module.css' as CSS Module, otherwise set type to 'css'
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          // type: 'css', // set to 'css/auto' if you want to support '*.module.css' as CSS Module, otherwise set type to 'css'
        },
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
      chunkFormat: 'module',
      module: true,
      clean: true,
      publicPath: '//cdn.example.com/assets/', // CDN (same protocol)
      path: path.resolve(__dirname, 'dist/bundleless-webpack'),
      assetModuleFilename: 'assets/[hash][ext][query]',
      // @ts-ignore
      filename: (pathData) => {
        const fileName = pathData.chunk.name
        return `${fileName.replace(/\.ts$/, '')}.js`
        // return `[name].mjs`
      },
      // libraryTarget: 'module',
      // libraryTarget: 'commonjs2',
      library: {
        type: 'module',
        // type: 'commonjs2',
      },
    },
    optimization: {
      minimize: false,
      // minimize: true,
      concatenateModules: true,
      // concatenateModules: false,
      providedExports: true,
      usedExports: false,
      // concatenateModules: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    experiments: {
      outputModule: true,
      // outputModule: false,
    },
  }
}

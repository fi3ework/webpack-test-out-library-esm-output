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

        // console.log('🙋', data)
        // return callback(null, new MySimpleModule('./constant'))
        // // factory.hooks.resolve.tap('ExternalModuleFactoryPlugin', (result) => {
        //   // if (result) {
        //   //   result.external = true
        //   // }
        //   // return result
        // })
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
      [entry]: './' + entry,
      ...acc,
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
    // devtool: 'source-map',
    context: path.resolve(__dirname, './src'),
    entry: webpackEntry,
    // entry: {
    //   // 'use-svg.js': './use-svg.js',
    //   // 'lib2.js': './lib2.js',
    //   // 'lib2-thing.js': './lib2-thing.js',
    //   // 'lib.js': './lib.js',
    //   main: './index.js',
    //   // 'importMetaUrl.js': './importMetaUrl.js',
    //   // 'dyn.js': './dyn.js',
    //   // 'constants.js': './constants.js',
    //   // 'cjs-module.js': './cjs-module.js',
    //   // 'cjs-module-2.js': './cjs-module-2.js',
    //   // 'barrel-constants.js': './barrel-constants.js',
    //   // 'alias.js': './alias.js',
    // },
    externals: [
      // @ts-ignore
      ({ context, request, contextInfo, getResolve }, callback) => {
        if (
          request.startsWith('.') &&
          contextInfo.issuer &&
          !request.includes('node_modules') &&
          !request.includes('.svg')
        ) {
          console.log('😌', request)
          return callback(null, 'module ' + request)
        }

        callback()
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
          type: 'asset/resource',
          generator: {
            publicPath: 'my-assets/',
          },
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

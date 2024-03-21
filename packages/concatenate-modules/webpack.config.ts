import * as path from 'path'
import * as webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
import { Compiler } from 'webpack'
import * as JavascriptModulesPlugin from 'webpack/lib/javascript/JavascriptModulesPlugin'
import * as EnableLibraryPlugin from 'webpack/lib/library/EnableLibraryPlugin'
import * as AbstractLibraryPlugin from 'webpack/lib/library/AbstractLibraryPlugin'
import * as ConcatenatedModule from 'webpack/lib/optimize/ConcatenatedModule'
import * as ExportPropertyLibraryPlugin from 'webpack/lib/library/ExportPropertyLibraryPlugin'

type ConcatSource = webpack.sources.ConcatSource
type Source = webpack.sources.Source
type CachedSource = webpack.sources.CachedSource

class EsmLibraryPlugin extends AbstractLibraryPlugin {
  constructor(options) {
    super({
      pluginName: 'EsmLibraryPlugin',
      type: options.type,
    })
  }

  apply(compiler: Compiler) {
    // runtime gen
    EnableLibraryPlugin.setEnabled(compiler, 'rslib')
    new ExportPropertyLibraryPlugin({
      type: 'rslib',
      nsObjectUsed: true,
    }).apply(compiler)
    super.apply(compiler)

    // gen def
    compiler.hooks.compilation.tap('rslib', (compilation) => {
      const { exportDefinitions } =
        ConcatenatedModule.getCompilationHooks(compilation)

      exportDefinitions.tap(
        'rslib',
        (source: ConcatSource, defs: Record<string, string>) => {
          this.defs = defs

          // source.add('\n\n// rslib: custom export here\n')
          // source.add('\n')
          // Object.keys(defs).forEach((key) => {
          //   const finalName = defs[key]
          //   source.add(`export { ${finalName} as ${key} }\n`)
          // })
          // source.add('\n')

          return source
        }
      )
    })
  }

  parseOptions(library) {
    const { name } = library

    if (name) {
      throw new Error(
        `Library name must be unset. ${AbstractLibraryPlugin.COMMON_LIBRARY_NAME_MESSAGE}`
      )
    }
    return {
      name: /** @type {string} */ name,
    }
  }

  renderStartup(
    source,
    module,
    { moduleGraph, chunk },
    { options, compilation }
  ) {
    const result = new webpack.sources.ConcatSource(source)
    const exportsInfo = moduleGraph.getExportsInfo(module)
    const exports = []
    const isAsync = moduleGraph.isAsync(module)

    Object.keys(this.defs).forEach((key) => {
      const finalName = this.defs[key]
      result.add(`export { ${finalName} as ${key} }\n`)
    })

    return result

    // if (isAsync) {
    //   result.add(
    //     `${RuntimeGlobals.exports} = await ${RuntimeGlobals.exports};\n`
    //   )
    // }
    // for (const exportInfo of exportsInfo.orderedExports) {
    //   if (!exportInfo.provided) continue
    //   const varName = `${RuntimeGlobals.exports}${Template.toIdentifier(
    //     exportInfo.name
    //   )}`
    //   result.add(
    //     `var ${varName} = ${RuntimeGlobals.exports}${propertyAccess([
    //       /** @type {string} */
    //       exportInfo.getUsedName(exportInfo.name, chunk.runtime),
    //     ])};\n`
    //   )
    //   exports.push(`${varName} as ${exportInfo.name}`)
    // }
    // if (exports.length > 0) {
    //   result.add(`export { ${exports.join(', ')} };\n`)
    // }
    return result
  }
}

const esmModule = new EsmLibraryPlugin('esm')

class PureRuntimePlugin {
  apply(compiler: Compiler) {
    const { RuntimeGlobals } = compiler.webpack
    compiler.hooks.compilation.tap('rslib', function (compilation) {
      const {
        renderStartup,
        renderMain,
        renderChunk,
        renderModuleContent,
        renderRequire,
      } = JavascriptModulesPlugin.getCompilationHooks(compilation)

      const { exportDefinitions } =
        ConcatenatedModule.getCompilationHooks(compilation)

      exportDefinitions.tap(
        'rslib',
        (source: ConcatSource, defs: Record<string, string>) => {
          source.add('\n\n// rslib: custom export here\n')
          source.add('\n')
          Object.keys(defs).forEach((key) => {
            const finalName = defs[key]
            source.add(`export { ${finalName} as ${key} }\n`)
          })
          source.add('\n')
          return source
        }
      )

      // renderMain.tap('rslib', (source: ConcatSource, renderContext) => {
      //   console.log('🧙‍♂️ renderMain')
      //   source.add('\n\n// rslib: custom export here\n')
      //   source.add('\n// rslib: renderMain\n')
      //   return source
      // })

      // renderStartup.tap('rslib', (source: ConcatSource, renderContext) => {
      //   console.log('🧙‍♂️ renderStartup')
      //   source.add('// rslib: renderStartup')
      //   return source
      // })

      // renderRequire.tap('rslib', (source: ConcatSource, renderContext) => {
      //   console.log('🧙‍♂️ renderRequire')
      //   const result = new webpack.sources.ConcatSource(source)
      //   result.add('\n// rslib: renderRequire\n')
      //   return result.source()
      // })

      // compilation.hooks.runtimeRequirementInTree
      //   .for(RuntimeGlobals.definePropertyGetters)
      //   .tap('rslib', (chunk) => {
      //     return true
      //   })
    })
  }
}

export default {
  plugins: [
    // new PureRuntimePlugin(),
    // new EsmLibraryPlugin({ type: 'rslib' }),
  ],
  mode: 'none',
  devtool: 'source-map',
  externals: {
    react: 'module react',
  },
  entry: {
    main2: './index.js',
  },
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
    // enabledLibraryTypes: [esmModule],
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-dist.mjs',
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
    chunkFormat: 'module',
    // libraryTarget: 'commonjs',
    library: {
      // type: 'rslib',
      // type: esmModule,
      // type: new EsmLibraryPlugin('esm'),
      // type: 'rslib',
      type: 'module',
    },
  },
  optimization: {
    concatenateModules: true,
    splitChunks: false,
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
  stats: {
    // Display bailout reasons
    optimizationBailout: true,
  },
}

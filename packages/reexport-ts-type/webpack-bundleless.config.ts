import * as path from 'path'
import * as webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const { ConcatSource, CachedSource } = require('webpack-sources')
import * as fg from 'fast-glob'
import { Compiler } from 'webpack'
import * as JavascriptModulesPlugin from 'webpack/lib/javascript/JavascriptModulesPlugin'

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

class BundlelessPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('rslib', function (compilation) {
      const { renderMain, renderStartup, renderModuleContent } =
        JavascriptModulesPlugin.getCompilationHooks(compilation)

      compilation.hooks.runtimeRequirementInTree
        .for(webpack.RuntimeGlobals.definePropertyGetters)
        .tap('RepackTargetPlugin', (chunk) => {
          // compilation.addRuntimeModule(
          //   chunk,
          //   new RepackLoadScriptRuntimeModule(chunk.id ?? undefined)
          // )

          // Return `true` to make sure Webpack's default load script runtime is not added.
          return true
        })

      // renderModuleContent.tap(
      //   'rslib',
      //   (moduleSource: ConcatSource, module, renderContext) => {
      //     const concatSource: ConcatSource = new ConcatSource(moduleSource)
      //     const webpackDefineSourceChildren = concatSource.getChildren()

      //     // return moduleSource
      //   }
      // )

      // generate exports code in the end of the module
      renderStartup.tap(
        'rslib',
        (source: ConcatSource, module, { moduleGraph, chunk }) => {
          // source
          const result = new ConcatSource()
          const exportsInfo = moduleGraph.getExportsInfo(module)

          // const isAsync = moduleGraph.isAsync(module)
          // if (isAsync) {
          //   result.add(
          //     `${RuntimeGlobals.exports} = await ${RuntimeGlobals.exports};\n`
          //   )
          // }
          for (const exportInfo of exportsInfo.orderedExports) {
            if (!exportInfo.provided) continue
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
          }
          return source
        }
      )

      renderMain.tap('rslib', (source: ConcatSource, renderContext) => {
        const sourceChildren = source.getChildren()
        const [
          prefixSource1,
          rawSource1,
          prefixSource2,
          cachedSource,
          rawSource2,
        ] = sourceChildren

        const realSource: CachedSource = cachedSource as any
        const possibleChildren = sourceChildren.forEach((child) => {
          // console.log('👄', child?._source?._children)
        })
        // console.log('👄', sourceChildren)

        return source
        // const webpackDefineSource

        // const q = renderContext.codeGenerationResults.map
        // console.log('🤯', q)

        //   const x = console.log(
        //     '😋',
        //     // x,
        //     prefixSource1,
        //     '\n---\n',
        //     rawSource1,
        //     '\n---\n',
        //     prefixSource2,
        //     '\n---\n',
        //     cachedSource,
        //     '\n---\n',
        //     rawSource2
        //   )
        //   // return source + '// 121111'
      })
    })
  }
}

export default async () => {
  const entries = await fg(['**/*.ts'], {
    cwd: path.resolve(__dirname, './src'),
  })

  const webpackEntry = entries.reduce((acc, entry) => {
    return {
      [entry]: path.resolve(__dirname, './src/' + entry),
      ...acc,
    }
  }, {})

  return {
    plugins: [
      new webpack.BannerPlugin('// This file is created by rslib'),
      new BundlelessPlugin(),
      //  new DisableHarmonyPlugin()
    ],
    mode: 'none',
    // devtool: 'source-map',
    // context: path.resolve(__dirname, '../../submodules/redux'),
    entry: webpackEntry,
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
      clean: true,
      path: path.resolve(__dirname, 'dist/bundleless-webpack'),
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
      concatenateModules: true,
      // concatenateModules: false,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    experiments: {
      outputModule: true,
      // outputModule: false,
    },
  }
}

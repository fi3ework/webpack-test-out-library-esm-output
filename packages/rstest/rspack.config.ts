import * as path from 'path'
import { Compiler } from 'webpack'
import * as RuntimeTemplate from 'webpack/lib/RuntimeTemplate'
import * as Template from 'webpack/lib/Template'
const isRspack = process.argv[1].split('/').pop().includes('rspack')

type ModuleInfo = {
  source: string
  chunkModuleId: string
}

const rawRenderRuntimeModules = Template.renderRuntimeModules
Template.renderRuntimeModules = function (runtimeModules, renderContext) {
  const rawResult = rawRenderRuntimeModules(runtimeModules, renderContext)
  return rawResult
}

const modules = new Array<ModuleInfo>()

class RstestPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('plugin', (compilation) => {
      const hooks =
        compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(
          compilation
        )

      hooks.renderModuleContent.tap(
        'plugin',
        (moduleSource, module, { chunkGraph }) => {
          const chunkModuleId = chunkGraph.getModuleId(module)
          const source = moduleSource.source()
          // modules.push({ source, chunkModuleId })
          // console.log('🙀', moduleId)
          // console.log('😷', moduleSource)
          return moduleSource
        }
      )
    })
  }
}

export default {
  mode: 'none',
  plugins: [new RstestPlugin()],
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
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
        type: 'javascript/auto',
      },
    ],
  },
  output: {
    clean: true,
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkLoading: 'import', // implied to `import` by `output.ChunkFormat`
  },
  optimization: {
    concatenateModules: false,
    // concatenateModules: true,
    minimize: false,
    avoidEntryIife: false,
    // runtimeChunk: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  experiments: isRspack
    ? {
        outputModule: true,
        rspackFuture: {
          bundlerInfo: {
            force: false,
          },
        },
      }
    : {
        outputModule: true,
      },
}

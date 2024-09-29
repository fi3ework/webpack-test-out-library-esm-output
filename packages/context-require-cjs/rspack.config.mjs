import path from 'path'
import { fileURLToPath } from 'url'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const PLUGIN_NAME = 'PreserveDynamicRequireWebpackPlugin'

export class PreserveDynamicRequireWebpackPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      function processDependencies(block) {
        const { dependencies } = block
        for (let i = dependencies.length - 1; i >= 0; i--) {
          const dep = dependencies[i]
          // Disable processing of dynamic require
          if (dep.constructor.name === 'CommonJsRequireContextDependency') {
            dependencies.splice(i, 1)
          }
        }

        for (const child of block.blocks) {
          processDependencies(child)
        }
      }

      compilation.hooks.succeedModule.tap(PLUGIN_NAME, (mod) => {
        processDependencies(mod)
      })
    })
  }
}

export default {
  target: ['node', 'es2020'],
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.js',
  },
  externalsType: 'commonjs',
  module: {
    rules: [
      {
        test: /\js$/,
        parser: {
          importMeta: false,
          // createRequire: false,
          // requireResolve: false,
          // requireDynamic: false,
          requireAsExpression: false,
          // importDynamic: false,
        },
        type: 'javascript/auto',
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
      },
    ],
  },
  output: {
    publicPath: '/',
    clean: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    library: {
      type: 'commonjs',
    },
  },
  optimization: {
    splitChunks: false,
    minimize: false,
    moduleIds: 'deterministic',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}

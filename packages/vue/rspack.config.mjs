import path from 'path'
import pluginVue from 'unplugin-vue/rspack'
import { fileURLToPath } from 'url'
import rspack from '@rspack/core'

const isRspack = process.argv[1].split('/').pop().includes('rspack')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  target: ['node', 'es2020'],
  mode: 'none',
  devtool: false,
  entry: {
    main: './src/index.vue',
  },
  plugins: [pluginVue(), new rspack.CssExtractRspackPlugin({})],
  externals: [
    {
      vue: 'vue',
    },
    function ({ context, request, issuer }, callback) {
      console.log('🤬', request)
      if (request.includes('plugin-vue/export-helper'))
        // Externalize to a commonjs module using the request path
        // return callback(null, 'commonjs ' + request)
        return callback()

      if (request.endsWith('.css')) {
        return callback(null, 'module ' + request)
      }

      if (!issuer) {
        return callback()
      }

      callback(null, 'module ' + request)
    },
  ],
  externalsType: 'module-import',
  module: {
    rules: [
      // {
      //   // test: /\.vue/i,
      //   // resourceQuery: /lang\.css/,
      //   use: [rspack.CssExtractRspackPlugin.loader, 'css-lo11ader'],
      //   type: 'javascript/auto',
      // },
      {
        test: /\.css/i,
        use: [rspack.CssExtractRspackPlugin.loader, 'css-loader'],
        type: 'javascript/auto',
      },
      // {
      //   test: /\.ts$/,
      //   // exclude: [/node_modules/],
      //   loader: isRspack ? 'builtin:swc-loader' : 'swc-loader',
      //   options: {
      //     sourceMap: true,
      //     jsc: {
      //       parser: {
      //         syntax: 'typescript',
      //       },
      //     },
      //     env: {
      //       targets: ['chrome >= 107'],
      //     },
      //   },
      //   type: 'javascript/auto',
      // },
    ],
  },
  output: {
    publicPath: '/',
    clean: true,
    module: true,
    path: path.resolve(
      __filename,
      `../dist/${isRspack ? 'rspack' : 'webpack'}-dist`
    ),
    chunkFormat: 'module',
    chunkLoading: 'import',
    library: {
      type: 'module',
      // type: 'modern-module',
    },
  },
  optimization: {
    concatenateModules: true,
    splitChunks: false,
    minimize: false,
    moduleIds: 'named',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue'],
  },
  experiments: {
    css: false,
    topLevelAwait: false,
    outputModule: true,
  },
}

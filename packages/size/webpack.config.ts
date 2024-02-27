export default {
  mode: 'production',
  devtool: false,
  entry: {
    main: './src/index.mjs',
  },
  output: {
    libraryTarget: 'module',
    library: {
      type: 'module',
    },
  },
  optimization: {
    concatenateModules: true,
    minimize: false,
  },
  experiments: {
    outputModule: true,
  },
}

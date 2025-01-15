/** @type {import("@rspack/core").Configuration} */
module.exports = {
  output: {},
  externals: {
    m1: 'm1',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: 'builtin:swc-loader',
            // loader: 'swc-loader',
            options: {
              jsc: {
                target: 'es2015',
                minify: {
                  compress: true,
                  format: {
                    comments: false,
                    // comments: 'some',
                    // preserveAnnotations: false,
                  },
                },
                preserveAllComments: true,
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                  dynamicImport: true,
                  classProperty: true,
                  exportNamespaceFrom: true,
                  exportDefaultFrom: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  experiments: {
    rspackFuture: {
      bundlerInfo: {
        force: false,
      },
    },
  },
}

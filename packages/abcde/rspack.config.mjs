/** @type {import("@rspack/core").Configuration} */
export default {
  entry: {
    a: './a.js',
    b: './b.cjs',
    c: './c.js',
    d: './d.mjs',
    e: './e/index.js',
  },
  devtool: false,
  output: {
    clean: true,
    filename: `[name].js`,
    module: true,
    libraryTarget: 'modern-module',
    iife: false,
    chunkFormat: 'module',
  },
  externalsType: 'module',
  externals: [
    (data, callback) => {
      if (data.contextInfo.issuer) {
        return callback(null, data.request)
      }
      callback()
    },
  ],
  experiments: {
    outputModule: true,
  },
  optimization: {
    splitChunks: false,
    concatenateModules: true,
    minimize: false,
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
    rspackFuture: {
      bundlerInfo: {
        force: false,
      },
    },
  },
  plugins: [
    // function () {
    // 	/**
    // 	 * @param {import("@rspack/core").Compilation} compilation compilation
    // 	 * @returns {void}
    // 	 */
    // 	const handler = compilation => {
    // 		compilation.hooks.afterProcessAssets.tap("testcase", assets => {
    // 			expect(assets['a.js']._value).toMatchSnapshot();
    // 			expect(assets['b.js']._value).toMatchSnapshot();
    // 			expect(assets['c.js']._value).toMatchSnapshot();
    // 			expect(assets['d.js']._value).toMatchSnapshot();
    // 			// expect(assets['e.js']._value).toMatchSnapshot();
    // 		});
    // 	};
    // 	this.hooks.compilation.tap("testcase", handler);
    // }
  ],
}

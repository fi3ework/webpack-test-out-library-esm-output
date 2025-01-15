/*! Legal Comment */
export const Button = () => /*#__PURE__*/ jsx('button', {})
// good
export const button = /* @__PURE__ */ new Button()

export function test() {
  import(/* webpackIgnore: true */ 'm1').then(() => {
    console.log('ignored-module.js is loaded')
  })
}

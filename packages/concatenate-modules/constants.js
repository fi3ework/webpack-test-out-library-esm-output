const cjsVar = require('./cjs-module.js')

const num = 0
export default num
export const num1 = 1
export const num2 = 2
export { cjsVar }

const add1 = () => num + num1

export const unused2 = 'unused2'

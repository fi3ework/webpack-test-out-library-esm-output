import num from './constants'

export const dynNum = async function () {
  const { dynamicStr } = await import('./dyn')
  return dynamicStr
}

import { add1, add2 } from './lib'
import * as xyz from './barrel-constants'
const cjsVar2 = require('./cjs-module-2.js')

export default num
export * from './lib'
export { xyz }
export { cjsVar2 }
export function add3() {
  return add1() + add2()
}

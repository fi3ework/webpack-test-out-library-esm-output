import num from './constants'
import { add1, add2 } from './lib'
import * as xyz from './barrel-constants'

export default num
export * from './lib'
export { xyz }
export function add3() {
  return add1() + add2()
}

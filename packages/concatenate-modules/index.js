import num from './constants'
import { add1, add2 } from './lib'

export default num
export * from './lib'
export function add3() {
  return add1() + add2()
}

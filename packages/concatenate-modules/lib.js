import num, { num1, num2, cjsVar } from './constants'

export function add1() {
  return num + num1
}

export function add2() {
  return num + num2
}

export function addCjs() {
  return cjsVar
}

export { num1 }

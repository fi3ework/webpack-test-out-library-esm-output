import num, { num1, num2 } from './constants'

export function add1() {
  return num + num1
}

export function add2() {
  return num + num2
}

export function unused_add() {
  return 'unused'
}

export { num1 as my_rename_num1 }

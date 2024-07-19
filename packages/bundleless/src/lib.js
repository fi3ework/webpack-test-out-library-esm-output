import num, { num1, num2 } from './constants'
import { readFileSync } from 'fs'

export function add1() {
  return num + num1
}

export function add2() {
  return num + num2 + readFileSync
}

export function unused_add() {
  return 'unused'
}

// export * from './constants'

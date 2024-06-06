import _ from 'lodash-es'
import { isWeakMap } from 'lodash-es'
import toArray from 'lodash-es/toArray.js'

var localVar = 222222222
var kk = 2
import thing from './constants.cjs'

_.toArray({ a: 1, b: 2 })
isWeakMap(new WeakMap())
toArray('abc')
localVar = 333333333

const w = WeakMap
const xd = new w()

// OK
function src_localVar() {}
// OK
const src_localVar_0 = 0
// OK
var src_localVar_1 = 1
// OK
typeof src_localVar_2
// OK
function test_func() {
  src_localVar_3 = 3
  var src_localVar_4 = 4
  console.log(localVar)
}

let x = localVar + 1

console.log('🔥 [should be `undefined` if not leaked]', thing)

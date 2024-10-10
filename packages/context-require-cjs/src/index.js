const dir = process.env.name
import { createRequire as _createRequire } from 'module'

// === require ===
const require1 = require(dir) // transform
const require2 = require('./other.js') // transform
const require3 = require('./foo/' + dir + '.js') // preserve
const require4 = require(a + './foo/' + dir + '.js') // preserve
// const require5 = require(dir
//   ? './foo/' + dir + '.js'
//   : './foo/nested' + dir + 'js')

// === require.resolve ===
// const resolve1 = require.resolve(dir)

// const resolve2 = require.resolve('./other.js')

// const resolve3 = require.resolve('./foo/' + dir + '.js')

// const resolve4 = require.resolve(
//   process.env.RANDOM ? './foo/' + dir + '.js' : './bar/' + dir + 'js'
// )

// can't handle, `require` will turn into expression
// const resolve5 = require.resolve
// resolve5('./other.js')

// can't handle, `require` will turn into `undefined`
// const __require1 = require
// const resolve6 = __require1.resolve('./other.js')

let require = _createRequire(import.meta.url)
const require2 = require('./other.js') // transform
console.log('🧟')
// const a = _require
// console.log(typeof a)

// === require as expression ===

// require('./other.js')

// const resolveD1 = require.resolve
// resolveD1('./other.js')

// const lazyFn = (module, requireFn) => {}
// lazyFn('./other.js', require)

// === dynamic import dynamic ===
// const import1 = import('./other.js') // transform
// const import2 = import(a + './foo/' + dir + '.js')
// console.log('111')

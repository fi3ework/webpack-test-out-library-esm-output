const { log: myLog } = require('./external')

var localVar = 222222222
var kk = 2
const thing = require('./constants.cjs')

localVar = 333333333

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
let y = myLog() + 1

console.log('🔥 [should be `undefined` if not leaked]', thing)

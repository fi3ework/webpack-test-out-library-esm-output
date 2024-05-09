import num from './constants.js'
import cjsVar from './cjs-module.cjs'
export * from './constants.js'

num1
cjsVar

try {
  delete Object.prototype // will throw error in strict mode
  console.log(answer)
} catch {
  console.log('bang')
}

const leaked = 'llllll'
console.log(leaked)

export default num

export { leaked }

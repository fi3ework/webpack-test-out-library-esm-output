import num from './constants'
import cjsVar from './cjs-module'

num1

export { cjsVar }

const leaked = 'llllll'
console.log(leaked)

export default num

export { leaked }

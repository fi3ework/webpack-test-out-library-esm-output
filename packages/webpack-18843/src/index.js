import x from './module.js'

console.log(x)

const localVar = 1

it('should not leak localVar to other modules', () => {
  const src_localVar = 42
  const through_variable = typeof localVar
  function test() {
    const v1 = 1
  }
})

// ================== cjs ==================

const debug = async () => {
  const name = process.env.MY_NAME
  // const fileEsm = await import('vue')
  const r1 = require('./value.cjs')
  // const r2 = require(name)
  const r3 = require('./locales/' + name + '.js')
  const r4 = require(a + './locales/' + name + '.js')
  const r5 = require(name
    ? './locales/' + name + '.js'
    : './locales/nested' + name + 'js')
  const rr1 = require.resolve('vue')
  const rr2 = require.resolve('./locales/' + name + '.js')
  console.log(files + file)
}

module.exports = debug
// export { debug }

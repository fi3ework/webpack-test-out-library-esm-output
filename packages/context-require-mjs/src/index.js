// ================== esm ==================

// import v from './value.cjs'

// const debug = async () => {
//   const name = process.env.MY_NAME
//   const fileCjs = require(name)
//   const fileEsm = await import(name)
//   const files = require.resolve('./locales/' + name + '.js')
//   console.log(files + v + fileCjs + fileEsm)
// }

// export { debug }

// ================== cjs ==================

const debug = async () => {
  const name = process.env.MY_NAME
  const fileEsm = await import(name)
  const file = require('./value.cjs')
  // const files = require.resolve('./locales/' + name + '.js')
  // console.log(files + file)
}

module.exports = debug
// export { debug }

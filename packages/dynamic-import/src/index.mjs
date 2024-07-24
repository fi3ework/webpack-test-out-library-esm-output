import foo from './foo.js'
// import bar from './bar.js'

export const debug = async () => {
  const cat1 = await import('fs')
  const cat2 = await import('node:fs')
  const cat3 = await import('node-fs')
  console.log(cat1, cat2, cat3, foo)
}

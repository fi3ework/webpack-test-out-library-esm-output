import { readFileSync } from 'fs'
// const fs = require('fs')

export const main = async () => {
  // const cat1 = await import('fs')
  const cat2 = await import('node:fs')
  // const cat3 = await import('node-fs')
  // const foo = await import('./foo')
  // console.log(cat1, cat2, cat3, foo, readFileSync)
  // const react = await import('react')
  console.log(readFileSync)
  console.log(cat2)
}

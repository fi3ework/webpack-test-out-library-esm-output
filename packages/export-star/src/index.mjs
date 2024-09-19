export const vvvv = async () => {
  const v = await import('vue')
  v()
}

export { good as notGood } from 'react'
export * from 'react'
export * from 'svelte'
export * from './foo.js'

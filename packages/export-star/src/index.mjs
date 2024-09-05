import { foo } from './foo.js'

export const vvvv = async () => {
  const v = await import('vue')
  v()
}

export { good } from 'react'
export * from 'react'
export { foo }

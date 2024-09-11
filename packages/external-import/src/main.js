import { react } from 'react'
import { angular } from 'angular'
import { other } from './other'

export const main = async () => {
  // const dyn = await import('./dyn')
  const vueNs = await import('vue')
  const reactNs = await import('react')
  console.log(reactNs, react)
}

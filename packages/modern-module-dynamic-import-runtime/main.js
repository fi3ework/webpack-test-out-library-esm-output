import { react } from 'react'
import { angular } from 'angular'

export const main = async () => {
  const dyn = await import('./dyn')
  const reactNs = await import('react')
  const vueNs = await import('vue')
  console.log(angular, react, reactNs, vueNs, dyn)
}

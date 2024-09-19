import { react } from 'react'
import * as angular from 'angular'
import vue, { vueH } from 'vue'
import { bar } from './bar'
// import { other } from './other'

export const main = () => {
  bar
  // const dyn = await import('./dyn')
  // const vueNs = await import('vue')
  // const reactNs = await import('react')
  react
  vue
  angular
}

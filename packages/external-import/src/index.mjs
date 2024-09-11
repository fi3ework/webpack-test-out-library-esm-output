import { main } from './main.js'

console.log(main)

// export { main }

export const main2 = async () => {
  const vueNs = await import('vue')
  const reactNs = await import('react')
  console.log(reactNs, vueNs)
}

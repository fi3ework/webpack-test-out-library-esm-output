import bar, { baz } from './a.js'

export const debug = async () => {
  const foo = await import('./c.js')
  console.log(foo + bar + baz)
}

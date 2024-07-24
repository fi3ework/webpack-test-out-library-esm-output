import bar, { baz } from './bar.js'

export const debug = async () => {
  const foo = await import('./foo.js')
  console.log(foo + bar + baz)
}

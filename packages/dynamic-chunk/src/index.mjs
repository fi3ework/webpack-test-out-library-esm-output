import bar from './bar.js'

export const main = async () => {
  const foo = await import('AAA')
  console.log(foo + bar)
}

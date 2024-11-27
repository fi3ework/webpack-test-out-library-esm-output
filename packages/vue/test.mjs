import { bar, baz } from './dist/rspack-dist/main.mjs'

async function main() {
  const bazResult = await baz()
  console.log('bar', bar)
  console.log('baz', bazResult.bar)
}

main()

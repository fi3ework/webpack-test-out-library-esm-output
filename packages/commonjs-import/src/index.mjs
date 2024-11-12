import { attempt } from 'lodash'

export async function foo() {
  const jq = await import('jquery')
  attempt(() => jq('.my-element').animate(/* ... */))
}

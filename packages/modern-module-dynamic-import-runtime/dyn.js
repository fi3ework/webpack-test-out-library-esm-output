import { lit } from 'lit'
import { svelte } from 'svelte'

export default dynamic = async () => {
  const litNs = await import('lit')
  const solidNs = await import('solid')
	console.log(svelte, lit, litNs, solidNs)
}


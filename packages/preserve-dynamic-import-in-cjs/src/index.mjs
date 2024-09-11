import { r } from 'react'

const main = async () => {
  const v = await import('vue')
  v(r)
}

export { main }

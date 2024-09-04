import { react } from 'react'

export const init = async () => {
  const { createRsbuild } = await import('./createRsbuild.js')
  react()
  return createRsbuild()
}

init()

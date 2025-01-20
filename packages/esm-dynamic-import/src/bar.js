import { baz } from './baz.js'

export const loadDyn = async () => {
  const { dyn } = (await import('./dyn.js')) + baz
  dyn()
}

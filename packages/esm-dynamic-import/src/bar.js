export const loadDyn = async () => {
  const { dyn } = await import('./dyn.js')
  dyn()
}

export const baz = async () => {
  const dynBar = await import('./bar.js')
  return dynBar
}

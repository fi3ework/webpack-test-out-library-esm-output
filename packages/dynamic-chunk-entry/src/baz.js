export const f1 = async () => {
  const bar = await import('./bar.js')
  return bar
}

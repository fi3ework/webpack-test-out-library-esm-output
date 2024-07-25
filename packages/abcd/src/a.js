const fooA = async () => {
  console.log('A')
  const c = await import('./c.js')
}

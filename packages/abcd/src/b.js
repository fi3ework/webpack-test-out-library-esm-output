const fooB = async () => {
  console.log('B')
  const c = await import('./c.js')
}

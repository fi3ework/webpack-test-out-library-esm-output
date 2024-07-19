export const debug = async () => {
  const cat = await import('@rsbuild/core')
  console.log(cat)
}

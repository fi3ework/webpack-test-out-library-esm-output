module.exports = function loader(source) {
  const callback = this.async()
  // const result = `\nimport 'data:text/javascript,export {}'\n\n` + source
  const result = source
  // console.log('🐲 loader:', result)
  //   return result

  callback(null, result)

  //   const options = this.getOptions()

  //   console.log('loader before:', source)

  //   source = source.replace(/\[name\]/g, options.name)

  //   console.log('loader after:', source)

  //   return `export default ${JSON.stringify(source)}`
}

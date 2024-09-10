const debug = async () => {
  const name = process.env.MY_NAME
  const files = require('./locales/' + name + '.js')
  console.log(files)
}

module.exports = debug

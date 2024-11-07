module.exports = function (source) {
  console.log('🤴', this.resource)
  console.log('💁 normal', source)

  this.callback(null, source, null, {
    hasShebang: {
      hasShebang: true,
    },
  })
}

// module.exports.pitch = function (remainRequest, precedingRequest, data) {
//   console.log('💁 pitch', remainRequest, '  ', precedingRequest, data)
// }

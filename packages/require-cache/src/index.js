export function getI18nData(docConfig) {
  const { i18nSourcePath = DEFAULT_I18N_SOURCE } = {}
  try {
    console.log('🚶‍♂️', require.extensions)
    console.log('🚶‍♂️', __webpack_hash__)
    console.log('🚶‍♂️', require.__webpack_layer__)
    delete require.cache[i18nSourcePath]
    const x = require.resolve('external1')
    return {}
  } catch (e) {
    return {}
  }
}

export const object = {
  name: 'module1',
  layer: __webpack_layer__,
}
export {}

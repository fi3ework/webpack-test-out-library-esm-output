import { createRequire } from 'module'
const __require = createRequire(import.meta.url)
const data = __require('./data.json')

export default data

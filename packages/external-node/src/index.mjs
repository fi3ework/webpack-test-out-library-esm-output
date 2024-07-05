import fs from 'fs'
import assert from 'node:assert'
const path = require('path')

export const debug = async () => {
  console.log(fs, assert, path)
  // console.log(React.version, path)
}

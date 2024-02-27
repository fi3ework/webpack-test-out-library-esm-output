import { v, Q } from './re'
import { Q as Q_raw } from './type'
import { thing } from './value'
// @ts-ignore
import json from './myJson.json'

const res = json.map((x) => x.a + 1)

export { Q as Q_exp, v }

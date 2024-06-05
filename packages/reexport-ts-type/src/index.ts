import { v, Q } from './re'
import { Q as Q_raw } from './type'
import { thing } from './value'
import json from './j.json'

const res = json.map((x) => x.a + 1)

export { Q as Q_exp, Q_raw, v as v_exp, thing, res }

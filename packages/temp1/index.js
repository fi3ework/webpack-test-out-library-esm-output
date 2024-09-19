import * as webpack_b from './b'

// bad
const ns_b = webpack_b
ns_b.b1()

// good
// webpack_b.b1()

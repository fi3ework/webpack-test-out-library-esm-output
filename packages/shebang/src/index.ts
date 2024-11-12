#!/usr/bin/env node

console.log(globalThis.__webpack_hash__)

import { foo } from './foo'

export const func: any = () => {
  console.log(foo)
}

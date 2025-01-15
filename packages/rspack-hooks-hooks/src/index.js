import { useTest } from '../a/hook'
import { useTest2 } from './_a/hook'

export const test2 = () => {
  useTest()
  useTest2()
}

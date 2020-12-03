import { describe, test, expect } from '@jest/globals'
import Rules from './rules'

describe('Rules', () => {
  test('should initalize with Conway\'s rules', () => {
    const rules = new Rules()
    expect(rules).toEqual({
      b: [false, false, false, true, false, false, false, false, false],
      s: [false, false, true, true, false, false, false, false, false]
    })
  })
  test('get preset', () => {
    const rules = new Rules()
    expect(rules.preset).toEqual('b3s23')
  })
  test('get binary', () => {
    const rules = new Rules()
    expect(rules.binary).toEqual(6152)
  })
})

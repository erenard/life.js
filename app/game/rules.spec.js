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
})

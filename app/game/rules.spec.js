/* global it, describe */
import { assert } from 'chai'

import Rules from './rules'

describe('Rules', () => {
  it('should initalize with Conway\'s rules', () => {
    const rules = new Rules()
    assert.deepEqual(rules, {
      b: [false, false, false, true, false, false, false, false, false],
      s: [false, false, true, true, false, false, false, false, false]
    })
  })
})

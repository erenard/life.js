import { describe, test, expect } from '@jest/globals'
import {
  getState,
  setState,
  updateCell,
  getAlpha,
  getCount,
  setCount,
  getAge,
  setAge
} from './binary-cell.js'
import Rules from '../rules'

describe.each([
  [0x00],
  [0xff]
])('form the cell: %i', (cell) => {
  describe.each([
    [0b0],
    [0b1]
  ])('(get/set)State', (value) => {
    test(`should set and get the value ${value}`, () => {
      const newCell = setState(cell, value)
      expect(getState(newCell)).toEqual(value)
    })
    test('should keep the others values', () => {
      const count = getCount(cell)
      const age = getAge(cell)
      const newCell = setState(cell, value)
      expect(getCount(newCell)).toEqual(count)
      expect(getAge(newCell)).toEqual(age)
    })
  })

  describe('(get/set)Count', () => {
    for (let value = 0; value < 16; value++) {
      test(`should set and get the ${value}`, () => {
        const newCell = setCount(cell, value)
        expect(getCount(newCell)).toEqual(value)
      })
      test('should keep the others values', () => {
        const state = getState(cell)
        const age = getAge(cell)
        const newCell = setCount(cell, value)
        expect(getState(newCell)).toEqual(state)
        expect(getAge(newCell)).toEqual(age)
      })
    }
  })

  describe('(get/set)Age', () => {
    for (let value = 0; value < 8; value++) {
      test(`should set and get the ${value}`, () => {
        const newCell = setAge(cell, value)
        expect(getAge(newCell)).toEqual(value)
      })
      test('should keep the others values', () => {
        const state = getState(cell)
        const count = getCount(cell)
        const newCell = setAge(cell, value)
        expect(getState(newCell)).toEqual(state)
        expect(getCount(newCell)).toEqual(count)
      })
    }
  })
})

describe('updateCell', () => {
  const living = setState(0, 1)
  const dead = setState(0, 0)

  const rules = new Rules()
  test.each([0, 1, 2, 3, 4, 5, 6, 7, 8])('should apply the birth rule %i', (i) => {
    const cell = setCount(dead, i)
    const updated = updateCell(cell, rules)
    expect(getCount(updated)).toEqual(i)
    expect(getState(updated)).toEqual(rules.b[i] ? 1 : 0)
  })
  test.each([0, 1, 2, 3, 4, 5, 6, 7, 8])('should apply the survival rule %i', (i) => {
    const cell = setCount(living, i)
    const updated = updateCell(cell, rules)
    expect(getCount(updated)).toEqual(i)
    expect(getState(updated)).toEqual(rules.s[i] ? 1 : 0)
  })
})

describe.each([
  [0x00, 0, 0],
  [0x00, 7, 0.5],
  [0xff, 0, 0.5],
  [0xff, 7, 1]
])('getAlpha %i %i %i', (cell, age, alpha) => {
  test('should return the Alpha', () => {
    expect(getAlpha(setAge(cell, age))).toEqual(alpha)
  })
})

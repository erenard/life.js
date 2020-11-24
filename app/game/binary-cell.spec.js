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
import Rules from './rules'

describe('getState', () => {
  test('should return the state', () => {
    expect(getState(0)).toEqual(0)
    expect(getState(0xff)).toEqual(1)
  })
})

describe('setState(0)', () => {
  test('should set the 7nth bit to 0', () => {
    expect(setState(0, 0)).toEqual(0)
    expect(setState(0xff, 0)).toEqual(0b01111111)
  })
})

describe('setState(1)', () => {
  test('should set the 7nth bit to 1', () => {
    expect(setState(0, 1)).toEqual(0b10000000)
    expect(setState(0xff, 1)).toEqual(0xff)
  })
})

describe('getCount', () => {
  test('should return the Count', () => {
    expect(getCount(0)).toEqual(0)
    expect(getCount(0xff)).toEqual(0x0f)
  })
})

describe('setCount(0)', () => {
  test('should set the 8 first bits to 0', () => {
    expect(setCount(0, 0)).toEqual(0)
    expect(setCount(0xff, 0)).toEqual(0xf0)
  })
})

describe('setCount(0xf)', () => {
  test('should set the 8 first bits to 1', () => {
    expect(setCount(0, 0xf)).toEqual(0x0f)
    expect(setCount(0xff, 0xf)).toEqual(0xff)
  })
})

describe('getAge', () => {
  test('should return the Age', () => {
    expect(getAge(0)).toEqual(0)
    expect(getAge(0xff)).toEqual(0b111)
  })
})

describe('setAge(0)', () => {
  test('should set the 8 first bits to 0', () => {
    expect(setAge(0, 0)).toEqual(0)
    expect(setAge(0xff, 0)).toEqual(0b10001111)
  })
})

describe('setAge(0xf)', () => {
  test('should set the 8 first bits to 1', () => {
    expect(setAge(0, 0xf)).toEqual(0b01110000)
    expect(setAge(0xff, 0xf)).toEqual(0xff)
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

describe('getAlpha', () => {
  test('should return the Alpha', () => {
    expect(getAlpha(0)).toEqual(0)
    expect(getAlpha(0b10000000)).toEqual(0.5)
    expect(getAlpha(0b11110000)).toEqual(1)
  })
})

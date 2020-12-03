import { describe, test, expect } from '@jest/globals'
import BinaryCell from './binary-cell.js'
import Rules from './rules'

const binaryCell = BinaryCell()

const getEvenState = binaryCell.getEvenState
const getOddState = binaryCell.getOddState
const setEvenState = binaryCell.setEvenState
const setOddState = binaryCell.setOddState
const getEvenAge = binaryCell.getEvenAge
const getOddAge = binaryCell.getOddAge
const setEvenAge = binaryCell.setEvenAge
const setOddAge = binaryCell.setOddAge
const updateEven = binaryCell.updateEven
const updateOdd = binaryCell.updateOdd
const getEvenAlpha = binaryCell.getEvenAlpha
const getOddAlpha = binaryCell.getOddAlpha

const rules = (new Rules()).binary

describe.each([
  [true],
  [false]
])('isEven = %s', (isEven) => {
  const setState = isEven ? setEvenState : setOddState
  const getState = isEven ? getEvenState : getOddState
  const getOtherState = !isEven ? getEvenState : getOddState
  const setAge = isEven ? setEvenAge : setOddAge
  const getAge = isEven ? getEvenAge : getOddAge
  const getOtherAge = !isEven ? getEvenAge : getOddAge
  const updateCell = !isEven ? updateEven : updateOdd
  const getAlpha = isEven ? getEvenAlpha : getOddAlpha
  describe.each([
    [0x00],
    [0xff]
  ])('form the cell: %i', (cell) => {
    describe.each([
      [0b0],
      [0b1]
    ])('(get/set)State(%i)', (value) => {
      test('should set and get the value', () => {
        const newCell = setState(cell, value)
        expect(getState(newCell)).toEqual(value)
      })
      test('should keep the others values', () => {
        const evenAge = getEvenAge(cell)
        const oddAge = getOddAge(cell)
        const otherState = getOtherState(cell)
        const newCell = setState(cell, value)
        expect(getEvenAge(newCell)).toEqual(evenAge)
        expect(getOddAge(newCell)).toEqual(oddAge)
        expect(getOtherState(cell)).toEqual(otherState)
      })
    })

    describe('(get/set)Age', () => {
      for (let value = 0; value < 8; value++) {
        test(`should set and get the ${value}`, () => {
          const newCell = setAge(cell, value)
          expect(getAge(newCell)).toEqual(value)
        })
        test('should keep the others values', () => {
          const evenState = getEvenState(cell)
          const oddState = getOddState(cell)
          const otherAge = getOtherAge(cell)
          const newCell = setAge(cell, value)
          expect(getEvenState(newCell)).toEqual(evenState)
          expect(getOddState(newCell)).toEqual(oddState)
          expect(getOtherAge(cell)).toEqual(otherAge)
        })
      }
    })

    describe.each([0, 1, 2, 3, 4, 5, 6])('update a cell of age %i', age => {
      const living = setState(setAge(cell, age), 1)
      const dead = setState(setAge(cell, age), 0)
      test.each([0, 1, 2, 3, 4, 5, 6, 7, 8])('birth rule, count=%i', (count) => {
        const updated = updateCell(dead, count, rules)
        expect(getOtherState(updated)).toEqual((rules >> count) & 1)
        expect(getOtherAge(updated)).toEqual(((rules >> count) & 0b1) === 1 ? age + 1 : 0)
      })
      test.each([0, 1, 2, 3, 4, 5, 6, 7, 8])('survival rule, count=%i', (count) => {
        const updated = updateCell(living, count, rules)
        expect(getOtherState(updated)).toEqual((rules >> (count + 9)) & 0b1)
        expect(getOtherAge(updated)).toEqual(((rules >> (count + 9)) & 0b1) ? age + 1 : 0)
      })
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
})

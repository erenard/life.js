import { describe, beforeEach, test, expect } from '@jest/globals'

import { random, clear, indexToXy, xyToIndex } from '../grid-utils.js'

import {
  getState,
  setState
} from '../binary-cell.js'

const gridSide = 4
const gridLength = gridSide * gridSide

describe('Grid utils', () => {
  let cells

  beforeEach(() => {
    cells = new Uint8Array(gridLength)
  })

  describe('random (ratio)', () => {
    test('should fill the grid when ratio = 1', () => {
      random(cells, gridLength, 1)
      for (let i = 0; i < gridLength; i++) {
        expect(getState(cells[i])).toEqual(1)
      }
    })
    test('should leave the grid empty when ratio = 0', () => {
      random(cells, gridLength, 0)
      for (let i = 0; i < gridLength; i++) {
        expect(getState(cells[i])).toEqual(0)
      }
    })
  })
  describe('clear ()', () => {
    test('should clear the grid', () => {
      cells[0] = setState(cells[0], 0)
      cells[1] = setState(cells[1], 1)
      clear(cells, gridLength)
      for (let i = 0; i < gridLength; i++) {
        expect(getState(cells[i])).toEqual(0)
      }
    })
  })
  describe('xyToIndex ()', () => {
    test('should convert (x, y) to index', () => {
      expect(xyToIndex(gridLength, gridSide, 0, 0)).toEqual(0 + gridSide * 0)
      expect(xyToIndex(gridLength, gridSide, 3, 3)).toEqual(3 + gridSide * 3)
      expect(xyToIndex(gridLength, gridSide, 1, 1)).toEqual(1 + gridSide * 1)
      expect(xyToIndex(gridLength, gridSide, 3, 0)).toEqual(3 + gridSide * 0)
      expect(xyToIndex(gridLength, gridSide, 0, 3)).toEqual(0 + gridSide * 3)
    })
  })
  describe('indexToXy ()', () => {
    test('should convert index to (x, y)', () => {
      expect(indexToXy(gridLength, gridSide, 0 + gridSide * 0)).toEqual({ x: 0, y: 0 })
      expect(indexToXy(gridLength, gridSide, 3 + gridSide * 3)).toEqual({ x: 3, y: 3 })
      expect(indexToXy(gridLength, gridSide, 1 + gridSide * 1)).toEqual({ x: 1, y: 1 })
      expect(indexToXy(gridLength, gridSide, 3 + gridSide * 0)).toEqual({ x: 3, y: 0 })
      expect(indexToXy(gridLength, gridSide, 0 + gridSide * 3)).toEqual({ x: 0, y: 3 })
    })
  })
})

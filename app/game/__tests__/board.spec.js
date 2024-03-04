import { describe, test, expect } from '@jest/globals'
import Board from '../board'

describe('Board', () => {
  describe('constructor', () => {
    test('should initalize the board', () => {
      expect(new Board()).toEqual({
        cellRadius: 2,
        seedRatio: 0.3,
        gridHeight: 400,
        gridWidth: 400
      })
      expect(new Board({
        cellRadius: 1,
        seedRatio: 2,
        gridHeight: 3,
        gridWidth: 4
      })).toEqual({
        cellRadius: 1,
        seedRatio: 2,
        gridHeight: 3,
        gridWidth: 4
      })
      expect(new Board({
        cellRadius: 1,
        gridWidth: 4
      })).toEqual({
        cellRadius: 1,
        seedRatio: 0.3,
        gridHeight: 400,
        gridWidth: 4
      })
    })
  })
  describe('pixelWidth', () => {
    test('should return the board width in pixel', () => {
      expect(new Board().pixelWidth).toEqual(800)
    })
  })
  describe('pixelHeight', () => {
    test('should return the board height in pixel', () => {
      expect(new Board().pixelHeight).toEqual(800)
    })
  })
  describe('pixelToCellCoordinates', () => {
    test('should convert pixel coordinates to cell coordinates', () => {
      expect(new Board().pixelToCellCoordinates(100, 100)).toEqual([50, 50])
    })
  })
})

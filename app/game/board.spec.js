import { describe, test, expect } from '@jest/globals'
import Board from './board'

describe('Board', () => {
  test('should initalize the board', () => {
    expect(new Board()).toEqual({
      cellRadius: 2,
      seedRatio: 0.3,
      gridHeight: 400,
      gridWidth: 400,
    })
    expect(new Board({
      cellRadius: 1,
      seedRatio: 2,
      gridHeight: 3,
      gridWidth: 4,
    })).toEqual({
      cellRadius: 1,
      seedRatio: 2,
      gridHeight: 3,
      gridWidth: 4,
    })
    expect(new Board({
      cellRadius: 1,
      gridWidth: 4,
    })).toEqual({
      cellRadius: 1,
      seedRatio: 0.3,
      gridHeight: 400,
      gridWidth: 4,
    })
  })
})

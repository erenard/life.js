import { describe, beforeEach, test, expect, jest } from '@jest/globals'

import Grid from '.'
import Rules from '../rules'

jest.mock('./grid-one-worker.worker.js')

const gridSide = 4
const gridLength = gridSide * gridSide

describe.each([
  ['No worker', 'no-worker'],
  ['One worker', 'one-worker']
])('Grid: "%s"', (title, name) => {
  let GridImplementation
  beforeEach(async () => {
    await Grid.load(name)
    GridImplementation = Grid.get()
  })
  describe('constructor', () => {
    test('should initialize a grid', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      const cells = grid.Cells
      expect(cells.length).toEqual(gridLength)
    })
  })
  describe('get Cells ()', () => {
    test('should return the grid', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      const cells = grid.Cells
      expect(cells.length).toEqual(gridLength)
    })
  })
  describe('get Size ()', () => {
    test('should return the grid size', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      const size = grid.Size
      expect(size).toEqual({ x: gridSide, y: gridSide, length: gridLength })
    })
  })
})

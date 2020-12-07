import { describe, beforeEach, afterEach, test, expect, jest } from '@jest/globals'
import { random, clear, indexToXy, xyToIndex } from '../grid-utils.js'

import Grid from '.'
import Rules from '../rules'

jest.mock('../workers/grid-one-worker.worker.js')
jest.mock('../grid-utils.js')
jest.mock('../grid-updater.js')

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
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('constructor', () => {
    test('should initialize a grid', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      const cells = grid.cells
      expect(cells.length).toEqual(gridLength)
    })
  })
  describe('clear ()', () => {
    test('should call clear with instance parameters', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      grid.clear(0.5)
      expect(clear).toBeCalledWith(grid.cells, grid.length)
    })
  })
  describe('random ()', () => {
    test('should call random with instance parameters', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      grid.random(0.5)
      expect(random).toBeCalledWith(grid.cells, grid.length, 0.5)
    })
  })
  describe('indexToXy ()', () => {
    test('should call indexToXy with instance parameters', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      grid.indexToXy(5)
      expect(indexToXy).toBeCalledWith(grid.length, grid.sizeX, 5)
    })
  })
  describe('xyToIndex ()', () => {
    test('should call xyToIndex with instance parameters', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      grid.xyToIndex(2, 2)
      expect(xyToIndex).toBeCalledWith(grid.length, grid.sizeX, 2, 2)
    })
  })
})

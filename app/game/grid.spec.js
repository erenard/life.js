import { describe, beforeEach, test, expect } from '@jest/globals'

import Grid from './grid'
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

const gridSide = 4
const gridLength = gridSide * gridSide

describe.each([
  ['No worker', 'no-worker']
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
  describe('random (ratio)', () => {
    test('should fill the grid when ratio = 1', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      grid.random(1)
      for (let i = 0; i < gridLength; i++) {
        expect(getOddState(grid.Cells[i])).toEqual(1)
      }
    })
    test('should leave the grid empty when ratio = 0', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      grid.random(0)
      for (let i = 0; i < gridLength; i++) {
        expect(getOddState(grid.Cells[i])).toEqual(0)
      }
    })
  })
  describe('clear ()', () => {
    test('should clear the grid', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      grid.Cells[0] = setOddState(grid.Cells[0], 0)
      grid.Cells[1] = setOddState(grid.Cells[1], 1)
      grid.clear()
      for (let i = 0; i < gridLength; i++) {
        expect(getOddState(grid.Cells[i])).toEqual(0)
      }
    })
  })
  describe('update ()', () => {
    test('should update the grid', () => {
      const grid = new GridImplementation({ gridWidth: 5, gridHeight: 5 }, new Rules())
      grid.Cells[grid.xyToIndex(2, 1)] = setOddState(grid.Cells[grid.xyToIndex(2, 1)], 1)
      grid.Cells[grid.xyToIndex(2, 2)] = setOddState(grid.Cells[grid.xyToIndex(2, 2)], 1)
      grid.Cells[grid.xyToIndex(2, 3)] = setOddState(grid.Cells[grid.xyToIndex(2, 3)], 1)
      grid.update(false)
      expect(getEvenState(grid.Cells[grid.xyToIndex(2, 1)])).toEqual(0)
      expect(getEvenState(grid.Cells[grid.xyToIndex(2, 3)])).toEqual(0)
      expect(getEvenState(grid.Cells[grid.xyToIndex(2, 2)])).toEqual(1)
      expect(getEvenState(grid.Cells[grid.xyToIndex(1, 2)])).toEqual(1)
      expect(getEvenState(grid.Cells[grid.xyToIndex(3, 2)])).toEqual(1)
    })
  })
  describe('xyToIndex ()', () => {
    test('should convert (x, y) to index', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      expect(grid.xyToIndex(0, 0)).toEqual(0 + gridSide * 0)
      expect(grid.xyToIndex(3, 3)).toEqual(3 + gridSide * 3)
      expect(grid.xyToIndex(1, 1)).toEqual(1 + gridSide * 1)
      expect(grid.xyToIndex(3, 0)).toEqual(3 + gridSide * 0)
      expect(grid.xyToIndex(0, 3)).toEqual(0 + gridSide * 3)
    })
  })
  describe('indexToXy ()', () => {
    test('should convert index to (x, y)', () => {
      const grid = new GridImplementation({ gridWidth: gridSide, gridHeight: gridSide }, new Rules())
      expect(grid.indexToXy(0 + gridSide * 0)).toEqual({ x: 0, y: 0 })
      expect(grid.indexToXy(3 + gridSide * 3)).toEqual({ x: 3, y: 3 })
      expect(grid.indexToXy(1 + gridSide * 1)).toEqual({ x: 1, y: 1 })
      expect(grid.indexToXy(3 + gridSide * 0)).toEqual({ x: 3, y: 0 })
      expect(grid.indexToXy(0 + gridSide * 3)).toEqual({ x: 0, y: 3 })
    })
  })
  describe('20x20 infinite2', () => {
    let grid
    beforeEach(() => {
      // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#/media/File:Game_of_life_infinite2.svg
      grid = new GridImplementation({ gridWidth: 20, gridHeight: 20 }, new Rules())
      grid.Cells[grid.xyToIndex(1, 1)] = setOddState(grid.Cells[grid.xyToIndex(1, 1)], 1)
      grid.Cells[grid.xyToIndex(2, 1)] = setOddState(grid.Cells[grid.xyToIndex(2, 1)], 1)
      grid.Cells[grid.xyToIndex(3, 1)] = setOddState(grid.Cells[grid.xyToIndex(3, 1)], 1)
      grid.Cells[grid.xyToIndex(5, 1)] = setOddState(grid.Cells[grid.xyToIndex(5, 1)], 1)
      grid.Cells[grid.xyToIndex(1, 2)] = setOddState(grid.Cells[grid.xyToIndex(1, 2)], 1)
      grid.Cells[grid.xyToIndex(4, 3)] = setOddState(grid.Cells[grid.xyToIndex(4, 3)], 1)
      grid.Cells[grid.xyToIndex(5, 3)] = setOddState(grid.Cells[grid.xyToIndex(5, 3)], 1)
      grid.Cells[grid.xyToIndex(2, 4)] = setOddState(grid.Cells[grid.xyToIndex(2, 4)], 1)
      grid.Cells[grid.xyToIndex(3, 4)] = setOddState(grid.Cells[grid.xyToIndex(3, 4)], 1)
      grid.Cells[grid.xyToIndex(5, 4)] = setOddState(grid.Cells[grid.xyToIndex(5, 4)], 1)
      grid.Cells[grid.xyToIndex(1, 5)] = setOddState(grid.Cells[grid.xyToIndex(1, 5)], 1)
      grid.Cells[grid.xyToIndex(3, 5)] = setOddState(grid.Cells[grid.xyToIndex(3, 5)], 1)
      grid.Cells[grid.xyToIndex(5, 5)] = setOddState(grid.Cells[grid.xyToIndex(5, 5)], 1)
    })
    test('initial state', () => {
      expect(Array.from(grid.Cells.map(cell => getOddState(cell)))).toEqual([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ])
    })
    test('after 10 generations', () => {
      let isEven = false
      for (let i = 0; i < 10; i++) {
        grid.update(isEven)
        isEven = !isEven
      }
      const getState = isEven ? getEvenState : getOddState
      expect(Array.from(grid.Cells.map(cell => getState(cell)))).toEqual([
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ])
    })
    test('after 50 generations', () => {
      let isEven = false
      for (let i = 0; i < 50; i++) {
        grid.update(isEven)
        isEven = !isEven
      }
      const getState = isEven ? getEvenState : getOddState
      expect(Array.from(grid.Cells.map(cell => getState(cell)))).toEqual([
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
        1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
        0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0
      ])
    })
  })
})

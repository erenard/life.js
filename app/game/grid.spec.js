import { describe, test, expect } from '@jest/globals'

import Grid from './grid'
import Rules from './rules'

const gridSide = 4
const gridLength = gridSide * gridSide

describe('Grid', () => {
  describe('constructor', () => {
    test('should initialize a grid', () => {
      const grid = new Grid(gridSide, gridSide, new Rules())
      const cells = grid.Cells
      expect(cells.length).toEqual(gridLength)
    })
  })
  describe('get Cells ()', () => {
    test('should return the grid', () => {
      const grid = new Grid(gridSide, gridSide, new Rules())
      const cells = grid.Cells
      expect(cells.length).toEqual(gridLength)
    })
  })
  describe('get Size ()', () => {
    test('should return the grid size', () => {
      const grid = new Grid(gridSide, gridSide, new Rules())
      const size = grid.Size
      expect(size).toEqual({ x: gridSide, y: gridSide, length: gridLength })
    })
  })
  describe('random (ratio)', () => {
    test('should fill the grid when ratio = 1', () => {
      const grid = new Grid(gridSide, gridSide, new Rules())
      grid.random(1)
      for (let i = 0; i < gridLength; i++) {
        expect(grid.Cells[i].state).toEqual(1)
      }
    })
    test('should leave the grid empty when ratio = 0', () => {
      const grid = new Grid(gridSide, gridSide, new Rules())
      grid.random(0)
      for (let i = 0; i < gridLength; i++) {
        expect(grid.Cells[i].state).toEqual(0)
      }
    })
  })
  describe('clear ()', () => {
    test('should clear the grid', () => {
      const grid = new Grid(gridSide, gridSide, new Rules())
      grid.Cells[0].state = 0
      grid.Cells[1].state = 1
      grid.clear()
      for (let i = 0; i < gridLength; i++) {
        expect(grid.Cells[i].state).toEqual(0)
      }
    })
  })
  describe('update ()', () => {
    test('should update the grid', () => {
      const rules = new Rules()
      const grid = new Grid(5, 5, rules)
      for (let x = 0; x < grid.Size.x; x++) {
        for (let y = 0; y < grid.Size.x; y++) {
          grid.Cells[grid.xyToIndex(x, y)].sprite = {}
        }
      }
      grid.Cells[grid.xyToIndex(2, 1)].state = 1
      grid.Cells[grid.xyToIndex(2, 2)].state = 1
      grid.Cells[grid.xyToIndex(2, 3)].state = 1
      rules.b[3] = true
      rules.s[2] = true
      rules.s[3] = true
      grid.update()
      expect(grid.Cells[grid.xyToIndex(2, 1)].state).toEqual(0)
      expect(grid.Cells[grid.xyToIndex(2, 3)].state).toEqual(0)
      expect(grid.Cells[grid.xyToIndex(2, 2)].state).toEqual(1)
      expect(grid.Cells[grid.xyToIndex(1, 2)].state).toEqual(1)
      expect(grid.Cells[grid.xyToIndex(3, 2)].state).toEqual(1)
    })
  })
  describe('xyToIndex ()', () => {
    test('should convert (x, y) to index', () => {
      const grid = new Grid(gridSide, gridSide, new Rules())
      expect(grid.xyToIndex(0, 0)).toEqual(0 + gridSide * 0)
      expect(grid.xyToIndex(3, 3)).toEqual(3 + gridSide * 3)
      expect(grid.xyToIndex(1, 1)).toEqual(1 + gridSide * 1)
      expect(grid.xyToIndex(3, 0)).toEqual(3 + gridSide * 0)
      expect(grid.xyToIndex(0, 3)).toEqual(0 + gridSide * 3)
    })
  })
  describe('indexToXy ()', () => {
    test('should convert index to (x, y)', () => {
      const grid = new Grid(gridSide, gridSide, new Rules())
      expect(grid.indexToXy(0 + gridSide * 0)).toEqual({ x: 0, y: 0 })
      expect(grid.indexToXy(3 + gridSide * 3)).toEqual({ x: 3, y: 3 })
      expect(grid.indexToXy(1 + gridSide * 1)).toEqual({ x: 1, y: 1 })
      expect(grid.indexToXy(3 + gridSide * 0)).toEqual({ x: 3, y: 0 })
      expect(grid.indexToXy(0 + gridSide * 3)).toEqual({ x: 0, y: 3 })
    })
  })
})

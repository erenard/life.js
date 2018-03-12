import assert from 'assert'
import {describe, it} from 'mocha'
import Grid from 'game/grid'

describe('Grid', () => {
  describe('constructor', () => {
    it('should initialize a grid', () => {
      let grid = new Grid(10, 10)
      let cells = grid.Cells
      assert.equal(cells.length, 10 * 10)
    })
  })
  describe('get Cells ()', () => {
    it('should return the grid', () => {
      let grid = new Grid(10, 10)
      let cells = grid.Cells
      assert.equal(cells.length, 10 * 10)
    })
  })
  describe('get Size ()', () => {
    it('should return the grid size', () => {
      let grid = new Grid(10, 10)
      let size = grid.Size
      assert.deepEqual(size, {x: 10, y: 10, length: 10 * 10})
    })
  })
  describe('get Rules ()', () => {
    it('should return the grid rules', () => {
      let grid = new Grid(10, 10)
      let rules = grid.Rules
      assert.deepEqual(rules, {
        b: [false, false, false, false, false, false, false, false, false],
        s: [false, false, false, false, false, false, false, false, false]
      })
    })
  })
  describe('random (ratio)', () => {
    it('should fill the grid when ratio = 1', () => {
      let grid = new Grid(10, 10)
      grid.random(1)
      for (let i = 0; i < 100; i++) {
        assert.equal(grid.Cells[i].flip, true)
      }
    })
    it('should leave the grid empty when ratio = 0', () => {
      let grid = new Grid(10, 10)
      grid.random(0)
      for (let i = 0; i < 100; i++) {
        assert.equal(grid.Cells[i].flip, false)
      }
    })
  })
  describe('clear ()', () => {
    it('should clear the grid', () => {
      let grid = new Grid(10, 10)
      grid.Cells[0].state = 0
      grid.Cells[1].state = 1
      grid.clear()
      for (let i = 0; i < 100; i++) {
        assert.equal(grid.Cells[i].flip, true)
        assert.equal(grid.Cells[i].state, 1)
      }
    })
  })
  describe('update ()', () => {
    it('should update the grid', () => {
      let grid = new Grid(5, 5)
      for (let x = 0; x < grid.Size.x; x++) {
        for (let y = 0; y < grid.Size.x; y++) {
          grid.Cells[grid.xyToIndex(x, y)].sprite = {}
        }
      }
      grid.Cells[grid.xyToIndex(2, 1)].state = 1
      grid.Cells[grid.xyToIndex(2, 2)].state = 1
      grid.Cells[grid.xyToIndex(2, 3)].state = 1
      grid.birth[3] = true
      grid.survival[2] = true
      grid.survival[3] = true
      grid.update()
      assert.equal(grid.Cells[grid.xyToIndex(2, 1)].state, 0)
      assert.equal(grid.Cells[grid.xyToIndex(2, 3)].state, 0)
      assert.equal(grid.Cells[grid.xyToIndex(2, 2)].state, 1)
      assert.equal(grid.Cells[grid.xyToIndex(1, 2)].state, 1)
      assert.equal(grid.Cells[grid.xyToIndex(3, 2)].state, 1)
    })
  })
  describe('xyToIndex ()', () => {
    it('should convert (x, y) to index', () => {
      let grid = new Grid(10, 10)
      assert.equal(grid.xyToIndex(0, 0), 0)
      assert.equal(grid.xyToIndex(9, 9), 99)
      assert.equal(grid.xyToIndex(1, 1), 11)
      assert.equal(grid.xyToIndex(4, 0), 4)
      assert.equal(grid.xyToIndex(0, 4), 40)
    })
  })
  describe('indexToXy ()', () => {
    it('should convert index to (x, y)', () => {
      let grid = new Grid(10, 10)
      assert.deepEqual(grid.indexToXy(0), {x: 0, y: 0})
      assert.deepEqual(grid.indexToXy(99), {x: 9, y: 9})
      assert.deepEqual(grid.indexToXy(11), {x: 1, y: 1})
      assert.deepEqual(grid.indexToXy(4), {x: 4, y: 0})
      assert.deepEqual(grid.indexToXy(40), {x: 0, y: 4})
    })
  })
})

import assert from 'assert'
import {describe, it, beforeEach, afterEach} from 'mocha'
import { Rules } from 'game/cell'
// eslint-disable-next-line
import injectLoaderGrid from 'inject-loader!game/grid'
const Grid = injectLoaderGrid({
  './grid.worker': require('./grid.worker.wrapper').default
}).default

const gridSide = 4
const gridLength = gridSide * gridSide

describe('Grid', () => {
  let grid

  beforeEach(() => {
    grid = new Grid(gridSide, gridSide)
  })

  afterEach(() => {
    grid.worker.terminate()
  })

  describe('constructor', () => {
    it('should initialize a grid', () => {
      let cells = grid.Cells
      assert.equal(cells.length, gridLength)
    })
  })
  describe('get Cells ()', () => {
    it('should return the grid', () => {
      let cells = grid.Cells
      assert.equal(cells.length, gridLength)
    })
  })
  describe('get Size ()', () => {
    it('should return the grid size', () => {
      let size = grid.Size
      assert.deepEqual(size, {x: gridSide, y: gridSide, length: gridLength})
    })
  })
  describe('random (ratio)', () => {
    it('should fill the grid when ratio = 1', () => {
      grid.random(1)
      for (let i = 0; i < gridLength; i++) {
        assert.equal(grid.Cells[i].state, 1)
      }
    })
    it('should leave the grid empty when ratio = 0', () => {
      grid.random(0)
      for (let i = 0; i < gridLength; i++) {
        assert.equal(grid.Cells[i].state, 0)
      }
    })
  })
  describe('clear ()', () => {
    it('should clear the grid', () => {
      grid.Cells[0].state = 0
      grid.Cells[1].state = 1
      grid.clear()
      for (let i = 0; i < gridLength; i++) {
        assert.equal(grid.Cells[i].state, 0)
      }
    })
  })
  describe('update ()', () => {
    it('should update the grid', (done) => {
      for (let x = 0; x < grid.Size.x; x++) {
        for (let y = 0; y < grid.Size.x; y++) {
          grid.Cells[grid.xyToIndex(x, y)].sprite = {}
        }
      }
      grid.Cells[grid.xyToIndex(2, 1)].state = 1
      grid.Cells[grid.xyToIndex(2, 2)].state = 1
      grid.Cells[grid.xyToIndex(2, 3)].state = 1
      grid.postCellStatesArray()
      Rules.b[3] = true
      Rules.s[2] = true
      Rules.s[3] = true
      grid.postRules()
      grid.update()
      function waitForReady () {
        if (!grid.ready) {
          setTimeout(waitForReady, 100)
        } else {
          assert.equal(grid.Cells[grid.xyToIndex(2, 1)].state, 0)
          assert.equal(grid.Cells[grid.xyToIndex(2, 3)].state, 0)
          assert.equal(grid.Cells[grid.xyToIndex(2, 2)].state, 1)
          assert.equal(grid.Cells[grid.xyToIndex(1, 2)].state, 1)
          assert.equal(grid.Cells[grid.xyToIndex(3, 2)].state, 1)
          done()
        }
      }
      waitForReady()
    })
  })
  describe('xyToIndex ()', () => {
    it('should convert (x, y) to index', () => {
      assert.equal(grid.xyToIndex(0, 0), 0 + gridSide * 0)
      assert.equal(grid.xyToIndex(3, 3), 3 + gridSide * 3)
      assert.equal(grid.xyToIndex(1, 1), 1 + gridSide * 1)
      assert.equal(grid.xyToIndex(3, 0), 3 + gridSide * 0)
      assert.equal(grid.xyToIndex(0, 3), 0 + gridSide * 3)
    })
  })
  describe('indexToXy ()', () => {
    it('should convert index to (x, y)', () => {
      assert.deepEqual(grid.indexToXy(0 + gridSide * 0), {x: 0, y: 0})
      assert.deepEqual(grid.indexToXy(3 + gridSide * 3), {x: 3, y: 3})
      assert.deepEqual(grid.indexToXy(1 + gridSide * 1), {x: 1, y: 1})
      assert.deepEqual(grid.indexToXy(3 + gridSide * 0), {x: 3, y: 0})
      assert.deepEqual(grid.indexToXy(0 + gridSide * 3), {x: 0, y: 3})
    })
  })
})

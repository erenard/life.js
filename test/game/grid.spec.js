import assert from 'assert'
import {describe, it, beforeEach, afterEach} from 'mocha'
import {Rules} from 'game/cell'
// eslint-disable-next-line
import injectLoaderGrid from 'inject-loader!game/grid'
const Grid = injectLoaderGrid({
  './grid.worker': require('./grid.worker.wrapper').default
}).default

describe('Grid', () => {
  let grid

  beforeEach(() => {
    grid = new Grid(10, 10)
  })

  afterEach(() => {
    grid.worker.terminate()
  })

  describe('constructor', () => {
    it('should initialize a grid', () => {
      let cells = grid.Cells
      assert.equal(cells.length, 10 * 10)
    })
  })
  describe('get Cells ()', () => {
    it('should return the grid', () => {
      let cells = grid.Cells
      assert.equal(cells.length, 10 * 10)
    })
  })
  describe('get Size ()', () => {
    it('should return the grid size', () => {
      let size = grid.Size
      assert.deepEqual(size, {x: 10, y: 10, length: 10 * 10})
    })
  })
  describe('random (ratio)', () => {
    it('should fill the grid when ratio = 1', () => {
      grid.random(1)
      for (let i = 0; i < 100; i++) {
        assert.equal(grid.Cells[i].state, 1)
      }
    })
    it('should leave the grid empty when ratio = 0', () => {
      grid.random(0)
      for (let i = 0; i < 100; i++) {
        assert.equal(grid.Cells[i].state, 0)
      }
    })
  })
  describe('clear ()', () => {
    it('should clear the grid', () => {
      grid.Cells[0].state = 0
      grid.Cells[1].state = 1
      grid.clear()
      for (let i = 0; i < 100; i++) {
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
      Rules.b[3] = true
      Rules.s[2] = true
      Rules.s[3] = true
      grid.update()
      function waitForReady () {
        if (!grid.ready) {
          setTimeout(waitForReady)
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
      assert.equal(grid.xyToIndex(0, 0), 0)
      assert.equal(grid.xyToIndex(9, 9), 99)
      assert.equal(grid.xyToIndex(1, 1), 11)
      assert.equal(grid.xyToIndex(4, 0), 4)
      assert.equal(grid.xyToIndex(0, 4), 40)
    })
  })
  describe('indexToXy ()', () => {
    it('should convert index to (x, y)', () => {
      assert.deepEqual(grid.indexToXy(0), {x: 0, y: 0})
      assert.deepEqual(grid.indexToXy(99), {x: 9, y: 9})
      assert.deepEqual(grid.indexToXy(11), {x: 1, y: 1})
      assert.deepEqual(grid.indexToXy(4), {x: 4, y: 0})
      assert.deepEqual(grid.indexToXy(40), {x: 0, y: 4})
    })
  })
})

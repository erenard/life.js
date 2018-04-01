import { describe, it } from 'mocha'
import { assert, expect } from 'chai'

import { default as Cell, Rules } from 'game/cell'

describe('Cell', () => {
  describe('new ()', () => {
    it('should initialize a Cell', () => {
      var cell = new Cell()
      expect(cell).to.deep.equal({
        state: 0,
        flip: false,
        age: -1,
        sprite: null,
        count: 0
      })
    })
  })
  describe('update ()', () => {
    it('should keep a cell state', () => {
      var cell = new Cell()
      cell.update()
      expect(cell).to.deep.equal({
        state: 0,
        flip: false,
        age: -1,
        sprite: null,
        count: 0
      })
    })
    it('should flip a cell state (newborn)', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.flip = true
      cell.update()
      expect(cell).to.deep.equal({
        state: 1,
        flip: false,
        age: 0,
        sprite: {alpha: 0.5},
        count: 0
      })
    })
    it('should increment a cell age', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.flip = true
      Rules.s[0] = true
      cell.update()
      expect(cell.age).to.be.equal(0)
      console.log(cell)
      cell.update()
      console.log(cell)
      expect(cell.age).to.be.equal(1)
      Rules.s[0] = false
    })
    it('should flip a cell state (old)', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.flip = true
      Rules.s[0] = true
      cell.update()
      cell.age = 4
      cell.update()
      expect(cell.sprite.alpha).to.be.equal(1)
      Rules.s[0] = false
    })
    it('should flip a cell state (dead)', () => {
      var cell = new Cell()
      var dead = new Cell()
      cell.sprite = {}
      dead.sprite = {alpha: 0}
      cell.flip = true
      cell.update()
      cell.flip = true
      cell.update()
      expect(cell).to.deep.equal(dead)
    })
  })
  describe('get Rules ()', () => {
    it('should return the grid rules', () => {
      assert.deepEqual(Rules, {
        b: [false, false, false, false, false, false, false, false, false],
        s: [false, false, false, false, false, false, false, false, false]
      })
    })
  })
})

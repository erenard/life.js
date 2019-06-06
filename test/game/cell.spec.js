import { describe, it, beforeEach } from 'mocha'
import { assert, expect } from 'chai'

import Cell, { Rules } from 'game/cell'

describe('Cell', () => {
  beforeEach(() => {
    Rules.b = [false, false, false, false, false, false, false, false, false]
    Rules.s = [false, false, false, false, false, false, false, false, false]
  })
  describe('new ()', () => {
    it('should initialize a Cell', () => {
      var cell = new Cell()
      expect(cell).to.deep.equal({
        state: 0,
        age: 0,
        sprite: {},
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
        age: 0,
        sprite: {},
        count: 0
      })
    })
    it('should reborn a cell', () => {
      var cell = new Cell()
      cell.sprite = {}
      Rules.b[0] = true
      cell.update()
      expect(cell).to.deep.equal({
        state: 1,
        age: 0,
        sprite: { alpha: 0.5 },
        count: 0
      })
    })
    it('should increment a living cell age', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.state = 1
      Rules.s[0] = true
      cell.update()
      expect(cell.age).to.be.equal(1)
    })
    it('should keep a dead cell age', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.update()
      expect(cell.age).to.be.equal(0)
    })
    it('should update the opacity at age == 5', () => {
      var cell = new Cell()
      cell.state = 1
      cell.sprite = {}
      cell.age = 4
      Rules.s[0] = true
      cell.update()
      expect(cell.sprite.alpha).to.be.equal(1)
    })
    it('should kill a cell', () => {
      var cell = new Cell()
      cell.state = 1
      cell.sprite = {}
      var dead = new Cell()
      dead.sprite = { alpha: 0 }
      cell.update()
      expect(cell).to.deep.equal(dead)
    })
  })
  describe('get Rules ()', () => {
    it('should return the rules', () => {
      assert.deepEqual(Rules, {
        b: [false, false, false, false, false, false, false, false, false],
        s: [false, false, false, false, false, false, false, false, false]
      })
    })
  })
})

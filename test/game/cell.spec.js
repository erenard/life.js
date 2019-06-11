// import { describe, it, beforeEach } from 'mocha'
import { assert, expect } from 'chai'

import Cell from 'game/cell'
import Rules from 'game/rules'

describe('Cell', () => {
  let rules
  beforeEach(() => {
    rules = new Rules()
  })
  describe('new ()', () => {
    it('should initialize a Cell', () => {
      var cell = new Cell(rules)
      expect(cell).to.deep.equal({
        state: 0,
        age: 0,
        sprite: {},
        count: 0,
        rules
      })
    })
  })
  describe('get isLiving ()', () => {
    it('should return {state === 1}', () => {
      const cell = new Cell(rules)
      expect(cell.isLiving).to.equal(false)
      cell.state = 1
      expect(cell.isLiving).to.equal(true)
    })
  })
  describe('update ()', () => {
    it('should keep a cell state', () => {
      var cell = new Cell(rules)
      cell.update()
      expect(cell).to.deep.equal({
        state: 0,
        age: 0,
        sprite: {},
        count: 0,
        rules
      })
    })
    it('should reborn a cell', () => {
      var cell = new Cell(rules)
      cell.sprite = {}
      rules.b[0] = true
      cell.update()
      expect(cell).to.deep.equal({
        state: 1,
        age: 0,
        sprite: { alpha: 0.5 },
        count: 0,
        rules
      })
    })
    it('should increment a living cell age', () => {
      var cell = new Cell(rules)
      cell.sprite = {}
      cell.state = 1
      rules.s[0] = true
      cell.update()
      expect(cell.age).to.be.equal(1)
    })
    it('should keep a dead cell age', () => {
      var cell = new Cell(rules)
      cell.sprite = {}
      cell.update()
      expect(cell.age).to.be.equal(0)
    })
    it('should update the opacity at age == 5', () => {
      var cell = new Cell(rules)
      cell.state = 1
      cell.sprite = {}
      cell.age = 4
      rules.s[0] = true
      cell.update()
      expect(cell.sprite.alpha).to.be.equal(1)
    })
    it('should kill a cell', () => {
      var cell = new Cell(rules)
      cell.state = 1
      cell.sprite = {}
      var dead = new Cell(rules)
      dead.sprite = { alpha: 0 }
      cell.update()
      expect(cell).to.deep.equal(dead)
    })
  })
  describe('get rules ()', () => {
    it('should return the rules', () => {
      assert.deepEqual(rules, {
        b: [false, false, false, false, false, false, false, false, false],
        s: [false, false, false, false, false, false, false, false, false]
      })
    })
  })
})

import {describe, it} from 'mocha'
import {expect} from 'chai'

import Cell from 'game/cell'

describe('Cell', () => {
  describe('new ()', () => {
    it('should initialize a Cell', () => {
      var cell = new Cell()
      expect(cell).to.deep.equal({
        state: 0,
        flip: false,
        age: -1,
        sprite: null
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
        sprite: null
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
        sprite: {alpha: 0.5}
      })
    })
    it('should increment a cell age', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.flip = true
      cell.update()
      expect(cell.age).to.be.equal(0)
      cell.update()
      expect(cell.age).to.be.equal(1)
    })
    it('should flip a cell state (old)', () => {
      var cell = new Cell()
      cell.sprite = {}
      cell.flip = true
      cell.update()
      cell.age = 4
      cell.update()
      expect(cell.sprite.alpha).to.deep.equal(1)
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
})

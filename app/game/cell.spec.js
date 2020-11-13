import { describe, beforeEach, test, expect } from '@jest/globals'
import Cell from './cell'
import Rules from './rules'

describe('Cell', () => {
  let rules
  beforeEach(() => {
    rules = new Rules()
  })
  describe('new ()', () => {
    test('should initialize a Cell', () => {
      var cell = new Cell(rules)
      expect(cell).toEqual({
        rules,
        state: 0,
        age: 0,
        sprite: { alpha: 0 },
        count: 0
      })
    })
  })
  describe('get isLiving ()', () => {
    test('should return {state === 1}', () => {
      const cell = new Cell(rules)
      expect(cell.isLiving).toBeFalsy()
      cell.state = 1
      expect(cell.isLiving).toBeTruthy()
    })
  })
  describe('update ()', () => {
    test('should keep a cell state', () => {
      var cell = new Cell(rules)
      cell.update()
      expect(cell).toEqual({
        state: 0,
        age: 0,
        sprite: { alpha: 0 },
        count: 0,
        rules
      })
    })
    test('should reborn a cell', () => {
      var cell = new Cell(rules)
      cell.sprite = {}
      rules.b[0] = true
      cell.update()
      expect(cell).toEqual({
        state: 1,
        age: 0,
        sprite: { alpha: 0.5 },
        count: 0,
        rules
      })
    })
    test('should increment a living cell age', () => {
      var cell = new Cell(rules)
      cell.sprite = {}
      cell.state = 1
      rules.s[0] = true
      cell.update()
      expect(cell.age).toEqual(1)
    })
    test('should keep a dead cell age', () => {
      var cell = new Cell(rules)
      cell.sprite = {}
      cell.update()
      expect(cell.age).toEqual(0)
    })
    test('should update the opacity at age == 5', () => {
      var cell = new Cell(rules)
      cell.state = 1
      cell.sprite = {}
      cell.age = 4
      rules.s[0] = true
      cell.update()
      expect(cell.sprite.alpha).toEqual(1)
    })
    test('should kill a cell', () => {
      var cell = new Cell(rules)
      cell.state = 1
      cell.sprite = {}
      var dead = new Cell(rules)
      dead.sprite = { alpha: 0 }
      cell.update()
      expect(cell).toEqual(dead)
    })
  })
})

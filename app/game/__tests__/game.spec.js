import { describe, beforeEach, afterEach, test, expect, jest } from '@jest/globals'
import Board from '../board'
import Game from '../game'
import Grid from '../grids'
import Rules from '../rules'
import Animation from '../../render/animation'
import Renderer from '../../render/renderer'

jest.mock('../../render/animation')
jest.mock('../../render/renderer')
jest.mock('../grids/grid-no-worker')

describe('Game', () => {
  let game, GridImplementation
  beforeEach(async () => {
    await Grid.load('no-worker')
    GridImplementation = Grid.get()
    game = new Game()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should initalize the game', () => {
    expect(game.rules).toEqual(new Rules().preset)
    expect(game.board).toEqual({
      cellRadius: 2,
      gridHeight: 400,
      gridWidth: 400,
      seedRatio: 0.3
    })
  })
  test('should create the animation', () => {
    expect(Animation).toHaveBeenCalledTimes(1)
    expect(game.running).toEqual(new Animation().running)
  })
  test('should create a grid', () => {
    expect(GridImplementation).toHaveBeenCalledTimes(1)
  })
  test('should randomize fill the grid', () => {
    expect(game._grid.random).toHaveBeenCalledTimes(1)
  })

  describe('set a viewport', () => {
    const viewport = {}
    beforeEach(() => {
      game.viewport = viewport
    })
    test('should create a renderer', () => {
      expect(Renderer).toHaveBeenCalledTimes(1)
    })
    test('should initialize the animation', () => {
      expect(game._animation.init).toHaveBeenCalledTimes(1)
    })
  })

  describe('set benchmark mode', () => {
    test('should set to true animation benchmarking', () => {
      game.benchmarking = true
      expect(game._animation.benchmarking).toEqual(true)
    })
    test('should set to false animation benchmarking', () => {
      game.benchmarking = false
      expect(game._animation.benchmarking).toEqual(false)
    })
  })

  describe('board accessors', () => {
    describe('getter', () => {
      let board
      beforeEach(() => {
        board = game.board
      })
      test('get the values', () => {
        expect(board).toEqual(new Board())
      })
    })
    describe('setter', () => {
      const board = new Board()
      beforeEach(() => {
        game.board = board
      })
      test('set the values', () => {
        expect(game.board).toEqual(board)
      })
      test('create a grid', () => {
        expect(GridImplementation).toHaveBeenCalledTimes(2)
      })

      test('create a renderer', () => {
        expect(Renderer).toHaveBeenCalledTimes(1)
      })
      describe('with an existing renderer', () => {
        let previousRenderer
        beforeEach(() => {
          previousRenderer = game._renderer
          game.board = board
        })
        test('destroy the previous renderer', () => {
          expect(previousRenderer.destroy).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
  describe('rules accessors', () => {
    describe('getter', () => {
      let rules
      beforeEach(() => {
        rules = game.rules
      })
      test('get the rules as a preset', () => {
        expect(rules).toEqual(new Rules().preset)
      })
    })
    describe('setter', () => {
      const rules = new Rules().preset
      beforeEach(() => {
        game.rules = rules
      })
      test('set the rules as a preset', () => {
        expect(game.rules).toEqual(rules)
      })
    })
  })
  describe('running accessors', () => {
    describe('getter', () => {
      let running
      beforeEach(() => {
        running = game.running
      })
      test('get the running as a preset', () => {
        expect(running).toEqual(game._animation.running)
      })
    })
    describe.each([[true, 'start'], [false, 'stop']])('set %s', (state, method) => {
      beforeEach(() => {
        game.running = state
      })
      test(`should call ${method}`, () => {
        expect(game._animation[method]).toHaveBeenCalledTimes(1)
      })
    })
  })
  describe('step method', () => {
    beforeEach(() => {
      game.step()
    })
    test('should call animation.mainLoop', () => {
      expect(game._animation.mainLoop).toHaveBeenCalledTimes(1)
    })
  })
})

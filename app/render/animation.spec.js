import { describe, test, expect, jest, afterEach } from '@jest/globals'
import stats from '../gui/stats'

import Animation from '../render/animation'

jest.mock('../gui/stats')

describe('Animation', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  const grid = {
    update: jest.fn()
  }
  const renderer = {
    render: jest.fn()
  }

  describe('new ()', () => {
    test('should initialize the Animation', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      expect(animation.running).toEqual(false)
    })
  })

  describe('mainLoop ()', () => {
    test('should call grid.update() before renderer.render()', () => {
      const calls = []
      grid.update.mockImplementation(() => {
        calls.push('grid.update')
      })
      renderer.render.mockImplementation(() => {
        calls.push('renderer.render')
      })
      const animation = new Animation()
      animation.init(grid, renderer)
      //
      animation.mainLoop()
      //
      expect(calls).toEqual(['grid.update', 'renderer.render'])
    })
  })

  describe('start ()', () => {
    test('should set running to true', () => {
      const animation = new Animation()
      animation.start()
      expect(animation.running).toBeTruthy()
    })
    test('should start the animation', () => {
      const animation = new Animation()
      animation.animate = jest.fn()
      animation.start()
      expect(animation.animate).toBeCalledTimes(1)
    })
  })

  describe('stop ()', () => {
    test('should set running to false', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.running = true
      animation.stop()
      expect(!animation.running).toBeTruthy()
    })
  })

  describe('animate ()', () => {
    test('should measure the mainLoop execution time', () => {
      const animation = new Animation()
      animation.start()
      expect(stats.begin).toBeCalledTimes(1)
      expect(stats.end).toBeCalledTimes(1)
      animation.animate()
      expect(stats.begin).toBeCalledTimes(2)
      expect(stats.end).toBeCalledTimes(2)
    })
  })
})

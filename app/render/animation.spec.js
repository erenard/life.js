import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals'
import stats from '../gui/stats'
import requestAnimationFrame from './request-animation-frame'

import Animation from '../render/animation'

jest.mock('./request-animation-frame')
jest.mock('../gui/stats')

describe('Animation', () => {
  let animation

  const grid = {
    update: jest.fn()
  }

  const renderer = {
    render: jest.fn()
  }

  beforeEach(() => {
    animation = new Animation()
    animation.init(grid, renderer)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('new ()', () => {
    test('should initialize the Animation', () => {
      expect(animation.running).toEqual(false)
    })
  })

  describe('mainLoop ()', () => {
    test('should call grid.update() before renderer.render()', async () => {
      const calls = []
      grid.update.mockImplementation(() => {
        calls.push('grid.update')
      })
      renderer.render.mockImplementation(() => {
        calls.push('renderer.render')
      })
      //
      await animation.mainLoop()
      //
      expect(calls).toEqual(['grid.update', 'renderer.render'])
    })
  })

  describe('stop ()', () => {
    test('should set running to false', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.running = true
      animation.stop()
      expect(animation.running).toBeFalsy()
    })
  })

  describe('start ()', () => {
    test('should set running to true', async () => {
      await animation.start()
      expect(animation.running).toBeTruthy()
    })
    test('do nothing when grid is uninitialized', async () => {
      animation.grid = null
      await animation.start()
      expect(animation.running).toBeFalsy()
    })
    test('do nothing when renderer is uninitialized', async () => {
      animation.renderer = null
      await animation.start()
      expect(animation.running).toBeFalsy()
    })
  })

  describe('when benchmarking', () => {
    beforeEach(() => {
      animation.benchmarking = true
    })
    describe('start ()', () => {
      test('should start the benchmark', async () => {
        animation.benchmark = jest.fn()
        await animation.start()
        expect(animation.benchmark).toBeCalledTimes(1)
      })
    })
  })
  describe('when not benchmarking', () => {
    beforeEach(() => {
      animation.benchmarking = false
    })
    describe('start ()', () => {
      test('should start the animation', async () => {
        animation.animate = jest.fn()
        await animation.start()
        expect(animation.animate).toBeCalledTimes(1)
      })
    })
  })

  describe('when running', () => {
    beforeEach(() => {
      animation.running = true
    })

    describe('animate ()', () => {
      test('should measure the mainLoop execution time', async () => {
        await animation.animate()
        expect(grid.update).toBeCalledTimes(1)
        expect(renderer.render).toBeCalledTimes(1)
        expect(stats.begin).toBeCalledTimes(1)
        expect(stats.end).toBeCalledTimes(1)
        expect(requestAnimationFrame).toBeCalledTimes(1)
      })
    })

    describe('benchmark ()', () => {
      test('should measure the 100 update execution time', async () => {
        await animation.benchmark()
        expect(grid.update).toBeCalledTimes(100)
        expect(renderer.render).toBeCalledTimes(0)
        expect(stats.begin).toBeCalledTimes(100)
        expect(stats.end).toBeCalledTimes(100)
        expect(requestAnimationFrame).toBeCalledTimes(1)
      })
    })
  })

  describe('when not running', () => {
    beforeEach(() => {
      animation.running = false
    })

    describe('animate ()', () => {
      test('should measure the mainLoop execution time', async () => {
        await animation.animate()
        expect(grid.update).toBeCalledTimes(0)
        expect(renderer.render).toBeCalledTimes(0)
        expect(stats.begin).toBeCalledTimes(0)
        expect(stats.end).toBeCalledTimes(0)
        expect(requestAnimationFrame).toBeCalledTimes(0)
      })
    })

    describe('benchmark ()', () => {
      test('should measure the 100 update execution time', async () => {
        await animation.benchmark()
        expect(grid.update).toBeCalledTimes(0)
        expect(renderer.render).toBeCalledTimes(0)
        expect(stats.begin).toBeCalledTimes(0)
        expect(stats.end).toBeCalledTimes(0)
        expect(requestAnimationFrame).toBeCalledTimes(0)
      })
    })
  })
})

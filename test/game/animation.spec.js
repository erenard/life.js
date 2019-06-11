import { assert } from 'chai'
import sinon from 'sinon'

import Animation from 'game/animation'

describe('Animation', () => {
  const grid = {
    update: sinon.spy()
  }
  const renderer = {
    render: sinon.spy()
  }

  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('new ()', () => {
    it('should initialize the Animation', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      assert.equal(animation.running, false)
    })
  })

  describe('animate ()', () => {
    it('should measure the callback time', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.animate()
      beginSpy.calledBefore(updateFunction)
      updateFunction.calledBefore(endSpy)
    })
    it('should call the callback function', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.animate()
      assert(updateFunction.called)
    })
    it('should do nothing if stopped', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.stop()
      animation.animate()
      assert(updateFunction.notCalled)
    })
    it('should call requestAnimationFrame', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.animate()
      rafMock.verify()
    })
  })

  describe('start ()', () => {
    it('should set running to true', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.running = false
      animation.start()
      assert(animation.running)
    })
    it('should call animate', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.start()
      assert(updateFunction.called)
    })
  })

  describe('stop ()', () => {
    it('should set running to false', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      animation.running = true
      animation.stop()
      assert(!animation.running)
    })
  })
})

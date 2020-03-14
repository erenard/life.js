/* global it, describe */

import { assert } from 'chai'
import sinon from 'sinon'

import stats from 'gui/stats'

import Animation from 'render/animation'
stats.begin = sinon.spy()
stats.end = sinon.spy()

describe('Animation', () => {
  const grid = {
    update: sinon.spy()
  }
  const renderer = {
    render: sinon.spy()
  }

  describe('new ()', () => {
    it('should initialize the Animation', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      assert.equal(animation.running, false)
    })
  })

  describe('mainLoop ()', () => {
    it('should call grid.update() before renderer.render()', () => {
      const animation = new Animation()
      animation.init(grid, renderer)
      //
      animation.mainLoop()
      //
      grid.update.calledBefore(renderer.render)
    })
  })

  describe('start ()', () => {
    it('should set running to true', () => {
      const animation = new Animation()
      animation.start()
      assert(animation.running)
    })
    it('should start the animation', () => {
      const animation = new Animation()
      animation.animate = sinon.spy()
      animation.start()
      assert(animation.animate.calledOnce)
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

  describe('animate ()', () => {
    it('should measure the mainLoop execution time', () => {
      const animation = new Animation()
      animation.animate()
      assert(stats.begin.calledOnce)
      assert(stats.end.calledOnce)
    })
  })
})

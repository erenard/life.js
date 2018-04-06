import { describe, it, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import sinon from 'sinon'
// eslint-disable-next-line
import injectAnimation from 'inject-loader!game/animation'

describe('Animation', () => {
  var updateFunction = sinon.spy()
  var beginSpy = sinon.spy()
  var endSpy = sinon.spy()
  var StatsMock = function StatsMock () {
    this.begin = beginSpy
    this.end = endSpy
  }
  var requestAnimationFrame = sinon.spy()
  var Animation

  beforeEach(() => {
    // create mocked module
    Animation = injectAnimation({
      './request-animation-frame': requestAnimationFrame,
      'stats.js': StatsMock
    }).default
  })

  afterEach(() => {
    updateFunction.resetHistory()
    beginSpy.resetHistory()
    endSpy.resetHistory()
    requestAnimationFrame.resetHistory()
  })

  describe('new ()', () => {
    it('should initialize the Animation', () => {
      var animation = new Animation(updateFunction)
      assert.deepEqual(animation, {
        running: true,
        callback: updateFunction,
        stats: new StatsMock()
      })
    })
  })

  describe('animate ()', () => {
    it('should measure the callback time', () => {
      var animation = new Animation(updateFunction)
      animation.animate()
      beginSpy.calledBefore(updateFunction)
      updateFunction.calledBefore(endSpy)
    })
    it('should call the callback function', () => {
      var animation = new Animation(updateFunction)
      animation.animate()
      assert(updateFunction.called)
    })
    it('should do nothing if stopped', () => {
      var animation = new Animation(updateFunction)
      animation.stop()
      animation.animate()
      assert(updateFunction.notCalled)
    })
    it('should call requestAnimationFrame', () => {
      var animation = new Animation(updateFunction)
      animation.animate()
      assert(requestAnimationFrame.called)
    })
  })

  describe('start ()', () => {
    it('should set running to true', () => {
      var animation = new Animation(updateFunction)
      animation.running = false
      animation.start()
      assert(animation.running)
    })
    it('should call animate', () => {
      var animation = new Animation(updateFunction)
      animation.start()
      assert(updateFunction.called)
    })
  })

  describe('stop ()', () => {
    it('should set running to false', () => {
      var animation = new Animation()
      animation.running = true
      animation.stop()
      assert(!animation.running)
    })
  })
})

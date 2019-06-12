/* global it, describe, beforeEach, afterEach */
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import UserInterface from '../../app/components/UserInterface.vue'

import Game from '../../app/game'

describe('UserInterface.vue', () => {
  const game = new Game()
  // const start = sinon.spy(game, 'start')
  // const stop = sinon.spy(game, 'stop')
  // const step = sinon.spy(game, 'step')
  // const random = sinon.spy(game, 'random')
  // const clear = sinon.spy(game, 'clear')

  let wrapper
  beforeEach(() => {
    sinon.replace(game, 'start', sinon.fake())
    sinon.replace(game, 'stop', sinon.fake())
    sinon.replace(game, 'step', sinon.fake())
    sinon.replace(game, 'random', sinon.fake())
    sinon.replace(game, 'clear', sinon.fake())
    wrapper = shallowMount(UserInterface, {
      propsData: {
        game
      }
    })
  })
  afterEach(() => {
    sinon.restore()
  })
  it('should initialize started', () => {
    expect(wrapper.vm.isStarted).to.equal(true)
  })
  it('should pause when hitting the button', () => {
    wrapper.vm.isStarted = true
    wrapper.vm.handleClickPause()
    expect(wrapper.vm.isStarted).to.equal(false)
  })
  it('should resume when hitting the button', () => {
    wrapper.vm.isStarted = false
    wrapper.vm.handleClickPause()
    expect(wrapper.vm.isStarted).to.equal(true)
  })
  it('should call game.pause() when hitting the button', () => {
    wrapper.vm.isStarted = true
    wrapper.vm.handleClickPause()
    assert(game.stop.calledOnce)
  })
  it('should call game.resume() when hitting the button', () => {
    wrapper.vm.isStarted = false
    wrapper.vm.handleClickPause()
    assert(game.start.calledOnce)
  })
  it('should call game.step() when hitting the button', () => {
    wrapper.vm.isStarted = false
    wrapper.vm.handleClickStep()
    assert(game.step.calledOnce)
  })
  it('should call game.clear() when hitting the button', () => {
    wrapper.vm.handleClickClear()
    assert(game.clear.calledOnce)
  })
  it('should call game.random() when hitting the button', () => {
    wrapper.vm.randomRatio = 1234
    wrapper.vm.handleClickRandom()
    assert(game.random.calledOnce)
    expect(game.random.lastArg === 1234)
  })
})

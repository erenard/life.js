/* global it, describe, beforeEach, afterEach */
import { expect } from 'chai'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import UserInterface from '../../app/components/UserInterface.vue'

import Game from '../../app/game'

describe('UserInterface.vue', () => {
  const game = new Game()
  const start = sinon.spy(game, 'start')
  const stop = sinon.spy(game, 'stop')
  const step = sinon.spy(game, 'step')
  const random = sinon.spy(game, 'random')
  const clear = sinon.spy(game, 'clear')

  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(UserInterface, {
      propsData: {
        game
      }
    })
  })
  afterEach(() => {
    start.restore()
    stop.restore()
    step.restore()
    random.restore()
    clear.restore()
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
  it('should pause the game when hitting the button', () => {
    wrapper.vm.isStarted = true
    wrapper.vm.handleClickPause()
    expect(wrapper.vm.isStarted).to.equal(true)
    expect(stop.called).to.equal(true)
  })
  it('should resume the game when hitting the button', () => {
    wrapper.vm.isStarted = false
    wrapper.vm.handleClickPause()
    expect(start.called).to.equal(true)
  })
})

/* global it, describe, beforeEach */
import { expect, assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import UserInterface from './user-interface.vue'

describe('UserInterface.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(UserInterface)
  })

  it('should initialize started', () => {
    expect(wrapper.vm.isStarted).to.equal(true)
  })

  it('should pause when hitting the button', () => {
    wrapper.find('.ui__play-pause__button').trigger('click')
    expect(wrapper.vm.isStarted).to.equal(false)
  })

  it('should emit "pause" when hitting the button', () => {
    wrapper.find('.ui__play-pause__button').trigger('click')
    assert(wrapper.emitted('stop'))
  })

  it('should emit "clear" when hitting the button', () => {
    wrapper.find('.ui__clear__button').trigger('click')
    assert(wrapper.emitted('clear'))
  })

  it('should emit "random" when hitting the button', () => {
    wrapper.vm.randomRatio = 1234
    wrapper.find('.ui__random__button').trigger('click')
    assert(wrapper.emitted('random'))
    expect(wrapper.emitted('random')[0]).to.deep.equal([12.34])
  })

  describe('when the game state == stopped', () => {
    beforeEach(() => {
      wrapper.vm.isStarted = false
      return wrapper.vm.$nextTick()
    })

    it('should resume when hitting the button', () => {
      wrapper.find('.ui__play-pause__button').trigger('click')
      expect(wrapper.vm.isStarted).to.equal(true)
    })

    it('should emit "resume" when hitting the button', () => {
      wrapper.find('.ui__play-pause__button').trigger('click')
      assert(wrapper.emitted('start'))
    })

    it('should emit "step" when hitting the button', () => {
      wrapper.find('.ui__step__button').trigger('click')
      expect(wrapper.vm.isStarted).to.equal(false)
      assert(wrapper.emitted('step'))
    })
  })
})

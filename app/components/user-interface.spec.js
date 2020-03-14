/* global it, describe, beforeEach */
import { expect, assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import UserInterface from './user-interface.vue'

describe('UserInterface.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(UserInterface)
  })

  it('should emit "clear" when hitting the button', () => {
    wrapper.find('.ui__clear__button').trigger('click')
    assert(wrapper.emitted('clear'))
  })

  it('should emit "random" when hitting the button', () => {
    wrapper.vm.randomRatio = 1234
    wrapper.find('.ui__random__button').trigger('click')
    expect(wrapper.emitted('random')[0]).to.deep.equal([12.34])
  })
})

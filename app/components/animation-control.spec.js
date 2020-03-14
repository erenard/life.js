/* global it, describe, beforeEach */
import { expect, assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'
import AnimationControl from './animation-control.vue'

describe('AnimationControl', () => {
  let wrapper

  describe('when mounted', () => {
    beforeEach(() => {
      wrapper = shallowMount(AnimationControl, {
        propsData: {
          value: false
        }
      })
      return wrapper.vm.$nextTick()
    })

    it('should emit input(true)', () => {
      expect(wrapper.emitted('input')[0]).to.deep.equal([true])
    })
  })

  describe('when the animation is started', () => {
    beforeEach(() => {
      wrapper = shallowMount(AnimationControl, {
        propsData: {
          value: true
        }
      })
      return wrapper.vm.$nextTick()
    })

    it('should display Pause', () => {
      expect(wrapper.find('.ui__play-pause__button').text()).to.equal('Pause')
    })

    it('should emit "stop" when hitting the pause button', () => {
      wrapper.find('.ui__play-pause__button').trigger('click')
      expect(wrapper.emitted('input')[1]).to.deep.equal([false])
    })
  })

  describe('when the animation is stopped', () => {
    const animation = {
      mainLoop: sinon.spy()
    }
    beforeEach(() => {
      wrapper = shallowMount(AnimationControl, {
        propsData: {
          value: false,
          animation
        }
      })
      return wrapper.vm.$nextTick()
    })

    it('should display Resume', () => {
      expect(wrapper.find('.ui__play-pause__button').text()).to.equal('Resume')
    })

    it('should emit "start" when hitting the resume button', () => {
      wrapper.find('.ui__play-pause__button').trigger('click')
      expect(wrapper.emitted('input')[1]).to.deep.equal([true])
    })

    it('should emit "step" when hitting the button', () => {
      wrapper.find('.ui__step__button').trigger('click')
      assert(animation.mainLoop.calledOnce)
    })
  })
})

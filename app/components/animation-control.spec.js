import { describe, beforeEach, test, expect } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import AnimationControl from './animation-control.vue'

describe('AnimationControl', () => {
  let wrapper

  async function createWrapper (propsData) {
    wrapper = shallowMount(AnimationControl, {
      propsData: {
        running: false,
        benchmarking: false,
        ...propsData
      }
    })
    await wrapper.vm.$nextTick()
  }

  describe('when the animation is running', () => {
    beforeEach(async () => {
      await createWrapper({
        running: true
      })
    })

    test('should display Pause', () => {
      expect(wrapper.find('.ui__play-pause__button').text()).toEqual('Pause')
    })

    test('should emit "stop" when hitting the pause button', () => {
      wrapper.find('.ui__play-pause__button').trigger('click')
      expect(wrapper.emitted('running')).toEqual([[]])
    })

    test('should emit "benchmark" when hitting the benchmark button', () => {
      wrapper.find('.ui__benchmark__button').trigger('click')
      expect(wrapper.emitted('benchmarking')).toEqual([[]])
    })

    test('should hide the step button', () => {
      expect(wrapper.find('.ui__step__button').exists()).toBe(false)
    })
  })

  describe('when the animation is stopped', () => {
    beforeEach(async () => {
      await createWrapper()
    })

    test('should display Resume', () => {
      expect(wrapper.find('.ui__play-pause__button').text()).toEqual('Resume')
    })

    test('should emit "start" when hitting the resume button', () => {
      wrapper.find('.ui__play-pause__button').trigger('click')
      expect(wrapper.emitted('running')).toEqual([[]])
    })

    test('should emit "step" when hitting the button', () => {
      wrapper.find('.ui__step__button').trigger('click')
      expect(wrapper.emitted('step')[0]).toEqual([])
    })

    test('should show the step button', () => {
      expect(wrapper.find('.ui__step__button').exists()).toBe(true)
    })
  })

  describe('the benchmark button', () => {
    describe('when not benchmarking', () => {
      beforeEach(async () => {
        await createWrapper()
      })

      test('should display off', () => {
        expect(wrapper.find('.ui__benchmark__button').text()).toEqual('benchmark: off')
      })
    })
    describe('when benchmarking', () => {
      beforeEach(async () => {
        await createWrapper({
          benchmarking: true
        })
      })

      test('should display on', () => {
        expect(wrapper.find('.ui__benchmark__button').text()).toEqual('benchmark: on')
      })
    })
  })
})

import { describe, beforeEach, test, expect, afterEach } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import AppVue from './app.vue'

describe('AppVue', () => {
  const game = {
    animation: {},
    rules: 'b1s1',
    running: true,
    size: {}
  }

  let wrapper

  async function createWrapper () {
    wrapper = shallowMount(AppVue, {
      propsData: {
        game
      }
    })
    await wrapper.vm.$nextTick()
  }

  beforeEach(async () => {
    await createWrapper()
  })

  afterEach(async () => {
    if (wrapper) wrapper.destroy()
  })

  describe('when mounted', () => {
    test('should emit the viewport element', () => {
      expect(wrapper.emitted('viewport')[0][0]).toEqual(wrapper.vm.$refs.viewport)
    })
  })

  describe.each([
    ['animationcontrol', 'start', 'running', true],
    ['animationcontrol', 'stop', 'running', false],
    ['ruleseditor', 'change', 'rules', 'my_rules'],
    ['boardeditor', 'change', 'size', { size: 'my_size' }]
  ])('when %s %s', (componentName, title, eventName, payload) => {
    beforeEach(async () => {
      wrapper.find(`${componentName}-stub`).vm.$emit('input', payload)
      await wrapper.vm.$nextTick()
    })

    test(`should emit('${eventName}', ${payload})`, async () => {
      expect(wrapper.emitted(eventName)[0]).toEqual([payload])
    })
  })
})

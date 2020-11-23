import { describe, beforeEach, test, expect, afterEach, jest } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import AppVue, { game } from './app.vue'

// Do not touch the next line
jest.mock('./game/game.js')

describe('AppVue', () => {
  let wrapper

  async function createWrapper () {
    wrapper = shallowMount(AppVue, {
    })
    await wrapper.vm.$nextTick()
  }

  beforeEach(async () => {
    game.mockReturnValues()
    await createWrapper()
  })

  afterEach(async () => {
    jest.resetAllMocks()
    if (wrapper) wrapper.destroy()
  })

  describe('when mounted', () => {
    test('should emit the viewport element', async () => {
      expect(game.setViewportMock).toHaveBeenCalledTimes(1)
    })
  })

  describe.each([
    ['animationcontrol', 'running', game.setRunningMock, true],
    ['animationcontrol', 'running', game.setRunningMock, false],
    ['ruleseditor', 'rules', game.setRulesMock, 'my_rules'],
    ['boardeditor', 'size', game.setSizeMock, { size: 'my_size' }]
  ])('when %s change %s', (componentName, title, mock, payload) => {
    beforeEach(async () => {
      wrapper.find(`${componentName}-stub`).vm.$emit('input', payload)
      await wrapper.vm.$nextTick()
    })

    test(`should set ${title} to ${payload}`, async () => {
      expect(mock).toHaveBeenCalledTimes(1)
      expect(mock).toHaveBeenCalledWith(payload)
    })
  })
})

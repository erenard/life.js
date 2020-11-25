import { describe, beforeEach, test, expect, afterEach, jest } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import AppVue, { game } from './app.vue'
import Board from './game/board.js'

// Do not touch the next line
jest.mock('./game/game.js')

describe('AppVue', () => {
  let wrapper

  async function createWrapper () {
    wrapper = shallowMount(AppVue)
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
    test('should set the viewport element', async () => {
      expect(game.setViewportMock).toHaveBeenCalledTimes(1)
    })
    test('should set running true', async () => {
      expect(game.setRunningMock).toHaveBeenCalledTimes(1)
      expect(game.setRunningMock).toHaveBeenCalledWith(true)
    })
    test('should pass running to the animation-control', () => {
      expect(wrapper.find('animationcontrol-stub').props('running')).toEqual(true)
    })
    test('should pass board to the board-editor', () => {
      expect(wrapper.find('boardeditor-stub').props('board')).toEqual(new Board())
    })
    test('should pass value to the rules-editor', () => {
      expect(wrapper.find('ruleseditor-stub').props('value')).toEqual('b0s0')
    })
  })

  describe.each([
    ['animationcontrol', 'running', game.setRunningMock, true],
    ['animationcontrol', 'running', game.setRunningMock, false],
    ['ruleseditor', 'rules', game.setRulesMock, 'my_rules'],
    ['boardeditor', 'size', game.setSizeMock, new Board({ cellRadius: 5 })]
  ])('when %s change %s', (componentName, title, mock, payload) => {
    beforeEach(async () => {
      wrapper.find(`${componentName}-stub`).vm.$emit('input', payload)
      await wrapper.vm.$nextTick()
    })

    test(`should set ${title} to ${payload}`, async () => {
      expect(mock).toHaveBeenCalledWith(payload)
    })
  })

  describe('when animation emits step', () => {
    beforeEach(async () => {
      wrapper.find('animationcontrol-stub').vm.$emit('step')
      await wrapper.vm.$nextTick()
    })

    test('should call game.animation.mainLoop', async () => {
      expect(game.animation.mainLoop).toHaveBeenCalledTimes(1)
    })
  })
})

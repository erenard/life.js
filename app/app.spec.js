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
      expect(wrapper.find('animationcontrol-stub').props('running')).toEqual(wrapper.vm.running)
    })
    test('should pass board to the board-editor', () => {
      expect(wrapper.find('boardeditor-stub').props('board')).toEqual(wrapper.vm.board)
    })
    test('should pass value to the rules-editor', () => {
      expect(wrapper.find('ruleseditor-stub').props('value')).toEqual(wrapper.vm.preset)
    })
  })

  describe.each([
    ['animationcontrol', 'running', game.setRunningMock, true],
    ['animationcontrol', 'running', game.setRunningMock, false],
    ['ruleseditor', 'rules', game.setRulesMock, 'my_rules'],
    ['boardeditor', 'board', game.setBoardMock, new Board({ cellRadius: 5 })]
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

    test('should call game.step', async () => {
      expect(game.step).toHaveBeenCalledTimes(1)
    })
  })
})

import { describe, beforeEach, test, expect, afterEach, jest } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import AppVue, { game, gameLoading } from './app.vue'
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
    await gameLoading
    await createWrapper()
  })

  afterEach(async () => {
    jest.resetAllMocks()
    jest.clearAllTimers()
    if (game) game.setupMocks()
    if (wrapper) wrapper.destroy()
  })

  describe('when mounted', () => {
    test('should set the viewport element', () => {
      expect(game.setViewportMock).toHaveBeenCalledTimes(1)
    })
    test('should set running true', () => {
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

  describe('when animation control emits "running"', () => {
    beforeEach(async () => {
      wrapper.find('animationcontrol-stub').vm.$emit('running')
      wrapper.find('animationcontrol-stub').vm.$emit('running')
      await wrapper.vm.$nextTick()
    })

    test('should set switch the running state', () => {
      expect(game.setRunningMock).toHaveBeenCalledTimes(3)
      expect(game.setRunningMock).toHaveBeenNthCalledWith(2, false)
      expect(game.setRunningMock).toHaveBeenNthCalledWith(3, true)
    })
  })

  describe('when animation control switch benchmarking on', () => {
    beforeEach(async () => {
      wrapper.find('animationcontrol-stub').vm.$emit('benchmarking')
      await wrapper.vm.$nextTick()
    })
    test('should set switch on the benchmarking mode', async () => {
      expect(game.setBenchmarkingMock).toHaveBeenCalledTimes(1)
      expect(game.setBenchmarkingMock).toHaveBeenNthCalledWith(1, true)
    })
    describe('when animation control switch benchmarking off', () => {
      beforeEach(async () => {
        wrapper.find('animationcontrol-stub').vm.$emit('benchmarking')
        await wrapper.vm.$nextTick()
      })
      test('should set switch on the benchmarking mode', async () => {
        expect(game.setBenchmarkingMock).toHaveBeenCalledTimes(2)
        expect(game.setBenchmarkingMock).toHaveBeenNthCalledWith(2, false)
      })
    })
  })

  describe.each([
    ['ruleseditor', 'preset', 'setRulesMock', 'b3s23', 'my_rules'],
    ['boardeditor', 'board', 'setBoardMock', new Board(), new Board({ cellRadius: 5 })]
  ])('when %s change %s', (componentName, propName, mockName, initialValue, changedValue) => {
    beforeEach(async () => {
      wrapper.vm[propName] = initialValue
      await wrapper.vm.$nextTick()
      wrapper.find(`${componentName}-stub`).vm.$emit('input', changedValue)
      await wrapper.vm.$nextTick()
    })

    test(`should set ${propName} from ${initialValue} to ${changedValue}`, () => {
      expect(game[mockName]).toHaveBeenCalledWith(changedValue)
    })
  })

  describe('when animation emits step', () => {
    beforeEach(async () => {
      wrapper.find('animationcontrol-stub').vm.$emit('step')
      await wrapper.vm.$nextTick()
    })

    test('should call game.step', () => {
      expect(game.step).toHaveBeenCalledTimes(1)
    })
  })
})

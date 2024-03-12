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
    test('should pass board to the board-editor', () => {
      expect(wrapper.find('boardeditor-stub').props('board')).toEqual(wrapper.vm.board)
    })
    test('should pass value to the rules-editor', () => {
      expect(wrapper.find('ruleseditor-stub').props('value')).toEqual(wrapper.vm.preset)
    })
  })

  test('the running state', async () => {
    expect(wrapper.vm.running).toEqual(true)
    expect(wrapper.find('.ui__step__button').exists()).toBe(false)
    expect(wrapper.find('.ui__play-pause__button').text()).toEqual('Pause')
    expect(game.setRunningMock).toHaveBeenCalledTimes(1)
    expect(game.setRunningMock).toHaveBeenCalledWith(true)

    await wrapper.find('.ui__play-pause__button').trigger('click')

    expect(wrapper.vm.running).toEqual(false)
    expect(wrapper.find('.ui__play-pause__button').text()).toEqual('Resume')
    expect(wrapper.find('.ui__step__button').exists()).toBe(true)
    expect(game.setRunningMock).toHaveBeenCalledTimes(2)
    expect(game.setRunningMock).toHaveBeenCalledWith(false)

    expect(game.step).toHaveBeenCalledTimes(0)
    await wrapper.find('.ui__step__button').trigger('click')
    expect(game.step).toHaveBeenCalledTimes(1)
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

  describe('moving the mouse with left button pressed in the viewport', () => {
    beforeEach(async () => {
      await wrapper.find('div').trigger('mousemove', { x: 0, y: 0, buttons: 1 })
    })
    test('should call game.mouseDown', () => {
      expect(game.addCellAtPixel).toHaveBeenCalledTimes(1)
    })
  })
})

import { describe, beforeEach, test, expect } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import BoardEditor from './board-editor.vue'
import Board from '../game/board.js'

describe('BoardEditor', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(BoardEditor, {
      propsData: {
        board: new Board()
      }
    })
    return wrapper.vm.$nextTick()
  })

  test('should init pixel sizes', () => {
    expect(wrapper.find('.pixel-sizes').text()).toEqual('800 x 800 px')
  })

  test('should init the seed percent', () => {
    expect(wrapper.find('.seed-percent').element.value).toEqual('30')
  })

  describe.each([
    ['height', '.grid-height', -1, 'gridHeight', 10],
    ['height', '.grid-height', 9, 'gridHeight', 10],
    ['height', '.grid-height', 10, 'gridHeight', 10],
    ['height', '.grid-height', 11, 'gridHeight', 11],
    ['width', '.grid-width', -1, 'gridWidth', 10],
    ['width', '.grid-width', 9, 'gridWidth', 10],
    ['width', '.grid-width', 10, 'gridWidth', 10],
    ['width', '.grid-width', 11, 'gridWidth', 11],
    ['seed', '.seed-percent', 50, 'seedRatio', 0.5]
  ])('when changing %s to %i', (name, className, input, output, expected) => {
    beforeEach(async () => {
      wrapper.find(className).element.value = input
      wrapper.find(className).trigger('input')
      await wrapper.vm.$nextTick()
    })
    test('should emit input', () => {
      expect(wrapper.emitted('input')).toEqual([[new Board({ [output]: expected })]])
    })
  })

  describe('when changing the radius', () => {
    beforeEach(async () => {
      wrapper.find('.cell-radius').element.value = 5
      wrapper.find('.cell-radius').trigger('input')
      await wrapper.vm.$nextTick()
    })
    test('should emit input', () => {
      expect(wrapper.emitted('input')).toEqual([[new Board({ cellRadius: 5 })]])
    })
  })

  describe('when clicking fit radius', () => {
    beforeEach(async () => {
      wrapper.find('.fit-screen').trigger('click')
      await wrapper.vm.$nextTick()
    })
    test('should emit input', () => {
      expect(wrapper.emitted('input')).toEqual([[new Board({ gridHeight: 384, gridWidth: 512 })]])
    })
  })
})

import { describe, beforeEach, test, expect } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import RulesEditor from './rules-editor.vue'

describe('RulesEditor', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(RulesEditor, {
      propsData: {
        value: 'b3s23'
      }
    })
    return wrapper.vm.$nextTick()
  })

  test('should init checkboxes', () => {
    expect(wrapper.findComponent({ ref: 'b0' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 'b1' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 'b2' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 'b3' }).element.checked).toEqual(true)
    expect(wrapper.findComponent({ ref: 'b4' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 'b5' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 'b6' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 'b7' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 'b8' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 's0' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 's1' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 's2' }).element.checked).toEqual(true)
    expect(wrapper.findComponent({ ref: 's3' }).element.checked).toEqual(true)
    expect(wrapper.findComponent({ ref: 's4' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 's5' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 's6' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 's7' }).element.checked).toEqual(false)
    expect(wrapper.findComponent({ ref: 's8' }).element.checked).toEqual(false)
  })

  describe('when the value is updated to a custom preset', () => {
    beforeEach(() => {
      wrapper.setProps({
        value: 'b78s45'
      })
      return wrapper.vm.$nextTick()
    })
    test('should set the checkboxes', () => {
      expect(wrapper.findComponent({ ref: 'b0' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 'b1' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 'b2' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 'b3' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 'b4' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 'b5' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 'b6' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 'b7' }).element.checked).toEqual(true)
      expect(wrapper.findComponent({ ref: 'b8' }).element.checked).toEqual(true)
      expect(wrapper.findComponent({ ref: 's0' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 's1' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 's2' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 's3' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 's4' }).element.checked).toEqual(true)
      expect(wrapper.findComponent({ ref: 's5' }).element.checked).toEqual(true)
      expect(wrapper.findComponent({ ref: 's6' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 's7' }).element.checked).toEqual(false)
      expect(wrapper.findComponent({ ref: 's8' }).element.checked).toEqual(false)
    })

    test('should set the custom preset to the value', () => {
      expect(wrapper.findComponent({ ref: 'customPreset' }).element.value).toEqual('b78s45')
    })

    describe('when the value is updated to a known preset', () => {
      beforeEach(() => {
        wrapper.setProps({
          value: 'b3s23'
        })
        return wrapper.vm.$nextTick()
      })

      test('should set the custom preset to ""', () => {
        expect(wrapper.findComponent({ ref: 'customPreset' }).element.value).toEqual('')
      })
    })
  })

  describe('when a preset is selected', () => {
    beforeEach(() => {
      wrapper.findComponent({ ref: 'preset' }).setValue('b36s23')
      wrapper.findComponent({ ref: 'preset' }).trigger('input')
      return wrapper.vm.$nextTick()
    })
    test('should emit the rules', () => {
      expect(wrapper.emitted('input'))
      expect(wrapper.emitted('input')[0]).toEqual(['b36s23'])
    })
  })
  describe('when a preset is customized', () => {
    beforeEach(() => {
      wrapper.findComponent({ ref: 'b0' }).setChecked(true)
      return wrapper.vm.$nextTick()
    })
    test('should emit the rules', () => {
      expect(wrapper.emitted('input')[0]).toEqual(['b03s23'])
    })
    describe('when a preset is decustomized', () => {
      beforeEach(() => {
        wrapper.findComponent({ ref: 'b0' }).setChecked(false)
        return wrapper.vm.$nextTick()
      })
      test('should emit the rules', () => {
        expect(wrapper.emitted('input')[1]).toEqual(['b3s23'])
      })
    })
  })
})

/* global it, describe, beforeEach */
import { expect } from 'chai'
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

  it('should init checkboxes', () => {
    expect(wrapper.findComponent({ ref: 'b0' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 'b1' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 'b2' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 'b3' }).element.checked).to.equal(true)
    expect(wrapper.findComponent({ ref: 'b4' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 'b5' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 'b6' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 'b7' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 'b8' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 's0' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 's1' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 's2' }).element.checked).to.equal(true)
    expect(wrapper.findComponent({ ref: 's3' }).element.checked).to.equal(true)
    expect(wrapper.findComponent({ ref: 's4' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 's5' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 's6' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 's7' }).element.checked).to.equal(false)
    expect(wrapper.findComponent({ ref: 's8' }).element.checked).to.equal(false)
  })

  describe('when the value is updated', () => {
    beforeEach(() => {
      wrapper.setProps({
        value: 'b78s45'
      })
      return wrapper.vm.$nextTick()
    })
    it('should set the checkboxes', () => {
      expect(wrapper.findComponent({ ref: 'b0' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 'b1' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 'b2' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 'b3' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 'b4' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 'b5' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 'b6' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 'b7' }).element.checked).to.equal(true)
      expect(wrapper.findComponent({ ref: 'b8' }).element.checked).to.equal(true)
      expect(wrapper.findComponent({ ref: 's0' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 's1' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 's2' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 's3' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 's4' }).element.checked).to.equal(true)
      expect(wrapper.findComponent({ ref: 's5' }).element.checked).to.equal(true)
      expect(wrapper.findComponent({ ref: 's6' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 's7' }).element.checked).to.equal(false)
      expect(wrapper.findComponent({ ref: 's8' }).element.checked).to.equal(false)
    })

    it('should set the custom preset to the value', () => {
      expect(wrapper.findComponent({ ref: 'customPreset' }).element.value).to.equal('b78s45')
    })
  })
  describe('when a preset is selected', () => {
    beforeEach(() => {
      wrapper.findComponent({ ref: 'preset' }).setValue('b36s23')
      wrapper.findComponent({ ref: 'preset' }).trigger('input')
      return wrapper.vm.$nextTick()
    })
    it('should emit the rules', () => {
      expect(wrapper.emitted('input'))
      expect(wrapper.emitted('input')[0]).to.deep.equal(['b36s23'])
    })
  })
  describe('when a preset is customized', () => {
    beforeEach(() => {
      wrapper.findComponent({ ref: 'b0' }).trigger('click')
      return wrapper.vm.$nextTick()
    })
    it('should emit the rules', () => {
      expect(wrapper.emitted('input')[0]).to.deep.equal(['b03s23'])
    })
  })
})

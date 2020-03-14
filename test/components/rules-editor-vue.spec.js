/* global it, describe, beforeEach */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import RulesEditor from '../../app/components/RulesEditor.vue'

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

  describe('when the value is updated', () => {
    beforeEach(() => {
      wrapper.setProps({
        value: 'b78s45'
      })
      return wrapper.vm.$nextTick()
    })
    it('should set the checkboxes', () => {
      expect(wrapper.find({ ref: 'b0' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 'b1' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 'b2' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 'b3' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 'b4' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 'b5' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 'b6' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 'b7' }).element.checked).to.equal(true)
      expect(wrapper.find({ ref: 'b8' }).element.checked).to.equal(true)
      expect(wrapper.find({ ref: 's0' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 's1' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 's2' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 's3' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 's4' }).element.checked).to.equal(true)
      expect(wrapper.find({ ref: 's5' }).element.checked).to.equal(true)
      expect(wrapper.find({ ref: 's6' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 's7' }).element.checked).to.equal(false)
      expect(wrapper.find({ ref: 's8' }).element.checked).to.equal(false)
    })

    it('should set the preset to the value', () => {
      expect(wrapper.find('.preset-select').element.value).to.equal('b78s45')
    })
  })
  describe('when a preset is selected', () => {
    beforeEach(() => {
      wrapper.find('.preset-select').setValue('b36s23')
      wrapper.find('.preset-select').trigger('input')
      return wrapper.vm.$nextTick()
    })
    it('should emit the rules', () => {
      expect(wrapper.emitted('input'))
      expect(wrapper.emitted('input')[0]).to.deep.equal(['b36s23'])
    })
  })
  describe('when a preset is customized', () => {
    beforeEach(() => {
      wrapper.find({ ref: 'b0' }).trigger('click')
      return wrapper.vm.$nextTick()
    })
    it('should emit the rules', () => {
      expect(wrapper.emitted('input')[0]).to.deep.equal(['b03s23'])
    })
  })
})

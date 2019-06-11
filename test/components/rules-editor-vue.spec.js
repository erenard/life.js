/* global it, describe */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import RulesEditor from '../../app/components/RulesEditor.vue'

import Game from '../../app/game'

describe('RulesEditor.vue', () => {
  it('should update the game rules when a preset is selected', () => {
    const game = new Game()
    game.rules = 'b3s23'
    const wrapper = shallowMount(RulesEditor, {
      propsData: {
        game
      }
    })
    wrapper.vm.preset = 'b123s456'
    expect(game.rules).to.equal('b123s456')
  })
})

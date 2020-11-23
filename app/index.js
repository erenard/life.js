import Vue from 'vue'
import AppVue from './app.vue'
import Game from './game/game'

const game = new Game({
  gridWidth: 400,
  gridHeight: 400,
  radius: 2,
  seedRatio: 0.3
})

const vm = new Vue({
  el: '#app',
  components: {
    app: AppVue
  },
  data: () => ({
    game
  }),
  methods: {
    setRules (rules) {
      game.rules = rules
    },
    setRunning (running) {
      game.running = running
    },
    setSize (size) {
      console.log('setSize', size)
      game.size = size
    },
    setViewport (viewport) {
      game.viewport = viewport
    }
  },
  template: `<app
    :game="game"
    @rules="setRules"
    @running="setRunning"
    @size="setSize"
    @viewport="setViewport"
  />`
})

export default vm

import 'normalize.css'
import Vue from 'vue'
import AppVue from './app.vue'
import Game from 'game/game'

const game = new Game({
  gridWidth: 1000,
  gridHeight: 1000,
  radius: 1,
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
  template: '<app :game="game" />'
})

export default vm

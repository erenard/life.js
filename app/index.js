import 'normalize.css'
import Vue from 'vue'
import AppVue from './app.vue'
import Game from 'game/game'

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
  template: '<app :game="game" />'
})

export default vm

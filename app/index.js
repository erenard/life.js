import 'normalize.css'
import Vue from 'vue'
import AppVue from './components/game.vue'
import Game from 'game'

const game = new Game({
  gridWidth: 500,
  gridHeight: 500,
  radius: 1
})
game.random(0.30)

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

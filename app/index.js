import 'normalize.css'
import UserInterface from './user-interface'
import Grid from './game/grid'
import Renderer from './game/renderer'
import Animation from './game/animation'
import Vue from 'vue/dist/vue'
import AppVue from './components/App.vue'

function main (setup) {
  var radius = setup.lifeCellSize || 4
  var viewport = document.getElementById('viewport')
  var width = window.innerWidth || 1280
  var height = window.innerHeight || 1024
  var grid = new Grid(Math.floor(width / radius), Math.floor(height / radius))
  var renderer = new Renderer(width, height, viewport, grid, radius)
  var mainLoop = () => {
    // This function will wrap the whole process of updating the game and drawing it
    grid.update()
    renderer.render()
  }
  var animation = new Animation(mainLoop)

  var ui = new UserInterface({ grid, animation, mainLoop })
  ui.loadPreset('b3s23')
  grid.random(0.30)
  animation.start()
}

// main({ lifeCellSize: 4 })

const vm = new Vue({
  el: '#app',
  components: {
    'app': AppVue
  },
  template: '<app />'
})

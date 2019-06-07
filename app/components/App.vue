<template>
  <div>
    <GameBoardVue
      :grid="grid"
      :renderer="renderer"
    />
    <UserInterfaceVue
      :animation="animation"
    />
  </div>
</template>

<script>
import GameBoardVue from './GameBoard.vue';
import UserInterfaceVue from './UserInterface.vue';

import Grid from '../game/grid'
import Renderer from '../game/renderer'
import Animation from '../game/animation'

export default {
  name: 'App',
  data: () => ({
    grid: null,
    renderer: null,
    animation: null
  }),
  components: {
    GameBoardVue, UserInterfaceVue
  },
  methods: {
    mainLoop() {
      // This function will wrap the whole process of updating the game and drawing it
      this.grid.update()
      this.renderer.render()
    }
  },
  mounted () {
    const radius = 4
    const viewport = document.getElementById('viewport')
    const width = window.innerWidth || 1280
    const height = window.innerHeight || 1024

    this.grid = new Grid(Math.floor(width / radius), Math.floor(height / radius))
    this.renderer = new Renderer(width, height, viewport, grid, radius)
    this.animation = new Animation(this.mainLoop)
  }
}
</script>

<style>
@font-face {
    font-family: subway-ticker;
    src: url(../assets/subway-ticker.ttf);
}
@font-face {
    font-family: pixel-8bit;
    /* Font author: http://www.04.jp.org/ */
    src: url(../assets/04B_03__.ttf);
}
body {
    overflow: hidden;
}
</style>

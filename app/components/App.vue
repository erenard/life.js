<template>
  <div>
    <div ref="viewport"></div>
    <UserInterfaceVue />
  </div>
</template>

<script>
import GameBoardVue from './GameBoard.vue'
import UserInterfaceVue from './UserInterface.vue'
import game from '../game'

export default {
  name: 'App',
  components: {
    GameBoardVue, UserInterfaceVue
  },
  data: () => ({}),
  mounted() {
    game.init(this.$refs.viewport)
    game.grid.random(0.30)
    game.rules.
    game.animation.start()
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

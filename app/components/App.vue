<template>
  <div>
    <div ref="viewport" />
    <user-interface :game="game" />
  </div>
</template>

<script>
import UserInterfaceVue from './UserInterface.vue'
import Game from '../game'

export default {
  name: 'App',
  components: {
    'user-interface': UserInterfaceVue
  },
  data: () => ({
    game: new Game()
  }),
  mounted () {
    this.game.init(this.$refs.viewport)
    this.game.rules = 'b3s23'
    this.game.random(0.30)
    this.game.start()
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

<template>
  <div>
    <div ref="viewport" />
    <UserInterfaceVue
      @reset="reset"
      @start="game.start"
      @stop="game.stop"
      @step="game.step"
      @random="game.random"
      @clear="game.clear"
    >
      <RulesEditor v-model="game.rules" />
    </UserInterfaceVue>
  </div>
</template>

<script>
import UserInterfaceVue from './UserInterface.vue'
import RulesEditorVue from './RulesEditor.vue'
import Game from '../game'

export default {
  name: 'App',
  components: {
    RulesEditor: RulesEditorVue,
    UserInterfaceVue: UserInterfaceVue
  },
  data: () => ({
    game: new Game()
  }),
  mounted () {
    this.reset()
    this.game.random(0.30)
    this.game.start()
  },
  methods: {
    reset (options) {
      this.game.init(this.$refs.viewport, options)
    }
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

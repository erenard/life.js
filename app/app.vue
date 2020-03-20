<template>
  <Layout>
    <div ref="viewport" />
    <template v-slot:ui>
      <UserInterface
        @reset="reset"
        @random="game.random"
        @clear="game.clear"
      >
        <h1>Controls</h1>
        <AnimationControl
          v-model="game.running"
          :animation="game.animation"
        />
        <RulesEditor v-model="game.rules" />
      </UserInterface>
    </template>
  </Layout>
</template>

<script>
import AnimationControl from './components/animation-control.vue'
import Layout from './components/layout.vue'
import UserInterface from './components/user-interface.vue'
import RulesEditor from './components/rules-editor.vue'

export default {
  name: 'App',
  components: {
    AnimationControl,
    Layout,
    RulesEditor,
    UserInterface
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.reset()
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
    src: url(assets/subway-ticker.ttf);
}
@font-face {
    font-family: pixel-8bit;
    /* Font author: http://www.04.jp.org/ */
    src: url(assets/04B_03__.ttf);
}
html, body {
  height: 100%;
  overflow: hidden;
}
</style>

<template>
  <Layout>
    <div ref="viewport" />
    <template v-slot:ui>
      <UserInterface
        @random="game.random"
        @clear="game.clear"
        @board="changeBoard()"
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
    this.game.viewport = this.$refs.viewport
  },
  methods: {
    changeBoard (options) {
      this.game.size = {
        gridWidth: 300,
        gridHeight: 300,
        radius: 2
      }
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
.box {
    font-family: pixel-8bit;
    font-size: 16px;
    background-color: black;
    color: rgb(0, 127, 0);
    /*opacity: 0.75;*/
    width: 16em;
}

h1, h2, h3 {
    font-family: subway-ticker;
    font-weight: normal;
    color: rgb(127, 255, 127);
}

h1 {
    font-size: 32px;
}

h2 {
    font-size: 24px;
}

h3 {
    font-size: 16px;
}

.box a {
    color: rgb(127, 255, 127);
}
.box button, .box select, .box input {
    font-family: pixel-8bit;
    font-size: 16px;
    background-color: black;
    color: rgb(127, 255, 127);
}
</style>

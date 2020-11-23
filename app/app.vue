<template>
  <Layout>
    <template #default>
      <div ref="viewport" />
    </template>
    <template #ui>
      <UserInterface>
        <h1>Controls</h1>
        <AnimationControl
          v-model="running"
          :animation="animation"
        />
        <button @click="showRulesEditor = true">
          Rules
        </button>
        <button @click="showBoardEditor = true">
          Board
        </button>
      </UserInterface>
    </template>
    <template #modals>
      <Modal v-model="showRulesEditor">
        <RulesEditor v-model="rules" />
      </Modal>
      <Modal v-model="showBoardEditor">
        <BoardEditor v-model="size" />
      </Modal>
    </template>
  </Layout>
</template>

<script>
import AnimationControl from './components/animation-control.vue'
import Layout from './components/layout.vue'
import UserInterface from './components/user-interface.vue'
import BoardEditor from './components/board-editor.vue'
import RulesEditor from './components/rules-editor.vue'
import Modal from './components/modal.vue'
import Game from './game/game'

export const game = new Game({
  gridWidth: 400,
  gridHeight: 400,
  radius: 2,
  seedRatio: 0.3
})

export default {
  name: 'App',
  components: {
    AnimationControl,
    Layout,
    BoardEditor,
    RulesEditor,
    UserInterface,
    Modal
  },
  data: () => ({
    showBoardEditor: false,
    showRulesEditor: false
  }),
  computed: {
    animation () {
      return game.animation
    },
    rules: {
      get () {
        return game.rules
      },
      set (rules) {
        game.rules = rules
      }
    },
    running: {
      get () {
        return game.running
      },
      set (running) {
        game.running = running
      }
    },
    size: {
      get () {
        return game.size
      },
      set (size) {
        game.size = size
      }
    }
  },
  mounted () {
    game.viewport = this.$refs.viewport
  }
}
</script>

<style>
@import 'normalize.css';

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
    opacity: 0.75;
    border: solid;
    padding: 5px;
}

h1 {
    font-family: subway-ticker;
    font-weight: normal;
    color: rgb(127, 255, 127);
    font-size: 32px;
    margin: 8px;
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
input[type=checkbox] {
  vertical-align: text-bottom;
}
</style>

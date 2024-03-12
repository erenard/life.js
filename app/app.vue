<template>
  <Layout>
    <template #default>
      <div
        ref="viewport"
        @mousemove="handleMouseMove"
      />
    </template>
    <template #ui>
      <div class="box">
        <h1>Controls</h1>
        <button
          class="ui__play-pause__button"
          @click="switchRunning"
          v-text="pauseButtonLabel"
        />
        <button
          v-if="!running"
          class="ui__step__button"
          @click="stepAnimate"
        >
          Step
        </button>
        <button
          class="ui__benchmark__button"
          @click="switchBenchmarking"
          v-text="benchmarkButtonLabel"
        />
        <button @click="showRulesEditor = true">
          Rules
        </button>
        <button @click="showBoardEditor = true">
          Board
        </button>
        <div id="statsContainer" />
      </div>
    </template>
    <template #modals>
      <Modal v-model="showRulesEditor">
        <RulesEditor
          v-if="preset"
          :value="preset"
          @input="updatePreset"
        />
      </Modal>
      <Modal v-model="showBoardEditor">
        <BoardEditor
          v-if="board"
          :board="board"
          @input="updateBoard"
        />
      </Modal>
    </template>
  </Layout>
</template>

<script>
import Layout from './components/layout.vue'
import BoardEditor from './components/board-editor.vue'
import RulesEditor from './components/rules-editor.vue'
import Modal from './components/modal.vue'
import Game from './game/game'
import Grid from './game/grid'

export const gameLoading = Grid.load().then(() => {
  return new Game()
})

export let game

export default {
  name: 'App',
  components: {
    Layout,
    BoardEditor,
    RulesEditor,
    Modal
  },
  data: () => ({
    benchmarking: false,
    board: undefined,
    preset: undefined,
    running: false,
    showBoardEditor: false,
    showRulesEditor: false
  }),
  computed: {
    pauseButtonLabel () {
      return this.running ? 'Pause' : 'Resume'
    },
    benchmarkButtonLabel () {
      return `benchmark: ${this.benchmarking ? 'on' : 'off'}`
    }
  },
  async mounted () {
    game = await gameLoading
    this.board = game.board
    this.preset = game.rules
    game.viewport = this.$refs.viewport
    this.switchRunning()
  },
  methods: {
    handleMouseMove (mouseEvent) {
      if (mouseEvent.buttons === 1) game.addCellAtPixel(mouseEvent.offsetX, mouseEvent.offsetY)
    },
    stepAnimate () {
      game.step()
    },
    updateBoard (board) {
      game.board = board
      this.board = board
    },
    switchRunning () {
      const running = !this.running
      game.running = running
      this.running = running
    },
    switchBenchmarking () {
      const benchmarking = !this.benchmarking
      game.benchmarking = benchmarking
      this.benchmarking = benchmarking
    },
    updatePreset (preset) {
      game.rules = preset
      this.preset = preset
    }
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
html,
body {
  height: 100%;
  overflow: hidden;
}
.box {
  font-family: pixel-8bit, monospace;
  font-size: 16px;
  background-color: black;
  color: rgb(0, 127, 0);
  opacity: 0.75;
  border: solid;
  padding: 5px;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
}

h1 {
  font-family: subway-ticker, monospace;
  font-weight: normal;
  color: rgb(127, 255, 127);
  font-size: 32px;
  margin: 8px;
}

.box a {
  color: rgb(127, 255, 127);
}
.box button,
.box select,
.box input {
  font-family: pixel-8bit, monospace;
  font-size: 16px;
  background-color: black;
  color: rgb(127, 255, 127);
}
input[type='checkbox'] {
  vertical-align: text-bottom;
}
</style>

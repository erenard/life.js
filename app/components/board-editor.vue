<template>
  <table class="board-editor box">
    <tbody>
      <tr>
        <td colspan="2">
          <h1>Board</h1>
        </td>
      </tr>
      <tr>
        <td>
          Width (cell)
        </td>
        <td>
          <input
            :value="board.gridWidth"
            type="text"
            style="width: 4em;"
            class="grid-width"
            @input="setWidth"
          >
        </td>
      </tr>
      <tr>
        <td>
          Height (cell)
        </td>
        <td>
          <input
            :value="board.gridHeight"
            type="text"
            style="width: 4em;"
            class="grid-height"
            @input="setHeight"
          >
        </td>
      </tr>
      <tr>
        <td>
          Cell size (pixel)
        </td>
        <td>
          <select
            :value="board.cellRadius"
            class="cell-radius"
            @input="setRadius"
          >
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="3">
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          Fill (%)
        </td>
        <td>
          <input
            :value="seedPercent"
            type="text"
            style="width: 2em;"
            class="seed-percent"
            @input="setSeedPercent"
          >
        </td>
      </tr>
      <tr>
        <td>
          <button
            class="fit-screen"
            @click="fitScreen()"
          >
            Fit screen
          </button>
        </td>
        <td class="pixel-sizes">
          {{ width }} x {{ height }} px
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import Board from '../game/board.js'

export default {
  name: 'BoardEditor',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  computed: {
    height () {
      return this.board.gridHeight * this.board.cellRadius
    },
    width () {
      return this.board.gridWidth * this.board.cellRadius
    },
    seedPercent () {
      return this.board.seedRatio * 100
    }
  },
  methods: {
    fitScreen () {
      const gridWidth = Math.floor(window.innerWidth / this.board.cellRadius)
      const gridHeight = Math.floor(window.innerHeight / this.board.cellRadius)
      this.$emit('input', new Board({ ...this.board, gridHeight, gridWidth }))
    },
    setSeedPercent (event) {
      const value = event.target.value * 1
      this.$emit('input', new Board({ ...this.board, seedRatio: value / 100 }))
    },
    setRadius (event) {
      const value = event.target.value * 1
      this.$emit('input', new Board({ ...this.board, cellRadius: value }))
    },
    setHeight (event) {
      const value = event.target.value * 1
      this.$emit('input', new Board({ ...this.board, gridHeight: Math.max(value, 10) }))
    },
    setWidth (event) {
      const value = event.target.value * 1
      this.$emit('input', new Board({ ...this.board, gridWidth: Math.max(value, 10) }
      ))
    }
  }
}
</script>

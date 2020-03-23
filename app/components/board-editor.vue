<template>
  <table class="board-editor box">
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
          :value="value.gridWidth"
          type="text"
          style="width: 4em;"
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
          :value="value.gridHeight"
          type="text"
          style="width: 4em;"
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
          :value="value.radius"
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
          @input="setSeedPercent"
        >
      </td>
    </tr>
    <tr>
      <td>
        <button @click="fitScreen()">
          Fit screen
        </button>
      </td>
      <td>
        {{ width }}x{{ height }} px
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'BoardEditor',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    height () {
      return this.value.gridHeight * this.value.radius
    },
    width () {
      return this.value.gridWidth * this.value.radius
    },
    seedPercent () {
      return this.value.seedRatio * 100
    }
  },
  methods: {
    fitScreen () {
      const gridWidth = Math.floor(window.innerWidth / this.value.radius)
      const gridHeight = Math.floor(window.innerHeight / this.value.radius)
      this.$emit('input', { gridHeight, gridWidth })
    },
    setSeedPercent (event) {
      this.$emit('input', {
        seedRatio: event.target.value / 100
      })
    },
    setRadius (event) {
      const value = event.target.value * 1
      this.$emit('input', {
        radius: value
      })
    },
    setHeight (event) {
      const value = event.target.value * 1
      this.$emit('input', {
        gridHeight: value >= 10 ? value : 10
      })
    },
    setWidth (event) {
      const value = event.target.value * 1
      this.$emit('input', {
        gridWidth: value >= 10 ? value : 10
      })
    }
  }
}
</script>
<style scoped>
.board-editor {
  display: table;

}
</style>

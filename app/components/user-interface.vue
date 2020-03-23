<template>
  <div class="box">
    <div>
      <button
        class="ui__board__button"
        @click="$emit('board')"
      >
        Change
      </button> the board.<br>
      <button
        class="ui__clear__button"
        @click="$emit('clear')"
      >
        Clear
      </button> the board.<br>
      <button
        class="ui__random__button"
        @click="handleClickRandom"
      >
        Random
      </button> fill ratio: <input
        v-model="randomRatio"
        type="text"
        style="width: 1.5em;"
      >%<br>
    </div>
    <slot />
  </div>
</template>

<script>

export default {
  name: 'UserInterface',
  data: () => ({
    randomRatio: 30
  }),
  methods: {
    handleClickRandom () {
      this.$emit('random', this.randomRatio / 100)
    }
  }
}
</script>

<style>

</style>

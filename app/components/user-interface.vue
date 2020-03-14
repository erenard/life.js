<template>
  <div class="box">
    <div>
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
.box {
    position: absolute;
    top: 10px;
    right: 10px;
    font-family: pixel-8bit;
    font-size: 16px;
    background-color: black;
    color: rgb(0, 127, 0);
    opacity: 0.75;
    width: 16em;
}
.box h1 {
    font-family: subway-ticker;
    font-weight: normal;
    color: rgb(127, 255, 127);
    font-size: 32px;
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

<template>
  <div class="box">
    <div>
      <h1>Controls</h1>
      <button @click="handleClickPause">{{ pauseButtonLabel }}</button> the game.<br/>
      <button :disabled="isStarted" @click="handleClickStep">Step</button><br/>
      <button @click="handleClickClear">Clear</button> the board.<br/>
      <button @click="handleClickRandom">Random</button> fill ratio: <input type="text" v-model="randomRatio" style="width: 1.5em;" />%<br/>
    </div>
    <RulesEditor v-model="preset" />
  </div>
</template>

<script>
import RulesEditorVue from './RulesEditor.vue'
import game from '../game'

export default {
  name: 'UserInterface',
  components: {
    'RulesEditor': RulesEditorVue
  },
  data: () => ({
    preset: 'b3s23',
    isStarted: true,
    randomRatio: 30
  }),
  computed: {
    pauseButtonLabel() {
      return this.isStarted ? 'Pause' : 'Resume'
    }
  },
  methods: {
    handleClickPause () {
      this.isStarted = !this.isStarted
      if(this.isStarted) {
        game.animation.start()
      } else {
        game.animation.stop()
      }
    },
    handleClickStep () {
      game.animation.mainLoop()
    },
    handleClickClear () {
      game.grid.clear()
    },
    handleClickRandom () {
      game.grid.random(this.randomRatio / 100)
    }
  },
  watch: {
    preset (value) {
      console.log(value)
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

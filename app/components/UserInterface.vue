<template>
  <div class="box">
    <div>
      <h1>Controls</h1>
      <button @click="handleClickPause">
        {{ pauseButtonLabel }}
      </button> the game.<br>
      <button
        :disabled="isStarted"
        @click="handleClickStep"
      >
        Step
      </button><br>
      <button @click="handleClickClear">
        Clear
      </button> the board.<br>
      <button @click="handleClickRandom">
        Random
      </button> fill ratio: <input
        v-model="randomRatio"
        type="text"
        style="width: 1.5em;"
      >%<br>
    </div>
    <RulesEditor :game="game" />
  </div>
</template>

<script>
import RulesEditorVue from './RulesEditor.vue'

export default {
  name: 'UserInterface',
  components: {
    'RulesEditor': RulesEditorVue
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isStarted: true,
    randomRatio: 30
  }),
  computed: {
    pauseButtonLabel () {
      return this.isStarted ? 'Pause' : 'Resume'
    }
  },
  watch: {
    preset (value) {
      this.game.rules = value
    }
  },
  methods: {
    handleClickPause () {
      this.isStarted = !this.isStarted
      if (this.isStarted) {
        this.game.start()
      } else {
        this.game.stop()
      }
    },
    handleClickStep () {
      this.game.step()
    },
    handleClickClear () {
      this.game.clear()
    },
    handleClickRandom () {
      this.game.random(this.randomRatio / 100)
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

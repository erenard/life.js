<template>
  <div class="box">
    <!-- <div>
      <h1>Controls</h1>
      <button id="start" style="display: none;">Resume</button><button id="stop">Pause</button> the game.<br/>
      <button id="step">Step</button><br/>
      <button id="clear">Clear</button> the board.<br/>
      <button id="random">Random</button> fill ratio: <input type="text" id="ratio" style="width: 1.5em;" value="30" />%<br/>
    </div> -->
    <div class="rules-container">
      <div class="rules-title">
        <h1>Rules</h1>
      </div>
      <div class="rules-group">
        <div class="rules-title">Birth rules</div>
        <div
          class="rule"
          v-for="(birthRule, index) of birthRules"
          :key="index"
        >
          <input
            :ref="'b' + index"
            @change="updateRules('b', index)"
            type="checkbox"
          />{{ index }}
        </div>
      </div>
      <div class="rules-group">
        <div class="rules-title">Survival rules</div>
        <div
          class="rule"
          v-for="(survivalRule, index) of survivalRules"
          :key="index"
        >
          <input
            :ref="'s' + index"
            @change="updateRules('s', index)"
            type="checkbox"
          />{{ index }}
        </div>
      </div>
    </div>
      <br/>Load a preset:
      <select v-model="preset">
        <option value="b3s23">Conway</option>
        <option value="b36s23">HighLife</option>
        <option value="b1357s1357">Replicator</option>
        <option value="b2s">Seeds</option>
        <option value="b25s2">Self-replic.</option>
        <option value="b3s012345678">No death</option>
        <option value="b34s34">34 Life</option>
        <option value="b35678s5678">Diamoeba</option>
        <option value="b36s125">2x2</option>
        <option value="b3678s34678">Day&amp;Night</option>
        <option value="b368s245">Morley</option>
        <option value="b4567s5678">Islands</option>
        <option value="b4567s4567">Blobs</option>
        <option value="custom">Custom</option>
      </select>
      <br/>More info on presets <a href="http://en.wikipedia.org/wiki/Life-like_cellular_automaton" target="_blank">here</a><br/>
  </div>
</template>

<script>
import { Rules } from 'game/cell'

export default {
  name: 'UserInterface',
  data: () => ({
    birthRules: Rules.b,
    survivalRules: Rules.s,
    preset: 'b3s23'
  }),
  methods: {
    handleChangePreset(event) {
      this.loadPreset(event.target.value)
    },
    loadPreset (preset) {
      const indexOfB = preset.indexOf('b')
      const indexOfS = preset.indexOf('s')
      const birthPart = preset.substring(indexOfB + 1, (indexOfS - indexOfB))
      const survivalPart = preset.substring(indexOfS + 1)
      for (let index = 0; index < 9; index ++) {
        const bValue = birthPart.indexOf(index) >= 0
        const sValue = survivalPart.indexOf(index) >= 0
        this.birthRules[index] = bValue
        this.survivalRules[index] = sValue
        this.$refs['b' + index][0].checked = bValue
        this.$refs['s' + index][0].checked = sValue
       }
    },
    updateRules(key, index) {
      const collection = key === 'b' ? this.birthRules : this.survivalRules
      collection[index] = !collection[index]
    },
    mounted() {
      this.loadPreset('b3s23')
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
    display: inline-block;
    color: rgb(0, 127, 0);
    vertical-align: top;
    opacity: 0.75;
    width: 16em;
}
.box h1 {
    font-family: subway-ticker;
    font-weight: normal;
    color: rgb(127, 255, 127);
    font-size: 32px;
}
.box div {
    vertical-align: baseline;
    margin-bottom: 10px;
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
.rules-container {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
}
.rules-group {
  flex-basis: 50%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
.rules-title {
  flex-basis: 100%;
}
.rule {
  justify-content: center;
  align-items: center;
  flex-basis: 33%;
}
</style>

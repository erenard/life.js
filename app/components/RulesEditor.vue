<template>
  <div class="rules-editor-container">
    <div class="full_width">
      <h1>Rules</h1>
    </div>
    <div class="rules-container">
      <div class="full_width">Birth rules</div>
      <div
        class="third_width"
        v-for="index of 9"
        :key="index"
      >
        <input
          :ref="'b' + (index - 1)"
          @change="handleRuleChange('b' + (index - 1))"
          type="checkbox"
        />
        <span class="checkboxLabel">{{ index - 1 }}</span>
      </div>
    </div>
    <div class="rules-container">
      <div class="full_width">Survival rules</div>
      <div
        class="third_width"
        v-for="index of 9"
        :key="index"
      >
        <input
          type="checkbox"
          :ref="'s' + (index - 1)"
          @change="handleRuleChange('s' + (index - 1))"
        />
        <span class="checkboxLabel">{{ index - 1 }}</span>
      </div>
    </div>
    <div class="full_width">
      Load a preset:
      <select v-model="preset" ref="presetSelector">
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
        <option ref="customPreset">Custom</option>
      </select>
    </div>
    <div class="full_width">
      More info on presets <a href="http://en.wikipedia.org/wiki/Life-like_cellular_automaton" target="_blank">here</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RulesEditor',
  props: {
    preset: {
      type: String,
      required: true
    }
  },
  model: {
    prop: 'preset',
    event: 'change'
  },
  watch: {
    preset: {
      handler: 'importPreset'
    }
  },
  mounted() {
    this.importPreset()
  },
  methods: {
    handleRuleChange (key) {
      this.exportPreset()
    },
    handleChangePreset(event) {
      this.importPreset(event.target.value)
    },
    importPreset() {
      const indexOfB = this.preset.indexOf('b')
      const indexOfS = this.preset.indexOf('s')
      const birthPart = this.preset.substring(indexOfB + 1, (indexOfS - indexOfB))
      const survivalPart = this.preset.substring(indexOfS + 1)
      for (let index = 0; index < 9; index ++) {
        const bValue = birthPart.indexOf(index) >= 0
        const sValue = survivalPart.indexOf(index) >= 0
        this.$refs['b' + index][0].checked = bValue
        this.$refs['s' + index][0].checked = sValue
      }
      this.$refs.customPreset.value = this.preset
    },
    exportPreset() {
      let birthPart = 'b'
      let survivalPart = 's'
      for (let index = 0; index < 9; index ++) {
        birthPart += this.$refs['b' + index][0].checked ? index : ''
        survivalPart += this.$refs['s' + index][0].checked ? index : ''
      }
      this.$emit('change', birthPart + survivalPart)
    }
  }
}
</script>

<style>
.rules-editor-container {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
}
.rules-container {
  flex-basis: 50%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
.full_width {
  flex-basis: 100%;
}
.third_width {
  justify-content: center;
  align-items: center;
  flex-basis: 33%;
}
.checkboxLabel {
  vertical-align: text-bottom;
}
</style>
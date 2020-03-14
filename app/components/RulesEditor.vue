<template>
  <div class="rules-editor-container">
    <div class="full_width">
      <h1>Rules</h1>
    </div>
    <div
      class="rules-container birth-rules"
    >
      <div class="full_width">
        Birth rules
      </div>
      <div
        v-for="index of 9"
        :key="index"
        class="third_width"
      >
        <input
          :ref="'b' + (index - 1)"
          type="checkbox"
          @change="handleCheckboxInput('b' + (index - 1))"
        >
        <span class="checkboxLabel">{{ index - 1 }}</span>
      </div>
    </div>
    <div
      class="rules-container survival-rules"
    >
      <div class="full_width">
        Survival rules
      </div>
      <div
        v-for="index of 9"
        :key="index"
        class="third_width"
      >
        <input
          :ref="'s' + (index - 1)"
          type="checkbox"
          @change="handleCheckboxInput('s' + (index - 1))"
        >
        <span class="checkboxLabel">{{ index - 1 }}</span>
      </div>
    </div>
    <div class="full_width">
      Load a preset:
      <select
        class="preset-select"
        :value="value"
        @input="handleSelectInput"
      >
        <option
          v-for="preset in presets"
          :key="preset.rules"
          :value="preset.rules"
        >
          {{ preset.name }}
        </option>
        <option ref="customPreset">
          Custom
        </option>
      </select>
    </div>
    <div class="full_width">
      More info on presets
      <a
        href="http://en.wikipedia.org/wiki/Life-like_cellular_automaton"
        target="_blank"
      >here</a>
    </div>
  </div>
</template>

<script>
const PRESETS = [
  { name: 'Conway', rules: 'b3s23' },
  { name: 'Gliders', rules: 'b3s35' },
  { name: 'HighLife', rules: 'b36s23' },
  { name: 'Replicator', rules: 'b1357s1357' },
  { name: 'Seeds', rules: 'b2s' },
  { name: 'Self-replic.', rules: 'b25s2' },
  { name: 'No death', rules: 'b3s012345678' },
  { name: '34 Life', rules: 'b34s34' },
  { name: 'Diamoeba', rules: 'b35678s5678' },
  { name: '2x2', rules: 'b36s125' },
  { name: 'Day&amp;Night', rules: 'b3678s34678' },
  { name: 'Morley', rules: 'b368s245' },
  { name: 'Islands', rules: 'b4567s5678' },
  { name: 'Blobs', rules: 'b4567s4567' }
]
export default {
  name: 'RulesEditor',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    presets: PRESETS
  }),
  watch: {
    value (rules) {
      this.readRules(rules)
    }
  },
  mounted () {
    this.readRules(this.value)
  },
  methods: {
    readRules (rules) {
      const birthRegExp = new RegExp('b([0-9]*)', 'g')
      const birthMatch = birthRegExp.exec(rules)
      const birthPart = birthMatch ? birthMatch[1] : ''

      const survivalRegExp = new RegExp('s([0-9]*)', 'g')
      const survivalMatch = survivalRegExp.exec(rules)
      const survivalPart = survivalMatch ? survivalMatch[1] : ''

      for (let index = 0; index < 9; index++) {
        const bValue = birthPart.indexOf(index) >= 0
        const sValue = survivalPart.indexOf(index) >= 0
        this.$refs['b' + index][0].checked = bValue
        this.$refs['s' + index][0].checked = sValue
      }

      if (PRESETS.some(preset => preset.rules === rules)) {
        this.$refs.customPreset.value = ''
      } else {
        this.$refs.customPreset.value = rules
      }
    },
    handleSelectInput (event) {
      this.$emit('input', event.target.value)
    },
    handleCheckboxInput () {
      let birthPart = 'b'
      let survivalPart = 's'
      for (let index = 0; index < 9; index++) {
        birthPart += this.$refs['b' + index][0].checked ? index : ''
        survivalPart += this.$refs['s' + index][0].checked ? index : ''
      }
      this.$emit('input', birthPart + survivalPart)
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

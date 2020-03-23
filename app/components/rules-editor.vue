<template>
  <div class="box">
    <h1>Rules</h1>
    <p>
      Load a preset:
      <select
        ref="preset"
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
      <br>
      More info on presets
      <a
        href="http://en.wikipedia.org/wiki/Life-like_cellular_automaton"
        target="_blank"
      >here</a>
    </p>
    <p>Birth rules</p>
    <div class="rules-container birth-rules">
      <div
        v-for="index of 9"
        :key="index"
        class="rule"
      >
        <span class="ruleLabel">
          <input
            :ref="'b' + (index - 1)"
            v-model="rules.b[index - 1]"
            type="checkbox"
            @change="handleCheckboxInput()"
          >
          {{ index - 1 }}</span>
      </div>
    </div>
    <p>Survival rules</p>
    <div class="rules-container survival-rules">
      <div
        v-for="index of 9"
        :key="index"
        class="rule"
      >
        <span class="ruleLabel">
          <input
            :ref="'s' + (index - 1)"
            v-model="rules.s[index - 1]"
            type="checkbox"
            @change="handleCheckboxInput()"
          >
          {{ index - 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Rules from '../game/rules'

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
    presets: PRESETS,
    rules: new Rules()
  }),
  watch: {
    value: {
      immediate: true,
      handler: function (rules) { this.readRules(rules) }
    }
  },
  methods: {
    readRules (rules) {
      this.rules.preset = rules
      if (this.$refs.customPreset) {
        if (PRESETS.some(preset => preset.rules === rules)) {
          this.$refs.customPreset.value = ''
        } else {
          this.$refs.customPreset.value = rules
        }
      }
    },
    handleSelectInput (event) {
      this.$emit('input', event.target.value)
    },
    handleCheckboxInput () {
      this.$emit('input', this.rules.preset)
    }
  }
}
</script>

<style scoped>
.rules-container {
  display: flex;
  flex-wrap: wrap;
}
.rule {

}
</style>

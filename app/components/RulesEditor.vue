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
        <option value="b3s23">
          Conway
        </option>
        <option value="b3s35">
          Gliders
        </option>
        <option value="b36s23">
          HighLife
        </option>
        <option value="b1357s1357">
          Replicator
        </option>
        <option value="b2s">
          Seeds
        </option>
        <option value="b25s2">
          Self-replic.
        </option>
        <option value="b3s012345678">
          No death
        </option>
        <option value="b34s34">
          34 Life
        </option>
        <option value="b35678s5678">
          Diamoeba
        </option>
        <option value="b36s125">
          2x2
        </option>
        <option value="b3678s34678">
          Day&amp;Night
        </option>
        <option value="b368s245">
          Morley
        </option>
        <option value="b4567s5678">
          Islands
        </option>
        <option value="b4567s4567">
          Blobs
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
export default {
  name: 'RulesEditor',
  props: {
    value: {
      type: String,
      required: true
    }
  },
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

      this.$refs.customPreset.value = rules
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

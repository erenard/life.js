<template>
  <div>
    <button
      class="ui__play-pause__button"
      @click="handleClickPause"
      v-text="pauseButtonLabel"
    /> the game.<br>
    <button
      v-if="!running"
      class="ui__step__button"
      @click="handleClickStep"
    >
      Step
    </button>
    <button
      class="ui__benchmark__button"
      @click="handleClickBenchmark"
      v-text="benchmarkButtonLabel"
    />
  </div>
</template>

<script>
export default {
  name: 'Animator',
  props: {
    running: {
      type: Boolean,
      required: true
    },
    benchmarking: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    pauseButtonLabel () {
      return this.running ? 'Pause' : 'Resume'
    },
    benchmarkButtonLabel () {
      return `benchmark: ${this.benchmarking ? 'on' : 'off'}`
    }
  },
  methods: {
    handleClickPause () {
      this.$emit('running')
    },
    handleClickStep () {
      this.$emit('step')
    },
    handleClickBenchmark () {
      this.$emit('benchmarking')
    }
  }
}
</script>

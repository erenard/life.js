<template>
  <div>
    <button
      class="ui__play-pause__button"
      @click="handleClickPause"
      v-text="pauseButtonLabel"
    /> the game.<br>
    <button
      v-if="running"
      class="ui__benchmark__button"
      @click="handleClickBenchmark"
    >
      Benchmark
    </button>
    <button
      v-else
      class="ui__step__button"
      @click="handleClickStep"
    >
      Step
    </button>
  </div>
</template>

<script>
export default {
  name: 'Animator',
  props: {
    running: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    pauseButtonLabel () {
      return this.running ? 'Pause' : 'Resume'
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
      this.$emit('benchmark')
    }
  }
}
</script>

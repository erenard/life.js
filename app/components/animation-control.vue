<template>
  <div>
    <button
      class="ui__play-pause__button"
      @click="handleClickPause"
      v-text="pauseButtonLabel"
    /> the game.<br>
    <button
      class="ui__step__button"
      :disabled="running"
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
      this.$emit('input', !this.running)
    },
    handleClickStep () {
      this.$emit('step')
    }
  }
}
</script>

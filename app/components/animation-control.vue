<template>
  <div>
    <button
      class="ui__play-pause__button"
      @click="handleClickPause"
      v-text="pauseButtonLabel"
    /> the game.<br>
    <button
      class="ui__step__button"
      :disabled="value"
      @click="animation.mainLoop()"
    >
      Step
    </button>
  </div>
</template>

<script>
export default {
  name: 'Animator',
  props: {
    animation: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    pauseButtonLabel () {
      return this.value ? 'Pause' : 'Resume'
    }
  },
  mounted () {
    this.$emit('input', true)
  },
  methods: {
    handleClickPause () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

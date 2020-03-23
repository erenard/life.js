<template>
  <div class="box">
    <div />
    <slot />
  </div>
</template>

<script>

export default {
  name: 'UserInterface',
  data: () => ({
    randomRatio: 30
  }),
  methods: {
    handleClickRandom () {
      this.$emit('random', this.randomRatio / 100)
    }
  }
}
</script>

<style>

</style>

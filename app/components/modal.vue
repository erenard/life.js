<template>
  <div
    v-if="value"
    ref="backdrop"
    class="modal-backdrop"
    @click="close"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    value: {
      type: Boolean,
      default: Boolean.FALSE
    }
  },
  methods: {
    close (event) {
      if (event.target === this.$refs.backdrop) {
        this.$emit('input', Boolean.FALSE)
      }
    }
  }
}
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>

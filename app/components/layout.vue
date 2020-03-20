<template>
  <div class="layout">
    <div class="canvas-container">
      <slot />
    </div>
    <div class="ui-container">
      <slot name="ui" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Layout'
}
</script>
<style scoped>
.layout {
  background-color: gray;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>

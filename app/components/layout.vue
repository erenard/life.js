<template functionnal>
  <div class="layout">
    <slot />
    <div class="ui-container">
      <slot name="ui" />
    </div>
    <slot name="modals" />
  </div>
</template>
<script>
export default {
  name: 'Layout'
}
</script>
<style scoped>
.layout {
  background-color: black;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ui-container {
  top: 0;
  left: 0;
  position: fixed;
}
</style>

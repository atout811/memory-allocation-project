<template>
  <transition name="fade"><div v-if="true">Hello</div></transition>
</template>
<script>
export default {};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
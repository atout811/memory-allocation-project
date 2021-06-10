<template>
  {{ $store.input }}
</template>

<script>
export default {
  name: "Final",
  data() {
    return {
      data: this.$store.input,
    };
  },
};
</script>

<style scoped>
</style>
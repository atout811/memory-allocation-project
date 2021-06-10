<template>
  {{ data }}
</template>

<script>
import store from "../store";
export default {
  name: "Final",
  store,
  data() {
    return {
      data: this.$store.input,
    };
  },
};
</script>

<style scoped>
</style>
<template>
  {{ data }}
</template>

<script>
import store from "../store";
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
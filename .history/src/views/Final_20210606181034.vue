<template>
  {{ JSON.Stringfy(data) }}
</template>

<script>
export default {
  name: "Final",

  data() {
    return {
      data: this.$store.state.input,
    };
  },
};
</script>

<style scoped>
</style>
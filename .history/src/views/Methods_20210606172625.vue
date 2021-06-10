<template>
  <div class="methods">
    <span>Choose what methods do you want</span>
    <v-container fluid>
      <v-select :items="items" label="Standard"></v-select>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["First Fit", "Best Fit"],
  }),
};
</script>

<style scoped>
</style>
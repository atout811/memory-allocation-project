<template>
  <div class="memory">
    <span>Enter Memory Size in KB</span>
    <input type="text" placeholder="Enter size in KB" v-model="memorySize" />
  </div>
</template>
<script>
export default {
  name: "MemHole",
  data() {
    return {
      memorySize: "",
    };
  },
};
</script>

<style scoped>
</style>
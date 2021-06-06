<template>
  <div class="holes">
    <input type="button" value="Add Hole" @click="handleClick" />
    <div v-for="(hole, index) in holes" :key="index">
      <span>Enter Hole start adress</span>
      <input
        type="text"
        placeholder="Enter Start address"
        v-model="holes[index].starting"
      />
      <span>Enter Hole size</span>
      <input
        type="text"
        placeholder="Enter hole size"
        v-model="holes[index].size"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "process",
  data() {
    return {
      processes: [],
    };
  },
};
</script>

<style scoped>
</style>
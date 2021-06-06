<template>
  <div class="processes">
    <input type="button" value="Add Process" @click="handleClick" />
    <div v-for="(hole, index) in processes" :key="index">
      <span> Process {index+1}</span>
      <span>Enter Number of Segments</span>
      <input
        type="text"
        placeholder="Enter Start address"
        v-model="processes[index].starting"
      />
      <span>Enter Hole size</span>
      <input
        type="text"
        placeholder="Enter hole size"
        v-model="processes[index].size"
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
      segments: [],
    };
  },
  methods: {
    handleClick: function (index) {
      this.processes = [...this.processes, { name: index + 1, Segments: [] }];
      console.log(this.processes);
    },
  },
};
</script>

<style scoped>
</style>
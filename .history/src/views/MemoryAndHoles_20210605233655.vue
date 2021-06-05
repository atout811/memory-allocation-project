<template>
  <div class="memory">
    <span>Enter Memory Size in KB</span>
    <input type="text" placeholder="Enter size in KB" v-model="memorySize" />
  </div>
  <div class="holes">
    <input type="button" value="Add Hole" @click="handleClick" />
    <div v-for="(hole ,index)in holes" :key="index">
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
  name: "MemHole",
  data() {
    return {
      memorySize: "",
      holes: [],
    };
  },
  methods: {
    handleClick: function () {
      this.holes = [...this.holes, { starting: "", size: "" }];
    },
  },
};
</script>

<style scoped>
.memory {
  display: flex;
  flex-direction: column;
  max-width: 25%;
}
span {
  margin: 8px;
}
input {
  margin: 8px;
}
</style>
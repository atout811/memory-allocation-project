<template>
  <div class="processes">
    <input type="button" value="Add Process" @click="handleClick" />
    <div v-for="(hole, index) in processes" :key="index">
      <div class="wrapper">
        <span> Process {{ index }}</span>
        <span>Enter Number of Segments</span>
        <input
          type="text"
          placeholder="Enter Number of sgements"
          v-model="segNum"
        />
        <div v-for="i in segNum" :key="i">
          <div class="segments">
            <span>Enter Name of Segment</span>
            <input
              type="text"
              placeholder="Enter Name of sgement"
              v-model="segments[i].name"
            />
            <span>Enter Size of Segment</span>
            <input
              type="text"
              placeholder="Enter Size of sgement"
              v-model="segments[i].size"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "process",
  data() {
    return {
      processes: [],
      segNum: "",
      segments: [],
    };
  },
  methods: {
    handleClick: function (index) {
      this.processes = [
        ...this.processes,
        { name: index + 1, Segments: [{ name: "", size: "" }] },
      ];
      console.log(this.processes);
    },
  },
};
</script>

<style scoped>
span {
  margin: 8px;
}
input {
  margin: 8px;
}
</style>
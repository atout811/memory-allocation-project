<template>
  <div class="processes">
    <input type="button" value="Add Process" @click="handleClick" />
    <div v-for="(process, index) in processes" :key="index">
      <div class="wrapper">
        <span> Process {{ index }}</span>

        <input
          type="button"
          value="Add Segment"
          @click="handleProcess(index)"
        />
        <div v-for="(segment, i) in process" :key="i">
          {{ process }}
          <div class="segments">
            <span>Enter Name of Segment</span>
            <input
              type="text"
              placeholder="Enter Name of sgement"
              v-model="process[index].segments[i].name"
            />
            <span>Enter Size of Segment</span>
            <input
              type="text"
              placeholder="Enter Size of sgement"
              v-model="process[index].segments[i].size"
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
    };
  },
  methods: {
    handleClick: function (index) {
      this.processes = [
        ...this.processes,
        { name: ` P ${index} `, segments: [] },
      ];
      console.log(this.processes);
    },
    handleProcess: function (index) {
      (this.processes[index].segments = [
        ...this.processes[index].segments,
        { name: "", size: "" },
      ]),
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
<template>
  <transition>
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
          <div v-for="(segment, i) in processes[index].segments" :key="i">
            <div class="segments">
              <span>Enter Name of Segment</span>
              <input
                type="text"
                placeholder="Enter Name of sgement"
                v-model="process.segments[i].name"
              />
              <span>Enter Size of Segment</span>
              <input
                type="text"
                placeholder="Enter Size of sgement"
                v-model="process.segments[i].size"
              />
            </div>
          </div>
        </div>
      </div>
      <router-link to="/methods" @click="handleNext">Next</router-link>
    </div>
  </transition>
</template>
<script>
export default {
  name: "process",
  data() {
    return {
      processes: [],
      segNum: "",
      procesnum: 0,
    };
  },
  methods: {
    handleClick: function () {
      this.processes = [
        ...this.processes,
        { name: "P" + this.procesnum++, segments: [] },
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
    handleNext: function () {
      console.log(this.$store.state);
      this.$store.state.input.Processes = this.processes;

      console.log(this.$store.state);
    },
  },
};
</script>

<style scoped>
.processes {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
span {
  margin: 8px;
}
input {
  margin: 8px;
}
</style>
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
                name="name"
                placeholder="Enter Name of sgement"
                v-model="process.segments[i].name"
              />
              <div>
                <span>Enter Size of Segment</span>
                <input
                  type="text"
                  :name="'size' + i"
                  @input="Validation"
                  placeholder="Enter Size of sgement"
                  v-model="process.segments[i].size"
                />
                <div
                  class="error"
                  v-if="error.find((element) => element == 'size' + i)"
                >
                  Please Enter Positive Integer Number
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="link" to="/process" @click="handleNext">Next</div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "process",
  data() {
    return {
      processes: [],
      error: [],
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
      if (this.error.length) return alert("solve the error messages");
      console.log(this.$store.state);
      this.$store.state.input.Processes = this.processes;
      this.$router.push("/methods");

      console.log(this.$store.state);
    },
    Validation: function (e) {
      console.log(this.error);
      console.log(e.target.name);

      if (!/^\d+$/.test(e.target.value)) {
        if (this.error.find((element) => element == e.target.name)) return;

        return this.error.push(e.target.name);
      }
      if (/^\d+$/.test(e.target.value))
        return (this.error = this.error.filter(
          (item) => item != e.target.name
        ));
    },
  },
};
</script>

<style scoped>
.error {
  color: rgb(179, 1, 1);
}
.processes {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.link {
  cursor: pointer;
  color: #42b983;
  font-weight: bold;
}
span {
  margin: 8px;
}
input {
  margin: 8px;
}
</style>
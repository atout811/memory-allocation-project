<template>
  <transition>
    <div class="processes">
      <div class="warn">
        <div class="error" v-if="error.length">solve the error messages</div>
        <div class="error" v-if="err">Please fill all of the fields</div>
      </div>
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
                style="height: 16px"
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
      err: 0,
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
      if (!this.processes.length) {
        this.err = 1;
        return "Please fill all of the fields";
      }
      if (this.error.length) return "solve the error messages";
      console.log(this.$store.state);
      this.$store.state.input.Processes = this.processes;
      this.$router.push("/methods");

      console.log(this.$store.state);
    },
    Validation: function (e) {
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
.segments {
  display: flex;
}
span {
  margin: 8px;
}
input {
  margin: 8px;
}
</style>
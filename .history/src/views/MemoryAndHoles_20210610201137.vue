<template>
  <transition>
    <div class="wrapper">
      <h3>Welcome to our memory allocation emulator program</h3>
      <div class="warn">
        {{ err ? handleNext() : null }}
      </div>
      <div class="memory">
        <span>Enter Memory Size </span>
        <input
          type="text"
          placeholder="Enter size "
          v-model="memorySize"
          name="memSize"
          @input="Validation"
          ref="input1"
        />
        <div class="error" v-if="error.find((element) => element == 'memSize')">
          Please Enter Positive Integer Number
        </div>
      </div>
      <div class="holes">
        <input type="button" value="Add Hole" @click="handleClick" />

        <div class="test" v-for="(hole, index) in holes" :key="index">
          <div class="holaya">
            <span>Enter Hole start address</span>
            <input
              type="text"
              placeholder="Enter Start address"
              :name="'address' + index"
              @input="Validation"
              v-model="holes[index].starting"
            />
            <div
              class="error"
              v-if="error.find((element) => element == 'address' + index)"
            >
              Please Enter Positive Integer Number
            </div>
          </div>
          <div class="holaya">
            <span>Enter Hole size</span>
            <input
              type="text"
              :name="'size' + index"
              placeholder="Enter hole size"
              @input="Validation"
              v-model="holes[index].size"
            />
            <div
              class="error"
              v-if="error.find((element) => element == 'size' + index)"
            >
              Please Enter Positive Integer Number
            </div>
          </div>
        </div>
      </div>

      <div class="link" to="/process" @click="handleNext">Next</div>
    </div>
  </transition>
</template>
<script>
import store from "../store";
export default {
  name: "MemHole",
  store,
  data() {
    return {
      memorySize: "",
      holes: [],
      error: [],
      err: 0,
    };
  },

  methods: {
    handleClick: function () {
      this.holes = [...this.holes, { starting: "", size: "" }];
      console.log(this.holes);
    },
    handleNext: function () {
      if (!this.memorySize.length || !this.holes.length) {
        this.err = 1;
        return "Please fill all of the fields";
      }
      if (this.error.length) return alert("solve the error messages");
      this.$store.state.input.memSize = this.memorySize;
      this.$store.state.input.Holes = this.holes;
      console.log(this.$store.state);
      this.$router.push("/process");
    },
    Validation: function (e) {
      this.err = 0;
      if (!/^\d+$/.test(e.target.value)) {
        if (this.error.find((element) => element == e.target.name)) return;

        return this.error.push(e.target.name);
      }
      if (Number(e.target.value) > Number(this.memorySize)) {
        this.error.push(e.target.name);
        return alert("the value you've entered is bigger than memory size");
      } else {
        this.error = this.error.filter((item) => item != e.target.name);
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
.wrapper {
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
.warn {
  color: red;
}
.test {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.holes {
  width: 100%;
}
.holaya {
  width: 100%;
}
.memory {
  display: flex;
  flex-direction: column;
  max-width: 50%;
}
span {
  margin: 8px;
}
input {
  margin: 8px;
}
</style>
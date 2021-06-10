<template>
  <transition>
    <div class="wrapper">
      <h3>Welcome to our memory allocation emulator program</h3>
      <div class="memory">
        <span>Enter Memory Size in KB</span>
        <input
          type="text"
          placeholder="Enter size in KB"
          v-model="memorySize"
          @change="Validate"
        />
        <div class="error" v-if="error">Please Enter Decimal Number</div>
      </div>
      <div class="holes">
        <input type="button" value="Add Hole" @click="handleClick" />
        <div v-for="(hole, index) in holes" :key="index">
          <span>Enter Hole start address</span>
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
      <router-link to="/process" @click="handleNext">Next</router-link>
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
      error: 0,
    };
  },
  methods: {
    handleClick: function () {
      this.holes = [...this.holes, { starting: "", size: "" }];
      console.log(this.holes);
    },
    handleNext: function () {
      console.log(this.$store.state);
      this.$store.state.input.memSize = this.memorySize;
      this.$store.state.input.Holes = this.holes;
      console.log(this.$store.state);
    },
    Validation: function () {
      console.log("value");

      if (!/^\d+$/.test(this.memorySize)) return (this.error = 1);
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
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
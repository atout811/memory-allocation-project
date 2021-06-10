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
          @input="Validation(-1)"
          ref="input1"
        />
        <div class="error" v-if="error.find((element) => element == -1)">
          Please Enter Decimal Number
        </div>
      </div>
      <div class="holes">
        <input type="button" value="Add Hole" @click="handleClick" />

        <div v-for="(hole, index) in holes" :key="index">
          <div class="holaya">
            <span>Enter Hole start address</span>
            <input
              type="text"
              placeholder="Enter Start address"
              :key="index"
              @input="Validation(index)"
              v-model="holes[index].starting"
            />
            <div class="error" v-if="error.find((element) => element == index)">
              Please Enter Decimal Number
            </div>
          </div>
          <div class="holaya">
            <span>Enter Hole size</span>
            <input
              type="text"
              :key="index"
              placeholder="Enter hole size"
              @input="Validation(index)"
              v-model="holes[index].size"
            />
            <div class="error" v-if="error.find((element) => element == index)">
              Please Enter Decimal Number
            </div>
          </div>
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
      error: [],
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
    Validation: function (index) {
      console.log(this.$refs);

      if (!/^\d+$/.test(this.memorySize)) return this.error.push(index);
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
.holes {
  width: 100%;
}
.holaya {
  width: 100%;
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
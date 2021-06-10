<template>
  <transition>
    <div class="methods">
      <span>Choose what methods do you want</span>
      <select name="cars" id="cars" v-model="method">
        <option value="first-fit">First Fit</option>
        <option value="best-fit">Best Fit</option>
      </select>
      <div class="error" v-if="error">Please Choose a method</div>
      <div class="link" to="/final" @click="handleNext">
        Submit your answers
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "methods",
  data() {
    return {
      method: "",
      error: 0,
    };
  },
  methods: {
    handleNext: function () {
      if (!this.method.length) return (this.error = 1);
      console.log("test");
      this.$store.state.input.Method = this.method;
      this.$router.push("/final");
      console.log(this.$store.state);
    },
  },
};
</script>

<style scoped>
.error {
  color: rgb(179, 0, 0);
}
.methods {
  display: flex;
  flex-direction: column;

  justify-content: center;
  height: 100vh;
}
span {
  margin: 8px;
}
.link {
  cursor: pointer;
  color: #42b983;
  font-weight: bold;
}
</style>
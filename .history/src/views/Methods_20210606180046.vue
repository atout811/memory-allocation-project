<template>
  <div class="methods">
    <span>Choose what methods do you want</span>
    <select name="cars" id="cars" v-model="method">
      <option value="first-fit">First Fit</option>
      <option value="best-fit">Best Fit</option>
    </select>
    <div v-if="!method.length">Please Choose a method</div>
    <div class="link" to="/final" @click="handleNext">Submit your answers</div>
  </div>
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
      if (!method.length) return 1;
      this.$store.state.input.Method = this.method;
      router.push("/final");
      console.log(this.$store.state);
    },
  },
};
</script>

<style scoped>
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
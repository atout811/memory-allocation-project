<template>
  <div class="methods">
    <span>Choose what methods do you want</span>
    <select name="cars" id="cars" v-model="method">
      <option value="first-fit">First Fit</option>
      <option value="best-fit">Best Fit</option>
    </select>
    <router-link to="/final" @click="handleNext"
      >Submit your answers</router-link
    >
  </div>
</template>

<script>
export default {
  name: "methods",
  data() {
    return {
      method: "",
    };
  },
  methods: {
    handleNext: function () {
      this.$store.state.input.Method = this.method;
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
select {
}
</style>
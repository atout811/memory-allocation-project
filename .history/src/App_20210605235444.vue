<template>
  <h3>Welcome to our memory allocation emulator program</h3>
  <MemHole />
  <router-link to="/process">Next</router-link>
  <router-view />
</template>
<script>
import MemHole from "./views/MemoryAndHoles.vue";
export default {
  name: "App",
  components: { MemHole },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
}
a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
</style>

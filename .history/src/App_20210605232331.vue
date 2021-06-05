<template>
  <h3>Welcome to our memory allocation emulator program</h3>
  <MemHole />
  <router-view />
</template>
<script>
import MemHole from "./views/MemoryAndHoles.vue"
export default {
  name="App",
  components:{MemHole}
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

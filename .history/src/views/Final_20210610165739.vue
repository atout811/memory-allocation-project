<template>
  <div class="cont">
    Memory Representaion
    <div class="content"></div>
    <div class="con">
      <Memory />
    </div>
  </div>
</template>

<script>
import Memory from "./Memory";
export default {
  components: { Memory },
};
</script>

<style scoped>
.cont {
  display: flex;
}
</style>
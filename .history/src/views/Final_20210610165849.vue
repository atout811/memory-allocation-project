<template>
  <div class="width">
    Memory Representaion
    <div class="cont">
      <div class="content">hey</div>
      <div class="con">
        <Memory />
      </div>
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
.width {
  width: 50vw;
}
.cont {
  display: flex;
  justify-content: space-between;
}
</style>
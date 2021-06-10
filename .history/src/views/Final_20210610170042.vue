<template>
  <div class="width">
    Memory Representaion
    <div class="cont">
      <div class="content">-> If you need to delete a process</div>
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
  width: 50%;
}
.cont {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
</style>
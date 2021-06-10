<template>
  <div class="methods">
    <span>Choose what methods do you want</span>
    <select name="cars" id="cars">
      <option value="first-fit">First Fit</option>
      <option value="best-fit">Best Fit</option>
    </select>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.methods {
  display: flex;
  flex-direction: column;
}
</style>
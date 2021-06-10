<template>
  <div @click="holes" class="test">ashdshds</div>
</template>

<script>
export default {
  name: "Final",

  data() {
    return {
      data: this.$store.state.input,
    };
  },
  methods: {
    holes: function () {
      console.log("heey");
      //   for (let hole = 0; hole < holes.length; hole += 1) {
      //     const startingIndex = holes[hole][0];
      //     const size = holes[hole][1];

      //     // alert(hole)
      //     const holeBox = document.createElement("div");
      //     if (type === "old") {
      //       holeBox.innerText = holes[hole][2];
      //       holeBox.classList.add("oldProcess");
      //     } else if (type === "hole") {
      //       holeBox.innerText = "Hole #" + hole;
      //       holeBox.classList.add("hole");
      //     } else if (type === "process") {
      //       holeBox.innerText = holes[hole][2];
      //       holeBox.classList.add("process");
      //     }

      //     holeBox.style.top = `${startingIndex * scale}px`;
      //     holeBox.style.height = `${size * scale}px`;
      //     const endSize = document.createElement("span");
      //     endSize.innerText = startingIndex + size;

      //     endSize.classList.add("holeEndIndex");
      //     if (startingIndex !== null) {
      //       holeBox.appendChild(endSize);
      //       memory.appendChild(holeBox);
      //     } else {
      //       // ERROR THE PROCESS CAN'T BE ALLOCATED
      //     }
      //   }
    },
  },
};
</script>

<style scoped>
.test {
  width: 100px;
  height: 100px;
  background-color: red;
  cursor: pointer;
}
</style>
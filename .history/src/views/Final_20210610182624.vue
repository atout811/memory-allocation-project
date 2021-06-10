<template>
  <div class="cont">
    <div class="inputs">
      <div>
        If you need to delete a Process
        <input
          type="text"
          placeholder="Enter process name like P0"
          v-model="delProcess"
          class="txt"
        />
        <input
          type="Button"
          value="Delete"
          placeholder="Enter process name like P0"
          @click="deleteProcess(delProcess, false, true)"
        />
      </div>
      <div>
        If you need to delete an old Process
        <input
          type="text"
          placeholder="Enter process name like old 0"
          v-model="delOld"
          class="txt"
        />
        <input
          type="Button"
          value="Delete"
          placeholder="Enter process name like P0"
          @click="deleteProcess(delOld, true, true)"
        />
        <div>
          If you need to re-Enter the values
          <router-link to="/"> Click here </router-link>
        </div>
      </div>
    </div>
    <div class="mem">
      <div class="memory"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Final",

  data() {
    return {
      data: this.$store.state.input,
      delProcess: "",
      delOld: "",
    };
  },
  created: function () {
    let data = this.data;
    this.$store.state.input.Holes = data.Holes.map((item) => [
      Number(item.starting),
      Number(item.size),
    ]);

    let test = [];
    for (let index = 0; index < data.Processes.length; index++) {
      let item = data.Processes[index].segments;
      let temp = {};
      for (let j = 0; j < item.length; j++) {
        temp[item[j].name] = [Number(item[j].size)];
      }
      test[index] = [null, temp, data.Processes[index].name];
    }
    this.$store.state.input.Processes = [...test];
  },
  methods: {
    deleteProcess: function (delProcess, isOld) {
      const memory = document.querySelector("div.cont div.mem > .memory");

      const scale = 2;
      let data = this.data;
      let holes = data.Holes;
      // data.Holes.map((item) => [
      //   Number(item.starting),
      //   Number(item.size),
      // ]);

      // let holes = [
      //   [140, 100],
      //   [40, 80],
      //   [260, 90],
      // ];

      let totalMemorySize = Number(data.memSize);
      function orderHoles() {
        holes = holes.sort((a, b) => a[0] - b[0]);
      }
      function renderMemory() {
        memory.style.height = `${totalMemorySize * scale}px`;
      }
      renderMemory();
      let obj = {};
      // let test = data.Processes.map((item) => [
      //   null,
      //   item.segments.forEach((el) => {
      //     return Object.assign({ [el.name]: [Number(el.size)] });
      //   }),
      //   item.name,
      // ]);
      // let test = [];
      // for (let index = 0; index < data.Processes.length; index++) {
      //   let item = data.Processes[index].segments;
      //   let temp = {};
      //   for (let j = 0; j < item.length; j++) {
      //     temp[item[j].name] = [Number(item[j].size)];
      //   }
      //   test[index] = [null, temp, data.Processes[index].name];
      // }
      let processes = data.Processes;

      // processes = [
      //   [null, { code: [10], data: [30], stack: [16] }, "p1"],
      //   [null, { code: [15], data: [30], stack: [25] }, "p3"],
      //   [null, { code: [10], data: [40], stack: [18] }, "p2"],
      //   [null, { code: [12], data: [10], stack: [12] }, "p4"],
      // ]; //start,size,name
      console.log("prooooooooooocess: ", processes);
      let OldProcess = [];

      function generateOldProcess() {
        const firstHoleStart = holes[0][0];
        let flag;
        if (firstHoleStart > 0) {
          OldProcess.push([0, firstHoleStart, `old ${0}`]);
        }

        for (let h = 0; h < holes.length; h++) {
          const holeStart = holes[h][0];
          const HoleSize = holes[h][1];
          const HoleEnd = holeStart + HoleSize;

          if (h === holes.length - 1) {
            const lastHole = totalMemorySize - HoleEnd;
            if (HoleEnd < totalMemorySize)
              OldProcess.push([HoleEnd, lastHole, `old ${h + 1}`]);
          } else {
            const nextStart = holes[h + 1][0];
            OldProcess.push([HoleEnd, nextStart - HoleEnd, `old ${h + 1}`]);
          }
        }
      }
      // alert(holes[0][0])
      function renderHoles(type, holes) {
        // holes ==>
        for (let hole = 0; hole < holes.length; hole += 1) {
          const startingIndex = holes[hole][0];
          const size = holes[hole][1];

          // alert(hole)
          const holeBox = document.createElement("div");
          if (type === "old") {
            holeBox.innerText = holes[hole][2];
            holeBox.classList.add("oldProcess");
          } else if (type === "hole") {
            holeBox.innerText = "Hole #" + hole;
            holeBox.classList.add("hole");
          } else if (type === "process") {
            holeBox.innerText = holes[hole][2];
            holeBox.classList.add("process");
          }

          holeBox.style.top = `${startingIndex * scale}px`;
          holeBox.style.height = `${size * scale}px`;
          const endSize = document.createElement("span");
          const endSizeContainer = document.createElement("div");
          endSizeContainer.classList.add("endSizeContainer");
          endSizeContainer.appendChild(endSize);
          endSize.innerText = startingIndex + size;

          endSize.classList.add("holeEndIndex");
          if (startingIndex !== null) {
            holeBox.appendChild(endSizeContainer);
            memory.appendChild(holeBox);
          } else {
            // ERROR THE PROCESS CAN'T BE ALLOCATED
          }
        }
      }

      const totalProcessSize = (process) =>
        Object.values(process).reduce((prev, acc) => prev + acc);

      let method = data.Method;
      function allocate() {
        for (let p = 0; p < processes.length; p++) {
          // DON'T TOUCH MY SHIT 😡😡😡
          // firstFit(processes[p])
          if (method == "first-fit") {
            console.log("First");
            firstFit(processes[p]);
          } else if (method == "best-fit") {
            console.log("Best");
            bestFit(processes[p], true);
          } else if (method == "worse-fit") {
            console.log("Worse");
            bestFit(processes[p], false);
          }
        }
        console.log("PROCCESES", processes);
      }

      function getSmallestHole(tempHoles, segmentSize, isBest) {
        let smallestHole = isBest ? [0, 1000000] : [0, 0];

        tempHoles.forEach((hole, index) => {
          const [holeStart, holeSize] = hole;
          if (isBest) {
            if (holeSize > segmentSize && smallestHole[1] > holeSize) {
              smallestHole = hole;
              smallestHole[2] = index;
            } else if (
              smallestHole[2] === undefined &&
              index === tempHoles.length - 1
            ) {
              // couldn't find hole
              smallestHole[2] = -1;
            }
          } else {
            // worse fit (let largest hole)
            if (holeSize > segmentSize && smallestHole[1] < holeSize) {
              smallestHole = hole;
              smallestHole[2] = index;
            } else if (
              smallestHole[2] === undefined &&
              index === tempHoles.length - 1
            ) {
              // couldn't find hole
              smallestHole[2] = -1;
            }
          }
        });
        return smallestHole;
      }

      function bestFit(p, isBest) {
        // Allocate in the smallest hole
        const segments = p[1];
        let isAllProcessAllocated = true;
        let tempHoles = JSON.parse(JSON.stringify(holes));
        Object.entries(segments).forEach(
          // for each segment
          ([name, value]) => {
            const segmentSize = value[0];
            let smallest = getSmallestHole(tempHoles, segmentSize, isBest);
            const [holeStart, holeEnd, holeIndex] = smallest;
            if (holeIndex == -1) {
              console.log("PROCESS CAN NOt BE ALLOCATED", p);
              isAllProcessAllocated = false;
              p[0] = true;
            }

            value[1] = smallest[0];
            const segEnd = segmentSize + holeStart;

            if (holeIndex !== -1) {
              tempHoles[holeIndex][0] = segEnd;
              const oldHoleSize = tempHoles[holeIndex][1];
              tempHoles[holeIndex][1] = oldHoleSize - segmentSize;
            } else {
              console.log("BUBUBUB", holeIndex);
            }

            //    console.log("value",value)
            //    console.log("smallestHole",smallest)
            console.log("_________________");
          }
        );
        if (isAllProcessAllocated) holes = tempHoles;
      }

      function firstFit(p) {
        // forEach segment loop over the holes
        // create a temp allocation array
        // that array
        // const size =totalProcessSize
        const segments = p[1];
        let isAllProcessAllocated = true;
        let tempHoles = JSON.parse(JSON.stringify(holes));

        Object.entries(segments).forEach(([name, value]) => {
          tempHoles.every((hole, index) => {
            const [holeStart, holeSize] = hole;
            let [size, segmentStartingIndex] = value;
            if (size <= holeSize) {
              value[1] = tempHoles[index][0];
              const segEnd = size + holeStart;
              tempHoles[index][0] = segEnd;
              tempHoles[index][1] = tempHoles[index][1] - size;
              return false;
            } else {
              if (index === tempHoles.length - 1) {
                //😞 مش لاقي مكان
                isAllProcessAllocated = false;
                console.log("CATCH", p);
                p[0] = true;
              }
              return true;
            }
          });
        });
        if (isAllProcessAllocated) {
          holes = tempHoles;
        }
      }

      function renderProcess() {
        processes.forEach((p) => {
          // loop over segments:
          if (!p[0]) {
            Object.keys(p[1]).forEach((s) => {
              // console.log("SEGMEMT",[p[1][s][1],[p[1][s]][0]])
              renderHoles("process", [
                [p[1][s][1], p[1][s][0], `${p[2]}:${s}`],
              ]);
            });
          }
          // }else{
          // PROCESS CAN NOT BE ALLOCATED (NO ENGOUGH SPACE!)
          // }
        });
      }

      function concateHoles() {
        holes.forEach((h, index) => {
          const [start, size] = h;
          if (index < holes.length - 1) {
            const end = start + size;
            const [nextStart, nextSize] = holes[index + 1];
            if (end >= nextStart) {
              holes[index][1] = nextStart + nextSize - start;
              holes = [...holes.slice(0, index + 1), ...holes.slice(index + 2)];
              concateHoles();
            }
          }
        });
      }

      function deleteProcess(processName, isOld) {
        // create a hole
        console.log(
          "--------------------------------------------------------------------------------"
        );

        let start, ProcessSize, AfterDelete, segments;
        if (isOld) {
          // deleteProcess()
          const processIndex = OldProcess.findIndex(
            (p) => p[2] === processName
          );
          AfterDelete = [
            ...OldProcess.slice(0, processIndex),
            ...OldProcess.slice(processIndex + 1),
          ];
          // [start,segments,name] =processes[processIndex]
          start = OldProcess[processIndex][0];
          ProcessSize = OldProcess[processIndex][1];

          OldProcess = AfterDelete;
          holes.push([start, ProcessSize]);
        } else {
          const processIndex = processes.findIndex((p) => p[2] === processName);
          console.log("INDDDEX", processIndex);
          AfterDelete = [
            ...processes.slice(0, processIndex),
            ...processes.slice(processIndex + 1),
          ];
          //  recover Holes
          const [starter, segments] = processes[processIndex];
          Object.values(segments).forEach(([size, starting]) => {
            console.log(size, starting);
            holes.push([starting, size]);
          });
          processes = AfterDelete;
          console.log(processes);
        }

        orderHoles();
        concateHoles();
        // [null,{code:10,data:30,stack:16},"p1"]
        render();
      }
      orderHoles();
      concateHoles();
      generateOldProcess();
      // deleteProcess("old 0",true)
      // deleteProcess("old 2",true)
      allocate();

      function clear() {
        while (memory.firstChild) {
          memory.removeChild(memory.lastChild);
        }
      }

      function render() {
        clear();
        renderHoles("hole", holes);
        renderHoles("old", OldProcess);
        renderProcess();
      }
      render();
      if (delProcess.length) {
        deleteProcess(delProcess, isOld);
      }
      // deleteProcess("p2",false)
      // deleteProcess("p1",false)
      // deleteProcess("p4",false)
    },
  },
  mounted: function () {
    const memory = document.querySelector("div.cont div.mem > .memory");
    console.log(memory);
    const scale = 2;
    let data = this.data;

    let holes = data.Holes;
    // data.Holes.map((item) => [
    //   Number(item.starting),
    //   Number(item.size),
    // ]);

    // let holes = [
    //   [140, 100],
    //   [40, 80],
    //   [260, 90],
    // ];

    let totalMemorySize = Number(data.memSize);
    function orderHoles() {
      holes = holes.sort((a, b) => a[0] - b[0]);
    }
    function renderMemory() {
      memory.style.height = `${totalMemorySize * scale}px`;
    }
    renderMemory();
    let obj = {};
    // let test = data.Processes.map((item) => [
    //   null,
    //   item.segments.forEach((el) => {
    //     return Object.assign({ [el.name]: [Number(el.size)] });
    //   }),
    //   item.name,
    // ]);
    // let test = [];
    // for (let index = 0; index < data.Processes.length; index++) {
    //   let item = data.Processes[index].segments;
    //   let temp = {};
    //   for (let j = 0; j < item.length; j++) {
    //     temp[item[j].name] = [Number(item[j].size)];
    //   }
    //   test[index] = [null, temp, data.Processes[index].name];
    // }
    let processes = data.Processes;
    console.log("prooooooooooocess: ", processes);
    let OldProcess = [];

    function generateOldProcess() {
      const firstHoleStart = holes[0][0];

      if (firstHoleStart > 0) {
        OldProcess.push([0, firstHoleStart, `old ${0}`]);
      }

      for (let h = 0; h < holes.length; h++) {
        const holeStart = holes[h][0];
        const HoleSize = holes[h][1];
        const HoleEnd = holeStart + HoleSize;

        if (h === holes.length - 1) {
          const lastHole = totalMemorySize - HoleEnd;
          if (HoleEnd < totalMemorySize)
            OldProcess.push([HoleEnd, lastHole, `old ${h + 1}`]);
        } else {
          const nextStart = holes[h + 1][0];
          OldProcess.push([HoleEnd, nextStart - HoleEnd, `old ${h + 1}`]);
        }
      }
    }
    // alert(holes[0][0])
    function renderHoles(type, holes) {
      // holes ==>
      for (let hole = 0; hole < holes.length; hole += 1) {
        const startingIndex = holes[hole][0];
        const size = holes[hole][1];

        // alert(hole)
        const holeBox = document.createElement("div");
        if (type === "old") {
          holeBox.innerText = holes[hole][2];
          holeBox.classList.add("oldProcess");
        } else if (type === "hole") {
          holeBox.innerText = "Hole #" + hole;
          holeBox.classList.add("hole");
        } else if (type === "process") {
          holeBox.innerText = holes[hole][2];
          holeBox.classList.add("process");
        }

        holeBox.style.top = `${startingIndex * scale}px`;
        holeBox.style.height = `${size * scale}px`;
        const endSize = document.createElement("span");
        const endSizeContainer = document.createElement("div");
        endSizeContainer.classList.add("endSizeContainer");
        endSizeContainer.appendChild(endSize);
        endSize.innerText = startingIndex + size;

        endSize.classList.add("holeEndIndex");
        if (startingIndex !== null) {
          holeBox.appendChild(endSizeContainer);
          memory.appendChild(holeBox);
        } else {
          // ERROR THE PROCESS CAN'T BE ALLOCATED
        }
      }
    }

    const totalProcessSize = (process) =>
      Object.values(process).reduce((prev, acc) => prev + acc);

    let method = data.Method;
    function allocate() {
      for (let p = 0; p < processes.length; p++) {
        // DON'T TOUCH MY SHIT 😡😡😡
        // firstFit(processes[p])
        if (method == "first-fit") {
          console.log("First");
          firstFit(processes[p]);
        } else if (method == "best-fit") {
          console.log("Best");
          bestFit(processes[p], true);
        } else if (method == "worse-fit") {
          console.log("Worse");
          bestFit(processes[p], false);
        }
      }
      console.log("PROCCESES", processes);
    }

    function getSmallestHole(tempHoles, segmentSize, isBest) {
      let smallestHole = isBest ? [0, 1000000] : [0, 0];

      tempHoles.forEach((hole, index) => {
        const [holeStart, holeSize] = hole;
        if (isBest) {
          if (holeSize > segmentSize && smallestHole[1] > holeSize) {
            smallestHole = hole;
            smallestHole[2] = index;
          } else if (
            smallestHole[2] === undefined &&
            index === tempHoles.length - 1
          ) {
            // couldn't find hole
            smallestHole[2] = -1;
          }
        } else {
          // worse fit (let largest hole)
          if (holeSize > segmentSize && smallestHole[1] < holeSize) {
            smallestHole = hole;
            smallestHole[2] = index;
          } else if (
            smallestHole[2] === undefined &&
            index === tempHoles.length - 1
          ) {
            // couldn't find hole
            smallestHole[2] = -1;
          }
        }
      });
      return smallestHole;
    }

    function bestFit(p, isBest) {
      // Allocate in the smallest hole
      const segments = p[1];
      let isAllProcessAllocated = true;
      let tempHoles = JSON.parse(JSON.stringify(holes));
      Object.entries(segments).forEach(
        // for each segment
        ([name, value]) => {
          const segmentSize = value[0];
          let smallest = getSmallestHole(tempHoles, segmentSize, isBest);
          const [holeStart, holeEnd, holeIndex] = smallest;
          if (holeIndex == -1) {
            console.log("PROCESS CAN NOt BE ALLOCATED", p);
            isAllProcessAllocated = false;
            p[0] = true;
          }

          value[1] = smallest[0];
          const segEnd = segmentSize + holeStart;

          if (holeIndex !== -1) {
            tempHoles[holeIndex][0] = segEnd;
            const oldHoleSize = tempHoles[holeIndex][1];
            tempHoles[holeIndex][1] = oldHoleSize - segmentSize;
          } else {
            console.log("BUBUBUB", holeIndex);
          }

          //    console.log("value",value)
          //    console.log("smallestHole",smallest)
          console.log("_________________");
        }
      );
      if (isAllProcessAllocated) holes = tempHoles;
    }

    function firstFit(p) {
      // forEach segment loop over the holes
      // create a temp allocation array
      // that array
      // const size =totalProcessSize
      const segments = p[1];
      let isAllProcessAllocated = true;
      let tempHoles = JSON.parse(JSON.stringify(holes));

      Object.entries(segments).forEach(([name, value]) => {
        tempHoles.every((hole, index) => {
          const [holeStart, holeSize] = hole;
          let [size, segmentStartingIndex] = value;
          if (size <= holeSize) {
            value[1] = tempHoles[index][0];
            const segEnd = size + holeStart;
            tempHoles[index][0] = segEnd;
            tempHoles[index][1] = tempHoles[index][1] - size;
            return false;
          } else {
            if (index === tempHoles.length - 1) {
              //😞 مش لاقي مكان
              isAllProcessAllocated = false;
              console.log("CATCH", p);
              p[0] = true;
            }
            return true;
          }
        });
      });
      if (isAllProcessAllocated) {
        holes = tempHoles;
      }
    }

    function renderProcess() {
      processes.forEach((p) => {
        // loop over segments:
        if (!p[0]) {
          Object.keys(p[1]).forEach((s) => {
            // console.log("SEGMEMT",[p[1][s][1],[p[1][s]][0]])
            renderHoles("process", [[p[1][s][1], p[1][s][0], `${p[2]}:${s}`]]);
          });
        }
        // }else{
        // PROCESS CAN NOT BE ALLOCATED (NO ENGOUGH SPACE!)
        // }
      });
    }

    function concateHoles() {
      holes.forEach((h, index) => {
        const [start, size] = h;
        if (index < holes.length - 1) {
          const end = start + size;
          const [nextStart, nextSize] = holes[index + 1];
          if (end >= nextStart) {
            holes[index][1] = nextStart + nextSize - start;
            holes = [...holes.slice(0, index + 1), ...holes.slice(index + 2)];
            concateHoles();
          }
        }
      });
    }

    function deleteProcess(processName, isOld) {
      // create a hole
      let start, ProcessSize, AfterDelete, segments;
      if (isOld) {
        // deleteProcess()
        const processIndex = OldProcess.findIndex((p) => p[2] === processName);
        AfterDelete = [
          ...OldProcess.slice(0, processIndex),
          ...OldProcess.slice(processIndex + 1),
        ];
        // [start,segments,name] =processes[processIndex]
        start = OldProcess[processIndex][0];
        ProcessSize = OldProcess[processIndex][1];

        OldProcess = AfterDelete;
        holes.push([start, ProcessSize]);
      } else {
        const processIndex = processes.findIndex((p) => p[2] === processName);
        console.log("INDDDEX", processIndex);
        AfterDelete = [
          ...processes.slice(0, processIndex),
          ...processes.slice(processIndex + 1),
        ];
        //  recover Holes
        const [starter, segments] = processes[processIndex];
        Object.values(segments).forEach(([size, starting]) => {
          console.log(size, starting);
          holes.push([starting, size]);
        });
        processes = AfterDelete;
      }

      orderHoles();
      concateHoles();
      // [null,{code:10,data:30,stack:16},"p1"]
      render();
    }
    orderHoles();
    concateHoles();
    generateOldProcess();
    // deleteProcess("old 0",true)
    // deleteProcess("old 2",true)
    allocate();

    function clear() {
      while (memory.firstChild) {
        memory.removeChild(memory.lastChild);
      }
    }

    function render() {
      clear();
      renderHoles("hole", holes);
      renderHoles("old", OldProcess);
      renderProcess();
    }
    render();

    //deleteProcess("P2", false);
    // deleteProcess("p1",false)
    // deleteProcess("p4",false)
  },
};
</script>

<style scoped >
/* .memory >>> body {
  display: flex;
  flex-direction: column;
  justify-content: right;
  height: 100vh;

  margin: 0;
  font-family: "Courier New", Courier, monospace;
} */
div {
  margin: 10px;
}
.txt {
  width: 70%;
  border-radius: 5px;
  border: 1px solid;
}
.cont {
  display: grid;
}
.inputs {
  grid-column: 1;
  display: flex;
  flex-direction: column;
}
.memory >>> h1 {
  color: blueviolet;
}
.mem {
  grid-column: 4;
}
.memory {
  background-color: #005a2d;
  /* padding: 20px; */
  /* border-radius: 5px; */
  display: flex;
  flex-direction: column;
  width: 200px;
  align-self: flex-end;
  height: 1150px;
  /* top: 5%; */
  position: absolute;
  padding-left: 20px;
  overflow: hidden;
  margin: 20px;
}
.memory >>> .hole {
  background-color: #ce6c47;
  /* border: 0.7px solid #0f0; */
  border: 1px solid lightgreen;
  margin-top: 1px;
  /* height: 100px; */
  display: flex;
  /* align-self: center; */
  width: 100%;
  color: white;

  /* align-items: center; */
  /* justify-content: center; */
  position: absolute;
}
.memory >>> .oldProcess {
  background-color: #241e4e;
  /* border: 0.7px solid darkred; */
  color: white;
  display: flex;
  border: 1px solid lightgreen;
  width: 100%;
  position: absolute;
}
.memory >>> .process {
  background-color: #960200;
  /* border-bottom: 0.7px solid #eae7af; */
  /* border-top: 0.7px solid lightgreen; */
  display: flex;
  width: 100%;
  position: absolute;
  color: white;
  border: 1px solid lightgreen;
}

.memory >>> .hole,
.oldProcess,
.process {
  font-size: 0.6rem;
  text-transform: capitalize;
  padding-left: 2px;
  color: #fff;
  border-top: 0.2px solid lightgreen;
}

.memory >>> .endSizeContainer {
  /* background-color: red !important; */
  width: 20px;
  z-index: 1000;
  color: lightgreen !important;
  color: #ccc;
  font-size: 0.5rem;

  position: absolute;
  top: calc(100% - 5.4px);
  text-align: right;
  display: block;
  left: -20px;
}
.memory >>> .holeEndIndex::after {
  content: "-";
}
</style>
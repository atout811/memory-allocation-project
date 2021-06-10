<template>
  <div class="memory"></div>
</template>

<script>
export default {
  name: "Final",

  data() {
    return {
      data: this.$store.state.input,
    };
  },
  mounted: function () {
    const memory = document.querySelector(".memory");
    const scale = 2;

    let holes = this.data.Holes.map((item) => [item.starting, item.size]);
    let totalMemorySize = this.data.memSize;
    function orderHoles() {
      holes = holes.sort((a, b) => a[0] - b[0]);
    }
    function renderMemory() {
      memory.style.height = `${totalMemorySize * scale}px`;
    }
    renderMemory();
    let obj = {};
    let test = this.data.Processes.map((item) => [
      null,
      item.segments.forEach((el) => {
        obj[el.name] = [Number(el.size)];
      }),
      item.name,
    ]);
    console.log("testoooooo: ", test);
    let processes = test.map((item) => [null, obj, item[2]]);
    let OldProcess = [];

    function generateOldProcess() {
      const firstHoleStart = holes[0][0];

      if (firstHoleStart > 0) OldProcess.push([0, firstHoleStart, `old ${0}`]);

      for (let h = 0; h < holes.length; h++) {
        const holeStart = holes[h][0];
        const HoleSize = holes[h][1];
        const HoleEnd = holeStart + HoleSize;

        if (h === holes.length - 1) {
          const lastHole = totalMemorySize - HoleEnd;
          if (HoleEnd < totalMemorySize)
            OldProcess.push([HoleEnd, lastHole, `old ${h}`]);
        } else {
          const nextStart = holes[h + 1][0];
          OldProcess.push([HoleEnd, nextStart - HoleEnd, `old ${h}`]);
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

    function allocate() {
      for (let p = 0; p < processes.length; p++) {
        // DON'T TOUCH MY SHIT 😡😡😡
        let temp = JSON.parse(JSON.stringify(processes[p]));
        firstFit(temp);
        // bestFit(processes[p])
      }
    }
    // function bestFit(p){
    //     // Allocate in the smallest hole
    //     const segments=p[1]
    //     let tempHoles =JSON.parse(JSON.stringify(holes));
    //     Object.entries(segments).forEach(
    //         ([name, value]) =>{
    //             tempHoles.every((hole,index)=>{
    //                 const [holeStart,holeSize] = hole
    //                 let  [size,segmentStartingIndex]=value
    //                 if(size<= holeSize){
    //                     value[1] =  tempHoles[index][0]
    //                     const segEnd = size+holeStart
    //                     tempHoles[index][0] = segEnd
    //                     tempHoles[index][1]= tempHoles[index][1] - size
    //                     return false
    //                 }else{
    //                     if(index===tempHoles.length-1){
    //                         //😞 مش لاقي مكان
    //                          isAllProcessAllocated = false
    //                         console.log("CATCH",p)
    //                         p[0]=true
    //                     }
    //                     return true
    //                 }
    //             })
    //         }
    //     );
    //     if( isAllProcessAllocated)
    //         holes = tempHoles
    // }

    function firstFit(p) {
      // forEach segment loop over the holes
      // create a temp allocation array
      // that array
      // const size =totalProcessSize

      const segments = p[1];
      let isAllProcessAllocated = true;
      let tempHoles = JSON.parse(JSON.stringify(holes));

      // tempHoles  = []
      // holes=tempHoles
      Object.entries(segments).forEach(([name, value]) => {
        // isAllProcessAllocated = true
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
        console.log("hooooooooooolesss", segments);
      });
      if (isAllProcessAllocated) {
        console.log("FFF", p);
        holes = tempHoles;
      }
    }

    function renderProcess() {
      processes.forEach((p) => {
        // if(accumalatedStartingIndex!==undefined){

        // loop over segments:
        if (!p[0]) {
          Object.keys(p[1]).forEach((s) => {
            console.log("SEGMEMT", [p[1][s][1], [p[1][s]][0]]);
            renderHoles("process", [[p[1][s][1], p[1][s][0], `${p[2]}:${s}`]]);
            // accumalatedStartingIndex+=p[1][s]
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
    // deleteProcess("p2",false)
    // deleteProcess("p1",false)
    // deleteProcess("p4",false)
  },
};
</script>

<style  >
body {
  display: flex;
  flex-direction: column;
  justify-content: right;
  height: 100vh;
  margin: 0;
  font-family: "Courier New", Courier, monospace;
}
h1 {
  color: blueviolet;
}
.memory {
  background-color: #111;
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
}
.hole {
  background-color: #ff6c00;
  /* border: 0.7px solid #0f0; */

  margin-top: 1px;
  /* height: 100px; */
  display: flex;
  /* align-self: center; */
  width: 100%;

  /* align-items: center; */
  /* justify-content: center; */
  position: absolute;
}
.oldProcess {
  background-color: #a0204c;
  /* border: 0.7px solid darkred; */
  display: flex;

  width: 100%;
  position: absolute;
}
.process {
  background-color: #23103a;
  /* border-bottom: 0.7px solid #eae7af; */
  /* border-top: 0.7px solid lightgreen; */
  display: flex;
  width: 100%;
  position: absolute;
}

.hole,
.oldProcess,
.process {
  font-size: 0.6rem;
  text-transform: capitalize;
  padding-left: 2px;
  color: #fff;
  border-top: 0.2px solid lightgreen;
}

.endSizeContainer {
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
.holeEndIndex::after {
  content: "-";
}
</style>
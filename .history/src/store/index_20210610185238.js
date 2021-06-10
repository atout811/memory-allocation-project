import { createStore } from "vuex";

export default createStore({
  state: {
    input: {
      memSize: 200,
      Holes: [
        { starting: 50, size: 20 },
        { starting: 120, size: 80 },
      ],
      Processes: [
        {
          name: "P0",
          segments: [
            { name: "code", size: 15 },
            { name: "stack", size: 5 },
            { name: "data", size: 10 },
          ],
        },
        {
          name: "P1",
          segments: [
            { name: "code", size: 5 },
            { name: "stack", size: 5 },
            { name: "data", size: 10 },
          ],
        },
      ],
      Method: "best-fit",
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});

import { createStore } from "vuex";

export default createStore({
  state: {
    input: {
      memSize: 500,
      Holes: [
        { starting: 50, size: 100 },
        { starting: 200, size: 100 },
      ],
      Processes: [
        {
          name: "P0",
          segments: [
            { name: "code", size: 10 },
            { name: "stack", size: 5 },
            { name: "data", size: 20 },
          ],
        },
        {
          name: "P1",
          segments: [
            { name: "code", size: 15 },
            { name: "stack", size: 20 },
            { name: "data", size: 30 },
          ],
        },
      ],
      Method: "first-fit",
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});

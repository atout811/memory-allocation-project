import { createRouter, createWebHashHistory } from "vue-router";
import Process from "../views/Process";
import MemoryAndHoles from "../views/MemoryAndHoles";
import Methods from "../views/Methods";
import Final from "../views/Final";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MemoryAndHoles,
  },
  {
    path: "/process",
    name: "Process",
    component: Process,
  },
  {
    path: "/methods",
    name: "Methods",
    component: Methods,
  },
  {
    path: "/final",
    name: "Final",
    component: Final,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import Process from "../views/Process";
import MemoryAndHoles from "../views/MemoryAndHoles";
import Methods from "../views/Methods";

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
    name: "About",
    component: Methods,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

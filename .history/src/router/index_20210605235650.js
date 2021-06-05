import { createRouter, createWebHashHistory } from "vue-router";
import Process from "../views/Process";
import MemoryAndHoles from "../views/MemoryAndHoles";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MemoryAndHoles,
  },
  {
    path: "/process",
    name: "About",
    component: Process,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

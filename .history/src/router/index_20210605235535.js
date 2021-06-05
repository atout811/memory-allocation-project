import { createRouter, createWebHashHistory } from "vue-router";
import Process from "../views/Process";

const routes = [
  {
    path: "/",
    name: "Home",
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

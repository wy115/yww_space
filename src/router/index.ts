import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routesList } from "./routesList";


const routes: Array<RouteRecordRaw> = [...routesList];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routesList } from "./routesList";
import { threeRoutes } from "./threeRoutes.ts";

const routes: Array<RouteRecordRaw> = [...routesList, ...threeRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

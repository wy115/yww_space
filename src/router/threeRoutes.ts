import type { RouteRecordRaw } from "vue-router";
import i18n from "@/locales/index.js";
export const threeRoutes: RouteRecordRaw[] = [
  {
    path: "/three",
    name: "Three",
    component: () =>
      import("@/views/projectIntroduction/three/threePlaceholder.vue"),
    children: [
      {
        path: "smartCity",
        name: "SmartCity",
        component: () =>
          import("@/views/projectIntroduction/three/smartCity/index.vue"),
        meta: {
          title: i18n.global.t("智慧城市"),
          icon: "GoodsFilled",
        },
      },
    ],
  },
];

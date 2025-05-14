import type { RouteRecordRaw } from "vue-router";
import i18n from "@/locales/index.js";

export const routesList: RouteRecordRaw[] = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/allViews/index.vue"),
    meta: {
      title: i18n.global.t("首页"),
      icon: "GoodsFilled",
      id: "home-page",
    },
  },
  {
    path: "/personalintroduction",
    name: "PersonalIntroduction",
    component: () => import("@/views/personalIntroduction/index.vue"),
    meta: {
      title: i18n.global.t("个人介绍"),
      icon: "Stamp",
      id: "personal-introduction",
    },
  },
  {
    path: "/projectintroduction",
    name: "ProjectIntroduction",
    component: () => import("@/views/projectIntroduction/index.vue"),
    meta: {
      title: i18n.global.t("项目介绍"),
      icon: "GoodsFilled",
      id: "project-introduction",
    },
  },

  // {
  //   path: "/three",
  //   name: "Three",
  //   component: () => import("@/views/projectIntroduction/index.vue"),
  //   meta: {
  //     title: i18n.global.t("项目介绍"),
  //     icon: "GoodsFilled",
  //   },
  // },
];

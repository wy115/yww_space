import { createApp } from "vue";
import "@/style.css";

import App from "@/App.vue";

import router from "@/router";
//element
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//国际化
import i18n from "@/locales";

import '@/styles/tailwind.css'
const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");

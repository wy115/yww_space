import { createI18n } from "vue-i18n";
import en from "./en";
import zh from "./zh";

const messages: any = {
  en,
  zh,
};

const i18n = createI18n({
  legacy: false, // 如果想在composition api中使用需要设置为false
  locale: "zh", // 默认语言
  messages,
  globalInjection: true // 如果设置true, $t() 函数将注册到全局
});

export default i18n;

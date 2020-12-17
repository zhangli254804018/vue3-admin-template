import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/styles/index.scss"; // global css

// import "element-plus/lib/theme-chalk/index.css";
// import element-plus from "element-plus";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import { useIcons } from "@/icons"; // icon
import "@/permission"; // permission control

const app = createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus);
useIcons(app);
app.mount("#app");

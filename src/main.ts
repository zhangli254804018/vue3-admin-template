/*
 * @Date: 2020-12-01 15:01:33
 * @LastEditors: zhangyuge
 * @LastEditTime: 2020-12-01 15:14:45
 * @FilePath: \partd:\rf-dev\vue3-admin-demo\src\main.ts
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');

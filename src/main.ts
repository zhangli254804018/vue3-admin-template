/*
 * @Date: 2020-12-01 15:01:33
 * @LastEditors: zhangyuge
 * @LastEditTime: 2020-12-03 11:46:51
 * @FilePath: \partd:\rf-dev\vue3-admin-template\src\main.ts
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import * as filters from './filters'; // global filters
import * as directives from './directive/index.js'; //import directive fn

const app = createApp(App);

app.config.globalProperties.$filters = filters;

app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');



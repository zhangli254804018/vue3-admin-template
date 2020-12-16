import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'

import { useIcons } from '@/icons' // icon
import '@/permission' // permission control

const app = createApp(App)
  .use(router)
  .use(store)
  .use(Element3)
useIcons(app)
app.mount('#app')

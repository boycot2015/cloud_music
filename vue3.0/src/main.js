import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
import api from './api/install'
createApp(App)
    .use(api)
    .use(store)
    .use(router)
    .mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
import './api/install'
createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

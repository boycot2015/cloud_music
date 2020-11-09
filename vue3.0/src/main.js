import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
import api from './api/install'
import * as directives from './directives'
const VueInstance = createApp(App)
Object.keys(directives).forEach(k => {
    VueInstance.directive(k, directives[k])
})
VueInstance.use(api)
    .use(store)
    .use(router)
    .mount('#app')

// console.log(VueInstance)

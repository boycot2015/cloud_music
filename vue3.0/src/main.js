import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
import api from './api/install'
import * as directives from './directives'
// 引入弹窗组件MessageBox
import MessageBox from './components/MessageBox'
const VueInstance = createApp(App)
Object.keys(directives).forEach(k => {
    VueInstance.directive(k, directives[k])
})
VueInstance.use(api)
    .use(MessageBox)
    .use(store)
    .use(router)
    .mount('#app')

// console.log(VueInstance)

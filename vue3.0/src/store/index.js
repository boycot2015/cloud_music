import { createStore } from 'vuex'
import router from '@/router'
import home from './home'
export default createStore({
    state: {
        metaTitle: '网易云音乐',
        menu: router.options.routes.filter(_ => !_.meta.hideInMenu),
        playData: {
            lyrc: '一诺千金到尽头',
            name: '菩提偈',
            singer: '刘惜君',
            picUrl: require('@/assets/images/avatar.jpg')
        }
    },
    mutations: {
        setTitle (state, title) {
            state.metaTitle = title
            document.title = title
        },
        getPlayData () {

        }
    },
    actions: {
    },
    modules: {
        home
    }
})

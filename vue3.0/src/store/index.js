import { createStore } from 'vuex'
import router from '@/router'
export default createStore({
    state: {
        metaTitle: '网易云音乐',
        menu: router.options.routes
    },
    mutations: {
        setTitle (state, title) {
            state.metaTitle = title
            document.title = title
        }
    },
    actions: {
    },
    modules: {
    }
})

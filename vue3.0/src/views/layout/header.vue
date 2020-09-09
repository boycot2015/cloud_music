<template>
<div
    @dblclick="onExtend"
    class="header flexbox-h">
    <div class="logo">
        <router-link to="/" class="flexbox-h">
            <div class="logo-icon icon-music-logo-icon"></div>
            <h3 class="logo-title">{{headerData.title}}</h3>
        </router-link>
    </div>
    <div class="back-forward tc flexbox-h">
        <div class="back-btn" @click="router.back()">&lt;</div>
        <div class="forward-btn" @click="router.forward()">&gt;</div>
    </div>
    <div class="search-box flexbox-h">
        <input type="text" v-model="searchForm.key" :placeholder="searchForm.placeholder">
        <div class="input-icon icon-music-search"></div>
    </div>
    <div class="user-info flex-3 tc just-c flexbox-h" @click="showLogin = true">
        <div class="avatar ">
            <img :src="headerData.avatar" alt="">
        </div>
        <div class="text name">
            <span class="name">{{headerData.username}}</span>
            <i class="fa fa-caret-down"></i>
        </div>
        <login-form v-if="showLogin" @on-close="onLoginFormClose"></login-form>
        <span class="text vip-text">{{headerData.vipTxt}}</span>
        <div class="text icon theme icon-music-clothes"></div>
        <div class="text icon message icon-music-msg"></div>
        <div class="text icon setting icon-music-setting"></div>
    </div>
    <div class="operation flex-1 align-c flexbox-h tc just-c">
        <i class="full-sreen-btn flex-1 icon-music-min js-music-min" @click="onMinifty"></i>
        <i class="full-sreen-btn flex-1 fa icon-music-minus js-music-minus" @click="onBoxHide"></i>
        <i class="min-btn flex-1 icon-music-rectangle js-music-rectangle" @click="onExtend"></i>
        <i class="close-btn flex-1 icon-music-close js-music-close" @click="onBoxHide"></i>
    </div>
</div>
</template>

<script>
import {
    // ref,
    // computed,
    // watch,
    reactive,
    toRefs
    // getCurrentInstance
} from 'vue'
import {
    useRouter
} from 'vue-router'
import loginForm from '@/views/components/login'
export default {
    name: 'musicHeader',
    components: {
        loginForm
    },
    setup (props, { emit }) {
        const state = reactive({
            headerData: {
                title: '网抑云音乐',
                avatar: require('@/assets/images/avatar.jpg'),
                username: '大唐江流儿',
                vipTxt: '开通VIP'
            },
            searchForm: {
                placeholder: '搜索音乐，视频，歌词，电台',
                key: ''
            },
            ismini: true,
            showLogin: false
        })
        // const storeState = store.state
        const router = useRouter()
        const onMinifty = () => {
            emit('on-minify', true)
        }
        const onBoxHide = () => {
            emit('on-hide', true)
        }
        const onExtend = () => {
            state.ismini = !state.ismini
            emit('on-extend', !state.ismini)
        }
        const onLoginFormClose = (val) => {
            state.showLogin = false
            console.log(state.showLogin)
        }
        return {
            router,
            onBoxHide,
            onExtend,
            onMinifty,
            onLoginFormClose,
            ...toRefs(state)
        }
    }
}
</script>

<style>
</style>

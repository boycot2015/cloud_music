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
        <input type="text" v-model="searchForm.key" @keyup="onSearch" :placeholder="searchForm.placeholder">
        <div class="input-icon icon-music-search" ></div>
    </div>
    <div class="user-info flex-3 tc just-c flexbox-h">
        <div class="wrap flexbox-h flex-1" @click.stop="showLogin = !showLogin">
            <div class="avatar ">
                <img :src="headerData.avatar" alt="">
            </div>
            <div class="text name">
                <span class="name">{{headerData.username}}</span>
                <i class="icon-music-drop-down"></i>
            </div>
            <login-form class="login-box" @mousedown.stop ref="loginForm" v-if="showLogin && !hasLogin" @on-success="onLogin" @on-close="onLoginFormClose"></login-form>
            <user-info ref="userDialog" class="user-box" @mousedown.stop v-if="showLogin && hasLogin" @on-logout="onLogOut"></user-info>
        </div>
        <span class="text vip-text">{{headerData.vipTxt}}</span>
        <div @click="showDialog" class="text icon theme icon-music-clothes"></div>
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
    ref,
    // computed,
    watch,
    reactive,
    toRefs,
    onMounted,
    inject
    // getCurrentInstance
} from 'vue'
import {
    useRouter
} from 'vue-router'
import {
    useStore
} from 'vuex'
import loginForm from '@/views/components/login'
import userInfo from '@/views/components/userInfo'
export default {
    name: 'musicHeader',
    components: {
        loginForm,
        userInfo
    },
    setup (props, { emit }) {
        const loginForm = ref(null)
        const userDialog = ref(null)
        const store = useStore()
        const router = useRouter()
        const userInfo = store.state.user.userInfo
        const { profile = {}, account = {} } = userInfo
        const state = reactive({
            headerData: {
                title: '网抑云音乐',
                account,
                avatar: profile.avatarUrl || '',
                username: profile.nickname || '未登录',
                vipTxt: '开通VIP',
                profile
            },
            searchForm: {
                placeholder: '搜索音乐，视频，歌词，电台',
                key: router.currentRoute.value.query.keywords || ''
            },
            ismini: true,
            showLogin: false,
            hasLogin: store.state.user.cookie || false
        })
        onMounted(() => {
            document.addEventListener('click', (e) => {
                if (loginForm.value !== null && !loginForm.value.$el.contains(e.target)) {
                    state.showLogin = false
                }
                if (userDialog.value !== null && !userDialog.value.$el.contains(e.target)) {
                    state.showLogin = false
                }
            })
        })
        watch(() => store.state.user.userInfo, (value) => {
            value && state.userInfo && (state.userInfo = value)
        })
        watch(() => store.state.user.userInfo.profile, (value) => {
            if (value) {
                state.headerData.avatar = value.avatarUrl
                state.headerData.username = value.nickname
                state.headerData.profile = value
                state.hasLogin = true
            }
        })
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
        }
        const onLogin = (val) => {
            state.hasLogin = true
            state.showLogin = false
        }
        const onLogOut = (val) => {
            state.hasLogin = false
            state.showLogin = false
            state.headerData.username = '未登录'
            state.headerData.avatar = ''
        }
        const onSearch = (e) => {
            // console.log(e, state.searchForm.key, 'state.searchForm.key')
            if (e.keyCode === 13 && state.searchForm.key) {
                router.push({
                    path: '/songs/list',
                    query: {
                        keywords: state.searchForm.key
                    }
                })
            }
        }
        const MessageBox = inject('messageBox')
        const showDialog = () => {
            const $el = MessageBox({
                content: '<div>这里是内容信息！</div>',
                shadeClose: false,
                btns: [
                    { text: '取消', click: () => { $el.close() } },
                    { text: '确认', class: 'btn-primary', click: () => { $el.close() } }
                ]
            })
        }
        return {
            router,
            loginForm,
            userDialog,
            onBoxHide,
            onExtend,
            onMinifty,
            onLoginFormClose,
            onLogin,
            onLogOut,
            onSearch,
            showDialog,
            ...toRefs(state)
        }
    }
}
</script>

<style lang="less" scoped>
.user-box,.login-box {
    position: absolute;
    top: 36px;
    left: -80px;
    z-index: 10000;
    box-shadow: 0 0px 5px @c-ccc;
    border-radius: 4px;
    &::after {
        content: '';
        position: absolute;
        top: -20px;
        left: 50%;
        height: 0;
        margin-left: -10px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent @white transparent;
    }
}
</style>

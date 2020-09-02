<template>
<div class="container music-client flexbox-h align-c just-c">
    <div
    :style="{
        width: isExtend ? '100%': '',
        height: isExtend ? '100%': '',
        left: isExtend ? '0px': '',
        top: isExtend ? '0px': '',
    }"
    class="music-box js-music-box flexbox-v"
    ref="dragBox" v-show="!showMiniBox && showBox">
        <music-header
        @on-minify="() => showMiniBox = true"
        @on-hide="() => {
            showBox = false
            showMiniBox = true
        }"
        @on-extend="(val) => isExtend = val"
        ></music-header>
        <div class="center flexbox-h">
            <transition name="slide-fade">
                <music-aside v-show="showMenu" @hideMenu="goDetail"></music-aside>
            </transition>
            <div
            :style="{
                width: isExtend ? '820px': '',
                flex: isExtend ? 'none': '',
                margin: isExtend ? '0 auto': ''
            }"
            class="main flex-1 flexbox-v">
                <router-view v-slot="{ Component }">
                    <transition name="slide-fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
        <music-footer></music-footer>
    </div>
    <div
    @dblclick="() => {
        showMiniBox = false
        showBox = true
    }"
    :style="{
        top: !showBox ? 0: ''
    }"
    class="mini-music-box js-mini-music-box flexbox-v"
    v-show="showMiniBox" ref="dragMiniBox">
        <div class="wrap flexbox-h just-b">
            <div class="left flex-2 flexbox-h just-b">
                <div class="img tl">
                    <img src="/src/assets/images/avatar.jpg" alt="">
                </div>
                <p class="name tc">{{playData.lyrc}}</p>
                <div class="play-btn js-play-btn flexbox-h just-a">
                    <i class="icon-music-play-left"></i>
                    <i class="icon-play js-play icon-music-pause"></i>
                    <i class="icon-music-play-right"></i>
                </div>
                <div class="more js-more text">
                    <div class="wrap flexbox-h tc just-c">
                        <p class="name line-one">{{playData.name}}</p>
                        <span class="line"> - </span>
                        <span class="singer line-one">{{playData.singer}}</span>
                    </div>
                </div>
            </div>
            <div class="right flex-1 flexbox-h just-b">
                <span class="js-love-icon love-icon icon-music-love"></span>
                <span class="volume-icon icon-music-volume js-min-music-volume"></span>
                <span class="list-icon icon-music-list js-list-icon"></span>
                <div class="volume flex-2 flexbox-h just-b tc">
                    <!-- <i class="icon-music-volume js-music-volume flex-1"></i> -->
                    <div class="progress-bar flex-4">
                        <span class="point"></span>
                        <span class="line js-line"></span>
                    </div>
                    <!-- <i class="heart-icon icon-music-beckoning flex-1"></i> -->
                </div>
            </div>
            <!-- <div class="text flex-3 flexbox-h just-b">
                </div> -->
        </div>
        <div class="more js-mini-music-list">
            <ul class="music-list js-music-list">
                <!-- <li class="music-list-item flexbox-h jsut-b">
                        <span class="name">一眼万年</span>
                        <span class="source flex-4 line-one">(电视剧《孤独天下》片尾曲)</span>
                    </li> -->
            </ul>
        </div>
    </div>
    <!-- /src/source/前世今生-文武贝钢琴版.mp3 -->
    <audio id="play-audio" controls="controls"></audio>
</div>
</template>

<script>
import musicHeader from './header'
import musicAside from './aside'
import musicFooter from './footer'
import {
    ref,
    computed,
    watch,
    reactive,
    onMounted,
    toRefs
    // getCurrentInstance
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    useRouter
} from 'vue-router'
import { drag } from '@/utils'
export default {
    name: 'layout',
    components: {
        musicHeader,
        musicAside,
        musicFooter
    },
    emits: {
        hideMenu: val => {
            console.log(val, 'valvalvalval')
            return true
        }
    },
    setup (props, context) {
        const state = reactive({
            playData: {
                lyrc: '一诺千金到尽头',
                name: '菩提偈',
                singer: '刘惜君'
            },
            showMenu: true,
            showBox: true,
            showMiniBox: false,
            isExtend: false
        })
        const dragBox = ref(null)
        const dragMiniBox = ref(null)
        const store = useStore()
        const storeState = store.state
        const router = useRouter()
        // const { ctx } = getCurrentInstance()
        watch(() => {
            return router.currentRoute.value.meta.title
        }, (value) => {
            store.commit('setTitle', value)
        })
        watch(() => {
            return router.currentRoute.value.path
        }, (value) => {
            if (value === '/songs/detail') {
                store.commit('showMenu', false)
            } else {
                store.commit('showMenu', true)
            }
        })
        watch(() => store.state.showMenu, (value) => {
            console.log(value, 'showMenushowMenushowMenu')
            state.showMenu = value
        })
        onMounted(() => {
            console.dir(dragBox.value)
            drag({
                obj: [dragBox.value.children[0]],
                target: [dragBox.value]
            })
            drag({
                obj: [dragMiniBox.value],
                target: [dragMiniBox.value]
            })
        })
        const goDetail = (val) => {
            console.log(val, '12312')
            state.showMenu = false
            router.push({
                path: '/songs/detail',
                query: {
                    id: store.state.playData.id
                }
            })
        }
        return {
            dragBox,
            dragMiniBox,
            goDetail,
            ...computed(() => storeState).value,
            ...toRefs(state)
        }
    }
}
</script>

<style lang="css">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(-10px);
    opacity: 0;
}
</style>

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
        @on-extend="(val) => onExtend(val)"
        ></music-header>
        <div class="center flexbox-h">
                <music-aside :class="{'isClose': !showMenu}" @hideMenu="goDetail"></music-aside>
            <div
            :style="{
                width: isExtend ? '1020px': '',
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
            <div class="left flex-2 flexbox-h just-b"
            @mouseout.stop.prevent="showPlayer = false"
            @mouseover.stop.prevent="showPlayer = true">
                <div class="img tl">
                    <img :src="playData.picUrl" alt="">
                </div>
                <div class="name tc">
                    <p>{{playData.paused ? playData.name : currLyric.text }}</p>
                    <span v-show="playData.paused" class="name tc">{{playData.singer}}</span>
                </div>
                <div class="play-btn js-play-btn flexbox-h just-a"
                :class="{'active': showPlayer}">
                    <i class="icon-music-play-left"
                    @click="playPrev"></i>
                    <i class="icon-play js-play"
                    :class="{
                        'icon-music-pause': playData.paused,
                        'icon-music-play': !playData.paused,
                        }"
                        @click="toggleAudioPlay"></i>
                    <i class="icon-music-play-right"
                    @click="playNext"></i>
                </div>
                <div class="more js-more text"
                :class="{'active': showPlayer}">
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
                <span class="list-icon icon-music-list js-list-icon" @click="showList = !showList"></span>
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
        <div class="more js-mini-music-list"
        :class="{'actived': showList}">
            <ul class="music-list js-music-list">
                    <list
                        @dblclick="onListItemdbClick(item)"
                        @click="() => activeIndex = index"
                        v-for="(item, index) in playList.data"
                        :class="{
                            'active': activeIndex === index,
                            'play': playIndex === index && !playData.paused,
                            'pause': playIndex === index && playData.paused
                            }"
                        :data="item"
                        isminiPlay
                        :index="index"
                        :operation="false"
                        :order="false"
                        :key="index"></list>
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
import List from '@/views/components/List'
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
        musicFooter,
        List
    },
    emits: {
        hideMenu: val => {
            console.log(val, 'valvalvalval')
            return true
        }
    },
    setup (props, context) {
        const store = useStore()
        const storeState = store.state
        const router = useRouter()
        const state = reactive({
            playData: {
                lyrc: '一诺千金到尽头',
                name: '菩提偈',
                singer: '刘惜君',
                ...computed(() => storeState.playData)
            },
            currLyric: storeState.detail.currLyric || {
                time: '00:01',
                text: '纯音乐，请欣赏~'
            },
            playList: {
                data: storeState.playList || []
            },
            playIndex: storeState.playData.playIndex,
            activeIndex: 0,
            showMenu: true,
            showBox: true,
            showMiniBox: false,
            isExtend: false,
            showPlayer: false,
            showList: false
        })
        const dragBox = ref(null)
        const dragMiniBox = ref(null)
        let audio = null
        // const { ctx } = getCurrentInstance()
        watch(() => {
            return router.currentRoute.value.meta.title
        }, (value) => {
            store.commit('setTitle', value)
        })
        watch(() => {
            return router.currentRoute.value
        }, (value) => {
            if (value.meta.hideMenu) {
                store.commit('showMenu', false)
            } else {
                store.commit('showMenu', true)
            }
        })
        watch(() => storeState.showMenu, (value) => {
            state.showMenu = value
        })
        watch(() => storeState.detail.currLyric, (value) => {
            state.currLyric = value
        })
        watch(() => storeState.playList, (value) => {
            // console.log(value, 'storeStatestoreStatestoreState')
            state.playList.data = value
        })
        watch(() => storeState.playData.playIndex, (value) => {
            state.playIndex = value || 0
        })
        onMounted(() => {
            drag({
                obj: [dragBox.value.children[0]],
                target: [dragBox.value]
            })
            drag({
                obj: [dragMiniBox.value]
            })
            window.addEventListener('resize', (e) => {
                drag({
                    obj: [dragBox.value.children[0]],
                    target: [dragBox.value]
                })
                drag({
                    obj: [dragMiniBox.value]
                })
            })
            audio = document.getElementById('play-audio')
        })
        const goDetail = (val) => {
            state.showMenu = false
            router.push({
                path: '/songs/detail',
                query: {
                    id: storeState.playData.id
                }
            })
        }
        const onExtend = (val) => {
            state.isExtend = val
            handleFullScreen()
        }
        // 全屏事件
        const handleFullScreen = () => {
            const element = document.documentElement
            // 判断是否已经是全屏
            // 如果是全屏，退出
            if (!state.isExtend) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
                state.isExtend = false
                console.log('已还原！')
            } else { // 否则，进入全屏
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                // IE11
                    element.msRequestFullscreen()
                }
                console.log('已全屏！')
            }
            store.commit('setExtend', state.isExtend)
        }
        const onListItemdbClick = (item) => {
            state.playList.data.map((el, index) => {
                if (item.id === el.id) {
                    state.playIndex = index
                }
            })
            store.dispatch('setPlayList', state.playList.data).then(res => {
                store.dispatch('setPlayData', { ...item, playIndex: state.playIndex }).then(res => {
                    if (res.code === 0) {
                        state.playIndex++
                        if (!state.playList.data[state.playIndex]) return
                        store.dispatch('setPlayData', { ...state.playList.data[state.playIndex], playIndex: state.playIndex })
                    }
                })
            })
        }
        const toggleAudioPlay = () => {
            if (!state.playData.url) return
            store.dispatch('toggleAudioPlay', { audio, state })
        }
        const toggleAudioMouted = () => {
            store.dispatch('toggleAudioMouted', { audio, state }).then(res => {})
        }
        const playPrev = () => {
            state.playIndex--
            if (state.playIndex < 1) {
                state.playIndex = 0
                return
            }
            store.dispatch('playPrev', state)
        }
        const playNext = () => {
            state.playIndex++
            if (state.playIndex > state.playList.data.length - 1) {
                state.playIndex = state.playList.data.length - 1
                return
            }
            store.dispatch('playNext', state)
        }
        return {
            dragBox,
            dragMiniBox,
            goDetail,
            onExtend,
            onListItemdbClick,
            toggleAudioPlay,
            toggleAudioMouted,
            playPrev,
            playNext,
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
    /* transform: translate(-100px); */
    transition: all 0.3s ease-in-out;
     opacity: 0;
}

.slide-fade-leave-active {
    /* cubic-bezier(1, 0.5, 0.8, 1) */
    transition: all 0.3s ease-in-out;
    opacity: 0;
}
.slide-fade-enter-to ,.slide-fade-leave-to {
    transform: translate(0px);
    opacity: 1;
}
</style>

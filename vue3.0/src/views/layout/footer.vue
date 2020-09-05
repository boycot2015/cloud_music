<template>
    <div class="footer flexbox-h just-a">
        <div class="play-btn flexbox-h just-a">
            <i class="icon-music-play-left" @click="playPrev"></i>
            <i class="js-play"
            :class="{
                'icon-music-play': !playData.paused,
                'icon-music-pause': playData.paused
                }"
            @click="toggleAudioPlay"></i>
            <i class="icon-music-play-right" @click="playNext"></i>
        </div>
        <div class="progress flex-2 flexbox-h just-b">
            <span class="start-time tl">{{playData.curStr}}</span>
            <div class="progress-bar tc flex-4" @click="onSetTimerClick">
                 <!-- @click.stop="setTimer" -->
                <span class="point" ref="progressTimeDom"></span>
                <span class="line js-line" :style="{width: audioTimePos.w + 'px' || ''}"></span>
            </div>
            <span class="end-time tr">{{playData.endStr}}</span>
        </div>
        <div
        class="volume flex-2 flexbox-h just-b tc"
        @mouseleave="showVolumeBtn = false"
        @mouseenter="showVolumeBtn = true">
            <i class="icon-music-volume js-music-volume flex-1" :class="{'close': playData.muted}" @click="toggleAudioMouted"></i>
            <div class="progress-bar flex-4" @click="onSetVolumeClick">
                <!-- @click.stop="setVolume" -->
                <span class="point" v-show="showVolumeBtn" ref="progressVolumeDom"></span>
                <span class="line js-line" :style="{width: audioVolumePos.w + 'px' || ''}"></span>
            </div>
            <!-- icon-music-beckoning-->
            <i class="order-icon icon-music-loop flex-1" @click="toggleLoop()"></i>
        </div>
        <div class="others flex-3 flexbox-h just-b">
            <i class="type">标准</i>
            <i class="new">new</i>
            <i class="word">词</i>
            <i class="icon js-play-list-btn icon-music-play-list" @click="showList = !showList"></i>
            <div class="play-list js-play-list" v-show="showList">
                <div class="title flexbox-h just-c">
                    <div class="btn tc flex-1 flexbox-h just-c">
                        <span class="active js-list-btn list-btn">播放列表</span>
                        <span class="js-history-btn history-btn">历史记录</span>
                    </div>
                    <i class="tr js-list-close icon-close icon-music-close"  @click="showList = false"></i>
                </div>
                <div class="list-header flexbox-h just-b">
                    <div class="total tl">
                        <span class="num">总<i>{{playList.total}}</i>首</span>
                        <i class="icon-music-info"></i>
                    </div>
                    <div class="operation">
                        <i class="icon-music-collect">收藏全部</i>
                        <span class="line">|</span>
                        <i class="icon-music-delete">清空</i>
                    </div>
                </div>
                <div class="wrap">
                    <ul class="music-list js-footer-music-list song-list">
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
                        :index="index"
                        :operation="false"
                        :order="false"
                        :key="index"></list>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    ref,
    computed,
    watch,
    reactive,
    toRefs,
    onMounted
    // getCurrentInstance
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { drag } from '@/utils'
import List from '@/views/components/List'
export default {
    name: 'musicFooter',
    components: {
        List
    },
    setup (props, context) {
        const store = useStore()
        const router = useRouter()
        const state = reactive({
            playData: {
                lyrc: '一诺千金到尽头',
                name: '菩提偈',
                singer: '刘惜君',
                picUrl: require('@/assets/images/avatar.jpg'),
                startTime: '00:00',
                endTime: '00:00',
                type: '标准',
                isHot: 'new',
                lyrcTxt: '词',
                ended: false,
                muted: false,
                loop: false,
                curStr: '00:00',
                endStr: '00:00',
                duration: 0,
                volume: 0.2,
                currentTime: '00:00',
                paused: true,
                ...computed(() => store.state.playData)
            },
            playList: {
                data: [],
                total: 0
            },
            audioTimePos: {
                l: -4,
                t: -6,
                r: 372,
                b: -4,
                w: 0
            },
            audioVolumePos: {
                l: -4,
                t: -6,
                r: 84,
                b: -4,
                w: 20
            },
            onPlayCount: 0,
            isMove: false, // 拖动与点击事件隔离
            showVolumeBtn: false,
            progressPsition: '', // 进度条位置
            activeIndex: 0,
            playIndex: store.state.playData.playIndex || 0,
            showList: false
        })
        let audio = null
        const progressTimeDom = ref(null)
        const progressVolumeDom = ref(null)
        state.playList.data = store.state.playList
        state.playList.total = store.state.playList.length
        watch(() => store.state.playData.url, (value) => {
            audio.src = value || null
            state.playData.url = value || null
            state.playData.paused = false
            progressTimeDom.value.style.left = 0
            state.progressPsition = state.playData.volume * 100
            initPlayer(audio, setTimerStatus, setVolume)
            playAudio()
        })
        watch(() => store.state.playData.playIndex, (value) => {
            state.playIndex = value || 0
        })
        watch(() => store.state.playList, (value) => {
            state.playList.data = value
            state.playList.data.total = value.length
        })

        onMounted(() => {
            drag({
                obj: [progressTimeDom.value],
                site: state.audioTimePos,
                fn (obj) {
                    audio.pause()
                    state.isMove = true
                    audio.currentTime = obj.left / progressTimeDom.value.parentNode.offsetWidth * state.playData.duration
                    state.playData.currentTime = parseInt(audio.currentTime)
                    setTimer(obj)
                },
                end (obj) {
                    !state.playData.paused && audio.src && audio.play()
                    setTimeout(() => {
                        state.isMove = false
                    }, 300)
                }
            })
            drag({
                obj: [progressVolumeDom.value],
                site: state.audioVolumePos,
                fn (obj) {
                    state.isMove = true
                    setVolume(obj)
                },
                end (obj) {
                    setTimeout(() => {
                        state.isMove = false
                    }, 300)
                }
            })
            audio = document.getElementById('play-audio')
            audio.src = state.playData.url || null
            state.playData.paused = true
            state.progressPsition = store.state.playData.volume * 100
            // store.commit('setAudio', { paused: true, currentTime: 0 })
            initPlayer(audio, setTimerStatus, setVolume)
            /* eslint-disable */
            // audio = new AudioPlayer({ ...state, el: audio })
        })
        const getAudioInfo = (_audio, call) => {
            var time = _audio.duration || 0
            var min = parseInt(time / 60)
            var second = parseInt(time % 60)
            var currentTime = _audio.currentTime
            var duration = min * 60 + second
            min = min < 10 ? '0' + min : min
            second = second < 10 ? '0' + second : second
            var endStr = min + ':' + second
            min = Math.round(currentTime) > 59 ? (Math.round(currentTime / 60) < 10 ? ('0' + parseInt(currentTime / 60)) : Math.round(currentTime / 60)) : '00'
            second = parseInt(currentTime % 60) < 10 ? ('0' + parseInt(currentTime % 60)) : parseInt(currentTime % 60)
            second = second === 60 ? '00' : second
            var curStr = min + ':' + second
            // state.playData.src = _audio.src
            // _audio.volume = state.playData.volume
            state.playData.ended = _audio.ended
            state.playData.muted = _audio.muted
            state.playData.curStr = curStr
            state.playData.endStr = endStr
            state.playData.duration = duration
            state.playData.currentTime = parseInt(currentTime)
            if (call) call({ currentTime: parseInt(currentTime), curStr, endStr, duration })
        }
        const initPlayer = (audioPlayer, setStatus, setVolume) => {
            // 进度事件监听
            audioPlayer.addEventListener('timeupdate', function () {
                getAudioInfo(audioPlayer, setStatus)
            })
            // 加载事件监听
            audioPlayer.addEventListener('loadedmetadata', function () {
                setVolume()
                getAudioInfo(audioPlayer, setStatus)
                state.onPlayCount = 0
            })
            // 结束事件监听
            audioPlayer.addEventListener('ended', function () {
                getAudioInfo(audioPlayer, setStatus)
                clearInterval(state.playData.timer)
                if (audio.ended) {
                    state.onPlayCount++
                    if (!state.playData.loop && state.onPlayCount === 1) {
                        playNext()
                    }
                }
            })
        }
        const playAudio = () => {
            if (!state.playData.url || state.playData.url === null) {
                state.playData.paused = true
                return
            }
            audio.src = state.playData.url
            state.playData.paused = false
            audio.play()
        }
        const toggleAudioPlay = () => {
            if (!state.playData.url) return
            store.dispatch('toggleAudioPlay', { audio, state })
        }
        const toggleAudioMouted = () => {
            store.dispatch('toggleAudioMouted', { audio, state }).then(res => {
                audio.muted ? setVolume({left: 0}) : setVolume({ left: state.progressPsition })
            })
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

        const toggleLoop = (val) => {
            state.playData.loop = val
            aduio.loop = val
        }

        const setTimerStatus = ({ currentTime, curStr, endStr, duration }) => {
            if (!progressTimeDom.value) return
            let left = 0
            const w = progressTimeDom.value.parentNode.offsetWidth
            duration = duration || 1
            left = currentTime * w / duration
            left = Math.abs(left)
            left = left > w - 8 ? w - 8 : left
            setTimer({ left, offsetX: left })
            store.commit('detail/setCurrentLyric', curStr)
        }
        const setTimer = (obj) => {
            if (obj.offsetX) {
                progressTimeDom.value.style.left = obj.offsetX + 'px'
            }
            state.audioTimePos.w = obj.left || obj.offsetX || 0
        }
        const setVolume = (obj) => {
            if (!progressVolumeDom.value && audio !== null) return
            let volume = state.playData.volume
            let left = volume * 100
            if (obj) {
                left = obj.left || obj.offsetX || 0
                left = left > 8 ? left + 8 : left
                if (obj.offsetX) {
                    progressVolumeDom.value.style.left = left + 'px'
                }
                volume = Math.abs(left / progressVolumeDom.value.parentNode.offsetWidth).toFixed(1)
                volume = volume > 1 ? 1 : volume
            } else {
                left = left > 8 ? left - 8 : left
            }
            if (left === 0) {
                state.audioVolumePos.w = 0
                progressVolumeDom.value.style.left = '-8px'
                return
            }
            audio.muted = false
            progressVolumeDom.value.style.left = left + 'px'
            state.audioVolumePos.w = left
            state.progressPsition = left > 8 ? left - 8 : left
            audio.volume = volume
            state.playData.volume = volume
            // console.log(audio.volume, state.progressPsition, 'setVolume')
            store.commit('setAudio', { volume })
        }
        const onSetTimerClick = (e) => {
            if (!progressTimeDom.value || state.isMove) return
            audio.pause()
            audio.currentTime = (e.offsetX / progressTimeDom.value.parentNode.offsetWidth * state.playData.duration)
            !state.isMove && setTimer(e)
            !state.playData.paused && !state.isMove && audio.play()
        }
        const onSetVolumeClick = (e) => {
            !state.isMove && setVolume(e)
        }
        const onListItemdbClick = (item) => {
            state.playList.data.map((el, index) => {
                if (item.id === el.id) {
                    state.playIndex = index
                    playAll(item)
                }
            })

        }
        const playAll = (item) => {
            store.dispatch('setPlayList', state.playList.data).then(res => {
                store.dispatch('setPlayData', { ...item, playIndex: state.playIndex }).then(res => {
                    if (res.code === 0) {
                        state.playIndex++
                        if (!state.playList.data[state.playIndex]) return
                        store.dispatch('setPlayData', { ...state.playList.data[state.playIndex], playIndex: state.playIndex })
                    }
                    if (router.currentRoute.value.path === '/songs/detail') {
                         router.push({
                            path: '/songs/detail',
                            query: {
                                id: state.playList.data[state.playIndex].id
                            }
                        })
                        store.dispatch('detail/getData', state.playList.data[state.playIndex])
                    }
                })
            })
        }
        return {
            ...toRefs(state),
            progressTimeDom,
            progressVolumeDom,
            setVolume,
            setTimer,
            onSetTimerClick,
            onSetVolumeClick,
            toggleAudioPlay,
            toggleAudioMouted,
            playPrev,
            playNext,
            onListItemdbClick
        }
    }
}
</script>

<style>

</style>

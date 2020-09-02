<template>
    <div class="footer flexbox-h just-a">
        <div class="play-btn flexbox-h just-a">
            <i class="icon-music-play-left"></i>
            <i class="js-play"
            :class="{
                'icon-music-play': !playData.paused,
                'icon-music-pause': playData.paused
                }"
            @click="toggleAudio"></i>
            <i class="icon-music-play-right"></i>
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
            <i class="icon-music-volume js-music-volume flex-1"></i>
            <div class="progress-bar flex-4" @click="onSetVolumeClick">
                <!-- @click.stop="setVolume" -->
                <span class="point" v-show="showVolumeBtn" ref="progresVolumesDom"></span>
                <span class="line js-line" :style="{width: audioVolumePos.w + 'px' || ''}"></span>
            </div>
            <!-- icon-music-beckoning-->
            <i class="order-icon icon-music-loop flex-1"></i>
        </div>
        <div class="others flex-3 flexbox-h just-b">
            <i class="type">标准</i>
            <i class="new">new</i>
            <i class="word">词</i>
            <i class="icon js-play-list-btn icon-music-play-list"></i>
            <div class="play-list js-play-list">
                <div class="title flexbox-h just-c">
                    <div class="btn tc flex-1 flexbox-h just-c">
                        <span class="active js-list-btn list-btn">播放列表</span>
                        <span class="js-history-btn history-btn">历史记录</span>
                    </div>
                    <i class="tr js-list-close icon-close icon-music-close"></i>
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
                    <ul class="music-list js-footer-music-list">
                        <!-- <li class="music-list-item flexbox-h jsut-b">
                            <span class="name flex-1">一眼万年</span>
                            <span class="source flex-4 line-one">(电视剧《孤独天下》片尾曲)</span>
                            <span class="singer flex-1">群星</span>
                            <span class="icon-music-link"></span>
                            <span class="time tr flex-1">00:00</span>
                        </li> -->
                    </ul>
                </div>
            </div>
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
    onMounted
    // getCurrentInstance
} from 'vue'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
import { drag } from '@/utils'
export default {
    name: 'musicFooter',
    setup (props, context) {
        const state = reactive({
            playData: {
                startTime: '00:00',
                endTime: '00:00',
                type: '标准',
                isHot: 'new',
                lyrcTxt: '词',
                ended: false,
                muted: false,
                curStr: '00:00',
                endStr: '00:00',
                duration: 0,
                currentTime: '00:00',
                paused: true,
                timer: null
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
            isMove: false, // 拖动与点击事件隔离
            showVolumeBtn: false,
            progressPsition: '' // 进度条位置
        })
        let audio = null
        const store = useStore()
        const progressTimeDom = ref(null)
        const progresVolumesDom = ref(null)
        watch(() => store.state.playData, (value) => {
            state.playData = { ...state.playData, ...value }
            playAudio()
        })
        onMounted(() => {
            drag({
                obj: [progressTimeDom.value],
                site: state.audioTimePos,
                fn (obj) {
                    audio.pause()
                    state.isMove = true
                    setTimer(obj)
                },
                end (obj) {
                    console.log(obj, 'objobjobjobjobj')
                    audio.currentTime = (obj.left / progressTimeDom.value.parentNode.offsetWidth * state.playData.duration)
                    state.playData.currentTime = audio.currentTime
                    setTimeout(() => {
                        state.isMove = false
                    }, 300)
                }
            })
            drag({
                obj: [progresVolumesDom.value],
                site: state.audioVolumePos,
                fn (obj) {
                    state.isMove = true
                    setVolume(obj)
                },
                end () {
                    setTimeout(() => {
                        state.isMove = false
                    }, 300)
                }
            })
            audio = document.getElementById('play-audio')
            initPlayer(audio, setTimerStatus)
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
            state.playData.src = _audio.src
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
                // setVolume()
                getAudioInfo(audioPlayer, setStatus)
            })
            // 结束事件监听
            audioPlayer.addEventListener('ended', function () {
                getAudioInfo(audioPlayer, setStatus)
                clearInterval(state.playData.timer)
            })
        }
        const playAudio = () => {
            audio.src = state.playData.url
            state.playData.paused = false
            audio.play()
        }
        const toggleAudio = () => {
            audio.src && (state.playData.paused = !state.playData.paused)
            audio.paused && audio.src ? audio.play() : audio.pause()
        }
        const setTimerStatus = ({ currentTime, curStr, endStr, duration }) => {
            if (!progressTimeDom.value) return
            let left = 0
            duration = duration || 1
            if (state.progressPsition) {
                left = state.progressPsition.left
            }
            left = currentTime * progressTimeDom.value.parentNode.offsetWidth / duration
            left = Math.abs(left)
            setTimer({ left, offsetX: left })
        }
        const setTimer = (obj) => {
            if (obj.offsetX) {
                progressTimeDom.value.style.left = obj.offsetX + 'px'
            }
            state.audioTimePos.w = obj.left || obj.offsetX || 0
            !state.playData.paused && !state.isMove && audio.play()
        }
        const setVolume = (obj) => {
            var left = obj.left || obj.offsetX || 0
            left = left > 8 ? left + 8 : left
            if (obj.offsetX) {
                progresVolumesDom.value.style.left = left + 'px'
            }
            state.audioVolumePos.w = left
        }
        const onSetTimerClick = (e) => {
            if (!progressTimeDom.value) return
            audio.pause()
            audio.currentTime = (e.offsetX / progressTimeDom.value.parentNode.offsetWidth * state.playData.duration)
            !state.isMove && setTimer(e)
            !state.playData.paused && !state.isMove && audio.play()
        }
        const onSetVolumeClick = (e) => {
            !state.isMove && setVolume(e)
        }
        return {
            progressTimeDom,
            progresVolumesDom,
            setVolume,
            setTimer,
            ...toRefs(state),
            onSetTimerClick,
            onSetVolumeClick,
            toggleAudio
        }
    }
}
</script>

<style>

</style>

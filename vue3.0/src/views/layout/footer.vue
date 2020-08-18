<template>
    <div class="footer flexbox-h just-a">
        <div class="play-btn flexbox-h just-a">
            <i class="icon-music-play-left"></i>
            <i class="js-play icon-music-pause"></i>
            <i class="icon-music-play-right"></i>
        </div>
        <div class="progress flex-2 flexbox-h just-b">
            <span class="start-time tl">00:00</span>
            <div class="progress-bar tc flex-4">
                <span class="point"></span>
                <span class="line js-line"></span>
            </div>
            <span class="end-time tr">00:00</span>
        </div>
        <div class="volume flex-2 flexbox-h just-b tc">
            <i class="icon-music-volume js-music-volume flex-1"></i>
            <div class="progress-bar flex-4">
                <span class="point"></span>
                <span class="line js-line"></span>
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
    // ref,
    computed,
    // watch,
    reactive,
    toRefs
    // getCurrentInstance
} from 'vue'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// import { drag } from '@/utils'
export default {
    name: 'musicFooter',
    setup (props, context) {
        const state = reactive({
            playData: {
                startTime: '00:00',
                endTime: '00:00',
                type: '标准',
                isHot: 'new',
                lyrcTxt: '词'
            },
            playList: {
                data: [],
                total: 0
            }
        })
        const store = useStore()
        const playData = store.state.playData
        // const router = useRouter()
        // const { ctx } = getCurrentInstance()
        // const dragBox = [ctx.$.refs.dragBox]
        // if (dragBox[0]) {
        //     console.log(ctx.$)
        //     drag({
        //         obj: dragBox,
        //         target: dragBox
        //     })
        // }
        return {
            ...toRefs(state),
            ...computed(() => playData).value
        }
    }
}
</script>

<style>

</style>

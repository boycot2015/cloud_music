<template>
    <div class="container music-client flexbox-h align-c just-c">
        <div class="music-box js-music-box flexbox-v"  ref="dragBox">
            <music-header></music-header>
            <div class="center flexbox-h">
                <music-aside></music-aside>
                <div class="main flex-1 flexbox-v">
                    <router-view />
                </div>
            </div>
            <music-footer></music-footer>
        </div>
        <div class="mini-music-box js-mini-music-box flexbox-v">
            <div class="wrap flexbox-h just-b">
                <div class="left flex-2 flexbox-h just-b">
                    <div class="img tl">
                        <img src="/src/assets/images/avatar.jpg" alt="">
                    </div>
                    <p class="name tc">一诺千金到尽头</p>
                    <div class="play-btn js-play-btn flexbox-h just-a">
                        <i class="icon-music-play-left"></i>
                        <i class="icon-play js-play icon-music-pause"></i>
                        <i class="icon-music-play-right"></i>
                    </div>
                    <div class="more js-more text">
                        <div class="wrap flexbox-h tc just-c">
                            <p class="name line-one">菩提偈</p>
                            <span class="line"> - </span>
                            <span class="singer line-one">刘惜君</span>
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
    // ref,
    // computed,
    // watch,
    getCurrentInstance
} from 'vue'
import { drag } from '@/utils'
export default {
    name: 'layout',
    components: {
        musicHeader,
        musicAside,
        musicFooter
    },
    data () {
        return {

        }
    },
    setup (props, context) {
        const { ctx } = getCurrentInstance()
        const menu = ctx.$router.options.routes.filter(_ => !_.meta.hideInMenu)
        const dragBox = [ctx.$.refs.dragBox]
        if (dragBox[0]) {
            console.log(ctx.$)
            drag({
                obj: dragBox,
                target: dragBox
            })
            return {
                menu
            }
        }
    }
}
</script>

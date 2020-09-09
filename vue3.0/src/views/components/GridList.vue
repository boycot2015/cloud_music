<template>
<li class="grid-list-item fl clearfix js-list-detail" :title="item.rcmdtext || item.name" :class="`type-${type || item.type} ftype-${item.ftype}`" data-url="{{item.mp3Url}}">
    <ul v-if="item.list" class="grid-list js-child-list fl">
        <li class="grid-list-item clearfix js-list-detail" :class="`type-${child.type} ftype-${child.ftype}`" :title="child.name" v-for="(child, cindex) in item.list" :key="cindex" data-url="{{child.mp3Url}}">
            <span class="order fl" v-html="index * (item.list.length) + (cindex + 1) < 10 ? '0' + (index * (item.list.length) + (cindex + 1)) : index * (item.list.length) + (cindex + 1)"></span>
            <div class="img" :class="{'fl':child.ftype == 0}">
                <span class="icon icon-music-pause"></span>
                <img :src="child.album && child.album.picUrl" alt="">
            </div>
            <div class="text" :class="`${child.ftype == 0 ? 'fl': ''}`" :title="child.rcmdtext || child.name">
                <p class="name tl">{{child.name}}</p>
                <p class="desc tl" v-if="child.album">
                    <i class="icon-play-video"></i>
                    <span class="singer" v-for="(singer, index) in child.album.artists" :key="index" v-html="singer.name + (index < child.album.artists.length - 1 ? '/': '')">
                    </span>
                </p>
            </div>
        </li>
    </ul>
    <template v-else>
        <span class="order fl" v-if="type === 4" v-html="index < 9 ? '0' + (index + 1) : index + 1"></span>
        <div class="img" :class="`${item.ftype == 0 ? 'fl': ''}`">
            <span class="copy-writer" v-if="(item.type == 0 || category == 3) && item.copywriter">{{item.copywriter}}</span>
            <div class="right" v-if="item.playCount || item.playTime">
                <span class="icon" :class="`icon-music-${item.type == 5 || type == 3? 'video':'erphone'}`"></span>
                <span class="play-count">{{item.playCount || item.playTime}}</span>
            </div>
            <div class="left" v-if="item.type == 5 && category !== 3">
                <span class="icon icon-music-video"></span>
            </div>
            <p class="desc line-one" v-if="item.rcmdtext">{{item.name}}</p>
            <img :src="item.img1v1Url || item.coverImgUrl || item.coverUrl || item.cover || item.sPicUrl || item.picUrl" alt="">
            <p class="time" v-if="type === 2">{{ new Date().toLocaleDateString() }}</p>
            <span class="creator" v-if="item.creator && type !== 3"><i class="icon-music-user"></i>{{item.creator.nickname}}</span>
        </div>
        <div class="text" :class="`${item.ftype == 0 ? 'fl': ''}`">
            <p class="name tl" :class="{'line-one': type === 3 || type === 4}">{{item.rcmdtext || item.name || item.title}}</p>
            <span class="rcmdText line-one" v-if="item.rcmdText">{{item.rcmdText}}</span>
            <span class="lastProgramName line-one" v-if="item.lastProgramName">{{item.lastProgramName}}</span>
            <div class="price red" v-if="item.originalPrice">￥{{item.originalPrice / 100}}</div>
            <span class="creator" v-if="item.creator && type === 3"><i>by</i>{{item.creator.nickname}}</span>
            <p class="creator line-one" v-if="item.artists">
                <span v-for="(art, index) in item.artists" :key="art.id" v-html="art.name + `${index < item.artists.length - 1 ? '/': ''}`"></span>
            </p>
        </div>
    </template>
</li>
</template>

<script>
import {
// ref,
// computed,
// watch,
// reactive,
// toRefs
// getCurrentInstance,
// onBeforeMount
// onMounted
} from 'vue'
export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        category: {
            type: Number,
            default: 3
        },
        index: {
            type: Number,
            default: 0
        },
        type: {
            type: Number,
            default: 1 // 3.视频列表,2.左右列表, 1.歌单列表
        }
    },
    setup (props) {
        // const state = reactive({
        //     item: {
        //         ...props
        //     }
        // })
        // console.log(props, state, 'state')
        // return {
        //     ...toRefs(state)
        // }
    }
}
</script>

<style>

</style>

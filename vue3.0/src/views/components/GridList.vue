<template>
  <li class="grid-list-item fl clearfix js-list-detail"
        title="{{item.rcmdtext || item.name}}"
        :class="`type-${item.type} ftype-${item.ftype}`"
        data-url="{{item.mp3Url}}"
    >
        <ul v-if="item.list" class="grid-list js-child-list fl">
                <li class="grid-list-item clearfix js-list-detail"
                    :class="`type-${child.type} ftype-${child.ftype}`"
                    title="{{child.name}}"
                    v-for="(child, cindex) in item.list" :key="cindex"
                    data-url="{{child.mp3Url}}"
                >
                <span class="order fl" v-html="index * (item.list.length) + (cindex + 1) < 10 ? '0' + (index * (item.list.length) + (cindex + 1)) : index * (item.list.length) + (cindex + 1)"></span>
                <div class="img" :class="{'fl':child.ftype == 0}">
                    <span class="icon icon-music-pause"></span>
                    <img :src="child.album && child.album.picUrl" alt="">
                </div>
                <div class="text"
                :class="`${child.ftype == 0 ? 'fl': ''}`"
                :title="child.rcmdtext || child.name" >
                    <p class="name tl">{{child.name}}</p>
                    <p class="desc tl" v-if="child.album">
                        <i class="icon-play-video"></i>
                        <span class="singer"
                        v-for="(singer, index) in child.album.artists" :key="index" v-html="singer.name + (index < child.album.artists.length - 1 ? '/': '')">
                        </span>
                    </p>
                </div>
            </li>
        </ul>
        <div class="img" :class="`${item.ftype == 0 ? 'fl': ''}`" v-else>
            <span class="copy-writer" v-if="item.type == 0 || category == 3">{{item.copywriter}}</span>
            <div class="right" v-if="item.playCount">
                <span class="icon" :class="`icon-music-${item.type == 5? 'video':'erphone'}`"></span>
                <span class="play-count">{{item.playCount}}</span>
            </div>
            <div class="left" v-if="item.type == 5 && category != 3">
                <span class="icon icon-music-video"></span>
            </div>
            <p class="desc line-one" v-if="item.rcmdtext" title="{{item.name}}">{{item.name}}</p>
            <img :src="item.coverImgUrl || item.sPicUrl || item.picUrl" alt="">
            <span class="creator" v-if="item.creator"><i class="icon-music-user"></i> {{item.creator.nickname}}</span>
        </div>
        <div class="text" :class="`${item.ftype == 0 ? 'fl': ''}`">
            <p class="name tl">{{item.rcmdtext || item.name}}</p>
        </div>
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

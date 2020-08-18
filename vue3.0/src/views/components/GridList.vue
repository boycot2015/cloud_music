<template>
  <li class="grid-list-item fl clearfix js-list-detail
            {{item.ftype!=undefind ? ' ftype-'+ item.ftype : ''}}
            {{item.type ? ' type-'+ item.type : ''}}"
            title="{{item.rcmdtext || item.name}}"
            data-id="{{item.id}}"
            data-type="{{item.type}}"
            data-ftype="{{item.ftype}}"
            data-url="{{item.mp3Url}}"
        >
            <ul v-if="item.list" class="grid-list js-child-list fl">
                    <li class="grid-list-item clearfix js-list-detail
                        {{child.ftype!=undefind ? ' ftype-'+ child.ftype : ''}}
                        {{child.type ? ' type-'+ child.type : ''}}"
                        title="{{child.name}}"
                        v-for="(item, cindex) in item.list" :key="cindex"
                        data-type="{{child.type}}"
                        data-ftype="{{child.ftype}}"
                        data-url="{{child.mp3Url}}"
                    >
                    <span class="order fl" v-html="index * (item.list.length) + (cindex + 1) < 10 ? '0' + (index * (item.list.length) + (cindex + 1)) : index * (item.list.length) + (cindex + 1)"></span>
                    <div class="img" :class="{'fl':child.ftype == 0}">
                        <span class="icon icon-music-pause"></span>
                        <img :src="child.album.picUrl" alt="">
                    </div>
                    <div class="text {{child.ftype == 0 ? 'fl': ''}}" title="{{child.rcmdtext || child.name}}" >
                        <p class="name">{{child.name}}</p>
                        <p class="desc">
                            <i class="icon-play-video"></i>
                            <span class="singer"
                            v-for="(singer, index) in child.album.artists" :key="index" v-html="singer.name + (index < child.album.artists.length - 1 ? '/': '')">
                            </span>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="img {{item.ftype == 0 ? 'fl': ''}}" v-else>
                <span class="copy-writer" v-if="item.type == 0 || category == 3">{{item.copywriter}}</span>
                <div class="right" v-if="item.playCount">
                    <span class="icon icon-music-{{item.type == 5? 'video':'erphone'}}"></span>
                    <span class="play-count">{{item.playCount}}</span>
                </div>
                <div class="left" v-if="item.type == 5 && category != 3">
                    <span class="icon icon-music-video"></span>
                </div>
                <p class="desc line-one" v-if="item.rcmdtext" title="{{item.name}}">{{item.name}}</p>
                <img :src="item.coverImgUrl || item.sPicUrl || item.picUrl" alt="">
                <span class="creator" v-if="item.creator"><i class="icon-music-user"></i> {{item.creator.nickname}}</span>
            </div>
            <div class="text  {{item.ftype == 0 ? 'fl': ''}}">
                <p class="name">{{item.rcmdtext || item.name}}</p>
            </div>
        </li>
</template>

<script>
import {
    // ref,
    // computed,
    // watch,
    reactive,
    toRefs
    // getCurrentInstance,
    // onBeforeMount
    // onMounted
} from 'vue'
export default {
    setup (props) {
        const state = reactive({
            ...props
        })
        console.log(props, state, 'state')
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style>

</style>

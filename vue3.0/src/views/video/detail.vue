<template>
<div class="video-detail flexbox-h just-b active">
    <div class="left flex-3 flexbox-v just-c" >
        <h3 class="title flexbox-h">
            <span class="back-btn icon-music-left" @click="router.back(-1)"></span>
            <span class="level red bd-red pad2 font12">{{playData.level === 'exhigh' ?'极高音质':'标准音质'}}</span>
            <span v-if="playData.type" class="type red bd-red pad2 font12">{{playData.type.toUpperCase()}}</span>
            {{playData.title || playData.name}}
            <span class="singer" v-if="playData.creator">{{playData.creator.nickname}}</span>
        </h3>
        <div class="cover">
            <video id="play-video" autoplay :src="playData.url" controls="controls"></video>
            <div class="img">
                <img :src="playData.picUrl" alt="">
            </div>
        </div>
        <div class="operation flexbox-h">
            <div class="play-btn collect">
                <i class="icon-music-star"></i>
                <span>点赞({{playData.praisedCount || countData.commentCount}})</span>
            </div>
            <div class="play-btn collect">
                <i class="icon-music-collect"></i>
                <span>收藏({{playData.subscribeCount || countData.likedCount}})</span>
            </div>
            <div class="play-btn share">
                <i class="icon-music-share"></i>
                <span>分享({{playData.shareCount}})</span>
            </div>
            <div class="play-btn download">
                <i class="icon-music-download"></i>
                <span>下载MV</span>
            </div>
        </div>
        <comment :data="data" :title="'评论'"></comment>
    </div>
    <div class="right flex-1 flexbox-v">
        <div class="lyric-text-content">
            <div class="title">MV介绍</div>
            <div class="time-times flexbox-h just-b">
                <span class="time">发布时间: {{new Date(playData.publishTime).toLocaleDateString().split('/').join('-')}}</span>
                <span class="times" v-if="playData.playTime">播放次数: {{playData.playTime}}</span>
            </div>
            <div class="info"
            :class="{
                'more': (playData.description  && playData.description.length > 100) ||
                (playData.desc && playData.desc.length > 100)
                }"
            v-if="(playData.description && playData.description !== null) ||
           playData.desc &&playData.desc !== null"
            >
                简介：{{playData.description || playData.desc}}
            </div>
            <div class="tags clearfix">
                <p class="name fl">标签：</p>
                <template v-if="playData.videoGroup && playData.videoGroup.length">
                    <span
                        class="tag fl"
                        v-for="(tag, tindex) in playData.videoGroup" :key="tag.id"
                        v-html="tag.name + (tindex < playData.videoGroup.length - 1 ? ' / ': '')">
                    </span>
                </template>
                <span v-else>暂无~</span>
            </div>
        </div>
        <div class="same-content">
            <div class="same-music-list grid-list" v-if="videos && videos.length">
                <h2 class="title">相关推荐</h2>
                <div v-for="item in videos" @click="onItemlistClick(item, 2)" :key="item.id" class="grid-list-item ftype-0" data-id="{{item.id}}" data-url="{{item.mp3Url}}" data-type="{{item.type}}">
                    <div class="same-play-list-item grid-list-item js-list-detail ftype-0" data-id="{{item.id}}" data-type="{{item.type}}" data-url="{{item.mp3Url}}">
                        <div class="img fl">
                            <!-- <span class="icon icon-music-video"></span> -->
                            <div class="right" v-if="item.playCount || item.playTime">
                                <span class="icon-video" :class="`icon-music-video`"></span>
                                <span class="play-count">{{item.score || item.playCount || item.playTime}}</span>
                            </div>
                            <img :src="item.coverUrl" alt="">
                        </div>
                        <div class="text fl" :title="item.title">
                            <p class="name line-two">{{item.title}}</p>
                            <p v-for="(singer, index) in item.creator" :key="singer.id" class="singer line-one" v-html="singer.userName + (index < item.creator.length - 1 ? '/': '')">
                            </p>
                        </div>
                    </div>
                </div>
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
    // getCurrentInstance,
    onMounted,
    onBeforeMount
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    useRouter
} from 'vue-router'
// import { animate } from '@/utils'
import Comment from '@/views/components/comment'
export default {
    components: {
        Comment
    },
    setup () {
        const store = useStore()
        const rootStore = store.state
        const detailStore = rootStore.detail.videoDetail
        const router = useRouter()
        const lyricScrollDom = ref(null)
        const state = reactive({
            playData: {},
            countData: {},
            data: {
                total: 0,
                hotComments: [], // 精彩评论
                comments: [] // 所有评论
            },
            videos: []
        })
        // const { ctx } = getCurrentInstance()
        onBeforeMount(async () => {
        })
        watch(() => [
            detailStore.hotComments,
            detailStore.comments,
            detailStore.playData,
            detailStore.total,
            detailStore.videos,
            detailStore.countData
        ], (value) => {
            state.data.hotComments = value[0]
            state.data.comments = value[1]
            state.playData = value[2]
            state.data.total = value[3]
            state.videos = value[4]
            state.countData = value[5]
        })
        onMounted(() => {
            getData({
                id: router.currentRoute.value.query.id,
                type: router.currentRoute.value.query.type || 'video'
            })
            store.commit('showMenu', false)
        })
        // methods
        const getData = async (params) => {
            await store.dispatch('detail/getVideoData', params).then(res => {
            })
        }
        const onItemlistClick = (item, type) => {
            const route = {
                path: '/video/detail',
                query: {
                    id: item.id || item.vid || item.mvid
                }
            }
            router.push(route)
            getData({
                id: router.currentRoute.value.query.id
            })
        }
        // const initSwiper = () => {
        //     /* eslint-disable */
        //     new Swiper('.lyric-swiper-container', state.swiperOption)
        // }
        return {
            ...toRefs(state),
            router,
            lyricScrollDom,
            onItemlistClick
        }
    }
}
</script>

<style>
.scale-fade-enter-active {
    transition: all 0.3s ease;
}

.scale-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.scale-fade-enter,
.scale-fade-leave-to

/* .scale-fade-leave-active for below version 2.1.8 */
    {
    transform:scale(0.5);
    transform-origin: 80px 200px;
    opacity: 0;
}
</style>

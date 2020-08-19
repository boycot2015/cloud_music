<template>
      <div class="song-detail active">
        <div class="top flexbox-h just-c">
            <div class="handler">
             <div class="point"></div>
             <div class="line-1"></div>
             <div class="line-2"></div>
             <div class="line-3"></div>
             <div class="header-cap"></div>
        </div>
        <div class="mask" :style="{backgroundImage: `url(${playData.picUrl})`}"></div>
        <div class="cover">
            <div class="img">
                <img :src="playData.picUrl" alt="">
            </div>
        </div>
        <div class="lyric-text-content flex-1">
            <div class="info">
                <div class="song-info flexbox-h">
                    <p class="name">
                        {{playData.name}}
                        <span class="level red bd-red pad2 font12">{{playData.level === 'exhigh' ?'标准音质':'极高音质'}}</span>
                        <span v-if="playData.type" class="type red bd-red pad2 font12">{{playData.type.toUpperCase()}}</span>
                    </p>
                </div>
                <div class="single-info flexbox-h">
                    <span class="al-name line-one flex-1" title="{{playData.alName}}">专辑：<i>{{playData.alName}}</i></span>
                    <span class="al-name line-one flex-1" title="{{playData.singer}}">歌手：<i>{{playData.singer}}</i></span>
                    <span class="al-name line-one flex-1" title="{{playData.alName}}">来源：<i>{{playData.alName}}</i></span>
                </div>
                <i class="icon-music-minify icon-minify"></i>
            </div>
            <div class="wrap">
                <div class="lyric-text" >
                    <template v-if="lyricList && lyricList.length">
                            <p v-for="item in lyricList"
                            :key="item.id"
                            class="lyric-text-item
                            {{index == 0 ?'active' : ''}}"
                            data-time="{{item.time}}"
                            >{{item.text}}</p>
                    </template>
                    <p class="lyric-text-item " v-else data-time="">暂无歌词~</p>
                </div>
            </div>
        </div>
        </div>
        <div class="bottom flexbox-h">
            <div class="comment">
                <template v-if="data.hotComments && data.hotComments.length">
                    <h2 class="title">听友评论<span>(已有{{data.total}}条评论)</span></h2>
                    <h3 class="title">精彩评论({{data.hotComments.length}})</h3>
                    <div
                    v-for="hotComment in data.hotComments"
                    :key="hotComment.id"
                    class="comment-item clearfix">
                        <div class="avatar fl">
                            <img :src="hotComment.user.avatarUrl" alt="">
                        </div>
                        <div class="text fl">
                            <p class="name">
                                {{hotComment.user.nickname}}:
                                <span class="desc">{{hotComment.content}}</span>
                            </p>
                            <template v-if="hotComment.beReplied.length">
                                <p class="name reply"
                                v-for="beReplied in hotComment.beReplied"
                                :key="beReplied.id">
                                    @{{beReplied.user.nickname}}:
                                    <span class="desc">{{beReplied.content}}</span>
                                </p>
                            </template>
                            <div class="info flexbox-h just-b">
                                <span class="time flex-1 tl">{{hotComment.time}}</span>
                                <div class="right flex-3 tr">
                                    <span class="star">
                                        <i class="icon-music-star"></i>
                                            <i class="num" v-if="hotComment.likedCount">({{hotComment.likedCount}})</i>
                                    </span>
                                    <span class="share">分享</span>
                                    <span class="repeat">回复</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="data.comments && data.comments.length">
                    <h3 class="title">最新评论({{data.total - data.hotComments.length}})</h3>
                    <div
                    v-for="comment in data.comments"
                    :key="comment.id"
                    class="comment-item clearfix">
                        <div class="avatar fl">
                            <img :src="comment.user.avatarUrl" alt="">
                        </div>
                        <div class="text fl">
                            <p class="name">
                                {{comment.user.nickname}}：
                                <span class="desc">{{comment.content}}</span>
                            </p>
                            <template v-if="comment.beReplied.length">
                                <p class="name reply"
                                v-for="beReplied in comment.beReplied"
                                :key="beReplied.id">
                                    @{{beReplied.user.nickname}}:
                                    <span class="desc">{{beReplied.content}}</span>
                                </p>
                            </template>
                            <div class="info flexbox-h just-b">
                                <span class="time flex-1 tl">{{comment.time}}</span>
                                <div class="right flex-3 tr">
                                    <span class="star">
                                        <i class="icon-music-star"></i>
                                            <i class="num" v-if="comment.likedCount">({{comment.likedCount}})</i>
                                    </span>
                                    <span class="share">分享</span>
                                    <span class="repeat">回复</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="same-content">
                <div class="same-play-list grid-list" v-if="data.playlist && data.playlist.length">
                    <h2 class="title">包含这首歌的歌单</h2>
                    <div
                    v-for="item in data.playlists"
                    :key="item.id"
                    class="grid-list-item ftype-0 "
                    data-id="{{item.id}}"
                    data-type="{{item.type}}">
                        <div class="same-play-list-item grid-list-item js-list-detail ftype-0"
                        data-id="{{item.id}}"
                        data-type="{{item.type}}">
                            <div class="img fl">
                                <span class="icon icon-music-pause"></span>
                                <img :src="item.coverImgUrl" alt="">
                            </div>
                            <div class="text fl" title="{{item.rcmdtext || item.name}}" >
                                <p class="name line-one">{{item.name}}</p>
                                <span class="play-count singer">播放：{{item.playCount}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="same-music-list grid-list" v-if="data.songs && data.songs.length">
                    <h2 class="title">相似歌曲</h2>
                    <div
                    v-for="item in data.songs"
                    :key="item.id"
                    class="grid-list-item ftype-0"
                    data-id="{{item.id}}"
                    data-url="{{item.mp3Url}}"
                    data-type="{{item.type}}">
                        <div class="same-play-list-item grid-list-item js-list-detail ftype-0"
                        data-id="{{item.id}}"
                        data-type="{{item.type}}" data-url="{{item.mp3Url}}">
                            <div class="img fl">
                                <span class="icon icon-music-pause"></span>
                                <img :src="item.album.picUrl" alt="">
                            </div>
                            <div class="text fl" title="{{item.rcmdtext || item.name}}" >
                                <p class="name line-one">{{item.name}}</p>
                                <span
                                v-for="singer in item.album.artists"
                                :key="singer.id"
                                class="singer" v-html="singer.name + (index < item.album.artists.length - 1 ? '/': '')">
                                </span>
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
    // ref,
    // computed,
    watch,
    reactive,
    toRefs,
    // getCurrentInstance,
    // onBeforeMount
    onMounted
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.min.css'
export default {
    components: {
    },
    setup () {
        const store = useStore()
        const listStore = store.state.detail
        const router = useRouter()
        const state = reactive({
            lyricList: [],
            data: {
                total: 0,
                hotComments: [], // 精彩评论
                comments: [] // 所有评论
            },
            playData: {}
        })
        // const { ctx } = getCurrentInstance()
        onMounted(async () => {
            getData({ id: router.currentRoute.value.query.id })
        })
        watch(() => [
            listStore.lyricList,
            listStore.data.comments,
            listStore.data.comments,
            listStore.playData,
            listStore.data.total
        ], (value) => {
            state.lyricList = value[0]
            state.data.hotComments = value[1]
            state.data.comments = value[2]
            state.playData = value[3]
            state.data.total = value[4]
        })

        // methods
        const getData = async (params) => {
            await store.commit('detail/getData', params)
        }
        const onListItemClick = (item) => {
            router.push({
                path: '/songs/detail',
                query: {
                    id: item.id
                }
            })
        }
        return {
            ...toRefs(state),
            onListItemClick
        }
    }
}
</script>

<style>

</style>

<template>
  <div class="song-detail-list">
        <div class="cover flexbox-h">
            <div class="img">
                <img :src="coverDetail.coverImgUrl" alt="">
            </div>
            <div class="text">
                <div class="top clearfix">
                    <span class="type fl">歌单</span>
                    <p class="name fl">{{coverDetail.name}}</p>
                    <div class="count fr flexbox-h just-b">
                        <div class="play-count tr">
                            <p class="name">歌曲数</p>
                            <span class="num">{{coverDetail.trackCount}}</span>
                        </div>
                        <div class="play-count tr">
                            <p class="name">播放数</p>
                            <span class="num">{{coverDetail.playCount}}</span>
                        </div>
                    </div>
                </div>
                <div class="userinfo flexbox-h" v-if="coverDetail.creator">
                    <div class="avatar fl">
                        <img :src="coverDetail.creator.avatarUrl" alt="">
                    </div>
                    <div class="username fl">{{coverDetail.creator.nickname}}</div>
                    <div class="create-time fl"><span>{{coverDetail.createTime}}</span>创建</div>
                </div>
                <div class="operation flexbox-h">
                    <div class="play-btn play" @click="playAll(coverDetail.tracks[0], 1)">
                        <i class="icon-music-pause"></i>
                        <span>播放全部</span>
                        <i class="icon-plus icon-music-plus"></i>
                    </div>
                    <div class="play-btn collect">
                        <i class="icon-music-collect"></i>
                        <span>收藏({{coverDetail.subscribedCount}})</span>
                    </div>
                    <div class="play-btn share">
                        <i class="icon-music-share"></i>
                        <span>分享({{coverDetail.shareCount}})</span>
                    </div>
                    <div class="play-btn download">
                        <i class="icon-music-download"></i>
                        <span>下载全部</span>
                    </div>
                </div>
                <div class="tags flexbox-h">
                    <p class="name">标签：</p>
                    <span
                        class="tag"
                        v-for="(tag, tindex) in coverDetail.tags" :key="tag.id"
                        v-html="tag + (tindex < coverDetail.tags.length - 1 ? ' /': '')">
                    </span>
                </div>
                <div class="desc line-two" v-if="coverDetail.description && coverDetail.description !== null">
                    <p>{{coverDetail.description}}</p>
                    <i class="icon-music-down js-more" v-if=" coverDetail.description.length > 50"></i>
                </div>
            </div>
        </div>
        <div class="list-header flexbox-h just-b">
            <div class="order tl">
                <span class="num"></span>
            </div>
            <div class="opera flex-1">
                操作
            </div>
            <div class="opera flex-4">
                音乐标题
            </div>
            <div class="opera flex-2">
                歌手
            </div>
            <div class="opera flex-2">
                专辑
            </div>
            <div class="opera flex-1">
                时长
            </div>
        </div>
        <div class="wrap">
            <ul class="music-list js-footer-music-list song-list">
                <list
                @dblclick="onListItemdbClick(item)"
                @click="() => activeIndex = index"
                v-for="(item, index) in coverDetail.tracks"
                :class="{
                    'active': activeIndex === index,
                    'play': playIndex === index && !playData.paused,
                    'pause': playIndex === index && playData.paused
                    }"
                :data="item"
                :index="index"
                :key="index"></list>
            </ul>
        </div>
    </div>
</template>

<script>
import {
    // ref,
    computed,
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
import List from '@/views/components/List'
export default {
    components: {
        List
    },
    setup () {
        const store = useStore()
        const listStore = store.state.list
        const router = useRouter()
        const state = reactive({
            coverDetail: {},
            playUrl: '',
            playIndex: 0,
            playData: {
                ...computed(() => store.state.playData)
            },
            activeIndex: 0
        })
        // const { ctx } = getCurrentInstance()
        onMounted(() => {
            // console.log(router, 'playlistRes')
            getData({ id: router.currentRoute.value.query.id })
        })
        watch(() => [
            listStore.playlistData,
            listStore.playUrl,
            store.state.playData.playIndex
        ], (value) => {
            state.coverDetail = value[0]
            state.playUrl = value[1]
            state.playIndex = value[2]
        })

        // methods
        const getData = async (params) => {
            await store.commit('list/getData', params)
        }
        const onListItemdbClick = (item) => {
            state.coverDetail.tracks.map((el, index) => {
                if (item.id === el.id) {
                    state.playIndex = index
                }
            })
            store.dispatch('setPlayList', state.coverDetail.tracks).then(res => {
                store.dispatch('setPlayData', { ...item, playIndex: state.playIndex }).then(res => {
                    if (res.code === 0) {
                        state.playIndex++
                        if (!state.coverDetail.tracks[state.playIndex]) return
                        store.dispatch('setPlayData', { ...state.coverDetail.tracks[state.playIndex], playIndex: state.playIndex })
                    }
                })
            })
        }
        const playAll = (item) => {
            state.playIndex = 0
            onListItemdbClick(item)
        }
        return {
            ...toRefs(state),
            onListItemdbClick,
            playAll
        }
    }
}
</script>

<style>

</style>

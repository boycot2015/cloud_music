<template>
  <div class="song-detail-list">
        <div
        class="cover"
        :class="{'daily': isDaily, 'flexbox-h': !isDaily}">
                <div class="img" :class="{'clearfix': isDaily}">
                <template v-if="isDaily">
                    <div class="date fl">
                        <p class="week">{{dayData.weeks[new Date().getDay()]}}</p>
                        <div class="date-text">{{dayData.day}}</div>
                    </div>
                    <div class="txt fl">
                        <p class="name">每日歌曲推荐</p>
                        <span class="desc">根据你的音乐口味生成,每日6:00更新</span>
                    </div>
                </template>
                <img v-else :src="coverDetail.coverImgUrl || coverDetail.picUrl" alt="">
            </div>
            <div class="text">
                <div class="top clearfix" v-if="!isDaily">
                    <span class="type fl" :class="{'full': type === 2}">{{type === 2? '电台':'歌单'}}</span>
                    <p class="name fl">{{coverDetail.name}}</p>
                    <div class="count fr flexbox-h just-b" v-if="!type">
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
                <div class="operation flexbox-h" :class="{'just-b': isDaily}">
                    <div class="play-btn play" @click="playAll(coverDetail.tracks[0], 1)">
                        <i class="icon-music-pause"></i>
                        <span>播放全部</span>
                        <i class="icon-plus icon-music-plus"></i>
                    </div>
                    <template v-if="!isDaily">
                        <div class="play-btn collect" v-if="!type">
                            <i class="icon-music-collect"></i>
                            <span>收藏({{coverDetail.subscribedCount}})</span>
                        </div>
                        <div class="play-btn collect" v-if="type == 2">
                            <i class="icon-music-collect"></i>
                            <span>订阅({{coverDetail.subCount}})</span>
                        </div>
                        <div class="play-btn share">
                            <i class="icon-music-share"></i>
                            <span>分享({{coverDetail.shareCount}})</span>
                        </div>
                        <div class="play-btn download" v-if="!type">
                            <i class="icon-music-download"></i>
                            <span>下载全部</span>
                        </div>
                    </template>
                    <div class="play-btn collect" v-else>
                        <i class="icon-music-collect"></i>
                        <span>收藏全部</span>
                    </div>
                </div>
                <div class="tags flexbox-h" v-if="!isDaily">
                    <p class="name">标签：</p>
                    <template v-if="coverDetail.tags && coverDetail.tags.length">
                        <span
                            class="tag"
                            v-for="(tag, tindex) in coverDetail.tags" :key="tag.id"
                            v-html="tag + (tindex < coverDetail.tags.length - 1 ? '/': '')">
                        </span>
                    </template>
                    <span v-else>暂无~</span>
                </div>
                <div class="desc"
                :class="{
                    'line-two': !showMore,
                    'active': showMore
                    }"
                    v-if="coverDetail.description && coverDetail.description !== null">
                    <p>{{coverDetail.description}}</p>
                    <i class="icon-music-down js-more" :class="{'active': showMore}" @click="showMore = !showMore" v-if="coverDetail.description.length > 80"></i>
                </div>
            </div>
        </div>
        <div class="list-form">
            <div class="list-header flexbox-h just-b" v-if="!isDaily">
                <template v-if="!type">
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
                </template>
                <template class="dj-header" v-else>
                    <div class="flex-1 title tl bdr0">共{{coverDetail.count}}期</div>
                    <div class="flex-1 title tr pdr10">排序<i class="icon-music-sort"></i></div>
                </template>
            </div>
            <div class="wrap">
                <ul class="music-list js-footer-music-list song-list">
                    <list
                    @dblclick="onListItemdbClick(item)"
                    @click="() => activeIndex = index"
                    v-for="(item, index) in coverDetail.tracks"
                    :class="{
                        'active': activeIndex === index,
                        'play': playIndex === index && playData.playListId === id && !playData.paused,
                        'pause': playIndex === index && playData.playListId === id && playData.paused
                        }"
                    :data="item"
                    :type="type"
                    :operation="!type"
                    :index="index"
                    :count="coverDetail.count"
                    :key="index"></list>
                </ul>
            </div>
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
            dayData: {
                weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                day: new Date().getDate(),
                name: '每日歌曲推荐',
                copywriter: '根据您的音乐口味生成每日更新'
            },
            coverDetail: {},
            playUrl: '',
            playIndex: 0,
            playData: {
                ...computed(() => store.state.playData)
            },
            id: router.currentRoute.value.query.id,
            isDaily: router.currentRoute.value.query.isDaily,
            type: +router.currentRoute.value.query.type,
            activeIndex: '',
            showMore: false
        })
        // const { ctx } = getCurrentInstance()
        onMounted(() => {
            // console.log(router, 'playlistRes')
            getData({ id: state.id, isDaily: state.isDaily, type: state.type })
        })
        watch(() => [
            listStore.playlistData,
            listStore.playUrl,
            store.state.playData.playIndex
        ], (value) => {
            state.coverDetail = value[0]
            value[0].dj && (state.coverDetail.creator = value[0].dj)
            state.playUrl = value[1]
            state.playIndex = value[2]
            if (state.id === state.playData.playListId) {
                state.activeIndex = state.playIndex
            }
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
                store.dispatch('setPlayData', { ...item, playIndex: state.playIndex, playListId: state.id }).then(res => {
                    if (res.code === 0) {
                        state.playIndex++
                        if (!state.coverDetail.tracks[state.playIndex]) return
                        store.dispatch('setPlayData', { ...state.coverDetail.tracks[state.playIndex], playListId: state.id, playIndex: state.playIndex })
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
            playAll,
            router
        }
    }
}
</script>

<style>

</style>

<template>
    <div class="tab-content tab-cate-content">
        <div class="tags">
            <span class="btn-cate js-toggle-cate" :class="{'active': showAllCate}" @click.stop="showAllCate = !showAllCate">
                <span class="text">{{activedCate.name || '全部视频'}}</span> <i class="icon-music-down"></i>
            </span>
            <p class="name">
                热门标签：
                <span class="cates">
                    <span
                    v-for="(item, index) in tabData.tags"
                    @click="onCateTagClick(item)"
                    :key="item.id">
                        <span class="js-hot-cate-item" :class="{'active': item.name === activedCate.name}">{{item.name}}</span>
                        <i class="line" v-html="index < tabData.tags.length - 1 ? '|': ''"></i>
                    </span>
                </span>
            </p>
        </div>
        <div class="mask-cate" v-show="showAllCate">
            <div id="cate-page" class="tc">
                <div class="wrap flexbox-v">
                    <span class="btn-cate tc" :class="{'active': activedCate.name === '全部视频'}" @click="onCateTagClick()">{{tabData.all.name}}</span>
                    <div class="content">
                        <div
                        v-for="(subsItem) in tabData.subs"
                        :key="subsItem.id"
                        class="content-item flexbox-h just-b">
                            <!-- <div class="left flex-1">
                                <div class="cate-title flexbox-h">
                                    <i class="icon-music-emoji"></i>
                                    <p class="name">{{tabData.categories[index]}}</p>
                                </div>
                            </div> -->
                            <div class="right">
                                <div class="cates clearfix">
                                        <div
                                        v-for="sub in subsItem"
                                        @click="onCateTagClick(sub)"
                                        :key="sub.id"
                                        style="width: 97px;"
                                        :class="{'active': sub.id === activedCate.id}"
                                        class="cates-item js-cates-item tc fl">
                                            <i class="icon-hot" v-if="sub.hot">HOT</i>
                                            <span>{{sub.name}}</span>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul class="video-list clearfix">
            <grid-list
                v-for="(item, index) in tabData.list.data"
                :item="item.data"
                :category="tabData.list.category"
                :index="index"
                :type="tabData.list.type"
                @click="onListClick(item.data)"
                :key="item.id"></grid-list>
        </ul>
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
import GridList from '@/views/components/GridList'
export default {
    name: 'videoTemp1',
    components: {
        // Swiper,
        // SwiperSlide,
        GridList
    },
    setup () {
        const store = useStore()
        const tabData = store.state.video.tab1Data
        const router = useRouter()
        const state = reactive({
            showAllCate: false,
            activedCate: {
                id: router.currentRoute.value.query.id || '',
                name: router.currentRoute.value.query.name || '全部视频'
            },
            tabData: {
                dayData: {
                    weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    day: new Date().getDate(),
                    name: '精品歌单',
                    copywriter: '精品歌单倾心推荐，给最懂音乐的你'
                },
                all: {
                    name: '全部视频'
                },
                categories: [], // 分类
                tags: [], // 分类
                subs: [], // 分类
                list: {
                    title: '推荐歌单',
                    category: 3,
                    type: 3,
                    data: []
                }
            },
            offset: 1,
            limit: 39
        })
        onMounted(async () => {
            getData()
            document.querySelector('.music-box .main').addEventListener('scroll', function (e) {
                // 获取定义好的scroll盒子
                // const el = scrollDom.value
                const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
                if (condition && router.currentRoute.value.query.id) {
                    state.offset++
                    store.dispatch('video/getListByCate', { offset: state.offset, limit: state.limit, id: state.activedCate.id })
                }
            })
            document.addEventListener('click', (e) => {
                const playListDom = document.querySelector('.mask-cate')
                if (playListDom !== null && !playListDom.contains(e.target)) {
                    state.showAllCate = false
                }
            })
        })
        watch(() => [
            tabData.categories,
            tabData.tags,
            tabData.subs,
            tabData.list
        ], (value) => {
            state.tabData.categories = value[0]
            state.tabData.tags = value[1]
            state.tabData.subs = value[2]
            if (state.offset !== 1) {
                state.tabData.list.data = [...state.tabData.list.data, ...value[3]]
                return
            }
            state.tabData.list.data = value[3]
            // console.log(state.tabData.list.data)
        })

        // methods
        const getData = async (type) => {
            store.dispatch('video/getTab1Data', type).then(res => {
                store.dispatch('video/getListByCate', { offset: 1, id: state.activedCate.id || '' })
            })
        }
        // 点击分类标签获取对应数据
        const onCateTagClick = (item) => {
            // getData(item.type)
            state.activedCate = item || { id: '', name: '全部视频' }
            state.showAllCate = false
            state.offset = 1
            state.tabData.list.data = []
            store.dispatch('video/getListByCate', { offset: 1, id: (item && item.id) || '' }).then(res => {
                router.push({
                    path: router.currentRoute.value.path,
                    query: {
                        ...router.currentRoute.value.query,
                        id: state.activedCate.id,
                        name: state.activedCate.name
                    }
                })
            })
        }
        const onListClick = (item) => {
            // getData(item.type)
            // console.log(item.vid, 'item')
            router.push({
                path: '/video/detail',
                query: {
                    id: item.id || item.vid || item.mvid,
                    type: (router.currentRoute.value.query.name === 'MV') ? 'mv' : 'video'
                }
            })
        }
        return {
            ...toRefs(state),
            onListClick,
            onCateTagClick
        }
    }
}
</script>

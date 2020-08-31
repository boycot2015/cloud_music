<template>
    <div class="tab-content tab-cate-content">
        <div class="tags">
            <span class="btn-cate js-toggle-cate" :class="{'active': showAllCate}" @click="showAllCate = !showAllCate">
                <span class="text">{{activedCate || '全部歌单'}}</span> <i class="icon-music-down"></i>
            </span>
            <p class="name">
                热门标签：
                <span class="cates">
                    <span
                    v-for="(item, index) in tabData.tags"
                    @click="onCateTagClick(item)"
                    :key="item.id">
                        <span class="js-hot-cate-item" :class="{'active': item.name === activedCate}">{{item.name}}</span>
                        <i class="line" v-html="index < tabData.tags.length - 1 ? '|': ''"></i>
                    </span>
                </span>
            </p>
        </div>
        <div class="mask-cate" v-show="showAllCate">
            <div id="cate-page" class="tc">
                <div class="wrap flexbox-v">
                    <span class="btn-cate tc" :class="{'active': activedCate === '全部歌单'}" @click="onCateTagClick()">{{tabData.all.name}}</span>
                    <div class="content">
                        <div
                        v-for="(subsItem, index) in tabData.subs"
                        :key="subsItem.id"
                        class="content-item flexbox-h just-b">
                            <div class="left flex-1">
                                <div class="cate-title flexbox-h">
                                    <i class="icon-music-emoji"></i>
                                    <p class="name">{{tabData.categories[index]}}</p>
                                </div>
                            </div>
                            <div class="right flex-4">
                                <div class="cates clearfix">
                                        <div
                                        v-for="sub in subsItem"
                                        @click="onCateTagClick(sub)"
                                        :key="sub.id"
                                        :class="{'active': sub.name === activedCate}"
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
        <ul class="recommend-list clearfix">
            <li class="grid-list-item top js-list-detail fl">
                <div class="img flexbox-v just-c tc">
                    <i class="icon icon-music-emoji"></i>
                    <div class="top-text">{{tabData.dayData.name}}<i class="icon-music-right"></i></div>
                </div>
                <div class="name tl">{{tabData.dayData.copywriter}}</div>
            </li>
            <grid-list
                v-for="(item, index) in tabData.list.data"
                :item="item"
                :category="tabData.list.category"
                :index="index"
                @click="onListClick(item)"
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
    name: 'homeTemp2',
    components: {
        // Swiper,
        // SwiperSlide,
        GridList
    },
    setup () {
        const store = useStore()
        const tabData = store.state.home.tab2Data
        const router = useRouter()
        const state = reactive({
            showAllCate: false,
            activedCate: '全部歌单',
            tabData: {
                dayData: {
                    weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    day: new Date().getDate(),
                    name: '精品歌单',
                    copywriter: '精品歌单倾心推荐，给最懂音乐的你'
                },
                all: {},
                categories: [], // 分类
                tags: [], // 分类
                subs: [], // 分类
                list: {
                    title: '推荐歌单',
                    category: 3,
                    type: 1,
                    data: []
                }
            }
        })
        onMounted(async () => {
            getData(state.activeTab)
        })
        watch(() => [
            tabData.all,
            tabData.categories,
            tabData.tags,
            tabData.subs,
            tabData.list
        ], (value) => {
            state.tabData.all = value[0]
            state.tabData.categories = value[1]
            state.tabData.tags = value[2]
            state.tabData.subs = value[3]
            state.tabData.list.data = value[4]
        })

        // methods
        const getData = async (type) => {
            store.dispatch('home/getTab2Data', type).then(res => {
                store.dispatch('home/getListByCate', { current: 1, cat: '' })
            })
        }
        // 点击分类标签获取对应数据
        const onCateTagClick = (item) => {
            // getData(item.type)
            state.activedCate = (item && item.name) || '全部歌单'
            state.showAllCate = false
            store.dispatch('home/getListByCate', { current: 1, cat: (item && item.name) || '全部歌单' })
        }
        const onListClick = (item) => {
            // getData(item.type)
            console.log(item.id, 'item.id')
            router.push({
                path: '/songs/list',
                query: {
                    id: item.id
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

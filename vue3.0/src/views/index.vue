<template>
    <div class="music-home">
        <div class="tab-list flexbox-h just-c">
            <div
            v-for="item in tabMenu"
            :key="item.name"
            :class="{'active': item.type === activeTab}"
            @click="onTabClick(item)"
            class="tab-list-item js-tab-item"
            data-type="home">{{item.name}}</div>
        </div>
        <div class="tab-content tab-home-content" v-if="activeTab === tabMenu[0].type">
            <!-- <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide>Slide 1</swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
                <swiper-slide>Slide 4</swiper-slide>
                <swiper-slide>Slide 5</swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper> -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div
                    v-for="item in tab1Data.banner"
                    :key="item.id"
                    class="swiper-slide">
                        <img :src="item.imageUrl" alt="">
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
                <!-- 如果需要导航按钮 -->
                <div class="button-prev icon-music-left"></div>
                <div class="button-next icon-music-right"></div>
            </div>
            <div class="recommend" v-for="(obj, findex) in tab1Data.list" :key="obj.title">
                <div class="title clearfix">
                    <h3 class="name fl">{{obj.title || '推荐歌单'}}</h3>
                    <span class="fr more">更多<i class="icon-music-right"></i></span>
                </div>
                <ul class="recommend-list grid-list clearfix" :style="{'marginBottom': findex === 2 ? '40px': ''}">
                    <li class="grid-list-item date js-list-detail fl" v-if="findex === 0">
                        <div class="img">
                            <span class="tip copy-writer">根据您的音乐口味生成每日更新</span>
                            <p class="week">{{tab1Data.dayData.weeks[new Date().getDay()]}}</p>
                            <div class="date-text">{{tab1Data.dayData.day}}</div>
                        </div>
                        <div class="name tl">每日歌曲推荐</div>
                    </li>
                    <grid-list
                    v-for="(item, index) in obj.data"
                    :item="item"
                    :index="index"
                    @click="onListClick(item)"
                    :key="item.id"></grid-list>
                </ul>
            </div>
            <div class="recommend">
            </div>
        </div>
        <div class="tab-content tab-cate-content" v-if="activeTab === tabMenu[1].type">
            <div class="tags">
                <span class="btn-cate js-toggle-cate"><span class="text">全部歌单</span> <i class="icon-music-down"></i></span>
                <p class="name">
                    热门标签：
                    <span class="cates"></span>
                </p>
            </div>
            <div class="mask-cate">
            </div>
            <ul class="recommend-list clearfix">
                <li class="grid-list-item top js-list-detail fl" data-id="">
                    <div class="img flexbox-v just-c tc">
                        <i class="icon icon-music-emoji"></i>
                        <div class="top-text">精品歌单<i class="icon-music-right"></i></div>
                    </div>
                    <div class="name tl">精品歌单倾心推荐，给最懂音乐的你</div>
                </li>
            </ul>
            <div id="cate-page" class="tc"></div>
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
import GridList from '@/views/components/GridList'
export default {
    components: {
        // Swiper,
        // SwiperSlide,
        GridList
    },
    // directives: {
    //     swiper: directive
    // },
    setup () {
        const store = useStore()
        const homeStore = store.state.home
        const router = useRouter()
        const state = reactive({
            tabMenu: [
                {
                    name: '个性推荐',
                    type: 'home'
                }, {
                    name: '歌单',
                    type: 'cate'
                }, {
                    name: '主播电台',
                    type: 'dj'
                }, {
                    name: '排行榜',
                    type: 'ph'
                }, {
                    name: '歌手',
                    type: 'singer'
                }, {
                    name: '最新音乐',
                    type: 'newest'
                }
            ],
            activeTab: 'home',
            tab1Data: {
                dayData: {
                    weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    day: new Date().getDate(),
                    name: '每日歌曲推荐',
                    copywriter: '根据您的音乐口味生成每日更新'
                },
                // ...computed(() => store.state.home).value,
                list: [{
                    title: '推荐歌单',
                    category: 3,
                    type: 1,
                    data: []
                }, {
                    title: '独家放送',
                    category: 3,
                    type: 1,
                    data: []
                }, {
                    title: '最新音乐',
                    category: 3,
                    type: 1,
                    data: []
                }, {
                    title: '推荐MV',
                    category: 3,
                    type: 1,
                    data: []
                }, {
                    title: '主播电台',
                    category: 3,
                    type: 1,
                    data: []
                }]
            }
        })
        // const { ctx } = getCurrentInstance()
        onMounted(async () => {
            getData(state.activeTab)
        })
        watch(() => homeStore.banner, (value) => {
            state.tab1Data.banner = value
        })
        watch(() => [
            homeStore.personalized,
            homeStore.privatecontent,
            homeStore.topSong,
            homeStore.mv,
            homeStore.djrecommend
        ], (value) => {
            state.tab1Data.list.map((el, i) => {
                state.tab1Data.list[i].data = value[i]
            })
        })

        // methods
        const getData = async (type) => {
            await store.commit('home/getData', type)
        }
        // 点击tab切换数据
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
        // 点击tab切换数据
        const onTabClick = (item) => {
            state.activeTab = item.type
            // getData(item.type)
        }
        return {
            ...toRefs(state),
            onTabClick,
            onListClick
        }
    }
}
</script>

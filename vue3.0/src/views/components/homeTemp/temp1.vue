<template>
    <div class="tab-content tab-home-content" v-loading="loading">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div
                v-for="item in tabData.banner"
                :key="item.targetId"
                class="swiper-slide" @click="onBannerClick(item)">
                    <img :src="item.imageUrl" alt="">
                    <div class="title" :class="{'blue': item.titleColor === 'blue'}">{{item.typeTitle}}</div>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="button-prev icon-music-left"></div>
            <div class="button-next icon-music-right"></div>
        </div>
        <div class="recommend" v-for="(obj, findex) in tabData.list" :key="obj.title">
            <div class="title clearfix">
                <h3 class="name fl">{{obj.title || '推荐歌单'}}</h3>
                <span class="fr more" @click="showMoreClick(obj)">更多<i class="icon-music-right"></i></span>
            </div>
            <ul class="recommend-list grid-list clearfix" :style="{'marginBottom': findex === 2 ? '40px': ''}">
                <li class="grid-list-item date js-list-detail fl"
                @click="onListClick({ id: 0 }, true)"
                v-if="findex === 0">
                    <div class="img">
                        <span class="tip copy-writer">{{tabData.dayData.copywriter}}</span>
                        <p class="week">{{tabData.dayData.weeks[new Date().getDay()]}}</p>
                        <div class="date-text">{{tabData.dayData.day}}</div>
                    </div>
                    <div class="name tl">{{tabData.dayData.name}}</div>
                </li>
                <grid-list
                v-for="(item, index) in obj.data"
                :item="item"
                :index="index"
                :category="obj.category"
                :type="obj.type"
                @click="onListClick(item)"
                :key="item.id"></grid-list>
            </ul>
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
import '@/plugins/swiper/swiper.min.css'
import Swiper from '@/plugins/swiper/swiper.min.js'
import GridList from '@/views/components/GridList'
export default {
    name: 'homeTemp1',
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
        const tabData = store.state.home.tab1Data
        const router = useRouter()
        const state = reactive({
            loading: true,
            tabData: {
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
                    query: {
                        tabName: 'cate'
                    },
                    data: []
                }, {
                    title: '独家放送',
                    category: 1,
                    type: 5,
                    path: '/common/page',
                    query: {
                        tabName: 'private'
                    },
                    data: []
                }, {
                    title: '最新音乐',
                    category: 3,
                    type: 1,
                    query: {
                        tabName: 'cate'
                    },
                    data: []
                }, {
                    title: '推荐MV',
                    category: 3,
                    type: 5,
                    path: '/video/index',
                    query: {
                        tabName: 'MV'
                    },
                    data: []
                }, {
                    title: '主播电台',
                    category: 3,
                    type: 1,
                    query: {
                        tabName: 'dj'
                    },
                    data: []
                }]
            },
            swiperOption: {
            // direction: 'vertical', // 垂直切换选项
                // slidesPerView: 1,
                // spaceBetween: -40,
                slidesPerView: 'auto',
                effect: 'coverflow',
                centeredSlides: true,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 100,
                    depth: 50,
                    modifier: 3,
                    slideShadows: false
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                loop: true,
                navigation: {
                    nextEl: '.button-next',
                    prevEl: '.button-prev'
                },
                speed: 400
            }
        })
        // const { ctx } = getCurrentInstance()
        onMounted(async () => {
            getData()
        })
        watch(() => tabData.banner, (value) => {
            state.tabData.banner = value
        })
        watch(() => [
            tabData.personalized,
            tabData.privatecontent,
            tabData.topSong,
            tabData.mv,
            tabData.djrecommend
        ], (value) => {
            state.tabData.list.map((el, i) => {
                state.tabData.list[i].data = value[i]
            })
        })
        watch(() => store.state.isExtend, (value) => {
            console.log(value, 'state.isExtend')
            initSwiper()
        })
        // methods
        const getData = async () => {
            store.dispatch('home/getTab1Data').then(res => {
                initSwiper()
                state.loading = false
            })
        }
        const onListClick = (item, isDaily) => {
            // getData(item.type)
            router.push({
                path: '/songs/list',
                query: {
                    id: item.id,
                    isDaily
                }
            })
        }
        const initSwiper = () => {
            /* eslint-disable */
            new Swiper('.swiper-container', state.swiperOption)
        }
        const onBannerClick = (item) => {
            if (item.targetType === 1) {
                store.dispatch('setPlayData', { id: item.targetId }).then(res => {
                    let audio = document.getElementById('play-audio')
                    audio.play()
                })
            } else if (item.targetType === 10) {
                router.push({
                    path: '/songs/list',
                    query: {
                        id: item.targetId
                    }
                })
            } else if (item.url !== null) {
                window.open(item.url)
            }
        }
        const showMoreClick = (obj) => {
            let route = {
                    path: '',
                    query: {
                        tabName: ''
                    }
                }
            if (obj.path) {
                route.path = obj.path
            } else {
                route.path = router.currentRoute.value.path
            }
            route.query = obj.query
            route.query.title = obj.title
            route.query.type = obj.type
            route.query.category = obj.category
            router.push(route)
        }
        return {
            ...toRefs(state),
            onListClick,
            onBannerClick,
            showMoreClick
        }
    }
}
</script>

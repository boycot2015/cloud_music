<template>
<div class="tab-content tab-home-content">
    <div class="swiper-container dj-swiper">
        <div class="swiper-wrapper">
            <div
            v-for="item in tabData.banner"
            @click="onBannerClick(item)"
            :key="item.targetId"
            class="swiper-slide">
                <img :src="item.pic || item.imageUrl" alt="">
                <div class="title" :class="{'blue': item.titleColor === 'blue'}">{{item.typeTitle}}</div>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="button-prev icon-music-left"></div>
        <div class="button-next icon-music-right"></div>
    </div>
    <div class="dj-cate">
        <div class="swiper-container dj-cate-swiper">
            <div class="swiper-wrapper">
                <div
                v-for="item in tabData.categories"
                @click="onBannerClick(item)"
                :key="item.id" class="swiper-slide flexbox-v align-c">
                    <div class="img tc" :style="`background-image: url(${item.picPCBlackUrl})`"></div>
                    <!-- <img :src="item.picWebUrl || item.imageUrl" alt=""> -->
                    <div class="name" >{{item.name}}</div>
                </div>
            </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="button-prev icon-music-left"></div>
        <div class="button-next icon-music-right"></div>
    </div>
    <div class="recommend" v-for="(obj, findex) in tabData.list" :key="obj.title">
        <div class="title clearfix">
            <h3 class="name fl">{{obj.title || '推荐歌单'}}</h3>
            <span class="fr more" v-if="obj.hasMore" @click="onMoreClick(obj)">更多<i class="icon-music-right"></i></span>
        </div>
        <ul class="recommend-list grid-list clearfix" :style="{'marginBottom': findex === 2 ? '40px': ''}">
            <grid-list v-for="(item, index) in obj.data" :item="item" :type="obj.type" :index="index" @click="onListClick(item)" :key="item.id"></grid-list>
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
import {
    useStore
} from 'vuex'
import {
    useRouter
} from 'vue-router'
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
        const tabData = store.state.home.tab3Data
        const router = useRouter()
        const state = reactive({
            tabData: {
                list: [{
                    title: '付费精品',
                    category: 3,
                    type: 2,
                    path: '/common/page',
                    query: {
                        tabName: 'djPaygift'
                    },
                    hasMore: true,
                    data: []
                }, {
                    title: '电台个性推荐',
                    category: 3,
                    type: 1,
                    query: {
                        tabName: 'dj'
                    },
                    hasMore: false,
                    data: []
                }, {
                    title: '创作|翻唱',
                    category: 3,
                    type: 1,
                    path: '/common/page',
                    query: {
                        tabName: 'djRap'
                    },
                    hasMore: true,
                    data: []
                }, {
                    title: '3D|电子',
                    category: 3,
                    type: 1,
                    path: '/common/page',
                    query: {
                        tabName: 'dj3D'
                    },
                    hasMore: true,
                    data: []
                }],
                banner: [],
                categories: []
            },
            cateSwiperOption: {
                slidesPerView: 9,
                slidesPerGroup: 9,
                navigation: {
                    nextEl: '.button-next',
                    prevEl: '.button-prev'
                },
                speed: 200
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
                speed: 200
            }
        })
        // const { ctx } = getCurrentInstance()
        onMounted(async () => {
            getData()
        })
        watch(() => tabData.banner, (value) => {
            state.tabData.banner = value
        })
        watch(() => tabData.categories, (value) => {
            state.tabData.categories = value
        })
        watch(() => [
            tabData.djPaygift,
            tabData.djrecommend,
            tabData.djRap,
            tabData.dj3D
        ], (value) => {
            state.tabData.list.map((el, i) => {
                if (i === 0) {
                    state.tabData.list[i].data = value[i].slice(0, 4)
                } else {
                    state.tabData.list[i].data = value[i].slice(0, 5)
                }
            })
        })
        watch(() => store.state.isExtend, (value) => {
            initSwiper()
        })
        // methods
        const getData = async () => {
            store.dispatch('home/getTab3Data').then(res => {
                initSwiper()
            })
        }
        const onListClick = (item) => {
            // getData(item.type)
            console.log(item.id, 'item.id')
            router.push({
                path: '/songs/list',
                query: {
                    id: item.id,
                    type: 3
                }
            })
        }
        const initSwiper = () => {
            /* eslint-disable */
            new Swiper('.swiper-container.dj-swiper', state.swiperOption)
            new Swiper('.swiper-container.dj-cate-swiper', state.cateSwiperOption)
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
                        id: item.targetId,
                        type: 3
                    }
                })
            } else if (item.url !== null) {
                window.open(item.url)
            }
        }
        const onMoreClick = (obj) => {
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
            onMoreClick
        }
    }
}
</script>

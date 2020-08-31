<template>
<div class="tab-content tab-home-content">
    <div class="swiper-container dj-swiper">
        <div class="swiper-wrapper">
            <div v-for="item in tabData.banner" :key="item.id" class="swiper-slide">
                <img :src="item.pic || item.imageUrl" alt="">
                <div class="title" :style="{backgrundColor: item.typeColor}">{{item.typeTitle}}</div>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="button-prev icon-music-left"></div>
        <div class="button-next icon-music-right"></div>
    </div>
    <div class="swiper-container dj-cate-swiper">
        <div class="swiper-wrapper">
            <div v-for="item in tabData.categories" :key="item.id" class="swiper-slide flexbox-v align-c">
                <div class="img tc" :style="`background-image: url(${item.picPCBlackUrl})`"></div>
                <!-- <img :src="item.picWebUrl || item.imageUrl" alt=""> -->
                <div class="name" >{{item.name}}</div>
            </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="button-prev icon-music-left"></div>
        <div class="button-next icon-music-right"></div>
    </div>
    <div class="recommend" v-for="(obj, findex) in tabData.list" :key="obj.title">
        <div class="title clearfix">
            <h3 class="name fl">{{obj.title || '推荐歌单'}}</h3>
            <span class="fr more">更多<i class="icon-music-right"></i></span>
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
                    data: []
                }, {
                    title: '电台个性推荐',
                    category: 3,
                    type: 1,
                    data: []
                }, {
                    title: '创作|翻唱',
                    category: 3,
                    type: 1,
                    data: []
                }, {
                    title: '3D|电子',
                    category: 3,
                    type: 1,
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
                state.tabData.list[i].data = value[i]
            })
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
                    id: item.id
                }
            })
        }
        const initSwiper = () => {
            /* eslint-disable */
            new Swiper('.swiper-container.dj-swiper', state.swiperOption)
            new Swiper('.swiper-container.dj-cate-swiper', state.cateSwiperOption)
        }
        return {
            ...toRefs(state),
            onListClick
        }
    }
}
</script>

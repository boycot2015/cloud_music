<template>
    <div class="top-list">
        <template v-for="item in tabData.list" :key="item.title">
            <div class="title">{{item.title}}</div>
            <div class="main clearfix" v-loading="loading">
                <template v-if="item.type === 0" >
                    <div class="main-item fl" v-for="plist in item.data" :key="plist.id">
                        <h3 class="top"
                        :class="'color-' + plist.ToplistType">
                            <p class="name">{{plist.name}}</p>
                            <span class="time">{{(plist.updateTime && new Date(plist.updateTime).toLocaleString()) || plist.updateFrequency}}</span>
                            <span class="icon icon-music-pause"></span>
                        </h3>
                        <ul class="music-list">
                            <play-list
                            class="list-item"
                            :data="list"
                            :index="index"
                            :type="2"
                            :operation="false"
                            isminiPlay
                            v-for="(list, index) in plist.tracks"
                            :key="list.id">
                            </play-list>
                        </ul>
                        <div class="bottom tr">
                            <span class="all" @click="onListClick(plist)">查看全部&nbsp;></span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <grid-list
                    v-for="(val, index) in item.data"
                    :item="val"
                    :type="item.type"
                    :index="index"
                    @click="onListClick(val)"
                    :key="val.id"></grid-list>
                </template>
            </div>
        </template>
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
import playList from '@/views/components/List'
import GridList from '@/views/components/GridList'
import {
    useStore
} from 'vuex'
import {
    useRouter
} from 'vue-router'
export default {
    name: 'homeTemp1',
    components: {
        playList,
        GridList
    },
    setup () {
        const store = useStore()
        const tabData = store.state.home.tab4Data
        const router = useRouter()
        const state = reactive({
            loading: true,
            tabData: {
                list: [{
                    title: '官方榜',
                    type: 0,
                    data: []
                }, {
                    title: '全球榜',
                    type: 1,
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
        onMounted(async () => {
            getData()
        })
        watch(() => [
            tabData.topList,
            tabData.globalTopList
        ], (value) => {
            state.tabData.list.map((el, i) => {
                state.tabData.list[i].data = value[i]
                state.tabData.list[i].data.map(el => {
                    el.tracks && (el.tracks = el.tracks.slice(0, 8))
                })
            })
        })
        // methods
        const getData = async () => {
            store.dispatch('home/getTab4Data').then(res => {
                state.loading = false
            })
        }
        const onListClick = (item) => {
            router.push({
                path: '/songs/list',
                query: {
                    id: item.id
                }
            })
        }
        return {
            ...toRefs(state),
            onListClick
        }
    }
}
</script>

<style>

</style>

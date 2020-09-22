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
        <div class="music-home-container">
            <home-temp-tab1 v-if="activeTab === tabMenu[0].type"></home-temp-tab1>
            <home-temp-tab2 v-show="activeTab === tabMenu[1].type"></home-temp-tab2>
            <home-temp-tab3 v-if="activeTab === tabMenu[2].type"></home-temp-tab3>
            <home-temp-tab4 v-if="activeTab === tabMenu[3].type"></home-temp-tab4>
            <home-temp-tab5 v-show="activeTab === tabMenu[4].type"></home-temp-tab5>
        </div>
    </div>
</template>
<script>
import {
    // ref,
    // computed,
    watch,
    reactive,
    toRefs
    // getCurrentInstance,
    // onBeforeMount
    // onMounted
} from 'vue'
import { useRouter } from 'vue-router'
import homeTempTab1 from '@/views/components/homeTemp/temp1'
import homeTempTab2 from '@/views/components/homeTemp/temp2'
import homeTempTab3 from '@/views/components/homeTemp/temp3'
import homeTempTab4 from '@/views/components/homeTemp/temp4'
import homeTempTab5 from '@/views/components/homeTemp/temp5'
export default {
    name: 'home',
    components: {
        // Swiper,
        // SwiperSlide,
        homeTempTab1,
        homeTempTab2,
        homeTempTab3,
        homeTempTab4,
        homeTempTab5
    },
    // directives: {
    //     swiper: directive
    // },
    setup () {
        const router = useRouter()
        // console.log(router.currentRoute.value, 'router.currentRoute')
        const query = router.currentRoute.value.query.tabName || 'home'
        const state = reactive({
            activeTab: query,
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
                }
                // , {
                //     name: '最新音乐',
                //     type: 'newest'
                // }
            ]
        })
        // 点击tab切换数据
        watch(() => router.currentRoute.value.query.tabName, (value) => {
            state.activeTab = value
        })
        const onTabClick = (item) => {
            state.activeTab = item.type
            router.push({
                path: '/index',
                query: {
                    tabName: state.activeTab
                }
            })
            // getData(item.type)
        }
        return {
            ...toRefs(state),
            onTabClick
        }
    }
}
</script>

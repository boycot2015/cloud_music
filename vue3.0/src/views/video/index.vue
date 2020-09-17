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
        <video-temp-tab1 v-if="activeTab === tabMenu[0].type"></video-temp-tab1>
        <video-temp-tab2 v-show="activeTab === tabMenu[1].type"></video-temp-tab2>
    </div>
</template>
<script>
import {
    // ref,
    // computed,
    // watch,
    reactive,
    toRefs
    // getCurrentInstance,
    // onBeforeMount
    // onMounted
} from 'vue'
import { useRouter } from 'vue-router'
import videoTempTab1 from '@/views/components/videoTemp/temp1'
import videoTempTab2 from '@/views/components/videoTemp/temp2'
export default {
    name: 'videos',
    components: {
        // Swiper,
        // SwiperSlide,
        videoTempTab1,
        videoTempTab2
    },
    // directives: {
    //     swiper: directive
    // },
    setup () {
        const router = useRouter()
        // console.log(router.currentRoute.value, 'router.currentRoute')
        const query = router.currentRoute.value.query.tabName || 'video'
        const state = reactive({
            activeTab: query,
            tabMenu: [
                {
                    name: '视频',
                    type: 'video'
                }, {
                    name: 'MV',
                    type: 'MV'
                }
            ]
        })
        // 点击tab切换数据
        const onTabClick = (item) => {
            state.activeTab = item.type
            router.push({
                path: '/video/index',
                query: {
                    // tabName: state.activeTab,
                    ...router.currentRoute.value.query
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

<template>
    <div class="list-page music-home">
        <div class="title clearfix">
            <h3 class="name fl">{{data.title}}</h3>
        </div>
        <ul class="list">
            <grid-list
            v-for="(item, index) in data.list"
            :item="item"
            :index="index"
            :category="data.category"
            :type="data.type"
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
    onMounted
    // getCurrentInstance,
    // onBeforeMount
    // onMounted
} from 'vue'
import {
    useStore
} from 'vuex'
import { useRouter } from 'vue-router'
import GridList from '@/views/components/GridList'
export default {
    name: 'homeTemp1',
    components: {
        GridList
    },
    setup () {
        const router = useRouter()
        const store = useStore()
        const query = router.currentRoute.value.query.tabName || 'home'
        const state = reactive({
            activeTab: query,
            data: {
                title: router.currentRoute.value.query.title || '推荐歌单',
                type: +router.currentRoute.value.query.type || 1,
                id: router.currentRoute.value.query.id || 0,
                category: +router.currentRoute.value.query.category || 3,
                tabName: router.currentRoute.value.query.tabName || '',
                list: []
            },
            targetPath: '/songs/list'
        })
        onMounted(() => {
            const type = state.data.tabName
            switch (type) {
            case 'private':
                state.data.list = store.state.home.tab1Data.privatecontentList
                break
            case 'dj3D':
                state.data.list = store.state.home.tab3Data.dj3D
                break
            case 'djPaygift':
                state.data.list = store.state.home.tab3Data.djPaygift
                break
            case 'djRap':
                state.data.list = store.state.home.tab3Data.djRap
                break
            case 'personalized':
                state.data.list = store.state.video.tab2Data.personalized
                state.targetPath = '/video/detail'
                break
            case 'hotMV':
                state.data.list = store.state.video.tab2Data.hotMV
                state.targetPath = '/video/detail'
                break
            case 'exclusive':
                state.data.list = store.state.video.tab2Data.exclusive
                state.targetPath = '/video/detail'
                break
            case 'topMV':
                state.data.list = store.state.video.tab2Data.topMV
                state.targetPath = '/video/detail'
                break
            default:
                break
            }
        })
        // 点击tab切换数据
        watch(() => router.currentRoute.value.query.tabName, (value) => {
            state.activeTab = value
        })
        const onListClick = (item) => {
            router.push({
                path: state.targetPath,
                query: {
                    id: item.id || item.vid || item.mvid
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

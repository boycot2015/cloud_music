<template>
    <div class="tab-content tab-cate-content tab-singer-content">
        <div class="recommend" v-for="(obj, findex) in tabData.list" :key="obj.title">
            <div class="title flexbox-h algin-c">
                <h3 class="name " style="margin-right: 20px;">{{obj.title || '推荐歌单'}}</h3>
                <div class="tags flex-4" style="margin-bottom: 0;">
                    <div class="name top clearfix" v-for="(formItem, key) in obj.form" :key="formItem.title">
                        <div class="cates clearfix fl">
                            <div
                            class="fl"
                            v-for="(item, index) in formItem.options"
                            @click="onCateTagClick(item, formItem, key, obj)"
                            :key="item.id">
                                <span class="cates-item" :class="{'active': item.code === formItem.value || item === formItem.value}">{{item.name || item}}</span>
                                <i class="line" v-html="index < formItem.options.length - 1 ? '|': ''"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="flex-1 tr more">更多<i class="icon-music-right"></i></span>
            </div>
            <ul class="grid-list clearfix" :style="{'marginBottom': findex === 2 ? '40px': ''}">
                <grid-list
                v-for="(item, index) in obj.data"
                :item="item"
                :category="obj.category"
                :index="index"
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
import GridList from '@/views/components/GridList'
export default {
    name: 'videoTemp2',
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
        const tabData = store.state.video.tab2Data
        const router = useRouter()
        const state = reactive({
            tabData: {
                dayData: {
                    weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    day: new Date().getDate(),
                    name: '每日歌曲推荐',
                    copywriter: '根据您的音乐口味生成每日更新'
                },
                // ...computed(() => store.state.home).value,
                list: [{
                    title: '最新MV',
                    category: 1,
                    type: 3,
                    data: [],
                    form: {
                        area: {
                            title: '语种',
                            value: router.currentRoute.value.query.area || '内地',
                            options: [{
                                code: '内地',
                                name: '内地'
                            }, {
                                code: '港台',
                                name: '港台'
                            }, {
                                code: '欧美',
                                name: '欧美'
                            }, {
                                code: '日本',
                                name: '日本'
                            }, {
                                code: '韩国',
                                name: '韩国'
                            }] // 语种
                        },
                        type: {
                            value: '全部'
                        },
                        order: {
                            value: '最热'
                        }
                    }
                }, {
                    title: '热播MV',
                    category: 2,
                    type: 3,
                    data: []
                }, {
                    title: '网易出品',
                    category: 4,
                    type: 3,
                    data: []
                }, {
                    title: 'MV排行榜',
                    category: 5,
                    type: 4,
                    data: [],
                    form: {
                        area: {
                            title: '语种',
                            value: router.currentRoute.value.query.area || '内地',
                            options: [{
                                code: '内地',
                                name: '内地'
                            }, {
                                code: '港台',
                                name: '港台'
                            }, {
                                code: '欧美',
                                name: '欧美'
                            }, {
                                code: '日本',
                                name: '日本'
                            }, {
                                code: '韩国',
                                name: '韩国'
                            }] // 语种
                        },
                        type: {
                            value: '全部'
                        },
                        order: {
                            value: '最热'
                        }
                    }
                }]
            },
            offset: 1,
            limit: 39
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
            tabData.hotMV,
            tabData.exclusive,
            tabData.topMV
        ], (value) => {
            state.tabData.list.map((el, i) => {
                el.data = value[i].slice(0, 6)
                if (i === 3) {
                    el.data = value[3].slice(0, 10)
                }
            })
        })
        watch(() => store.state.isExtend, (value) => {
            console.log(value, 'state.isExtend')
        })
        // methods
        const getData = async () => {
            store.dispatch('video/getTab2Data').then(res => {
            })
        }
        const onListClick = (item) => {
            // getData(item.type)
            router.push({
                path: '/songs/list',
                query: {
                    id: item.id
                }
            })
        }
        // 整理筛选条件
        const sortData = (obj) => {
            const data = {}
            for (const key in obj.form) {
                data[key] = obj.form[key].value
            }
            return data
        }
        const onCateTagClick = (item, formItem, key, obj) => {
            // console.log(item, formItem, key, 'item, formItem, key')
            formItem.value = item.code !== undefined ? item.code : item
            state.offset = 1
            state.tabData.list.data = []
            const data = sortData(obj)
            router.push({
                path: router.currentRoute.value.path,
                query: {
                    ...router.currentRoute.value.query,
                    ...data
                }
            })
            data.limit = state.limit
            data.ctype = obj.category
            store.dispatch('video/getVideoByParams', data).then(res => {
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

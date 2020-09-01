<template>
    <div class="tab-content tab-cate-content tab-singer-content" ref="scrollDom">
        <div class="tags">
            <div class="name top clearfix" v-for="(formItem, key) in form" :key="formItem.title">
                <h3 class="ctitle fl">{{formItem.title}}：</h3>
                <div class="cates clearfix fl">
                    <div
                    class="fl"
                    v-for="(item, index) in formItem.options"
                    @click="onCateTagClick(item, formItem, key)"
                    :key="item.id">
                        <span class="cates-item" :class="{'active': item.code === parseInt(formItem.value) || item === formItem.value}">{{item.name || item}}</span>
                        <i class="line" v-html="index < formItem.options.length - 1 ? '|': ''"></i>
                    </div>
                </div>
            </div>
        </div>
        <ul class="recommend-list clearfix">
            <li class="grid-list-item top js-list-detail fl">
                <div class="img tc">
                    <!-- <img src="" alt=""> -->
                    <!-- <i class="icon icon-music-emoji"></i> -->
                    <div class="top-text">
                        <p>{{tabData.dayData.name}}</p>
                        <span>SINGER LIST</span>
                    </div>
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
    ref,
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
        const scrollDom = ref(null)
        const store = useStore()
        const tabData = store.state.home.tab5Data
        const router = useRouter()
        const state = reactive({
            tabData: {
                dayData: {
                    name: '歌手榜',
                    copywriter: '歌手排行榜'
                },
                list: {
                    title: '推荐歌单',
                    category: 3,
                    type: 1,
                    data: []
                }
            },
            form: {
                area: {
                    title: '语种',
                    value: router.currentRoute.value.query.area || -1,
                    options: [{
                        code: -1,
                        name: '全部'
                    }, {
                        code: 7,
                        name: '华语'
                    }, {
                        code: 96,
                        name: '欧美'
                    }, {
                        code: 8,
                        name: '日本'
                    }, {
                        code: 16,
                        name: '韩国'
                    }, {
                        code: 0,
                        name: '其他'
                    }] // 语种
                }, // 分类
                type: {
                    title: '分类',
                    value: router.currentRoute.value.query.type || -1,
                    options: [{
                        code: -1,
                        name: '全部'
                    }, {
                        code: 1,
                        name: '男歌手'
                    }, {
                        code: 2,
                        name: '女歌手'
                    }, {
                        code: 3,
                        name: '乐队组合'
                    }]
                }, // 筛选
                initial: {
                    title: '筛选',
                    value: router.currentRoute.value.query.initial || -1,
                    options: [{ code: -1, name: '热门' }, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
                        'V', 'W', 'X', 'Y', 'Z', '#']
                }
            },
            offset: 1,
            limit: 39
        })
        onMounted(async () => {
            getData({ ...sortData(), refresh: true })
            console.dir(scrollDom.value, 'refs')
            document.querySelector('.music-box .main').addEventListener('scroll', function (e) {
                // 获取定义好的scroll盒子
                // const el = scrollDom.value
                const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
                if (condition && router.currentRoute.value.query.tabName === 'singer') {
                    state.offset++
                    getData({ ...sortData(), offset: state.offset, limit: state.limit })
                }
            })
        })
        watch(() => tabData.topList, (value) => {
            if (state.offset !== 1) {
                state.tabData.list.data = [...state.tabData.list.data, ...value]
                return
            }
            state.tabData.list.data = value
        })

        // methods
        const getData = async (data) => {
            store.dispatch('home/getTab5Data', data).then(res => {
            })
        }
        // 整理筛选条件
        const sortData = () => {
            const data = {}
            for (const key in state.form) {
                data[key] = state.form[key].value
            }
            return data
        }
        // 点击分类标签获取对应数据
        const onCateTagClick = (item, formItem, key) => {
            // console.log(item, formItem, key, 'item, formItem, key')
            formItem.value = item.code !== undefined ? item.code : item
            state.offset = 1
            state.tabData.list.data = []
            store.dispatch('home/getSingerByParams', sortData()).then(res => {
                router.push({
                    path: router.currentRoute.value.path,
                    query: {
                        ...router.currentRoute.value.query,
                        ...sortData()
                    }
                })
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
            scrollDom,
            ...toRefs(state),
            onListClick,
            onCateTagClick
        }
    }
}
</script>

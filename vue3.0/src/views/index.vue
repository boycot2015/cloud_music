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
        <home-temp-tab1 v-show="activeTab === tabMenu[0].type"></home-temp-tab1>
        <home-temp-tab2 v-show="activeTab === tabMenu[1].type"></home-temp-tab2>
        <home-temp-tab3 v-if="activeTab === tabMenu[2].type"></home-temp-tab3>
        <!-- <home-temp-tab4 v-show="activeTab === tabMenu[3].type"></home-temp-tab4>
        <home-temp-tab5 v-show="activeTab === tabMenu[4].type"></home-temp-tab5> -->
        <!-- <div class="tab-content tab-home-content" v-show="activeTab === tabMenu[0].type">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div
                    v-for="item in tab1Data.banner"
                    :key="item.id"
                    class="swiper-slide">
                        <img :src="item.imageUrl" alt="">
                        <div class="title" :style="{backgrundColor: item.typeColor}">{{item.typeTitle}}</div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
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
                            <span class="tip copy-writer">{{tab1Data.dayData.copywriter}}</span>
                            <p class="week">{{tab1Data.dayData.weeks[new Date().getDay()]}}</p>
                            <div class="date-text">{{tab1Data.dayData.day}}</div>
                        </div>
                        <div class="name tl">{{tab1Data.dayData.name}}</div>
                    </li>
                    <grid-list
                    v-for="(item, index) in obj.data"
                    :item="item"
                    :index="index"
                    @click="onListClick(item)"
                    :key="item.id"></grid-list>
                </ul>
            </div>
        </div> -->
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
// import { useRouter } from 'vue-router'
import homeTempTab1 from '@/views/components/homeTemp/temp1'
import homeTempTab2 from '@/views/components/homeTemp/temp2'
import homeTempTab3 from '@/views/components/homeTemp/temp3'
// import homeTempTab4 from '@/views/components/homeTemp/temp4'
// import homeTempTab5 from '@/views/components/homeTemp/temp5'
export default {
    name: 'home',
    components: {
        // Swiper,
        // SwiperSlide,
        homeTempTab1,
        homeTempTab2,
        homeTempTab3
        // homeTempTab4,
        // homeTempTab5
    },
    // directives: {
    //     swiper: directive
    // },
    setup () {
        const state = reactive({
            activeTab: 'home',
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
            ]
        })
        // 点击tab切换数据
        const onTabClick = (item) => {
            state.activeTab = item.type
            // getData(item.type)
        }
        return {
            ...toRefs(state),
            onTabClick
        }
    }
}
</script>

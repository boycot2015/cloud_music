import { home } from '@/api/apiList'
import { filterPlayCount, store } from '@/utils'
export default {
    namespaced: true,
    state: {
        banner: [],
        personalized: [], // 推荐歌单列表
        privatecontent: [], // 独家放送列表
        topSong: [], // 新歌速递列表
        mv: [], // 推荐 mv
        djprogram: [], // 最热主播榜
        djrecommend: [] // 最热主播榜
    },
    mutations: {
        async getData (state, params) {
            const localData = store.get('homeData')
            if (localData !== null) {
                for (const key in localData) {
                    state[key] = localData[key]
                }
                console.log(state, 'localData')
                return Promise.resolve({ code: 200, success: true })
            }
            const bannerRes = await home.banner(params)
            const personalizedRes = await home.personalized(params)
            const privatecontentRes = await home.privatecontent(params)
            const topSongRes = await home.topSong(params)
            const mvRes = await home.mv(params)
            const djrecommendRes = await home.djrecommend(params)
            state.banner = bannerRes && bannerRes.banners
            state.personalized = (personalizedRes && personalizedRes.result.slice(0, 9)) || []
            state.personalized.map(el => {
                el.playCount = filterPlayCount(el.playCount)
            })
            state.privatecontent = (privatecontentRes && privatecontentRes.result) || []
            let res = (topSongRes && topSongRes.data) || []
            res = topSongRes.data.slice(0, 10)
            res = [{
                ftype: 0,
                list: res.slice(0, 5)
            }, {
                ftype: 0,
                list: res.slice(5, 10)
            }]
            state.topSong = res
            state.mv = (mvRes && mvRes.result.slice(0, 3)) || {}
            state.djrecommend = (djrecommendRes && djrecommendRes.djRadios.slice(0, 5)) || []
            // console.log(state.djrecommend, 'value')
            store.set('homeData', { ...state }, new Date().getTime() + 60 * 1000)
            return Promise.resolve({ code: 200, success: true })
        }
    },
    actions: {
    }
}

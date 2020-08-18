import { home } from '@/api/apiList'
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
            const bannerRes = await home.banner(params)
            const personalizedRes = await home.personalized(params)
            const privatecontentRes = await home.privatecontent(params)
            const topSongRes = await home.topSong(params)
            const mvRes = await home.mv(params)
            state.banner = bannerRes.banners
            state.personalized = personalizedRes.result
            state.privatecontent = privatecontentRes.result
            state.topSong = topSongRes.data
            state.mv = mvRes.result
            return Promise.resolve({ code: 200, success: true })
        }
    },
    actions: {
    }
}

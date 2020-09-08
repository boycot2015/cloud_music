import { home, artist, video } from '@/api/apiList'
import { filterPlayCount, store } from '@/utils'
export default {
    namespaced: true,
    state: {
        tab1Data: {
            all: {},
            categories: [], // 分类
            tags: [], // 分类
            subs: [], // 分类
            list: []
        },
        tab2Data: {
            banner: [],
            personalized: [], // 推荐歌单列表
            privatecontent: [], // 独家放送列表
            topSong: [], // 新歌速递列表
            mv: [], // 推荐 mv
            djprogram: [], // 最热主播榜
            djrecommend: [] // 最热主播榜
        }
    },
    mutations: {
        setTab1Data (state, data) {
            for (const key in data) {
                state.tab1Data[key] = data[key]
            }
            store.set('homeTab1Data', { ...data }, new Date().getTime() + 300 * 1000)
        },
        setTab2Data (state, data) {
            for (const key in data) {
                state.tab2Data[key] = data[key]
            }
            store.set('homeTab2Data', { ...data }, new Date().getTime() + 300 * 1000)
        },
        updateTab1Data (state, list) {
            state.tab2Data.list = list
            const localData = store.get('homeTab1Data')
            store.set('homeTab1Data', { ...localData, list }, new Date().getTime() + 300 * 1000)
        }
    },
    actions: {
        async getTab1Data ({ commit }, params) {
            const localData = store.get('homeTab1Data')
            const data = {}
            if (localData !== null) {
                commit('setTab1Data', localData)
                return Promise.resolve({ code: 200, success: true })
            }
            const catlistRes = await video.groupList(params)
            const recommendRes = await video.recommend(params)
            if (catlistRes && catlistRes.code === 200) {
                const subs = []
                const categories = {
                    0: '全部视频'
                }
                for (const key in categories) {
                    subs[key] = []
                    catlistRes.data.map(el => {
                        subs[key].push(el)
                    })
                }
                data.subs = subs
                data.categories = categories
            }
            if (recommendRes && recommendRes.code === 200) {
                data.list = recommendRes.data
            }
            commit('setTab1Data', data)
            return Promise.resolve({ code: 200, success: true })
        },
        async getTab2Data ({ commit }, params) {
            const localData = store.get('homeTab2Data')
            const data = {}
            if (localData !== null) {
                commit('setTab2Data', localData)
                return Promise.resolve({ code: 200, success: true })
            }
            const bannerRes = await home.banner(params)
            const personalizedRes = await home.personalized(params)
            const privatecontentRes = await home.privatecontent(params)
            const topSongRes = await home.topSong(params)
            const mvRes = await home.mv(params)
            const djprogramRes = await home.djprogram(params)
            data.banner = bannerRes && bannerRes.banners
            data.personalized = (personalizedRes && personalizedRes.result.slice(0, 9)) || []
            data.personalized.map(el => {
                el.playCount = filterPlayCount(el.playCount)
            })
            data.privatecontent = (privatecontentRes && privatecontentRes.result) || []
            let res = (topSongRes && topSongRes.data) || []
            res = topSongRes.data.slice(0, 10)
            res = [{
                ftype: 0,
                list: res.slice(0, 5)
            }, {
                ftype: 0,
                list: res.slice(5, 10)
            }]
            data.topSong = res
            data.mv = (mvRes && mvRes.result.slice(0, 3)) || {}
            data.djrecommend = (djprogramRes && djprogramRes.result.slice(0, 5)) || []
            console.log(djprogramRes, 'value')
            commit('setTab2Data', data)
            return Promise.resolve({ code: 200, success: true })
        },
        // 根据分类标签获取列表数据
        getSingerByParams ({ commit }, { offset = 1, limit = 39, ...ohters }) {
            return new Promise((resolve, reject) => {
                artist.list({
                    limit,
                    offset,
                    ...ohters
                }).then(res => {
                    const data = {}
                    if (res && res.code === 200) {
                        data.topList = res.artists
                        commit('setTab5Data', data)
                        resolve({ code: 200, success: true })
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 根据分类标签获取列表数据
        getListByCate ({ commit }, { offset, id }) {
            return new Promise((resolve, reject) => {
                let api = 'group'
                if (!id) {
                    api = 'recommend'
                }
                video[api]({ limit: 39, order: 'hot', id, offset }).then(res => {
                    if (res && res.code === 200) {
                        res.playlists.map(el => {
                            el.playCount = filterPlayCount(el.playCount)
                        })
                        commit('updateTab1Data', res.playlists)
                        resolve(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

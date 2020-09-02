import { home, song, toplist, artist } from '@/api/apiList'
import { filterPlayCount, store } from '@/utils'
export default {
    namespaced: true,
    state: {
        tab1Data: {
            banner: [],
            personalized: [], // 推荐歌单列表
            privatecontent: [], // 独家放送列表
            topSong: [], // 新歌速递列表
            mv: [], // 推荐 mv
            djprogram: [], // 最热主播榜
            djrecommend: [] // 最热主播榜
        },
        tab2Data: {
            all: {},
            categories: [], // 分类
            tags: [], // 分类
            subs: [], // 分类
            list: []
        },
        tab3Data: {
            banner: [],
            personalized: [], // 推荐歌单列表
            privatecontent: [], // 独家放送列表
            topSong: [], // 新歌速递列表
            mv: [], // 推荐 mv
            djprogram: [], // 最热主播榜
            djrecommend: [], // 最热主播榜
            dj3D: [], // 3d电子
            djRap: [] // 创作|翻唱
        },
        tab4Data: {
            topList: [], // 官方榜单
            globalTopList: [] // 全球榜单
        },
        tab5Data: {
            categories: [], // 歌手分类
            topList: [] // 歌手排行列表
        }
    },
    mutations: {
        setTab1Data (state, data) {
            for (const key in data) {
                state.tab1Data[key] = data[key]
            }
            store.set('homeTab1Data', { ...data }, new Date().getTime() + 60 * 1000)
        },
        setTab2Data (state, data) {
            for (const key in data) {
                state.tab2Data[key] = data[key]
            }
            store.set('homeTab2Data', { ...data }, new Date().getTime() + 60 * 1000)
        },
        setTab3Data (state, data) {
            for (const key in data) {
                state.tab3Data[key] = data[key]
            }
            store.set('homeTab3Data', { ...data }, new Date().getTime() + 60 * 1000)
        },
        setTab4Data (state, data) {
            for (const key in data) {
                state.tab4Data[key] = data[key]
            }
            store.set('homeTab4Data', { ...data }, new Date().getTime() + 60 * 1000)
        },
        setTab5Data (state, data) {
            for (const key in data) {
                state.tab5Data[key] = data[key]
            }
            store.set('homeTab5Data', { ...data }, new Date().getTime() + 60 * 1000)
        },
        updateTab2Data (state, list) {
            state.tab2Data.list = list
            const localData = store.get('homeTab2Data')
            store.set('homeTab2Data', { ...localData, list }, new Date().getTime() + 60 * 1000)
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
            const catlistRes = await song.catlist(params)
            const hotCateRes = await song.hotCate(params)
            if (catlistRes && catlistRes.code === 200) {
                const subs = []
                const { sub, all, categories } = catlistRes
                for (const key in categories) {
                    subs[key] = []
                    sub.map(el => {
                        if (el.category === Number(key)) {
                            subs[key].push(el)
                        }
                    })
                }
                data.subs = subs
                data.all = all
                data.categories = categories
            }
            if (hotCateRes && hotCateRes.code === 200) {
                data.tags = hotCateRes.tags
            }
            commit('setTab2Data', data)
            return Promise.resolve({ code: 200, success: true })
        },
        async getTab3Data ({ commit }, params) {
            const localData = store.get('homeTab3Data')
            const data = {}
            if (localData !== null) {
                commit('setTab3Data', localData)
                return Promise.resolve({ code: 200, success: true })
            }
            const bannerRes = await home.djBanner(params)
            const djCatelistRes = await home.djCatelist(params)
            const djPaygiftRes = await home.djPaygift(params)
            const djrecommendRes = await home.djrecommend(params)
            const djRapRes = await home.hotRadio({ cateId: 2001 })
            const dj3DRes = await home.hotRadio({ cateId: 10002 })
            data.banner = bannerRes && bannerRes.data
            data.djrecommend = (djrecommendRes && djrecommendRes.djRadios.slice(0, 5)) || []
            data.djRap = (djRapRes && djRapRes.djRadios.slice(0, 5)) || []
            data.dj3D = (dj3DRes && dj3DRes.djRadios.slice(0, 5)) || []
            data.categories = djCatelistRes.categories
            data.djCatelist = djCatelistRes.djCatelist
            data.djPaygift = djPaygiftRes.data.list.slice(0, 4)
            console.log(dj3DRes, djRapRes, 'value')
            commit('setTab3Data', data)
            return Promise.resolve({ code: 200, success: true })
        },
        async getTab4Data ({ commit }, params) {
            const localData = store.get('homeTab4Data')
            const data = {}
            if (localData !== null) {
                commit('setTab4Data', localData)
                return Promise.resolve({ code: 200, success: true })
            }
            const res = await toplist.toplist()
            if (res && res.code === 200) {
                const topList = res.list.slice(0, 4)

                data.globalTopList = res.list.slice(4, res.list.length)
                data.globalTopList.map(el => {
                    el.playCount = filterPlayCount(el.playCount)
                })
                data.topList = []
                const listRes = await Promise.all([
                    song.playlist({ id: topList[0].id }),
                    song.playlist({ id: topList[1].id }),
                    song.playlist({ id: topList[2].id }),
                    song.playlist({ id: topList[3].id })
                ])
                listRes.map((el, i) => {
                    data.topList[i] = el.playlist
                })
                const hotRes = await toplist.artist()
                const hotTopList = res.artistToplist
                hotTopList.ToplistType = 'singer'
                if (hotRes && hotRes.code === 200 && data.topList.length === 4) {
                    hotTopList.tracks = hotRes.list.artists.slice(0, 8)
                    data.topList.push(hotTopList)
                    commit('setTab4Data', data)
                }
                return Promise.resolve({ code: 200, success: true })
            }
        },
        async getTab5Data ({ commit },
            { offset = 1, limit = 39, type = -1, initial = -1, area = -1, refresh = false }) {
            const localData = store.get('homeTab5Data')
            if (localData !== null && offset === 1 && !refresh) {
                commit('setTab5Data', localData)
                return Promise.resolve({ code: 200, success: true })
            }
            const data = {}
            const res = await artist.list({ offset, limit, type, initial, area })
            if (res && res.code === 200) {
                data.topList = res.artists
                commit('setTab5Data', data)
                return Promise.resolve({ code: 200, success: true })
            }
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
        getListByCate ({ commit }, { offset, cat }) {
            return new Promise((resolve, reject) => {
                song.topPlaylist({ limit: 39, order: 'hot', cat, offset }).then(res => {
                    if (res && res.code === 200) {
                        res.playlists.map(el => {
                            el.playCount = filterPlayCount(el.playCount)
                        })
                        commit('updateTab2Data', res.playlists)
                        resolve(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

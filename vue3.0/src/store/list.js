import { song, dj, search } from '@/api/apiList'
import { filterDruationTime, filterPlayCount } from '@/utils'
export default {
    namespaced: true,
    state: {
        playlistData: {},
        tracks: [],
        playUrl: '',
        searchData: []
    },
    mutations: {
        async getTracksByIds (state, ids) {
            const detailRes = await song.detail({ ids })
            if (detailRes && detailRes.code === 200) {
                state.tracks = detailRes.songs
            } else {
                state.tracks = []
            }
        },
        async getPlayUrl (state, params) {
            const playUrlRes = await song.playUrl(params)
            state.playUrl = playUrlRes.data
        },
        async getUsers (state, params) {

        },
        setData (state, { playlist, searchData }) {
            playlist && (state.playlistData = playlist)
            playlist && (state.tracks = playlist.tracks)
            searchData && (state.searchData = searchData)
            // console.log(state, 'state')
        }
    },
    actions: {
        async getData ({ commit, dispatch }, params) {
            let playlistRes = ''
            let djDetailRes = ''
            params.type && (params.type = parseInt(params.type))
            if (params.isDaily) {
                playlistRes = await song.recommend(params)
            } else if (params.type === 3) {
                playlistRes = await dj.djprogramList({ ...params, rid: params.id })
                djDetailRes = await dj.djDetail({ ...params, rid: params.id })
            } else if (params.keywords) {
                playlistRes = await search.search(params)
            } else {
                playlistRes = await song.playlist(params)
            }
            if (playlistRes && playlistRes.code === 200) {
                let ids = []
                const playlist = playlistRes.playlist || playlistRes.data || djDetailRes.djRadio || {}
                if (!params.isDaily && params.type === 1 && !params.keywords) {
                    playlist.trackIds.forEach(function (item) {
                        ids.push(item.id)
                    })
                    ids = ids.join(',')
                    const detailRes = await song.detail({ ids })
                    const state = {}
                    if (detailRes && detailRes.code === 200) {
                        state.tracks = detailRes.songs
                    } else {
                        state.tracks = []
                    }
                    playlist.tracks = state.tracks
                    playlist.playCount = filterPlayCount(playlist.playCount)
                } else if (params.type === 3) {
                    playlist.tracks = playlistRes.programs
                    playlist.more = playlistRes.more
                    playlist.count = playlistRes.count
                } else if (params.keywords) {
                    if (params.type === 1018) {
                        const arr = []
                        const order = playlistRes.result.order
                        order.map(key => {
                            const obj = {}
                            const moreText = playlistRes.result[key].moreText
                            obj.data = playlistRes.result[key]
                            if (moreText) {
                                if (moreText.includes('个')) {
                                    obj.title = moreText.split('个')[1]
                                    obj.count = moreText.split('个')[0].slice(4)
                                } else if (moreText.includes('首')) {
                                    obj.title = moreText.split('首')[1]
                                    obj.count = moreText.split('首')[0].slice(4)
                                }
                                arr.push(obj)
                            }
                            commit('setData', { searchData: arr })
                            return Promise.resolve({ code: 200, success: true })
                        })
                        // console.log(arr, 'arr')
                        dispatch('getData', { ...params, type: 1 })
                        return Promise.resolve({ code: 200, success: true })
                    }
                    const result = playlistRes.result
                    playlist.tracks = result.songs ||
                        result.playlists || result.mvs ||
                        result.videos || result.albums ||
                        result.userprofiles || result.artists || []

                    playlist.count = result.songCount ||
                        result.playlistCount || result.mvCount ||
                        result.videoCount || result.albumCount ||
                        result.userprofileCount || result.artistCount || 0
                    playlist.more = result.hasMore
                } else {
                    playlist.tracks = playlist.dailySongs
                }
                // console.log(playlistRes, 'playlistRes')
                playlist.tracks && playlist.tracks.map(el => {
                    el.dt && (el.dt = filterDruationTime(el.dt))
                    el.duration && (el.dt = filterDruationTime(el.duration))
                    el.createTime && (el.createTime = new Date(el.createTime).toLocaleDateString())
                })
                // state.playlistData = playlist
                commit('setData', { playlist })
                // console.log(state.playlistData, 'state.playlistData')
                return Promise.resolve({ code: 200, success: true })
            } else {
                return Promise.reject(playlistRes)
            }
        },
        async getTracksByIds (state, ids) {
            const detailRes = await song.detail({ ids })
            if (detailRes && detailRes.code === 200) {
                state.tracks = detailRes.songs
            } else {
                state.tracks = []
            }
        },
        async getPlayUrl (state, params) {
            const playUrlRes = await song.playUrl(params)
            state.playUrl = playUrlRes.data
        },
        async getUsers (state, params) {

        }
    }
}

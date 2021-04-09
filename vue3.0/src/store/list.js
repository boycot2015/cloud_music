import { song, dj, search, user } from '@/api/apiList'
import { filterDruationTime, filterPlayCount, store } from '@/utils'
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
        setData (state, { playlist, searchData, myfavorite }) {
            playlist && (state.playlistData = playlist)
            playlist && (state.tracks = playlist.tracks)
            searchData && (state.searchData = searchData)
            // console.log(state, 'state')
            myfavorite && store.set('playlist', { playlist }, new Date().getTime() + 3000 * 1000)
        }
    },
    actions: {
        async getData ({ commit, dispatch }, params) {
            const localData = store.get('playlist')
            if (localData !== null && params.myfavorite) {
                commit('setData', localData)
                return Promise.resolve({ code: 200, success: true })
            }
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
                if (params.myfavorite) {
                    params.myfavorite && (playlistRes = {})
                } else {
                    playlistRes = await song.playlist(params)
                }
            }
            if ((playlistRes && playlistRes.code === 200) || params.myfavorite) {
                let ids = []
                const playlist = playlistRes.playlist || playlistRes.data || djDetailRes.djRadio || {}
                if ((!params.isDaily && params.type === 1 && !params.keywords) || params.myfavorite) {
                    if (params.myfavorite) {
                        const likelist = await user.likelist()
                        ids = likelist.ids
                    } else {
                        playlist.trackIds.forEach(function (item) {
                            ids.push(item.id)
                        })
                    }
                    ids = ids.join(',')
                    const detailRes = await song.detail({ ids })
                    const state = {}
                    if (detailRes && detailRes.code === 200) {
                        state.tracks = detailRes.songs
                    } else {
                        state.tracks = []
                    }
                    if (params.myfavorite) {
                        playlist.coverImgUrl = state.tracks[0].al.picUrl
                        playlist.name = '我喜欢的音乐'
                        playlist.creator = store.get('userInfo').profile
                        playlist.cloudTrackCount = state.tracks.length
                        playlist.shareCount = state.tracks.length
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
                commit('setData', { playlist, myfavorite: params.myfavorite })
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

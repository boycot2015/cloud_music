import { song, dj } from '@/api/apiList'
import { filterDruationTime, filterPlayCount } from '@/utils'
export default {
    namespaced: true,
    state: {
        playlistData: {},
        tracks: [],
        playUrl: ''
    },
    mutations: {
        async getData (state, params) {
            let playlistRes = ''
            let djDetailRes = ''
            params.type = parseInt(params.type)
            if (params.isDaily) {
                playlistRes = await song.recommend(params)
            } else if (params.type === 3) {
                playlistRes = await dj.djprogramList({ ...params, rid: params.id })
                djDetailRes = await dj.djDetail({ ...params, rid: params.id })
            } else {
                playlistRes = await song.playlist(params)
            }
            if (playlistRes && playlistRes.code === 200) {
                let ids = []
                const playlist = playlistRes.playlist || playlistRes.data || djDetailRes.djRadio
                if (!params.isDaily && !params.type) {
                    playlist.trackIds.forEach(function (item) {
                        ids.push(item.id)
                    })
                    ids = ids.join(',')
                    const detailRes = await song.detail({ ids })
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
                    console.log(playlist, 'playlistRes')
                } else {
                    state.tracks = playlist.dailySongs
                    playlist.tracks = playlist.dailySongs
                }
                playlist.tracks.map(el => {
                    el.dt && (el.dt = filterDruationTime(el.dt))
                    el.duration && (el.dt = filterDruationTime(el.duration))
                })
                state.playlistData = playlist
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
        }
    },
    actions: {
    }
}

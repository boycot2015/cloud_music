import { song } from '@/api/apiList'
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
            const playlistRes = await song.playlist(params)
            if (playlistRes && playlistRes.code === 200) {
                let ids = []
                playlistRes.playlist.trackIds.forEach(function (item) {
                    ids.push(item.id)
                })
                ids = ids.join(',')
                const detailRes = await song.detail({ ids })
                if (detailRes && detailRes.code === 200) {
                    state.tracks = detailRes.songs
                } else {
                    state.tracks = []
                }
                playlistRes.playlist.tracks = state.tracks
                playlistRes.playlist.tracks.map(el => {
                    el.dt = filterDruationTime(el.dt)
                })
                playlistRes.playlist.playCount = filterPlayCount(playlistRes.playlist.playCount)
                state.playlistData = playlistRes.playlist
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

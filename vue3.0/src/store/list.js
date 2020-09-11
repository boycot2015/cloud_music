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
            let playlistRes = ''
            if (params.isDaily) {
                playlistRes = await song.recommend(params)
            } else {
                playlistRes = await song.playlist(params)
            }
            if (playlistRes && playlistRes.code === 200) {
                let ids = []
                const playlist = playlistRes.playlist || playlistRes.data
                if (!params.isDaily) {
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
                    playlist.tracks.map(el => {
                        el.dt = filterDruationTime(el.dt)
                    })
                    playlist.playCount = filterPlayCount(playlist.playCount)
                } else {
                    state.tracks = playlist.dailySongs
                    playlist.tracks = playlist.dailySongs
                }
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

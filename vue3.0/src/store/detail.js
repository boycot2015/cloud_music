import { song, comment, simi } from '@/api/apiList'
import { filterTime } from '@/utils'
export default {
    namespaced: true,
    state: {
        lyricList: [],
        data: {
            total: 0,
            playLists: [],
            songs: [],
            hotComments: [], // 精彩评论
            comments: [] // 所有评论
        }
    },
    mutations: {
        async getData (state, params) {
            const lyricRes = await song.lyric(params)
            // const playlistRes = await song.playlist(params)
            const newArr = []
            if (lyricRes.code === 200 && lyricRes.lrc) {
                const tempArr = lyricRes.lrc.lyric.split('\n')
                tempArr.map((el, i) => {
                    const obj = {}
                    el = (el && el.split(']')) || ''
                    if (i > 0 && el && !el[1].includes('[')) {
                        obj.time = el[0].split('[')[1]
                        obj.text = el[1]
                        newArr.push(obj)
                    }
                })
                state.lyricList = newArr
                const commentRes = await comment.music(params)
                if (commentRes.code === 200) {
                    commentRes.hotComments.map(el => {
                        el.time = filterTime(el.time)
                    })
                    commentRes.comments.map(el => {
                        el.time = filterTime(el.time)
                    })
                    state.data.total = commentRes.total
                    state.data.hotComments = commentRes.hotComments
                    state.data.comments = commentRes.comments
                }
                const playListRes = await simi.playlist(params)
                if (playListRes && playListRes.code === 200) {
                    state.data.playLists = playListRes.playlists
                }
                const songRes = await simi.song(params)
                if (songRes && songRes.code === 200) {
                    state.data.songs = songRes.songs
                }
                console.log(playListRes, songRes)
                return Promise.resolve({ code: 200, success: true })
            } else {
                return Promise.reject(lyricRes)
            }
        }
    },
    actions: {
    }
}

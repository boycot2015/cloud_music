import { song, comment, simi } from '@/api/apiList'
import { filterTime, store } from '@/utils'
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
        },
        currLyric: {
            time: '00:01',
            text: (store.get('playData') !== null && store.get('playData').name) || '纯音乐，请欣赏~'
        }
    },
    mutations: {
        setData (state, data) {
            for (const key in data) {
                state[key] = data[key]
            }
            store.set('detailData', data)
        },
        setCurrentLyric (state, curStr) {
            let currLyric = ''
            state.lyricList.map(el => {
                if (el.time === curStr) {
                    currLyric = el
                }
            })
            // 首次播放存第一行
            if (!currLyric && store.get('currLyric') === null) {
                currLyric = state.playData.name
            }
            currLyric && (state.currLyric = currLyric)
            currLyric && store.set('currLyric', currLyric)
        }
    },
    actions: {
        async getData ({ commit }, params) {
            const lyricRes = await song.lyric(params)
            // const playlistRes = await song.playlist(params)
            const state = {
                lyricList: [],
                data: {}
            }
            const newArr = []
            if (lyricRes.code === 200 && !lyricRes.nolyric && lyricRes.lrc && lyricRes.lrc.lyric) {
                const tempArr = lyricRes.lrc.lyric.split('\n')
                tempArr.map((el, i) => {
                    const obj = {}
                    el = (el && el.split(']')) || ''
                    if (i > 0 && el && el[1] && !el[1].includes('[')) {
                        let timeStr = el[0].split('[')[1]
                        timeStr = timeStr.split(':')
                        timeStr[1] = Math.round(timeStr[1]) + ''
                        timeStr[1] = timeStr[1] < 10 ? '0' + timeStr[1] : timeStr[1]
                        timeStr = timeStr.join(':')
                        obj.time = timeStr
                        obj.text = el[1]
                        obj.text && newArr.push(obj)
                    }
                })
                state.lyricList = newArr
            }
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
            commit('setData', state)
            commit('setCurrentLyric', state.data.playLists[0])
            return Promise.resolve({ code: 200, success: true })
        }
    }
}

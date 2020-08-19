import { song, comment } from '@/api/apiList'
import { filterTime } from '@/utils'
export default {
    namespaced: true,
    state: {
        lyricList: [],
        data: {
            total: 0,
            hotComments: [], // 精彩评论
            comments: [] // 所有评论
        },
        playData: {
            src: '',
            name: '至尊宝',
            singer: '徐良/杨威',
            coverImg: '/dist/images/avatar.jpg',
            volume: 0.1,
            loop: false,
            ended: false,
            muted: false,
            currentTime: 0,
            duration: 0
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
                    if (i > 0 && el) {
                        el = el.split(']')
                        obj.time = el[0].split('[')[1]
                        obj.text = el[1]
                        newArr.push(obj)
                    }
                })
                state.lyricList = tempArr
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
                return Promise.resolve({ code: 200, success: true })
            } else {
                return Promise.reject(lyricRes)
            }
        }
    },
    actions: {
    }
}

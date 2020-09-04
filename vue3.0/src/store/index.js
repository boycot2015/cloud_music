import { createStore } from 'vuex'
import router from '@/router'
import home from './home'
import list from './list'
import detail from './detail'
import { song } from '@/api/apiList'
// filterDruationTime
import {
    store
    // db
} from '@/utils'
export default createStore({
    state: {
        metaTitle: '网易云音乐',
        menu: router.options.routes.filter(_ => !_.meta.hideInMenu),
        playData: (store.get('playData') !== null && store.get('playData')) || {
            lyrc: '一诺千金到尽头',
            name: '菩提偈',
            singer: '刘惜君',
            picUrl: require('@/assets/images/avatar.jpg'),
            startTime: '00:00',
            endTime: '00:00',
            type: '标准',
            isHot: 'new',
            lyrcTxt: '词',
            ended: false,
            muted: false,
            curStr: '00:00',
            endStr: '00:00',
            duration: 0,
            volume: 0.2,
            currentTime: '00:00',
            url: '',
            paused: true
        },
        playList: (store.get('playList') !== null && store.get('playList')) || [],
        showMenu: true,
        isExtend: false
    },
    mutations: {
        setTitle (state, title) {
            state.metaTitle = title
            document.title = title
        },
        async setPlayData (state, data) {
            for (const key in data) {
                state.playData[key] = data[key]
            }
            store.set('playData', state.playData)
        },
        setAudio (state, data) {
            store.set('playData', { ...state.playData, ...data })
        },
        showMenu (state, showMenu) {
            state.showMenu = showMenu
        },
        setPlayList (state, playList) {
            state.playList = playList
            store.set('playList', playList)
        },
        setExtend (state, isExtend) {
            state.isExtend = isExtend
        }
    },
    actions: {
        setPlayData ({ commit }, data) {
            return new Promise((resolve, reject) => {
                song.playUrl({ id: data.id }).then(urlData => {
                    const playData = store.get('playData') !== null ? store.get('playData') : {}
                    data.al = data.al || data.album
                    data.ar = data.ar || data.artists
                    playData.name = data.al.name
                    playData.singer = ''
                    data.ar.map(el => {
                        playData.singer += el.name + '/'
                    })
                    playData.singer = playData.singer.slice(0, -1)
                    playData.picUrl = data.al.picUrl
                    playData.playIndex = data.playIndex
                    if (urlData.code === 200) {
                        urlData = urlData.data[0]
                        playData.endStr = data.dt
                        playData.duration = urlData.size
                        playData.alName = data.al.name
                        playData.paused = false
                        for (const key in urlData) {
                            playData[key] = urlData[key]
                        }
                        commit('setPlayData', playData)
                        if (urlData.url === null) {
                            resolve({ code: 0 })
                            return
                        }
                        resolve({ code: 200 })
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setPlayList ({ commit }, data) {
            commit('setPlayList', data)
        }
    },
    modules: {
        home,
        list,
        detail
    }
})

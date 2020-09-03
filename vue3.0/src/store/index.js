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
        showMenu: true
    },
    mutations: {
        setTitle (state, title) {
            state.metaTitle = title
            document.title = title
        },
        async setPlayData (state, data) {
            state.playData = { ...state.playData, ...data }
            store.set('playData', state.playData)
        },
        setAudio (state, data) {
            store.set('playData', { ...state.playData, ...data })
        },
        showMenu (state, showMenu) {
            state.showMenu = showMenu
        }
    },
    actions: {
        setPlayData ({ commit }, data) {
            return new Promise((resolve, reject) => {
                song.playUrl({ id: data.id }).then(urlData => {
                    let playData = store.get('playData') !== null ? store.get('playData') : {}
                    data.al = data.al || data.album
                    data.ar = data.ar || data.artists
                    playData.name = data.al.name
                    playData.singer = ''
                    data.ar.map(el => {
                        playData.singer += el.name + '/'
                    })
                    playData.singer = playData.singer.slice(0, -1)
                    playData.picUrl = data.al.picUrl
                    playData.endStr = data.dt
                    for (const key in urlData) {
                        playData[key] = urlData[key]
                    }
                    playData.duration = urlData.size
                    playData.alName = data.al.name
                    playData.paused = false
                    playData.url = urlData.url
                    playData = { ...playData, ...urlData.data[0] }
                    commit('setPlayData', playData)
                    resolve(playData)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    modules: {
        home,
        list,
        detail
    }
})

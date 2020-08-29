import { createStore } from 'vuex'
import router from '@/router'
import home from './home'
import list from './list'
import detail from './detail'
import { song } from '@/api/apiList'
// filterDruationTime
import { store } from '@/utils'

export default createStore({
    state: {
        metaTitle: '网易云音乐',
        menu: router.options.routes.filter(_ => !_.meta.hideInMenu),
        playData: (store.get('playData') !== null && store.get('playData')) || {
            lyrc: '一诺千金到尽头',
            name: '菩提偈',
            singer: '刘惜君',
            picUrl: require('@/assets/images/avatar.jpg')
        },
        showMenu: true
    },
    mutations: {
        setTitle (state, title) {
            state.metaTitle = title
            document.title = title
        },
        setPlayData (state, data) {
            state.playData = data
            store.set('playData', data)
        },
        showMenu (state, showMenu) {
            state.showMenu = showMenu
        }
    },
    actions: {
        setPlayData ({ commit }, data) {
            return new Promise((resolve, reject) => {
                song.playUrl({ id: data.id }).then(urlData => {
                    let playData = {
                        ended: false,
                        id: data.id,
                        level: 'exhigh',
                        loop: false,
                        muted: false,
                        volume: 0.3
                    }
                    console.log(data, 'datadatadata')
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
                    playData.duration = urlData.size
                    playData.alName = data.al.name
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

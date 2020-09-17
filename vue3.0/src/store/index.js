import { createStore } from 'vuex'
import router from '@/router'
import home from './home'
import list from './list'
import detail from './detail'
import videoStore from './video'
import user from './user'
import { song } from '@/api/apiList'
// filterDruationTime
import {
    store
    // db
} from '@/utils'
const getMenu = () => {
    const routes = router.options.routes
    routes.map(el => {
        el.children && (el.children = el.children.filter(val => !val.meta.hideInMenu))
    })
    return routes.filter(_ => !_.meta.hideInMenu)
}
export default createStore({
    state: {
        metaTitle: '网易云音乐',
        menu: getMenu(),
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
            playIndex: 0,
            playListId: 0, // 播放列表id用于详情返回
            paused: true
        },
        playList: (store.get('playList') !== null && store.get('playList')) || [],
        showMenu: true,
        isExtend: false
    },
    mutations: {
        setTitle (state, title) {
            state.metaTitle = title
        },
        setPlayData (state, data) {
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
                    console.log(data, 'data')
                    const playData = store.get('playData') !== null ? store.get('playData') : {}
                    data.al = data.al || data.album
                    data.ar = data.ar || data.artists
                    playData.name = data.name || (data.al && data.al.name) || ''
                    playData.picUrl = (data.al && data.al.picUrl) || ''
                    playData.singer = ''
                    data.ar && data.ar.map(el => {
                        playData.singer += el.name + '/'
                    })
                    playData.singer = playData.singer.slice(0, -1)
                    playData.playIndex = data.playIndex
                    data.playListId && (playData.playListId = data.playListId)
                    if (urlData.code === 200) {
                        urlData = urlData.data[0]
                        playData.endStr = data.dt
                        playData.duration = urlData.size
                        playData.alName = playData.name
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
        },
        toggleAudioPlay ({ commit }, { audio, state }) {
            if (!state.playData.url) return
            state.playData.paused = !state.playData.paused
            audio.paused && state.playData.url ? audio.play() : audio.pause()
            audio.volume = state.playData.volume || 0.2
            commit('setPlayData', { paused: state.playData.paused })
        },
        toggleAudioMouted ({ commit }, { audio, state }) {
            state.playData.muted = !state.playData.muted
            audio.muted = state.playData.muted
            // console.log(audio.muted, state.progressPsition, 'setVolume')
            commit('setPlayData', { muted: state.playData.muted })
        },
        playPrev ({ commit, dispatch }, state) {
            dispatch('setPlayData', { ...state.playList.data[state.playIndex], playIndex: state.playIndex })
            if (router.currentRoute.value.path === '/songs/detail') {
                router.push({
                    path: '/songs/detail',
                    query: {
                        id: state.playList.data[state.playIndex].id
                    }
                })
                dispatch('detail/getsongData', state.playList.data[state.playIndex])
            }
        },
        playNext ({ commit, dispatch }, state) {
            dispatch('setPlayData', { ...state.playList.data[state.playIndex], playIndex: state.playIndex })
            if (router.currentRoute.value.path === '/songs/detail') {
                router.push({
                    path: '/songs/detail',
                    query: {
                        id: state.playList.data[state.playIndex].id
                    }
                })
                dispatch('detail/getsongData', state.playList.data[state.playIndex])
            }
        }
    },
    modules: {
        home,
        list,
        detail,
        video: videoStore,
        user
    }
})

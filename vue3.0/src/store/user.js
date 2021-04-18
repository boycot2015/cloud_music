import { user } from '@/api/apiList'
import { store } from '@/utils'
import Cookies from 'js-cookie'
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
        },
        cookie: Cookies.get('cookie') || '',
        userInfo: (store.get('userInfo') !== null && store.get('userInfo')) || {
            account: {},
            profile: {},
            bindings: {},
            isSign: (store.get('userInfo') !== null && store.get('userInfo').isSign) || false // 是否签到
        }
    },
    mutations: {
        setData (state, data) {
            for (const key in data) {
                state.userInfo[key] = data[key]
            }
            store.set('userInfo', data)
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
                currLyric = {
                    time: '00:01',
                    text: (store.get('playData') !== null && store.get('playData').name) || ''
                }
            }
            currLyric && (state.currLyric = currLyric)
            currLyric && store.set('currLyric', currLyric)
        },
        setCookie (state, data) {
            state.cookie = data
            Cookies.set('cookie', data)
        },
        removeToken (state, data) {
            state.cookie = ''
            state.userInfo = {}
            Cookies.remove('cookie')
            store.remove('userInfo')
        },
        setSign (state, data) {
            state.userInfo.isSign = data
            store.set('userInfo', state.userInfo)
        }
    },
    actions: {
        async loginByPhone ({ commit }, params) {
            return new Promise((resolve, reject) => {
                user.cellphone(params).then(res => {
                    if (res.code === 200) {
                        const { account, profile, bindings } = res
                        commit('setCookie', res.cookie)
                        commit('setData', { account, profile, bindings })
                        resolve(res)
                    } else {
                        reject(res)
                    }
                }).catch(err => reject(err))
            })
        },
        getUserInfo ({ commit }, params) {
            return new Promise((resolve, reject) => {
                user.detail(params).then(res => {
                    if (res.code === 200) {
                        const { account, profile, bindings, pcSign } = res
                        commit('setData', { account, profile, bindings })
                        commit('setSign', pcSign)
                        resolve(res)
                    } else {
                        reject(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout ({ commit }, params) {
            return new Promise((resolve, reject) => {
                user.logout().then(res => {
                    if (res.code === 200) {
                        commit('removeToken')
                        resolve(res)
                    } else {
                        reject(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        sign ({ commit }, params) {
            return new Promise((resolve, reject) => {
                user.dailySignin().then(res => {
                    if (res && res.code === 200) {
                        commit('setSign', true)
                        resolve(res)
                    } else {
                        reject(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

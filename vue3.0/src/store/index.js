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
            picUrl: require('@/assets/images/avatar.jpg')
        },
        showMenu: true
    },
    mutations: {
        setTitle (state, title) {
            state.metaTitle = title
            document.title = title
        },
        async setPlayData (state, data) {
            // db.open()
            // db.version(1).stores({ playData: '++id,brcanExtend,code,encodeType,endStr,ended,expi,fee,flag,freeTrialInfo,gain,id,level,loop,md5,muted,name,payed,picUrl,singer,size,type,uf,url,volume' })
            // db.transaction('rw', db.playData, async () => {
            //     // Make sure we have something in DB:
            //     // if ((await db.friends.where({ name: 'Josephine' }).count()) === 0) {
            //     //     const id = await db.friends.add({ name: 'Josephine', age: 21 })
            //     //     alert(`Addded friend with id ${id}`)
            //     // }
            //     if ((await db.playData.where({ id: 1 }).count()) === 0) {
            //         const res = await db.playData.add({ id: 1, ...data })
            //         console.log(res, 'q121213123')
            //         db.close()
            //     }
            // }).catch(e => {
            //     alert(e.stack || e)
            // })
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

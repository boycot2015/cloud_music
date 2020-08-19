import axios from '@/api/axios'
import urls from './urls'
// const headers = {}
export default {
    playlist (params) {
        return axios.get(urls.playlist, {
            params
        })
    },
    hotCate (params) {
        return axios.get(urls.hotCate, {
            params
        })
    },
    singleList (params) {
        return axios.get(urls.singleList, {
            params
        })
    },
    detail (params) {
        return axios.get(urls.detail, {
            params
        })
    },
    topPlaylist (params) {
        return axios.get(urls.topPlaylist, {
            params
        })
    },
    playUrl (params) {
        return axios.get(urls.playUrl, {
            params
        })
    },
    lyric (params) {
        return axios.get(urls.lyric, {
            params
        })
    }
}

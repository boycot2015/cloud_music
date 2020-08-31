import axios from '@/api/axios'
import urls from './urls'
// const headers = {}
export default {
    toplist (params) {
        return axios.get(urls.toplist, {
            params
        })
    },
    detail (params) {
        return axios.get(urls.detail, {
            params
        })
    },
    artist (params) {
        return axios.get(urls.artist, {
            params
        })
    }
}

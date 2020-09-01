import axios from '@/api/axios'
import urls from './urls'
// const headers = {}
export default {
    list (params) {
        return axios.get(urls.list, {
            params
        })
    },
    toplist (params) {
        return axios.get(urls.toplist, {
            params
        })
    },
    sub (params) {
        return axios.get(urls.sub, {
            params
        })
    },
    sublist (params) {
        return axios.get(urls.sublist, {
            params
        })
    },
    song (params) {
        return axios.get(urls.song, {
            params
        })
    }
}

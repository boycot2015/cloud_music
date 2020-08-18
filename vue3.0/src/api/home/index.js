import axios from '@/api/axios'
import urls from './urls'
export default {
    banner (params) {
        return axios.get(urls.banner, { params })
    },
    personalized (params) {
        return axios.get(urls.personalized, { params })
    },
    privatecontent (params) {
        return axios.get(urls.privatecontent, { params })
    },
    topSong (params) {
        return axios.get(urls.topSong, { params })
    },
    mv (params) {
        return axios.get(urls.mv, { params })
    },
    djprogram (params) {
        return axios.get(urls.djprogram, { params })
    },
    djrecommend (params) {
        return axios.get(urls.djrecommend, { params })
    }
}

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
    privatecontentList (params) {
        return axios.get(urls.privatecontentList, { params })
    },
    topSong (params) {
        return axios.get(urls.topSong, { params })
    },
    mv (params) {
        return axios.get(urls.mv, { params })
    },
    djBanner (params) {
        return axios.get(urls.djBanner, { params })
    },
    djprogram (params) {
        return axios.get(urls.djprogram, { params })
    },
    djCatelist (params) {
        return axios.get(urls.djCatelist, { params })
    },
    djrecommend (params) {
        return axios.get(urls.djrecommend, { params })
    },
    djPaygift (params) {
        return axios.get(urls.djPaygift, { params })
    },
    hotRadio (params) {
        return axios.get(urls.hotRadio, { params })
    }
}

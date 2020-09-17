import axios from '@/api/axios'
import urls from './urls'
export default {
    djBanner (params) {
        return axios.get(urls.djBanner, { params })
    },
    djprogramList (params) {
        return axios.get(urls.djprogramList, { params })
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
    },
    djDetail (params) {
        return axios.get(urls.djDetail, { params })
    },
    djprogramDetail (params) {
        return axios.get(urls.djprogramDetail, { params })
    }
}

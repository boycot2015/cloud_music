import axios from '@/api/axios'
import urls from './urls'
// const headers = {}
export default {
    all (params) {
        return axios.get(urls.all, {
            params
        })
    },
    first (params) {
        return axios.get(urls.first, {
            params
        })
    },
    exclusive (params) {
        return axios.get(urls.exclusive, {
            params
        })
    },
    detail (params) {
        return axios.get(urls.detail, {
            params
        })
    },
    personalized (params) {
        return axios.get(urls.personalized, {
            params
        })
    },
    top (params) {
        return axios.get(urls.top, {
            params
        })
    },
    info (params) {
        return axios.get(urls.info, {
            params
        })
    },
    url (params) {
        return axios.get(urls.url, {
            params
        })
    }
}

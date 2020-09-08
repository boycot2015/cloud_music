import axios from '@/api/axios'
import urls from './urls'
// const headers = {}
export default {
    category (params) {
        return axios.get(urls.category, {
            params
        })
    },
    group (params) {
        return axios.get(urls.group, {
            params
        })
    },
    groupList (params) {
        return axios.get(urls.groupList, {
            params
        })
    },
    all (params) {
        return axios.get(urls.all, {
            params
        })
    },
    recommend (params) {
        return axios.get(urls.recommend, {
            params
        })
    },
    related (params) {
        return axios.get(urls.related, {
            params
        })
    },
    detail (params) {
        return axios.get(urls.detail, {
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

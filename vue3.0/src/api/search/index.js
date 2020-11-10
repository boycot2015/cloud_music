import axios from '@/api/axios'
import urls from './urls.js'
export default {
    search: (params) => axios.get(urls.search, { params }),
    searchHot: (params) => axios.get(urls.searchHot, { params }),
    searchHotDetail: (params) => axios.get(urls.searchHotDetail, { params }),
    searchDefault: (params) => axios.get(urls.searchDefault, { params }),
    searchSuggest: (params) => axios.get(urls.searchSuggest, { params }),
    searchMultimatch: (params) => axios.get(urls.searchMultimatch, { params })
}

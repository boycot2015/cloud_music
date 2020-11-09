import axios from '@/api/axios'
import urls from './urls.js'

export default {
    search: (params) => axios.get(urls.search, { params })
}

import axios from '@/api/axios'
import urls from './urls.js'

export default {
    search: (data) => axios.post(urls.search, data),
    getAllProvince: () => axios.get(urls.province),
    getByParentId: (params) => axios.get(urls.getByParentId, { params }),
    getMallCategory: () => axios.get(urls.category),
    getBrandSelectList: (params) => axios.get(urls.brand, { params }),
    getReceivingAddress: () => axios.get(urls.receivingAddress)
}

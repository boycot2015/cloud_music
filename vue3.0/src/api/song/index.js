import axios from '@/api/axios'
import urls from './urls'
// const headers = {}
export default {
    stockCenterData (params) {
        return axios.get(urls.stockCenterData, {
            params,
            headers: { OperationCode: 'stock_list' }
        })
    },
    // 导出接口
    exportStockGoodsData  (params) {
        return axios.get(urls.exportStockGoodsData, {
            params,
            headers: { OperationCode: 'stock_export' }
        })
    },
    // 导出接口
    authskip  (params) {
        return axios.get(urls.authskip, {
            params,
            headers: { OperationCode: 'stock_authskip' }
        })
    }
}

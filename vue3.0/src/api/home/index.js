import axios from '@/api/axios'
import urls from './urls'
export default {
    // 订单中心，基础通用接口
    // 1001订单商品来源;1002支付方式;1003订单状态;1004退货退款售后状态;
    // 1005换货状态售后状态;1006退款状态售后状态,1007退货退款类型,1008换货类型,1009商品来源
    orderGetDataAuthskip (params) {
        return axios.get(urls.orderGetDataAuthskip, {
            params
        })
    },
    // 临时订单类型接口 待部署到测试环境即可删除
    // orderGetDataAuthskip_ (params) {
    //     return axios.get('http://192.168.1.216:2003/api/order/basicData/getData/authskip', {
    //         params
    //     })
    // },
    // 商品品牌
    brandList (code) {
        return axios.get(urls.brandList, {
            headers: {
                OperationCode: code || 'stock_list'
            }
        })
    },
    // 库存中心商品来源
    getSourceFromData (code) {
        return axios.get(urls.getSourceFromData, {
            headers: {
                OperationCode: code || 'stock_list'
            }
        })
    },
    // 进度条
    loadingProgressAuthskip (params) {
        return axios.get(urls.loadingProgressAuthskip, { params })
    }

}

// 有些接口需要在headers中添加token或是其他，可以按如下配置
import axios from '@/api/axios'
import urls from './urls'
// import url from 'postcss-url'

// const headers = { token: 'financial_security' }

const financialCenterApi = {
    // 获取前端密码加密的密钥
    cipher (params) {
        return axios.get(urls.cipher, {
            params,
            headers: { OperationCode: 'financial_customer_credit' }
        })
    },
    // 获取图形验证码
    imgCode (params) {
        return axios.get(urls.imgCode, { params })
        // let { mobileNo } = params
        // return urls.imgCode + '?mobileNo=' + mobileNo + '&time=' + new Date().getTime()
    },
    // 获取短信验证码
    smsCode (params) {
        return axios.get(urls.smsCode, { params })
    },
    // 获取短信验证码
    sendVerificationCode (params) {
        return axios.get(urls.sendVerificationCode, { params })
    },
    // 保存安全密码
    savaSecurityPassword (params) {
        return axios.get(urls.savaSecurityPassword, { params })
    },

    // 修改密码
    modifyPwd (params) {
        return axios.post(urls.modifyPwd, params)
    },

    // 下拉框数据
    authskip (params) {
        return axios.get(urls.authskip, { params })
    },
    // 财务操作类型下拉框数据
    financeAuthskip (params) {
        return axios.get(urls.financeAuthskip, { params })
    },
    // 商城下拉框
    websiteComboBox (params) {
        return axios.get(urls.websiteComboBox, {
            params,
            headers: {
                OperationCode: 'financial_transaction_detail'
            }
        })
    },
    // 查询客户财务日志列表(分页)
    financeLogList (params) {
        return axios.get(urls.financeLogList, {
            params,
            headers: {
                OperationCode: 'financial_transaction_detail'
            }
        })
    },
    // 查询客户(分页)
    selectCustomerPage (params) {
        return axios.get(urls.selectCustomerPage, {
            params,
            headers: { OperationCode: 'financial_customer_list' }
        })
    },
    // 查询客户财务信息
    financeGet (params) {
        return axios.get(urls.financeGet, { params })
    },
    // 导出客户财务信息(订单)
    export (params) {
        return axios.get(urls.export, {
            params,
            headers: { OperationCode: 'financial_customer_export' }
        })
    },
    // 进度条
    importInfoLoading (params) {
        return axios.get(urls.importInfoLoading, {
            params
        })
    },
    // 分页查询财务审核订单列表
    financialAuditList (params) {
        return axios.get(urls.financialAuditList, {
            params,
            headers: { OperationCode: 'financial_order_list' }
        })
    },
    // 导出财务审核订单
    orderExport (params) {
        return axios.get(urls.orderExport, {
            params,
            headers: { OperationCode: 'financial_order_export' }
        })
    },
    // 获取基础数据接口
    orderAuthskip (params) {
        return axios.get(urls.orderAuthskip, {
            params
        })
    },
    // 根据客户id查询是否有待审核订单
    queryPendingReview (params, code) {
        return axios.get(urls.queryPendingReview, {
            params,
            headers: {
                OperationCode: code || 'financial_customer_money_back'
            }
        })
    },
    // 查询客户(分页)
    operating (params, code) {
        return axios.post(urls.operating, params, {
            headers: {
                OperationCode: code
            }
        })
    },
    // 批量审核通过订单
    auditOrder (params) {
        return axios.post(urls.auditOrder, params, {
            headers: {
                OperationCode: 'financial_order_audit'
            }
        })
    },
    // 批量拒绝审核订单
    auditNopass (params) {
        return axios.post(urls.auditNopass, params, {
            headers: {
                OperationCode: 'financial_order_audit'
            }
        })
    },
    // 导入客户充值和回款
    http: axios,
    importRecharge: {
        url: urls.importRecharge,
        headers: {
            OperationCode: 'financial_customer_money_back',
            'Content-Type': 'multipart/form-data'
        }
    },
    // 客户授信数据初始化
    creditInit: {
        url: urls.creditInit,
        headers: {
            OperationCode: 'financial_customer_credit',
            'Content-Type': 'multipart/form-data'
        }
    },
    // // 导入客户充值和回款
    // importRecharge (params, code) {
    //     return axios.post(urls.importRecharge, params, {
    //         headers: {
    //             OperationCode: code || 'financial_order_list'
    //         }
    //     })
    // },
    // // 客户授信数据初始化
    // creditInit (params, code) {
    //     return axios.post(urls.creditInit, params, {
    //         headers: {
    //             OperationCode: code || 'financial_order_list'
    //         }
    //     })
    // }
    // 获取客户列表详情接口
    getCustomerListDetail (params, code) {
        return axios.get(urls.getCustomerListDetail, {
            params,
            headers: {
                OperationCode: code || 'financial_details'
            }
        })
    },
    financeLogExport (params, code) {
        return axios.get(urls.financeLogExport, {
            params,
            headers: {
                OperationCode: code || 'financial_transaction_detail'
            }
        })
    },

    // 商城列表
    getMallLists: (params) => axios.get(urls.mallLists, { params }, { headers: { OperationCode: 'financial_website_list' } }),
    customerOption: () => axios.get(urls.customerOption),
    getMallListsExportKey: (params) => axios.get(urls.getMallListsExportKey, { params, headers: { OperationCode: 'financial_website_export' } })
}
export const logout = financialCenterApi.logout
export const getUserInfo = financialCenterApi.getInfo
export const login = financialCenterApi.login
export const smsLogin = financialCenterApi.smsLogin
export default financialCenterApi

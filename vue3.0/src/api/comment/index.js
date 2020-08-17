// 有些接口需要在header中添加token或是其他，可以按如下配置
import axios from '@/api/axios'
import urls from './urls'
const header = {
    'Content-Type': 'multipart/form-data'
}

export default {
    header,
    // tableData (data) {
    //     return axios.get(urls.tableData, {
    //         data
    //     })
    // },
    // 订单列表
    tableOrderData (data, code) {
        return axios.get(urls.tableOrderData, {
            params: data,
            headers: {
                OperationCode: code || 'order_list'
            }
        })
    },
    // 订单首页censusOrderHomeData
    censusOrderHomeData (data, code) {
        return axios.get(urls.censusOrderHomeData, {
            params: data,
            headers: {
                OperationCode: code || 'order_index'
            }
        })
    },
    // 导出订单
    exportOrder (data, code) {
        return axios.get(urls.exportOrder, {
            params: data,
            headers: {
                OperationCode: code || 'order_export'
            }
        })
    },
    // 导出订单进度
    exportOrderProgressBar (data, code) {
        return axios.get(urls.exportOrderProgressBar, {
            params: data,
            headers: {
                OperationCode: code || 'order_list'
            }
        })
    },
    // 订单详情
    orderDetail (data, code) {
        return axios.get(urls.orderDetail, {
            params: data,
            headers: {
                OperationCode: code || 'order_list_detail'
            }
        })
    },
    // 作废订单
    cancellationOrder (params, code) {
        return axios.post(urls.cancellationOrder, params, {
            headers: {
                OperationCode: code || 'order_revoke'
            }
        })
    },
    // 订单详情tabs
    orderDetailByType (data, code) {
        return axios.get(urls.orderDetailByType, {
            params: data,
            headers: {
                OperationCode: code || 'order_list_detail'
            }
        })
    },
    // 售后详情
    afterSaleOrderSelectById (data, code) {
        return axios.get(urls.afterSaleOrderSelectById, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_create_newOrder'
            }
        })
    },
    // 售后订单商品明细
    queryProductList (data, code) {
        return axios.get(urls.queryProductList, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_create_newOrder'
            }
        })
    },
    // 售后订单商品明细
    queryLogList (data, code) {
        return axios.get(urls.queryLogList, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_detail'
            }
        })
    },
    // 售后订单物流信息
    queryLogistics (data, code) {
        return axios.get(urls.queryLogistics, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_detail'
            }
        })
    },
    // 添加换货商品根据商城id和sku查询商品信息
    getGoodsByMallIdAndSkuid (data, code) {
        return axios.get(urls.getGoodsByMallIdAndSkuid, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_create_newOrder'
            }
        })
    },
    // 获取售后原订单收货人信息
    getOriginReceiverInfo (data, code) {
        return axios.get(urls.getOriginReceiverInfo, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_create_newOrder'
            }
        })
    },
    // 售后订单列表
    afterSaleOrder (data, code) {
        return axios.get(urls.afterSaleOrder, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order'
            }
        })
    },
    // 售后订单导出
    afterSaleOrderExport (data, code) {
        return axios.get(urls.afterSaleOrderExport, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_export'
            }
        })
    },
    // 线下退款
    afterSaleOrderOfflineRefund (data, code) {
        return axios.get(urls.afterSaleOrderOfflineRefund, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_offline_refund'
            }
        })
    },
    afterSaleOrderRefundBool (params, code) {
        return axios.post(urls.afterSaleOrderRefundBool, params, {
            headers: {
                OperationCode: code || 'after_sale_order_approval'
            }
        })
    },
    // 修改售后订单详情客服备注
    updateRemark (data, code) {
        return axios.get(urls.updateRemark, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_update_remark'
            }
        })
    },
    // 修改售后订单详情客服备注
    detailUpdateRemark (data, code) {
        return axios.post(urls.detailUpdateRemark, data, {
            headers: {
                OperationCode: code || 'order_list_detail_update_remark'
            }
        })
    },
    // 待收货状态的收货按钮
    receipt (data, code) {
        return axios.get(urls.receipt, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_receipt'
            }
        })
    },
    // 根据售后订单id获取可选择的收货地址列表
    getReturnAddressList (data, code) {
        return axios.get(urls.getReturnAddressList, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_approval'
            }
        })
    },
    // 退款
    afterSaleOrderRefund (data, code) {
        return axios.get(urls.afterSaleOrderRefund, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_refund'
            }
        })
    },
    // 同步OMS
    afterSaleOrderSyncOms (data, code) {
        return axios.get(urls.afterSaleOrderSyncOms, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_sync_oms'
            }
        })
    },
    // 获取导入错误的文件路径
    errorFileAuthskip (data, code) {
        return axios.get(urls.errorFileAuthskip, {
            params: data,
            headers: {
                OperationCode: code || 'order_manage'
            }
        })
    },
    // 供应商名称接口
    supplier (data, code) {
        return axios.get(urls.supplier, {
            params: data,
            headers: {
                OperationCode: code || 'order_manage'
            }
        })
    },
    // 查询订单详情
    queryOrderByChildOrderNo (data) {
        let OperationCode = ''
        if (data.afterSaleType) {
            if (data.afterSaleType === 1002) {
                OperationCode = 'after_sale_refund'
            } else if (data.afterSaleType === 1003) {
                OperationCode = 'after_sale_return_goods'
            } else if (data.afterSaleType === 1001) {
                OperationCode = 'after_sale_return_money'
            }
        }
        return axios.get(urls.queryOrderByChildOrderNo, {
            params: data,
            headers: {
                OperationCode
            }
        })
    },
    // 快递公司列表
    listAll (data, code) {
        return axios.get(urls.listAll, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_detail'
            }
        })
    },
    // 新增售后订单
    addAfterSaleOrder (params) {
        let OperationCode = ''
        if (params.afterSaleType) {
            if (params.afterSaleType === 1002) {
                OperationCode = 'after_sale_refund'
            } else if (params.afterSaleType === 1003) {
                OperationCode = 'after_sale_return_goods'
            } else if (params.afterSaleType === 1001) {
                OperationCode = 'after_sale_return_money'
            }
        }
        return axios.post(urls.addAfterSaleOrder, params, {
            headers: {
                OperationCode
            }
        })
    },
    // 修改物流信息
    updateLogisticsInfo (params, code) {
        return axios.post(urls.updateLogisticsInfo, params, {
            headers: {
                OperationCode: code || 'order_list_detail'
            }
        })
    },
    // 修改售后物流信息
    updateAfterLogisticsInfo (params, code) {
        return axios.post(urls.updateLogisticsInfo, params, {
            headers: {
                OperationCode: code || 'after_sale_order_update_courier_no'
            }
        })
    },
    // 新生成换货订单
    createSwapGoodsOrder (params) {
        return axios.post(urls.createSwapGoodsOrder, params, {
            headers: {
                OperationCode: 'after_sale_create_newOrder'
            }
        })
    },
    // 导入快递单号
    http: axios,
    import: {
        url: urls.importCourierNo,
        headers: {
            OperationCode: 'order_import_courier_no',
            'Content-Type': 'multipart/form-data'
        }
    },
    //, code 获取省数据
    getAllProvince (data, code) {
        return axios.get(urls.getAllProvince, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_create_newOrder'
            }
        })
    },
    //, code 根据父级id，获取子级区域数据
    getCityByParentId (data, code) {
        return axios.get(urls.getCityByParentId, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_create_newOrder'
            }
        })
    },
    // 订单中心虚拟商品订单列表分页查询
    queryByPage (data, code) {
        return axios.get(urls.queryByPage, {
            params: data,
            headers: {
                OperationCode: 'virtual_order_list'
            }
        })
    },
    // 虚拟商品订单详情基本信息
    baseInfo (data, code) {
        return axios.get(urls.baseInfo, {
            params: data,
            headers: {
                OperationCode: 'virtual_product_order_detail'
            }
        })
    },
    // 虚拟商品订单详情类别
    detailType (data, code) {
        return axios.get(urls.detailType, {
            params: data,
            headers: {
                OperationCode: 'virtual_product_order_detail'
            }
        })
    },
    // 获取lmf的供应商
    lmfSupplier (data, code) {
        return axios.get(urls.lmfSupplier, {
            params: data
            // headers: { OperationCode: 'order_list' }
        })
    },
    // 虚拟商品列表导出
    export (data, code) {
        return axios.get(urls.export, {
            params: data,
            headers: {
                OperationCode: 'virtual_order_export'
            }
        })
        // return axios.post(urls.export, params, { headers: { OperationCode: 'virtual_order_export' } })
    },
    // 虚拟商品订单作废
    refund (params) {
        return axios.post(urls.refund, params, {
            headers: {
                OperationCode: 'virtual_order_refund'
            }
        })
    },
    // 商城下拉
    comboBox (data, code) {
        return axios.get(urls.comboBox, {
            params: data
        })
    },
    // 增加客户余额
    // POST /order/increase/customer/balance
    addCustomerBalance (params, code) {
        return axios.post(urls.addCustomerBalance, params, {
            headers: {
                OperationCode: code || 'order_list_detail'
            }
        })
    },
    // 农行售后对接
    // 列表数据
    abcAfterOrderList (data, code) {
        return axios.get(urls.abcAfterOrderList, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_audit_query'
            }
        })
    },
    // 审核
    abcAfterOrderAuditing (params, code) {
        return axios.post(urls.abcAfterOrderAuditing, params, {
            headers: {
                OperationCode: code || 'after_sale_order_audit_oper'
            }
        })
    },
    // 导出
    abcAfterOrderExport (data, code) {
        return axios.get(urls.abcAfterOrderExport, {
            params: data,
            headers: {
                OperationCode: code || 'after_sale_order_audit_export'
            }
        })
    },
    // 获取客户下拉框数据
    customerComboBox (data, code) {
        return axios.get(urls.customerComboBox, {
            params: data,
            headers: {
                OperationCode: 'draft_order_save '
            }
        })
    },
    // 获取客户下拉框数据
    comboBoxByCustomerId (data, code) {
        return axios.get(urls.comboBoxByCustomerId, {
            params: data,
            headers: {
                OperationCode: 'draft_order_save'
            }
        })
    },
    // 保存
    saveDraftOrder (params, code) {
        return axios.post(urls.saveDraftOrder, params, {
            headers: {
                OperationCode: 'draft_order_save'
            }
        })
    },
    // 订单详情基本信息
    cgbaseInfo (data, code) {
        return axios.get(urls.cgbaseInfo, {
            params: data,
            headers: {
                OperationCode: 'draft_order_list_detail'
            }
        })
    },
    queryProductBySkuId (data, code) {
        return axios.get(urls.queryProductBySkuId, {
            params: data,
            headers: {
                OperationCode: 'draft_order_save'
            }
        })
    },
    draftOrderApproval (data, code) {
        return axios.get(urls.draftOrderApproval, {
            params: data,
            headers: {
                OperationCode: 'draft_order_approval'
            }
        })
    },
    draftOrderQueryByPage (data, code) {
        for (var key in data) {
            if (!data[key]) {
                delete data[key]
            }
        }
        return axios.get(urls.draftOrderQueryByPage, {
            params: data,
            headers: {
                OperationCode: 'draft_order_list'
            }
        })
    },
    deleteDraftOrder (data, code) {
        return axios.post(urls.deleteDraftOrder, data, {
            headers: {
                OperationCode: 'draft_order_delete'
            }
        })
    },
    draftOrderExportOrde (data, code) {
        for (var key in data) {
            if (!data[key]) {
                delete data[key]
            }
        }
        return axios.get(urls.draftOrderExportOrde, {
            params: data,
            headers: {
                OperationCode: 'draft_order_export'
            }
        })
    }

}

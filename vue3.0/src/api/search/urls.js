import baseUrl from '../baseUrl'

export default {
    search: `${baseUrl}/mall/search/goodsList`,
    province: `${baseUrl}/goods/regionalInfo/getAllProvince`,
    getByParentId: `${baseUrl}/goods/regionalInfo/getByParentId`,
    category: `${baseUrl}/mall/enterprise/goods/getMallCategory`,
    brand: `${baseUrl}/goods/brand/getBrandSelectList`,
    receivingAddress: `${baseUrl}/mall/address/get`
}

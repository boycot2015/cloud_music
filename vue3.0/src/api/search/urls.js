import baseUrl from '../baseUrl'
const prefix = baseUrl + '/search/'

export default {
    search: `${prefix}`, // 搜索
    searchHot: `${prefix}hot`, // 热搜列表(简略)
    searchHotDetail: `${prefix}hot/detail`, // 热搜列表(详细)
    searchDefault: `${prefix}default`, // 默认搜索关键词
    searchSuggest: `${prefix}suggest`, // 搜索建议
    searchMultimatch: `${prefix}multimatch` // 搜索多重匹配
}

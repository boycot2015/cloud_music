import baseUrl from '../baseUrl'
const prefix = '/mv'
export default {
    all: baseUrl + prefix + '/all', // 获取全部mv列表
    first: baseUrl + prefix + '/first', // 获取最新 mv
    exclusive: baseUrl + prefix + '/exclusive/rcmd', // 获取网易出品 mv
    detail: baseUrl + prefix + '/detail', // 获取mv详情
    personalized: baseUrl + '/personalized/mv', // 获取推荐 mv
    top: baseUrl + '/top/mv', // 获取 mv 排行
    info: baseUrl + prefix + '/detail/info', // 获取 mv 点赞转发评论数数据
    url: baseUrl + prefix + '/url' // 获取mv播放地址
}

import baseUrl from '../baseUrl'
const prefix = '/video'
export default {
    category: baseUrl + prefix + '/category/list', // 视频分类列表
    group: baseUrl + prefix + '/group', // 分类下的视频
    groupList: baseUrl + prefix + '/group/list', // 视频标签列表
    all: baseUrl + prefix + '/timeline/all', // 获取全部视频列表
    recommend: baseUrl + prefix + '/timeline/recommend', // 获取推荐视频
    related: baseUrl + '/related/allvideo', // 获取相关视频
    detail: baseUrl + prefix + '/detail', // 获取视频详情
    info: baseUrl + prefix + '/detail/info', // 获取视频点赞转发评论数数据
    url: baseUrl + prefix + '/url' // 获取视频播放地址
}

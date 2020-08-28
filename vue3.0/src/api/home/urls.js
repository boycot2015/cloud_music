
import baseUrl from '../baseUrl'
const prefix = '/personalized'
// let loginUrl = 'http://192.168.1.216:8008'
export default {
    banner: baseUrl + '/banner', // 轮播api
    personalized: baseUrl + prefix, // 获取推荐歌单
    privatecontent: baseUrl + prefix + '/privatecontent', // 独家放送(入口列表)
    topSong: baseUrl + '/top/song', // 新歌速递
    mv: baseUrl + prefix + '/mv', // 推荐 mv
    djBanner: baseUrl + '/dj/banner', // 获取电台banner
    djprogram: baseUrl + prefix + '/djprogram', // 最热主播榜
    djrecommend: baseUrl + '/dj/recommend', // 最热主播榜
    djCatelist: baseUrl + '/dj/catelist', // 电台分类
    djPaygift: baseUrl + '/dj/paygift', // 电台付费推荐
    hotRadio: baseUrl + '/dj/radio/hot' // 电子3D
}

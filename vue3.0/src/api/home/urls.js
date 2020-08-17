
import baseUrl from '../baseUrl'
const prefix = '/personalized'
// let loginUrl = 'http://192.168.1.216:8008'
export default {
    banner: baseUrl + '/banner', // 轮播api
    personalized: baseUrl + prefix, // 获取推荐歌单
    privatecontent: baseUrl + prefix + '/privatecontent', // 独家放送(入口列表)
    topSong: baseUrl + '/top/song', // 新歌速递
    mv: baseUrl + prefix + '/mv', // 推荐 mv
    djprogram: baseUrl + prefix + '/djprogram', // 最热主播榜
    djrecommend: baseUrl + '/dj/recommend' // 最热主播榜
}

import baseUrl from '../baseUrl'
// let loginUrl = 'http://192.168.1.216:8008'
const prefix = '/toplist'
export default {
    toplist: baseUrl + prefix, // 获取所有榜单
    detail: baseUrl + prefix + '/detail', // 榜单内容摘要
    artist: baseUrl + prefix + '/artist' // 排行榜中的歌手榜
}

import baseUrl from '../baseUrl'
// let loginUrl = 'http://192.168.1.216:8008'
const prefix = '/artist'
export default {
    list: baseUrl + prefix + '/list', // 获取歌手分类列表
    toplist: baseUrl + '/top/artists', // 获取热门歌手数据
    sub: baseUrl + prefix + '/sub', // 收藏歌手
    sublist: baseUrl + prefix + '/sublist', // 收藏的歌手列表
    song: baseUrl + prefix + '/top/song' // 歌手热门50首歌曲
}

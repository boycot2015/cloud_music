import baseUrl from '../baseUrl'
// let loginUrl = 'http://192.168.1.216:8008'
export default {
    catlist: baseUrl + '/playlist/catlist', // 歌单分类
    hotCate: baseUrl + '/playlist/hot', // 热门歌单分类
    singleList: baseUrl + '/playlist/catlist', // 歌单分类
    playlist: baseUrl + '/playlist/detail', // 获取歌单详情
    detail: baseUrl + '/song/detail', // 所有歌曲详情
    topPlaylist: baseUrl + '/top/playlist', // 歌单 ( 网友精选碟 )
    playUrl: baseUrl + '/song/url', // 获取音乐 url
    lyric: baseUrl + '/lyric' // 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
}

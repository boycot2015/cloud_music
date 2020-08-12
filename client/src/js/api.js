var baseUrl = 'http://localhost:3000';
var prefix = '/personalized';
let dj = '/dj'
window.apiUrls = {
    home: {
        banner: baseUrl + '/banner', // 轮播api
        personalized: baseUrl + prefix, // 获取推荐歌单
        privatecontent: baseUrl + prefix + '/privatecontent', // 独家放送(入口列表)
        topSong: baseUrl + '/top/song',//新歌速递
        mv: baseUrl + prefix + '/mv',// 推荐 mv
        djprogram: baseUrl + prefix + '/djprogram', // 最热主播榜
        djrecommend: baseUrl + dj + '/recommend', // 最热主播榜
    },
    song: {
        catlist: baseUrl + '/playlist/catlist', // 歌单分类
        hotCate: baseUrl + '/playlist/hot', // 热门歌单分类
        singleList: baseUrl + '/playlist/catlist', // 歌单分类
        playlist: baseUrl + '/playlist/detail', // 获取歌单详情
        detail: baseUrl + '/song/detail', // 所有歌曲详情
        topPlaylist: baseUrl + '/top/playlist', // 歌单 ( 网友精选碟 )
        playUrl: baseUrl + '/song/url', // 获取音乐 url
        lyric: baseUrl + '/lyric', // 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
    }
}
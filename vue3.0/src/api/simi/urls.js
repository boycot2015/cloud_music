// 把一个类型下的所有url接口放入这一个文件
import baseUrl from '../baseUrl'
export default {
    playlist: baseUrl + '/simi/playlist', // 获取相似歌单
    artist: baseUrl + '/simi/artist', // 获取相似歌手
    mv: baseUrl + '/simi/artist', // 获取相似mv
    song: baseUrl + '/simi/song', // 获取相似歌曲
    user: baseUrl + '/simi/user' // 获取最近 5 个听了这首歌的用户
}

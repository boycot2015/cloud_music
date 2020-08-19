// 有些接口需要在header中添加token或是其他，可以按如下配置
import axios from '@/api/axios'
import urls from './urls'

export default {
    music (params) {
        return axios.get(urls.music, {
            params
        })
    }, // 歌曲评论
    playList (params) {
        return axios.get(urls.playList, {
            params
        })
    } // 歌曲评论
}

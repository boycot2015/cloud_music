// 有些接口需要在headers中添加token或是其他，可以按如下配置
import axios from '@/api/axios'
import urls from './urls'
export default {
    playlist (params) {
        return axios.get(urls.playlist, { params })
    },
    artist (params) {
        return axios.get(urls.artist, { params })
    },
    mv (params) {
        return axios.get(urls.mv, { params })
    },
    song (params) {
        return axios.get(urls.song, { params })
    },
    user (params) {
        return axios.get(urls.user, { params })
    }
}

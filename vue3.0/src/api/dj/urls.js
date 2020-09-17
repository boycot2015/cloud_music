
import baseUrl from '../baseUrl'
const prefix = '/dj'
// let loginUrl = 'http://192.168.1.216:8008'
export default {
    djBanner: baseUrl + prefix + '/banner', // 获取电台banner
    djprogramList: baseUrl + prefix + '/program', // 电台节目列表
    djDetail: baseUrl + prefix + '/detail', // 电台节目列表详情介绍
    djprogramDetail: baseUrl + prefix + '/program/detail', // 电台节目列表详情
    djrecommend: baseUrl + prefix + '/recommend', // 最热主播榜
    djsublist: baseUrl + prefix + '/sublist', // 订阅的电台列表
    djCatelist: baseUrl + prefix + '/catelist', // 电台分类
    djPaygift: baseUrl + prefix + '/paygift', // 电台付费推荐
    hotRadio: baseUrl + prefix + '/radio/hot' // 电子3D
}

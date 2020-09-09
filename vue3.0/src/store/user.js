import { user } from '@/api/apiList'
import { store } from '@/utils'
import Cookies from 'js-cookie'
export default {
    namespaced: true,
    state: {
        lyricList: [],
        data: {
            total: 0,
            playLists: [],
            songs: [],
            hotComments: [], // 精彩评论
            comments: [] // 所有评论
        },
        currLyric: {
            time: '00:01',
            text: (store.get('playData') !== null && store.get('playData').name) || '纯音乐，请欣赏~'
        },
        cookie: Cookies.get('cookie') || '',
        userInfo: {
            account: {},
            profile: {},
            bindings: {}
        }
    },
    mutations: {
        setData (state, data) {
            for (const key in data) {
                state.userInfo[key] = data[key]
            }
            store.set('userInfo', data)
        },
        setCurrentLyric (state, curStr) {
            let currLyric = ''
            state.lyricList.map(el => {
                if (el.time === curStr) {
                    currLyric = el
                }
            })
            // 首次播放存第一行
            if (!currLyric && store.get('currLyric') === null) {
                currLyric = {
                    time: '00:01',
                    text: (store.get('playData') !== null && store.get('playData').name) || ''
                }
            }
            currLyric && (state.currLyric = currLyric)
            currLyric && store.set('currLyric', currLyric)
        },
        setCookie (state, data) {
            state.cookie = data
            Cookies.set('cookie', data)
        }
    },
    actions: {
        async loginByPhone ({ commit }, params) {
            return new Promise((resolve, reject) => {
                user.cellphone(params).then(res => {
                    /**
                      * {
                        "loginType": 1,
                        "code": 200,
                        "account": {
                            "id": 131758421,
                            "userName": "1_18146681848",
                            "type": 1,
                            "status": 0,
                            "whitelistAuthority": 0,
                            "createTime": 1454687567569,
                            "salt": "[B@a78b7f5",
                            "tokenVersion": 0,
                            "ban": 0,
                            "baoyueVersion": -2,
                            "donateVersion": 0,
                            "vipType": 0,
                            "viptypeVersion": 1538842000272,
                            "anonimousUser": false
                        },
                        "token": "ab9be6c0baa3e78ad082c3d9b615d54394226699958ccbf0e595971afa38e02e33a649814e309366",
                        "profile": {
                            "description": "",
                            "followed": false,
                            "backgroundUrl": "http://p3.music.126.net/JOeEADrpadltxtMTvJsqmQ==/109951163537002606.jpg",
                            "detailDescription": "",
                            "birthday": 745774417464,
                            "avatarImgId": 19112810625833836,
                            "city": 360700,
                            "backgroundImgId": 109951163537002610,
                            "userType": 0,
                            "vipType": 0,
                            "gender": 1,
                            "accountStatus": 0,
                            "avatarUrl": "https://p3.music.126.net/lpclpDDnP3Qd38aR0la5ug==/19112810625833837.jpg",
                            "province": 360000,
                            "nickname": "大唐江流儿",
                            "userId": 131758421,
                            "djStatus": 0,
                            "experts": {},
                            "mutual": false,
                            "remarkName": null,
                            "expertTags": null,
                            "authStatus": 0,
                            "avatarImgIdStr": "19112810625833837",
                            "backgroundImgIdStr": "109951163537002606",
                            "defaultAvatar": false,
                            "signature": "没有什么可以留恋的，除了自己喜欢的那些歌",
                            "authority": 0,
                            "avatarImgId_str": "19112810625833837",
                            "followeds": 4,
                            "follows": 23,
                            "eventCount": 1,
                            "playlistCount": 9,
                            "playlistBeSubscribedCount": 0
                        },
                        "bindings": [
                            {
                                "tokenJsonStr": "{\"countrycode\":\"\",\"cellphone\":\"18146681848\",\"hasPassword\":true}",
                                "refreshTime": 1454687584,
                                "url": "",
                                "userId": 131758421,
                                "bindingTime": 1454687584851,
                                "expired": false,
                                "expiresIn": 2147483647,
                                "id": 66490623,
                                "type": 1
                            },
                            {
                                "tokenJsonStr": "{\"access_token\":\"2.00kP7bVF0Gg4617a5a9413820nRO3p\",\"refresh_token\":\"2.00kP7bVF0Gg461015c551ca90CRZh2\",\"uid\":\"5047649632\",\"expires_in\":\"2605086\",\"screen_name\":\"牛仔很lei\",\"id\":5047649632,\"idstr\":\"5047649632\",\"class\":1,\"name\":\"牛仔很lei\",\"province\":\"36\",\"city\":\"7\",\"location\":\"江西 赣州\",\"description\":\"没什么好说的，快乐就好\",\"url\":\"\",\"profile_image_url\":\"http://tvax1.sinaimg.cn/crop.0.0.960.960.50/005vBqfKly8fj6hlnbzxyj30qo0qomzf.jpg\",\"cover_image_phone\":\"http://ww1.sinaimg.cn/crop.0.0.640.640.640/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg\",\"profile_url\":\"u/5047649632\",\"domain\":\"\",\"weihao\":\"\",\"gender\":\"m\",\"followers_count\":52,\"friends_count\":253,\"pagefriends_count\":8,\"statuses_count\":278,\"video_status_count\":0,\"favourites_count\":1,\"created_at\":\"Tue Feb 25 17:20:45 +0800 2014\",\"following\":false,\"allow_all_act_msg\":false,\"geo_enabled\":true,\"verified\":false,\"verified_type\":-1,\"remark\":\"\",\"insecurity\":{\"sexual_content\":false},\"status\":{\"created_at\":\"Mon Sep 24 11:35:35 +0800 2018\",\"id\":4287739136421321,\"idstr\":\"4287739136421321\",\"mid\":\"4287739136421321\",\"can_edit\":false,\"text\":\"//@MIUI:转发抽送 1 台小米8青春版！有一种多彩竟然可以无中生有？来看清华大学博士@毕导THU 为你解密 [并不简单]\",\"source_allowclick\":1,\"source_type\":1,\"source\":\"<a href=\\\"http://app.weibo.com/t/feed/KojnI\\\" rel=\\\"nofollow\\\">nubia Z11 无边框手机</a>\",\"favorited\":false,\"truncated\":false,\"in_reply_to_status_id\":\"\",\"in_reply_to_user_id\":\"\",\"in_reply_to_screen_name\":\"\",\"pic_urls\":[],\"geo\":null,\"is_paid\":false,\"mblog_vip_type\":0,\"annotations\":[{\"client_mblogid\":\"bafee686-3dda-48f7-860b-7b049eab6823\"},{\"mapi_request\":true}],\"reposts_count\":0,\"comments_count\":0,\"attitudes_count\":0,\"pending_approval_count\":0,\"isLongText\":false,\"hide_flag\":0,\"mlevel\":0,\"visible\":{\"type\":0,\"list_id\":0},\"biz_feature\":0,\"hasActionTypeCard\":0,\"darwin_tags\":[],\"hot_weibo_tags\":[],\"text_tag_tips\":[],\"mblogtype\":0,\"rid\":\"0\",\"userType\":0,\"more_info_type\":0,\"positive_recom_flag\":0,\"content_auth\":0,\"gif_ids\":\"\",\"is_show_bulletin\":2,\"comment_manage_info\":{\"comment_permission_type\":-1,\"approval_comment_type\":0}},\"ptype\":0,\"allow_all_comment\":true,\"avatar_large\":\"http://tvax1.sinaimg.cn/crop.0.0.960.960.180/005vBqfKly8fj6hlnbzxyj30qo0qomzf.jpg\",\"avatar_hd\":\"http://tvax1.sinaimg.cn/crop.0.0.960.960.1024/005vBqfKly8fj6hlnbzxyj30qo0qomzf.jpg\",\"verified_reason\":\"\",\"verified_trade\":\"\",\"verified_reason_url\":\"\",\"verified_source\":\"\",\"verified_source_url\":\"\",\"follow_me\":false,\"like\":false,\"like_me\":false,\"online_status\":0,\"bi_followers_count\":23,\"lang\":\"zh-cn\",\"star\":0,\"mbtype\":0,\"mbrank\":0,\"block_word\":0,\"block_app\":0,\"credit_score\":80,\"user_ability\":33555456,\"cardid\":\"star_037\",\"avatargj_id\":\"gj_vip_182\",\"urank\":14,\"story_read_state\":-1,\"vclub_member\":0,\"data\":0,\"code\":-1587863616728,\"message\":\"服务器返回异常状态[0]!\",\"rawdata\":\"\",\"AnonymousUserId\":null}",
                                "refreshTime": 1588814100,
                                "url": "http://weibo.com/u/5047649632",
                                "userId": 131758421,
                                "bindingTime": 1536247314147,
                                "expired": true,
                                "expiresIn": 2605086,
                                "id": 6672341742,
                                "type": 2
                            },
                            {
                                "tokenJsonStr": "{\"access_token\":\"6B83BFB897ECF164DFA19ACF1B115DC6\",\"refresh_token\":\"6A38E93C9841BFADA43C9986C8358558\",\"openid\":\"90498CF025426F462637F22A645EBD80\",\"nickname\":\"沉默＆夏天\",\"expires_in\":7776000}",
                                "refreshTime": 1575249875,
                                "url": "",
                                "userId": 131758421,
                                "bindingTime": 1454687568090,
                                "expired": true,
                                "expiresIn": 7776000,
                                "id": 66477727,
                                "type": 5
                            }
                        ],
                        "cookie": "MUSIC_U=ab9be6c0baa3e78ad082c3d9b615d54394226699958ccbf0e595971afa38e02e33a649814e309366; Expires=Thu, 24-Sep-2020 03:55:48 GMT; Path=/;__remember_me=true; Expires=Thu, 24-Sep-2020 03:55:48 GMT; Path=/;__csrf=ebfcbeb948e1ff39e8a14a17913cdf57; Expires=Thu, 24-Sep-2020 03:55:58 GMT; Path=/"
                    }
                      */
                    if (res.code === 200) {
                        const { account, profile, bindings } = res
                        commit('setCookie', res.cookie)
                        commit('setData', { account, profile, bindings })
                        resolve(res)
                    }
                }).catch(err => reject(err))
            })
        }
    }
}

<template>
    <div class="user-dialog flexbox-v align-c"
    @click.stop
    @dblclick.stop>
        <div class="user-dialog-item flexbox-h">
            <div class="flex-3 tl flexbox-h">
                <div class="avatar">
                    <img :src="userinfo.profile.avatarUrl" alt="">
                </div>
                <div class="username">{{userinfo.profile.nickname}}</div>
            </div>
            <div class="flex-2 tr" v-if="userinfo">
                <button class="sign-btn" :disabled="userinfo.isSign" :class="{'signed': userinfo.isSign}" @click="onSign">{{userinfo.isSign ? '已签到':'签到'}}</button>
            </div>
        </div>
        <div class="user-dialog-item flexbox-h  border-b">
            <div class="flex-1  border-r">
                <div class="num">{{userinfo.profile.eventCount}}</div>
                <span class="txt">动态</span>
            </div>
            <div class="flex-1 border-r">
                <div class="num">{{userinfo.profile.follows}}</div>
                <span class="txt">关注</span>
            </div>
            <div class="flex-1">
                <div class="num">{{userinfo.profile.followeds}}</div>
                <span class="txt">粉丝</span>
            </div>
        </div>
        <div class="user-dialog-item flexbox-h align-c">
            <div class="flex-2 tl">
                <i class="icon-music-user icon flex-1"></i>
                <span class="txt">会员中心</span>
            </div>
            <div class="flex-1 tr">
                <span class="txt txt-right">未订购</span>
                <i class="icon-music-right icon"></i>
            </div>
        </div>
        <div class="user-dialog-item flexbox-h align-c">
            <div class="flex-2 tl">
                <i class="icon-music-user icon flex-1"></i>
                <span class="txt">等级</span>
            </div>
            <div class="flex-1 tr">
                <span class="txt txt-right">Lv.9</span>
                <i class="icon-music-right icon"></i>
            </div>
        </div>
        <div class="user-dialog-item flexbox-h align-c border-b">
            <div class="flex-2 tl" @click="toStore">
                <i class="icon-music-user icon flex-1"></i>
                <span class="txt">商城</span>
                <span class="icon-new">new</span>
            </div>
            <div class="flex-1 tr">
                <i class="icon-music-right icon"></i>
            </div>
        </div>
        <div class="user-dialog-item flexbox-h align-c">
            <div class="flex-2 tl">
                <i class="icon-music-user icon flex-1"></i>
                <span class="txt">个人信息设置</span>
            </div>
            <div class="flex-1 tr">
                <i class="icon-music-right icon"></i>
            </div>
        </div>
        <div class="user-dialog-item flexbox-h align-c border-b">
            <div class="flex-2 tl">
                <i class="icon-music-user icon flex-1"></i>
                <span class="txt">绑定社交账号</span>
            </div>
            <div class="flex-1 tr">
                <span
                class="icons"
                :class="{
                    'icon-music-weibo': item.type == 2,
                    'icon-music-qq': item.type == 5,
                    }"
                v-for="item in userinfo.bindings"
                :key="item.type"
                ></span>
                <i class="icon-music-right icon"></i>
            </div>
        </div>
        <div class="user-dialog-item flexbox-h align-c">
            <div class="logout-btn flex-1 tl" @click="onLogout">
                <i class="icon-music-user icon flex-1"></i>
                <span class="txt">退出登录</span>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.container .music-box
.header .user-dialog {
    width: 260px;
    min-height: 340px;
    background: @white;
    padding: 10px 0 0;
    z-index: 10000;
    overflow: hidden;
    .btn-close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
    .border-b {
        border-bottom: 1px solid @c-e8;
    }
    .border-r {
        border-right: 1px solid @c-e8;
    }
    &-item {
        line-height: 22px;
        width: 100%;
        padding: 8px 10px 8px 15px;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
            background-color: @c-eee;
        }
        &:first-child,
        &:nth-child(2) {
            padding-left: 10px;
            &:hover {
            background-color: transparent;
        }
        }
        &:last-child {
            margin-bottom: 0;
        }
        .avatar {
            width: 40px;
            height: 40px;
            background: @c-ccc;
            border-radius: 40px;
        }
        .username {
            margin-left: 15px;
            font-size: 14px;
            color: @c-333;
        }
        .sign-btn {
            padding: 5px 10px;
            color: @c-666;
            border: 1px solid @c-ccc;
            background-color: @white;
            cursor: pointer;
            font-size: 12px;
            border-radius: 4px;
            &.signed{
                color: @c-999;
                border: 1px solid @c-e8;
            }
        }
        .logout-btn {
            padding: 10px 0;
        }
        .txt {
            color: @c-333;
            margin: 0 10px;
            &-right {
                color: @c-999;
            }
        }
        .num {
            font-size: 14px;
            font-family: 微软雅黑;
            font-weight: bold;
            color: @c-333;
        }
        input {
            width: auto;
            color: @c-333;
        }
        label,span {
            color: @c-999;
        }
        input[type="checkbox"] {
            margin-right: 5px;
        }
        input[type="button"] {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            color: @white;
            border-radius: 3px;
            cursor: pointer;
            background: @primary;
        }
        label {
            color: @c-999;
            font-size: 12px;
        }
        .reset {
            padding-left: 10px;
        }
        a {
            color: deepskyblue;
        }
    }
}
</style>
<script>
import {
    // ref,
    // computed,
    watch,
    reactive,
    toRefs,
    computed,
    onBeforeMount
    // getCurrentInstance
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    useRouter
} from 'vue-router'
/**
 *{
    "value": {
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
        "profile": {
            "description": "",
            "followed": false,
            "backgroundUrl": "https://p4.music.126.net/JOeEADrpadltxtMTvJsqmQ==/109951163537002606.jpg",
            "detailDescription": "",
            "userId": 131758421,
            "avatarImgId": 19112810625833836,
            "birthday": 745774417464,
            "nickname": "大唐江流儿",
            "gender": 1,
            "accountStatus": 0,
            "vipType": 0,
            "djStatus": 0,
            "experts": {},
            "mutual": false,
            "remarkName": null,
            "expertTags": null,
            "authStatus": 0,
            "city": 360700,
            "backgroundImgId": 109951163537002610,
            "userType": 0,
            "avatarUrl": "https://p4.music.126.net/lpclpDDnP3Qd38aR0la5ug==/19112810625833837.jpg",
            "province": 360000,
            "defaultAvatar": false,
            "avatarImgIdStr": "19112810625833837",
            "backgroundImgIdStr": "109951163537002606",
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
                "bindingTime": 1454687584851,
                "refreshTime": 1454687584,
                "url": "",
                "userId": 131758421,
                "tokenJsonStr": "{\"countrycode\":\"\",\"cellphone\":\"18146681848\",\"hasPassword\":true}",
                "expiresIn": 2147483647,
                "expired": false,
                "id": 66490623,
                "type": 1
            },
            {
                "bindingTime": 1536247314147,
                "refreshTime": 1588814100,
                "url": "http://weibo.com/u/5047649632",
                "userId": 131758421,
                "tokenJsonStr": "{\"access_token\":\"2.00kP7bVF0Gg4617a5a9413820nRO3p\",\"refresh_token\":\"2.00kP7bVF0Gg461015c551ca90CRZh2\",\"uid\":\"5047649632\",\"expires_in\":\"2605086\",\"screen_name\":\"牛仔很lei\",\"id\":5047649632,\"idstr\":\"5047649632\",\"class\":1,\"name\":\"牛仔很lei\",\"province\":\"36\",\"city\":\"7\",\"location\":\"江西 赣州\",\"description\":\"没什么好说的，快乐就好\",\"url\":\"\",\"profile_image_url\":\"http://tvax1.sinaimg.cn/crop.0.0.960.960.50/005vBqfKly8fj6hlnbzxyj30qo0qomzf.jpg\",\"cover_image_phone\":\"http://ww1.sinaimg.cn/crop.0.0.640.640.640/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg\",\"profile_url\":\"u/5047649632\",\"domain\":\"\",\"weihao\":\"\",\"gender\":\"m\",\"followers_count\":52,\"friends_count\":253,\"pagefriends_count\":8,\"statuses_count\":278,\"video_status_count\":0,\"favourites_count\":1,\"created_at\":\"Tue Feb 25 17:20:45 +0800 2014\",\"following\":false,\"allow_all_act_msg\":false,\"geo_enabled\":true,\"verified\":false,\"verified_type\":-1,\"remark\":\"\",\"insecurity\":{\"sexual_content\":false},\"status\":{\"created_at\":\"Mon Sep 24 11:35:35 +0800 2018\",\"id\":4287739136421321,\"idstr\":\"4287739136421321\",\"mid\":\"4287739136421321\",\"can_edit\":false,\"text\":\"//@MIUI:转发抽送 1 台小米8青春版！有一种多彩竟然可以无中生有？来看清华大学博士@毕导THU 为你解密 [并不简单]\",\"source_allowclick\":1,\"source_type\":1,\"source\":\"<a href=\\\"http://app.weibo.com/t/feed/KojnI\\\" rel=\\\"nofollow\\\">nubia Z11 无边框手机</a>\",\"favorited\":false,\"truncated\":false,\"in_reply_to_status_id\":\"\",\"in_reply_to_user_id\":\"\",\"in_reply_to_screen_name\":\"\",\"pic_urls\":[],\"geo\":null,\"is_paid\":false,\"mblog_vip_type\":0,\"annotations\":[{\"client_mblogid\":\"bafee686-3dda-48f7-860b-7b049eab6823\"},{\"mapi_request\":true}],\"reposts_count\":0,\"comments_count\":0,\"attitudes_count\":0,\"pending_approval_count\":0,\"isLongText\":false,\"hide_flag\":0,\"mlevel\":0,\"visible\":{\"type\":0,\"list_id\":0},\"biz_feature\":0,\"hasActionTypeCard\":0,\"darwin_tags\":[],\"hot_weibo_tags\":[],\"text_tag_tips\":[],\"mblogtype\":0,\"rid\":\"0\",\"userType\":0,\"more_info_type\":0,\"positive_recom_flag\":0,\"content_auth\":0,\"gif_ids\":\"\",\"is_show_bulletin\":2,\"comment_manage_info\":{\"comment_permission_type\":-1,\"approval_comment_type\":0}},\"ptype\":0,\"allow_all_comment\":true,\"avatar_large\":\"http://tvax1.sinaimg.cn/crop.0.0.960.960.180/005vBqfKly8fj6hlnbzxyj30qo0qomzf.jpg\",\"avatar_hd\":\"http://tvax1.sinaimg.cn/crop.0.0.960.960.1024/005vBqfKly8fj6hlnbzxyj30qo0qomzf.jpg\",\"verified_reason\":\"\",\"verified_trade\":\"\",\"verified_reason_url\":\"\",\"verified_source\":\"\",\"verified_source_url\":\"\",\"follow_me\":false,\"like\":false,\"like_me\":false,\"online_status\":0,\"bi_followers_count\":23,\"lang\":\"zh-cn\",\"star\":0,\"mbtype\":0,\"mbrank\":0,\"block_word\":0,\"block_app\":0,\"credit_score\":80,\"user_ability\":33555456,\"cardid\":\"star_037\",\"avatargj_id\":\"gj_vip_182\",\"urank\":14,\"story_read_state\":-1,\"vclub_member\":0,\"data\":0,\"code\":-1587863616728,\"message\":\"服务器返回异常状态[0]!\",\"rawdata\":\"\",\"AnonymousUserId\":null}",
                "expiresIn": 2605086,
                "expired": true,
                "id": 6672341742,
                "type": 2
            },
            {
                "bindingTime": 1454687568090,
                "refreshTime": 1575249875,
                "url": "",
                "userId": 131758421,
                "tokenJsonStr": "{\"access_token\":\"6B83BFB897ECF164DFA19ACF1B115DC6\",\"refresh_token\":\"6A38E93C9841BFADA43C9986C8358558\",\"openid\":\"90498CF025426F462637F22A645EBD80\",\"nickname\":\"沉默＆夏天\",\"expires_in\":7776000}",
                "expiresIn": 7776000,
                "expired": true,
                "id": 66477727,
                "type": 5
            }
        ]
    }
}
 */
export default {
    name: 'userinfoDialog',
    setup (props, { emit }) {
        const store = useStore()
        const userInfo = store.state.user.userInfo
        const state = reactive({
            userinfo: {
                account: {},
                isSigned: false,
                profile: {},
                bindings: {},
                isSign: userInfo.isSign || false,
                ...computed(() => store.state.user.userInfo)
            }
        })
        const router = useRouter()
        watch(() => store.state.user.userInfo.isSign, (value) => {
            value && state.userInfo && (state.userInfo.isSign = value)
        })
        const onClose = () => {
            emit('on-close', true)
        }
        const toStore = () => {
            window.open('https://music.163.com/store/product')
        }
        const onLogout = () => {
            store.dispatch('user/logout').then(res => {
                emit('on-logout', true)
            })
        }
        onBeforeMount(() => {
            getData()
        })
        const getData = () => {
            // console.log(userInfo, 'userInfo.account.id')
            if (store.state.user.cookie && userInfo.profile.userId) {
                store.dispatch('user/getUserInfo', { uid: userInfo.profile.userId }).then(res => {})
            }
        }
        const onSign = () => {
            store.dispatch('user/sign').then(res => {
                emit('on-sign', true)
            })
        }
        return {
            router,
            onClose,
            onLogout,
            onSign,
            toStore,
            ...toRefs(state)
        }
    }
}
</script>

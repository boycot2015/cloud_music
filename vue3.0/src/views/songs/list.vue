<template>
  <div class="song-detail-list">
        <div class="cover flexbox-h">
        </div>
        <div class="list-header flexbox-h just-b">
            <div class="order tl">
                <span class="num"></span>
            </div>
            <div class="opera flex-1">
                操作
            </div>
            <div class="opera flex-4">
                音乐标题
            </div>
            <div class="opera flex-2">
                歌手
            </div>
            <div class="opera flex-2">
                专辑
            </div>
            <div class="opera flex-1">
                时长
            </div>
        </div>
        <div class="wrap">
            <ul class="music-list js-footer-music-list song-list">
                <li class="music-list-item flexbox-h jsut-b">
                    <span class="name flex-1">一眼万年</span>
                    <span class="source flex-4 line-one">(电视剧《孤独天下》片尾曲)</span>
                    <span class="singer flex-1">群星</span>
                    <span class="icon-music-link"></span>
                    <span class="time tr flex-1">00:00</span>
                </li>
            </ul>
        </div>
        <div class="img">
            <img :src="coverDetail.coverImgUrl" alt="">
        </div>
        <div class="text">
            <div class="top clearfix">
                <span class="type fl">歌单</span>
                <p class="name fl">{{coverDetail.name}}</p>
                <div class="count fr flexbox-h just-b">
                    <div class="play-count tr">
                        <p class="name">歌曲数</p>
                        <span class="num">{{coverDetail.trackCount}}</span>
                    </div>
                    <div class="play-count tr">
                        <p class="name">播放数</p>
                        <span class="num">{{coverDetail.playCount}}</span>
                    </div>
                </div>
            </div>
            <div class="userinfo flexbox-h">
                <div class="avatar fl">
                    <img :src="coverDetail.creator.avatarUrl" alt="">
                </div>
                <div class="username fl">{{coverDetail.creator.nickname}}</div>
                <div class="create-time fl"><span>{{coverDetail.createTime}}</span>创建</div>
            </div>
            <div class="operation flexbox-h">
                <div class="play-btn play">
                    <i class="icon-music-pause"></i>
                    <span>播放全部</span>
                    <i class="icon-plus icon-music-plus"></i>
                </div>
                <div class="play-btn collect">
                    <i class="icon-music-collect"></i>
                    <span>收藏({{coverDetail.subscribedCount}})</span>
                </div>
                <div class="play-btn share">
                    <i class="icon-music-share"></i>
                    <span>分享({{coverDetail.shareCount}})</span>
                </div>
                <div class="play-btn download">
                    <i class="icon-music-download"></i>
                    <span>下载全部</span>
                </div>
            </div>
            <div class="tags flexbox-h">
                <p class="name">标签：</p>
                <span
                    class="tag"
                    v-for="tag in coverDetail.tags" :key="tag.id"
                    v-html="tag + (tindex < coverDetail.tags.length - 1 ? ' /': '')">
                </span>
            </div>
            <div class="desc line-two" v-if="coverDetail.description && coverDetail.description !== null">
                <p>{{coverDetail.description}}</p>
                <i class="icon-music-down js-more" v-if=" coverDetail.description.length > 50"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            coverDetail: {}
        }
    }
}
</script>

<style>

</style>

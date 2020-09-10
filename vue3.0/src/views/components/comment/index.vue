<template>
    <div class="comment">
        <template v-if="data.hotComments && data.hotComments.length">
            <h2 class="title">{{title}}<span>(已有{{data.total}}条评论)</span></h2>
            <h3 class="title">精彩评论({{data.hotComments.length}})</h3>
            <div v-for="hotComment in data.hotComments" :key="hotComment.id" class="comment-item clearfix">
                <div class="avatar fl">
                    <img :src="hotComment.user.avatarUrl" alt="">
                </div>
                <div class="text fl">
                    <p class="name">
                        {{hotComment.user.nickname}}:
                        <span class="desc">{{hotComment.content}}</span>
                    </p>
                    <template v-if="hotComment.beReplied.length">
                        <p class="name reply" v-for="beReplied in hotComment.beReplied" :key="beReplied.id">
                            @{{beReplied.user.nickname}}:
                            <span class="desc">{{beReplied.content}}</span>
                        </p>
                    </template>
                    <div class="info flexbox-h just-b">
                        <span class="time flex-1 tl">{{hotComment.time}}</span>
                        <div class="right flex-3 tr">
                            <span class="star">
                                <i class="icon-music-star"></i>
                                <i class="num" v-if="hotComment.likedCount">({{hotComment.likedCount}})</i>
                            </span>
                            <span class="share">分享</span>
                            <span class="repeat">回复</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="data.comments && data.comments.length">
            <h3 class="title">最新评论({{data.total - data.hotComments.length}})</h3>
            <div v-for="comment in data.comments" :key="comment.id" class="comment-item clearfix">
                <div class="avatar fl">
                    <img :src="comment.user.avatarUrl" alt="">
                </div>
                <div class="text fl">
                    <p class="name">
                        {{comment.user.nickname}}：
                        <span class="desc">{{comment.content}}</span>
                    </p>
                    <template v-if="comment.beReplied.length">
                        <p class="name reply" v-for="beReplied in comment.beReplied" :key="beReplied.id">
                            @{{beReplied.user.nickname}}:
                            <span class="desc">{{beReplied.content}}</span>
                        </p>
                    </template>
                    <div class="info flexbox-h just-b">
                        <span class="time flex-1 tl">{{comment.time}}</span>
                        <div class="right flex-3 tr">
                            <span class="star">
                                <i class="icon-music-star"></i>
                                <i class="num" v-if="comment.likedCount">({{comment.likedCount}})</i>
                            </span>
                            <span class="share">分享</span>
                            <span class="repeat">回复</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        title: {
            type: String,
            default: '听友评论'
        }
    }
}
</script>

<style>

</style>

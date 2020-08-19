<template>
    <li class="music-list-item flexbox-h jsut-b" data-id="{{data.id}}">
        <div class="order tr" v-if="order">
            <span class="num" v-html="(index + 1) < 10 ? '0' + (index + 1) : (index + 1)"></span>
        </div>
        <div class="operation tc flex-1" v-if="operation">
            <span class="icon-music-love"></span>
            <span class="icon-music-download"></span>
        </div>
        <div class="sing-info flex-4 line-one">
            <span class="name">{{data.name}}</span>
            <span class="source ">{{data.al.name}}</span>
        </div>
        <template v-if="data.ar && !isminiPlay">
            <span class="singer line-one flex-2">
                <i v-for="(singer, cindex) in data.ar " :key="cindex" v-html="singer.name + (cindex < data.ar.length - 1 ? '/' : '')"></i>
            </span>
            <span class="collect line-one flex-2" v-if="isPlay">{{data.al.name}}</span>
            <span class="icon-music-link" v-if="order && !isminiPlay"></span>
            <span class="time {{order ? 'tl': 'tr'}} flex-1">{{data.dt}}</span>
        </template>
    </li>
</template>

<script>
export default {
    props: {
        data: {
            type: [Object],
            default: () => ({})
        },
        operation: {
            type: Boolean,
            default: true
        },
        isminiPlay: {
            type: Boolean,
            default: false
        },
        isPlay: {
            type: Boolean,
            default: true
        },
        order: {
            type: Boolean,
            default: true
        },
        index: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style>

</style>

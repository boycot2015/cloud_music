<template>
  <div class="aside js-aside">
        <div class="aside-list js-aside-template">
            <div
            v-for="($value, findex) in menu"
            :key="$value.name"
            :class="{'unfold': $value.meta.unfold}"
            class="aside-item">
                <div
                class="title flexbox-h just-b js-toggle-class"
                :class="
                (activeClass && findex === activeFindex || $value.meta.unfold) && 'active '"
                @click="() => {activeClass = !activeClass; activeFindex = findex}"
                data-path="{{$value.path}}">
                    <p class="name">{{$value.meta.title}}</p>
                    <span class="icon" :class="`icon-music-${$value.meta.icon}`">{{!$value.meta.unfold ? '>' : ''}}</span>
                </div>
                <ul class="list" :class="{'active': activeClass && findex === activeFindex || $value.meta.unfold}">
                    <li
                    v-for="(item) in $value.children"
                    :key="item.name"
                    data-path="{{$value.children[cIndex].path}}"
                    @click="() => activeRoute = item.path"
                    :class="{'active': activeRoute === item.path }"
                    class="list-item js-list-item flexbox-h">
                        <router-link :to="item.path">
                            <span class="icon" :class="`icon-music-${item.meta.icon}`"></span>
                            <span class="name">{{item.meta.title}}</span>
                            <span class="icon flex-1 tr" :class="`icon-music-${item.meta.rightIcon}`"></span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="music-info flexbox-h" data-id="">
            <div class="mask">
                <i class="icon icon-music-max"></i>
            </div>
            <div class="img tl">
                <img src="@/assets/images/avatar.jpg" alt="">
            </div>
            <div class="text flex-3">
                <div class="top flexbox-h just-b">
                    <p class="name line-one">至尊宝</p>
                    <span class="js-love-icon star-icon icon-music-love"></span>
                </div>
                <div class="bottom flexbox-h just-b">
                    <p class="singer line-one">徐良/杨威</p>
                    <span class="share-icon icon-music-share"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    // ref,
    // computed,
    // watch,
    getCurrentInstance
} from 'vue'
export default {
    data () {
        return {
            // menu: routes
            activeFindex: '',
            activeRoute: '/index',
            activeClass: false
        }
    },
    setup () {
        const { ctx } = getCurrentInstance()
        const menu = ctx.$router.options.routes.filter(_ => !_.meta.hideInMenu)
        console.log(menu)
        return {
            menu
        }
    }
}
</script>

<style>

</style>

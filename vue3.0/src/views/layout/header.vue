<template>
    <div class="header flexbox-h">
        <div class="logo flexbox-h js-logo">
            <div class="logo-icon icon-music-logo-icon"></div>
            <h3 class="logo-title">网抑云音乐</h3>
        </div>
        <div class="back-forward tc flexbox-h">
            <div class="back-btn">&lt;</div>
            <div class="forward-btn">&gt;</div>
        </div>
        <div class="search-box flexbox-h">
            <input type="text" placeholder="搜索音乐，视频，歌词，电台">
            <div class="input-icon fa fa-search"></div>
        </div>
        <div class="user-info flex-3 tc just-c flexbox-h">
            <div class="avatar ">
                <img src="@/assets/images/avatar.jpg" alt="">
            </div>
            <div class="text name">
                <span class="name">大唐江流儿</span>
                <i class="fa fa-caret-down"></i>
            </div>
            <span class="text vip-text">开通VIP</span>
            <div class="text icon theme icon-music-clothes"></div>
            <div class="text icon message icon-music-msg"></div>
            <div class="text icon setting icon-music-setting"></div>
        </div>
        <div class="operation flex-1 align-c flexbox-h tc just-c">
            <i class="full-sreen-btn flex-1 icon-music-min js-music-min"></i>
            <i class="full-sreen-btn flex-1 fa icon-music-minus js-music-minus"></i>
            <i class="min-btn flex-1 icon-music-rectangle js-music-rectangle"></i>
            <i class="close-btn flex-1 icon-music-close js-music-close"></i>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

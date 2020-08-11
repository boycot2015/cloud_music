'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
    var _swiperOption;

    // 首页个性推荐tab
    var homeData = {
        swiperOption: (_swiperOption = {
            // direction: 'vertical', // 垂直切换选项
            slidesPerView: 1
        }, _defineProperty(_swiperOption, 'slidesPerView', 'auto'), _defineProperty(_swiperOption, 'effect', 'coverflow'), _defineProperty(_swiperOption, 'centeredSlides', true), _defineProperty(_swiperOption, 'coverflowEffect', {
            rotate: 0,
            stretch: 100,
            depth: 50,
            modifier: 3,
            slideShadows: false
        }), _defineProperty(_swiperOption, 'autoplay', {
            delay: 5000,
            disableOnInteraction: false
        }), _defineProperty(_swiperOption, 'pagination', {
            el: '.swiper-pagination',
            clickable: true
        }), _defineProperty(_swiperOption, 'loop', true), _defineProperty(_swiperOption, 'navigation', {
            nextEl: '.button-next',
            prevEl: '.button-prev'
        }), _defineProperty(_swiperOption, 'speed', 400), _swiperOption),
        constantTemp: {
            recommend: ''

        },
        tabMenu: [{
            name: '个性推荐',
            type: 'home'
        }, {
            name: '歌单',
            type: 'cate'
        }, {
            name: '主播电台',
            type: 'dj'
        }, {
            name: '排行榜',
            type: 'ph'
        }, {
            name: '歌手',
            type: 'singer'
        }, {
            name: '最新音乐',
            type: 'newest'
        }],
        setLocal: function setLocal() {
            var banner = $.$store.get('banner');
            var mvList = $.$store.get('mvList');
            var recommendList = $.$store.get('recommendList');
            var djList = $.$store.get('djList');
            var newestList = $.$store.get('newestList');
            var privatecontentList = $.$store.get('privatecontentList');
            banner !== null && $('.swiper-wrapper').render($(layoutTemp).find('#bannerTemp'), banner);
            mvList !== null && $('.tab-home-content .recommend-list').render($(layoutTemp).find('#gridListTemp'), recommendList, this.constantTemp.recommend);
            recommendList !== null && $('.dj-list').render($(layoutTemp).find('#gridListTemp'), djList);
            djList !== null && $('.mv-list').render($(layoutTemp).find('#gridListTemp'), mvList);
            newestList !== null && $('.newest-list').render($(layoutTemp).find('#gridListTemp'), newestList);
            privatecontentList !== null && $('.privatecontent-list').render($(layoutTemp).find('#gridListTemp'), privatecontentList);
            return banner || mvList || recommendList || djList || newestList || privatecontentList;
        },
        init: function init() {
            $('.tab-home-content .recommend-list').find('.date-text').html(new Date().getDate()).siblings('.week').html(commonObj.weeks[new Date().getDay()]);
            this.constantTemp.recommend = $('.tab-home-content .recommend-list').html();
            $('.music-home .tab-list').render($(contentTemp).find('#tabsTemp'), { list: this.tabMenu });
            if (this.setLocal() == null) {
                this.getBanner();
                this.getRecommend();
                this.getPrivatecontent();
                this.getTopSong();
                this.getMVList();
                this.getDjRecommend();
            } else {
                new Swiper('.swiper-container', homeData.swiperOption);
            }
            this.onShow();
        },
        getBanner: function getBanner() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { json: 1 },
                url: apiUrls.home.banner,
                success: function success(data) {
                    $('.swiper-wrapper').render($(layoutTemp).find('#bannerTemp'), { list: data.banners });
                    $.$store.set('banner', { list: data.banners }, new Date().getTime() + 60 * 1000);
                    // console.log(data.banners, 'apiUrl.banner')
                    new Swiper('.swiper-container', homeData.swiperOption);
                }
            });
        },
        getRecommend: function getRecommend() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 9 },
                url: apiUrls.home.personalized,
                success: function success(data) {
                    var res = data.result;
                    res.forEach(function (item) {
                        item.playCount = $.filterPlayCount(item.playCount);
                    });
                    $('.tab-home-content .recommend-list').render($(layoutTemp).find('#gridListTemp'), { list: res }, homeData.constantTemp.recommend);
                    $.$store.set('recommendList', { list: res }, new Date().getTime() + 60 * 1000);
                }
            });
        },
        getPrivatecontent: function getPrivatecontent() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 9 },
                url: apiUrls.home.privatecontent,
                success: function success(data) {
                    var res = data.result;
                    // console.log(data.result, 'apiUrl.personalizedTemp')
                    $('.privatecontent-list').render($(layoutTemp).find('#gridListTemp'), { list: res });
                    $.$store.set('privatecontentList', { list: res }, new Date().getTime() + 60 * 1000);
                }
            });
        },
        getTopSong: function getTopSong() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 9 },
                url: apiUrls.home.topSong,
                success: function success(data) {
                    var res = data.data.slice(0, 10);
                    res = [{
                        ftype: 0,
                        list: res.slice(0, 5)
                    }, {
                        ftype: 0,
                        list: res.slice(5, 10)
                    }];
                    // console.log(res, 'apiUrl.newest')
                    $('.newest-list').render($(layoutTemp).find('#gridListTemp'), { list: res });
                    $.$store.set('newestList', { list: res }, new Date().getTime() + 60 * 1000);
                }
            });
        },
        getMVList: function getMVList() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 9 },
                url: apiUrls.home.mv,
                success: function success(data) {
                    if (data.code == 200) {
                        var res = data.result.slice(0, 3);
                        $('.mv-list').render($(layoutTemp).find('#gridListTemp'), { list: res, category: data.category });
                        $.$store.set('mvList', { list: res, category: data.category }, new Date().getTime() + 60 * 1000);
                    }
                }
            });
        },
        getDjRecommend: function getDjRecommend() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 5 },
                url: apiUrls.home.djrecommend,
                success: function success(data) {
                    if (data.code == 200) {
                        // console.log(data, 'apiUrl.personalizedTemp')
                        var res = data.djRadios.slice(0, 5);
                        $('.dj-list').render($(layoutTemp).find('#gridListTemp'), { list: res, category: data.category });
                        $.$store.set('djList', { list: res, category: data.category }, new Date().getTime() + 60 * 1000);
                    }
                }
            });
        },
        onShow: function onShow() {
            $(document).on('click', '.js-list-detail', function () {
                var id = $(this).attr('data-id');
                var type = $(this).attr('data-type');
                var ctype = $(this).attr('data-ctype');
                $.$router.push('/songs/list', { id: id, type: type, ctype: ctype });
            });
            $('.tab-content .recommend .more').click(function () {
                $('.js-tab-item').eq(1).click();
            });
            $('.tab-content .newest-song .more').click(function () {
                $('.js-tab-item').eq(5).click();
            });
            $('.tab-content .recommend .more').click(function () {
                $('.js-tab-item').eq(1).click();
            });
            $('.tab-content .recommend .more').click(function () {
                $('.js-tab-item').eq(1).click();
            });
        }
    };

    // 歌单tab
    var singleListData = {
        data: {
            query: {}
        },
        setLocal: function setLocal() {
            var hotCateList = $.$store.get('hotCateList');
            var cateList = $.$store.get('cateList');
            var songCateList = $.$store.get('songCateList');
            hotCateList !== null && $('.tab-cate-content .tags .cates').render($(contentTemp).find('#hotCateTemp'), { data: hotCateList });
            songCateList !== null && $('.tab-cate-content .recommend-list').render($(layoutTemp).find('#gridListTemp'), songCateList, this.constantTemp.recommend);
            cateList !== null && $('.mask-cate').render($(contentTemp).find('#cateListTemp'), { data: cateList });
            return hotCateList && cateList && songCateList;
        },

        constantTemp: { // 模块固定模板
            recommend: ''
        },
        init: function init() {
            this.constantTemp.recommend = $('.tab-cate-content .recommend-list').html();
            this.onShow();
        },
        getCateList: function getCateList() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 50 },
                url: apiUrls.song.catlist,
                success: function success(data) {
                    if (data.code == 200) {
                        (function () {
                            var subs = [];
                            var sub = data.sub,
                                all = data.all,
                                categories = data.categories;

                            var _loop = function _loop(key) {
                                subs[key] = [];
                                data.sub.map(function (el) {
                                    if (el.category == key) {
                                        subs[key].push(el);
                                    }
                                });
                            };

                            for (var key in data.categories) {
                                _loop(key);
                            }
                            data.subs = subs;
                            // console.log($('.tab-cate-content .tags .cates').html(), 'hotCateTemp');
                            $('.tab-cate-content .mask-cate').render($(contentTemp).find('#cateListTemp'), { data: { subs: subs, all: all, categories: categories } });
                            $.$store.set('cateList', data, new Date().getTime() + 5000);
                        })();
                    }
                }
            });
        },
        gethotCate: function gethotCate() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 50 },
                url: apiUrls.song.hotCate,
                success: function success(data) {
                    if (data.code == 200) {
                        // console.log(data, 'hotCateTemp');
                        $('.tab-cate-content .tags .cates').render($(contentTemp).find('#hotCateTemp'), { data: data });
                        $.$store.set('hotCateList', data, new Date().getTime() + 5000);
                    }
                }
            });
        },
        getRecommend: function getRecommend(current, cat) {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 39, order: 'hot', cat: cat, offset: current },
                url: apiUrls.song.topPlaylist,
                success: function success(data) {
                    current = current || 1;
                    // .slice(current - 1, 39)
                    var res = data.playlists;
                    console.log(data, 'apiUrl.personalizedTemp');
                    res.forEach(function (item) {
                        item.playCount = $.filterPlayCount(item.playCount);
                    });
                    singleListData.initPage(data.total);
                    $('.tab-cate-content .recommend-list').render($(layoutTemp).find('#gridListTemp'), { list: res }, singleListData.constantTemp.recommend);
                    $.$store.set('songCateList', { list: res }, new Date().getTime() + 5000);
                }
            });
        },
        initPage: function initPage(total) {
            $("#cate-page").Page({
                totalPages: total, //total Pages
                liNums: 7, //the li numbers(advice use odd)
                activeClass: 'activP', //active class style
                firstPage: '首页', //first button name
                lastPage: '末页', //last button name
                prv: '<', //prev button name
                next: '>', //next button name
                hasFirstPage: true, //whether has first button
                hasLastPage: true, //whether has last button
                hasPrv: true, //whether has prev button
                hasNext: true, //whether has next button
                callBack: function callBack(page) {
                    //callBack function，page:active page
                    singleListData.getRecommend(page);
                }
            });
        },
        onShow: function onShow() {
            // 顶部tab切换
            $(document).on('click', '.js-tab-item', function () {
                $(this).addClass('active').siblings().removeClass('active');
                $('.tab-content').eq($(this).index()).show().siblings('.tab-content').hide();
                var type = $(this).attr('data-type');
                if (singleListData.setLocal() == null && type == 'cate') {
                    singleListData.getCateList();
                    singleListData.gethotCate();
                    singleListData.getRecommend();
                }
            });
            $('.js-toggle-cate').click(function () {
                $(this).parent().siblings('.mask-cate').toggleClass('active');
            });
            // 点击分类
            $(document).on('click', '.js-cates-item', function () {
                var cate = $(this).attr('data-cate');
                var exist = false;
                $('.js-hot-cate-item').each(function (i, e) {
                    if ($(e).attr('data-cate') == cate) {
                        $(e).addClass('active').siblings('.js-hot-cate-item').removeClass('active');
                        exist = true;
                    }
                });
                !exist && $('.js-hot-cate-item').removeClass('active');
                $(this).addClass('active').siblings().removeClass('active').parent().parent().parent().siblings().find('.js-cates-item').removeClass('active');
                $('.btn-cate').removeClass('active');
                $('.mask-cate').removeClass('active');
                $('.js-hot-cate-item').find().addClass('active');
                $('.js-toggle-cate .text').html(cate);
                singleListData.data.query.cate = cate;
                singleListData.getRecommend(1, cate);
            });
            $(document).on('click', '.js-hot-cate-item', function () {
                var cate = $(this).attr('data-cate');
                $(this).addClass('active').siblings('.js-hot-cate-item').removeClass('active');
                $('.btn-cate').removeClass('active');
                $('.mask-cate').removeClass('active');
                // console.log($('.js-cates-item'), cate);
                $('.js-cates-item').each(function (i, e) {
                    if ($(e).attr('data-cate') == cate) {
                        $(e).addClass('active').siblings().removeClass('active').parent().parent().parent().siblings().find('.js-cates-item').removeClass('active');
                    }
                });
                $('.js-toggle-cate .text').html(cate);
                singleListData.data.query.cate = cate;
                singleListData.getRecommend(1, cate);
            });
            $(document).on('click', '.mask-cate .btn-cate', function () {
                var cate = $(this).attr('data-cate');
                $(this).addClass('active');
                $('.js-cates-item').removeClass('active');
                $('.js-hot-cate-item').removeClass('active');
                $('.mask-cate').removeClass('active');
                $('.js-toggle-cate .text').html(cate);
                singleListData.data.query.cate = '';
                singleListData.getRecommend(1, '');
            });
            $(document).on('click', function (e) {
                // console.log(!$(e.target).parent()[0].contains($('.js-toggle-cate')[0]));
                if (!$('.mask-cate').parent('.tab-content')[0].contains(e.target) && !e.target.contains($('.js-toggle-cate')[0])) {
                    $('.mask-cate').removeClass('active');
                }
            });
        }
    };

    var initData = function initData() {
        homeData.init();
        singleListData.init();
    };
    initData();
});
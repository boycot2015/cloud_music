$(function () {

    // 首页个性推荐tab
    const homeData = {
        swiperOption: {
            // direction: 'vertical', // 垂直切换选项
            slidesPerView: 1,
            // spaceBetween: -40,
            slidesPerView: 'auto',
            effect: 'coverflow',
            centeredSlides: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 100,
                depth: 50,
                modifier: 3,
                slideShadows: false
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true,
            navigation: {
                nextEl: '.button-next',
                prevEl: '.button-prev',
            },
            speed: 400
        },
        constantTemp: {
            recommend: ''

        },
        tabMenu: [
            {
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
            },
        ],
        setLocal () {
            let banner = $.$store.get('banner')
            let mvList = $.$store.get('mvList')
            let recommendList = $.$store.get('recommendList')
            let djList = $.$store.get('djList')
            let newestList = $.$store.get('newestList')
            let privatecontentList = $.$store.get('privatecontentList')
            banner !== null && $('.swiper-wrapper').render($(layoutTemp).find('#bannerTemp'), banner)
            mvList !== null && $('.tab-home-content .recommend-list').render(
                $(layoutTemp).find('#gridListTemp'),
                recommendList, this.constantTemp.recommend)
            recommendList !== null && $('.dj-list').render($(layoutTemp).find('#gridListTemp'), djList)
            djList !== null && $('.mv-list').render($(layoutTemp).find('#gridListTemp'), mvList)
            newestList !== null && $('.newest-list').render($(layoutTemp).find('#gridListTemp'), newestList)
            privatecontentList !== null && $('.privatecontent-list').render($(layoutTemp).find('#gridListTemp'), privatecontentList)
            return banner || mvList || recommendList || djList || newestList || privatecontentList
        },
        init () {
            $('.tab-home-content .recommend-list').find('.date-text').html(new Date().getDate())
                .siblings('.week').html(commonObj.weeks[new Date().getDay()])
            this.constantTemp.recommend = $('.tab-home-content .recommend-list').html()
            $('.music-home .tab-list').render($(contentTemp).find('#tabsTemp'), { list: this.tabMenu })
            if (this.setLocal() == null) {
                this.getBanner();
                this.getRecommend();
                this.getPrivatecontent();
                this.getTopSong();
                this.getMVList();
                this.getDjRecommend();
            } else {
                new Swiper('.swiper-container', homeData.swiperOption)
            }
            this.onShow()
        },
        getBanner () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { json: 1 },
                url: apiUrls.home.banner,
                success (data) {
                    $('.swiper-wrapper').render($(layoutTemp).find('#bannerTemp'), { list: data.banners })
                    $.$store.set('banner', { list: data.banners }, new Date().getTime() + 60 * 1000)
                    // console.log(data.banners, 'apiUrl.banner')
                    new Swiper('.swiper-container', homeData.swiperOption)
                }
            })
        },
        getRecommend () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 9 },
                url: apiUrls.home.personalized,
                success (data) {
                    var res = data.result
                    res.forEach(function (item) {
                        item.playCount = $.filterPlayCount(item.playCount)
                    })
                    $('.tab-home-content .recommend-list').render(
                        $(layoutTemp).find('#gridListTemp'),
                        { list: res },
                        homeData.constantTemp.recommend)
                    $.$store.set('recommendList', { list: res }, new Date().getTime() + 60 * 1000)
                }
            })
        },
        getPrivatecontent () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 9 },
                url: apiUrls.home.privatecontent,
                success (data) {
                    var res = data.result
                    // console.log(data.result, 'apiUrl.personalizedTemp')
                    $('.privatecontent-list').render($(layoutTemp).find('#gridListTemp'), { list: res })
                    $.$store.set('privatecontentList', { list: res }, new Date().getTime() + 60 * 1000)
                }
            })
        },
        getTopSong () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 9 },
                url: apiUrls.home.topSong,
                success (data) {
                    let res = data.data.slice(0, 10)
                    res = [{
                        ftype: 0,
                        list: res.slice(0, 5)
                    }, {
                        ftype: 0,
                        list: res.slice(5, 10)
                    }]
                    // console.log(res, 'apiUrl.newest')
                    $('.newest-list').render($(layoutTemp).find('#gridListTemp'), { list: res })
                    $.$store.set('newestList', { list: res }, new Date().getTime() + 60 * 1000)
                }
            })
        },
        getMVList () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 9 },
                url: apiUrls.home.mv,
                success (data) {
                    if (data.code == 200) {
                        let res = data.result.slice(0, 3)
                        $('.mv-list').render($(layoutTemp).find('#gridListTemp'), { list: res, category: data.category })
                        $.$store.set('mvList', { list: res, category: data.category }, new Date().getTime() + 60 * 1000)
                    }
                }
            })
        },
        getDjRecommend () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 5 },
                url: apiUrls.home.djrecommend,
                success (data) {
                    if (data.code == 200) {
                        // console.log(data, 'apiUrl.personalizedTemp')
                        let res = data.djRadios.slice(0, 5)
                        $('.dj-list').render($(layoutTemp).find('#gridListTemp'), { list: res, category: data.category })
                        $.$store.set('djList', { list: res, category: data.category }, new Date().getTime() + 60 * 1000)
                    }
                }
            })
        },
        onShow () {
            $(document).on('click', '.js-list-detail', function () {
                let id = $(this).attr('data-id')
                let type = $(this).attr('data-type')
                let ctype = $(this).attr('data-ctype')
                $.$router.push('/songs/list', { id, type, ctype })
            })
            $('.tab-content .recommend .more').click(function () {
                $('.js-tab-item').eq(1).click()
            })
            $('.tab-content .newest-song .more').click(function () {
                $('.js-tab-item').eq(5).click()
            })
            $('.tab-content .recommend .more').click(function () {
                $('.js-tab-item').eq(1).click()
            })
            $('.tab-content .recommend .more').click(function () {
                $('.js-tab-item').eq(1).click()
            })
        }
    }

    // 歌单tab
    const singleListData = {
        data: {
            query: {}
        },
        setLocal () {
            let hotCateList = $.$store.get('hotCateList')
            let cateList = $.$store.get('cateList')
            let songCateList = $.$store.get('songCateList')
            hotCateList !== null && $('.tab-cate-content .tags .cates').render(
                $(contentTemp).find('#hotCateTemp'),
                { data: hotCateList })
            songCateList !== null && $('.tab-cate-content .recommend-list').render(
                $(layoutTemp).find('#gridListTemp'),
                songCateList, this.constantTemp.recommend)
            cateList !== null && $('.mask-cate').render($(contentTemp).find('#cateListTemp'), { data: cateList })
            return hotCateList && cateList && songCateList
        },
        constantTemp: { // 模块固定模板
            recommend: ''
        },
        init () {
            this.constantTemp.recommend = $('.tab-cate-content .recommend-list').html()
            this.onShow()
        },
        getCateList () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 50 },
                url: apiUrls.song.catlist,
                success (data) {
                    if (data.code == 200) {
                        let subs = []
                        let { sub, all, categories } = data
                        for (const key in data.categories) {
                            subs[key] = []
                            data.sub.map(el => {
                                if (el.category == key) {
                                    subs[key].push(el)
                                }
                            })
                        }
                        data.subs = subs
                        // console.log($('.tab-cate-content .tags .cates').html(), 'hotCateTemp');
                        $('.tab-cate-content .mask-cate').render($(contentTemp).find('#cateListTemp'), { data: { subs, all, categories } })
                        $.$store.set('cateList', data, new Date().getTime() + 5000);
                    }
                }
            })
        },
        gethotCate () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 50 },
                url: apiUrls.song.hotCate,
                success (data) {
                    if (data.code == 200) {
                        // console.log(data, 'hotCateTemp');
                        $('.tab-cate-content .tags .cates').render($(contentTemp).find('#hotCateTemp'), { data })
                        $.$store.set('hotCateList', data, new Date().getTime() + 5000);
                    }
                }
            })
        },
        getRecommend (current, cat) {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 39, order: 'hot', cat, offset: current },
                url: apiUrls.song.topPlaylist,
                success (data) {
                    current = current || 1
                    // .slice(current - 1, 39)
                    var res = data.playlists
                    console.log(data, 'apiUrl.personalizedTemp')
                    res.forEach(function (item) {
                        item.playCount = $.filterPlayCount(item.playCount)
                    })
                    singleListData.initPage(data.total)
                    $('.tab-cate-content .recommend-list').render(
                        $(layoutTemp).find('#gridListTemp'),
                        { list: res },
                        singleListData.constantTemp.recommend)
                    $.$store.set('songCateList', { list: res }, new Date().getTime() + 5000)
                }
            })
        },
        initPage (total) {
            $("#cate-page").Page({
                totalPages: total,//total Pages
                liNums: 7,//the li numbers(advice use odd)
                activeClass: 'activP', //active class style
                firstPage: '首页',//first button name
                lastPage: '末页',//last button name
                prv: '<',//prev button name
                next: '>',//next button name
                hasFirstPage: true,//whether has first button
                hasLastPage: true,//whether has last button
                hasPrv: true,//whether has prev button
                hasNext: true,//whether has next button
                callBack: function (page) {
                    //callBack function，page:active page
                    singleListData.getRecommend(page)
                }
            });
        },
        onShow () {
            // 顶部tab切换
            $(document).on('click', '.js-tab-item', function () {
                $(this).addClass('active').siblings().removeClass('active')
                $('.tab-content').eq($(this).index()).show().siblings('.tab-content').hide()
                let type = $(this).attr('data-type')
                if (singleListData.setLocal() == null && type == 'cate') {
                    singleListData.getCateList();
                    singleListData.gethotCate();
                    singleListData.getRecommend();
                }
            })
            $('.js-toggle-cate').click(function () {
                $(this).parent().siblings('.mask-cate').toggleClass('active')
            })
            // 点击分类
            $(document).on('click', '.js-cates-item', function () {
                let cate = $(this).attr('data-cate')
                let exist = false
                $('.js-hot-cate-item').each(function (i, e) {
                    if ($(e).attr('data-cate') == cate) {
                        $(e).addClass('active').siblings('.js-hot-cate-item')
                            .removeClass('active')
                        exist = true
                    }
                })
                !exist && $('.js-hot-cate-item').removeClass('active')
                $(this).addClass('active').siblings().removeClass('active')
                    .parent().parent().parent().siblings()
                    .find('.js-cates-item').removeClass('active')
                $('.btn-cate').removeClass('active')
                $('.mask-cate').removeClass('active')
                $('.js-hot-cate-item').find().addClass('active')
                $('.js-toggle-cate .text').html(cate)
                singleListData.data.query.cate = cate
                singleListData.getRecommend(1, cate)
            })
            $(document).on('click', '.js-hot-cate-item', function () {
                let cate = $(this).attr('data-cate')
                $(this).addClass('active').siblings('.js-hot-cate-item')
                    .removeClass('active')
                $('.btn-cate').removeClass('active')
                $('.mask-cate').removeClass('active')
                // console.log($('.js-cates-item'), cate);
                $('.js-cates-item').each(function (i, e) {
                    if ($(e).attr('data-cate') == cate) {
                        $(e).addClass('active').siblings().removeClass('active')
                            .parent().parent().parent().siblings()
                            .find('.js-cates-item').removeClass('active')
                    }
                })
                $('.js-toggle-cate .text').html(cate)
                singleListData.data.query.cate = cate
                singleListData.getRecommend(1, cate)
            })
            $(document).on('click', '.mask-cate .btn-cate', function () {
                let cate = $(this).attr('data-cate')
                $(this).addClass('active')
                $('.js-cates-item').removeClass('active')
                $('.js-hot-cate-item').removeClass('active')
                $('.mask-cate').removeClass('active')
                $('.js-toggle-cate .text').html(cate)
                singleListData.data.query.cate = ''
                singleListData.getRecommend(1, '')
            })
            $(document).on('click', function (e) {
                // console.log(!$(e.target).parent()[0].contains($('.js-toggle-cate')[0]));
                if (!$('.mask-cate').parent('.tab-content')[0].contains(e.target) && !e.target.contains($('.js-toggle-cate')[0])) {
                    $('.mask-cate').removeClass('active')
                }
            })
        }
    }

    const initData = () => {
        homeData.init()
        singleListData.init()
    }
    initData()
})
$(function () {

    // 首页个性推荐tab
    const homeData = {
        swiperOption: {
            // direction: 'vertical', // 垂直切换选项
            slidesPerView: 1,
            // spaceBetween: -40,
            // slidesPerView: 'auto',
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
            speed: 500
        },
        setLocal () {
            let banner = $.$store.get('banner')
            let mvList = $.$store.get('mvList')
            let recommendList = $.$store.get('recommendList')
            let djList = $.$store.get('djList')
            let newestList = $.$store.get('newestList')
            let privatecontentList = $.$store.get('privatecontentList')
            $('.tab-home-content .recommend-list').find('.date-text').html(new Date().getDate())
                .siblings('.week').html(commonObj.weeks[new Date().getDay()])
            $('.swiper-wrapper').render($(layoutTemp).find('#bannerTemp'), banner)
            $('.tab-home-content .recommend-list').render($(layoutTemp).find('#gridListTemp'), recommendList)
            $('.dj-list').render($(layoutTemp).find('#gridListTemp'), djList)
            $('.mv-list').render($(layoutTemp).find('#gridListTemp'), mvList)
            $('.newest-list').render($(layoutTemp).find('#gridListTemp'), newestList)
            $('.privatecontent-list').render($(layoutTemp).find('#gridListTemp'), privatecontentList)
            return banner || mvList || recommendList || djList || newestList || privatecontentList
        },
        init () {
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
                    $('.tab-home-content .recommend-list').render($(layoutTemp).find('#gridListTemp'), { list: res })
                    $.$store.set('recommendList', { list: res }, new Date().getTime() + 60 * 1000)
                    console.log($.$store.get('recommendList'), 'apiUrl.personalizedTemp')
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
        }
    }

    // 歌单tab
    const singleListData = {
        setLocal () {
            singleListData.resetData()
            let cateList = $.$store.get('cateList')
            let songCateList = $.$store.get('songCateList')
            $('.tab-cate-content .recommend-list').render($(layoutTemp).find('#gridListTemp'), songCateList)
            cateList !== null && $('.mask-cate').html(template('cateListTemp', { data: cateList }))
            // console.log(songCateList && cateList, 'songCateList && cateList')
            return cateList || songCateList
        },
        resetData () {
            $('.tab-cate-content .mask-cate').html('')
            $('.tab-cate-content .recommend-list').html('')
        },
        init () {
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
                        let temp = template('cateListTemp', { data: { subs, all, categories } });
                        let hotCateTemp = template('hotCateTemp', { data: { subs: subs[0] } });
                        $('.tab-cate-content .mask-cate').html(temp);
                        $('.tab-cate-content .tags .cates').html(hotCateTemp);
                        console.log(hotCateTemp, 'hotCateTemp');
                        $.$store.set('cateList', data, new Date().getTime() + 1000);
                    }
                }
            })
        },
        getRecommend (current) {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { limit: 50 },
                url: apiUrls.home.personalized,
                success (data) {
                    current = current || 1
                    var res = data.result.slice(current - 1, 50)
                    res.forEach(function (item) {
                        item.playCount = $.filterPlayCount(item.playCount)
                    })
                    singleListData.initPage(50)
                    // console.log(res, 'apiUrl.personalizedTemp')
                    $('.tab-cate-content .recommend-list').render($(layoutTemp).find('#gridListTemp'), { list: res })
                    $.$store.set('songCateList', { list: res }, new Date().getTime() + 1000)
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
                    singleListData.resetData();
                    singleListData.getCateList();
                    singleListData.getRecommend();
                }
            })
            $('.js-toggle-cate').click(function () {
                $(this).parent().siblings('.mask-cate').toggleClass('active')
            })
        }
    }

    const initData = () => {
        homeData.init()
        singleListData.init()
    }
    initData()
})
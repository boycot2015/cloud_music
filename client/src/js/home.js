$(function () {
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
            $('.recommend-list').find('.date-text').html(new Date().getDate())
            .siblings('.week').html(commonObj.weeks[new Date().getDay()])
            $('.swiper-wrapper').render($(layoutTemp).find('#bannerTemp'), banner)
            $('.recommend-list').render($(layoutTemp).find('#gridListTemp'), recommendList)
            $('.dj-list').render($(layoutTemp).find('#gridListTemp'), djList)
            $('.mv-list').render($(layoutTemp).find('#gridListTemp'), mvList)
            $('.newest-list').render($(layoutTemp).find('#gridListTemp'), newestList)
            $('.privatecontent-list').render($(layoutTemp).find('#gridListTemp'), privatecontentList)
            new Swiper('.swiper-container', homeData.swiperOption)
            return banner || mvList
        },
        init () {
            if(this.setLocal() == null) {
                this.getBanner();
                this.getRecommend();
                this.getPrivatecontent();
                this.getTopSong();
                this.getMVList();
                this.getDjRecommend();
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
                    // console.log(res, 'apiUrl.personalizedTemp')
                    $('.recommend-list').render($(layoutTemp).find('#gridListTemp'), { list: res })
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
                        let res = data.result.slice(0,3)
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
    homeData.init()
})
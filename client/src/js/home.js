$(function () {
    var homeData = {
        swiperOption: {
            // direction: 'vertical', // 垂直切换选项
            // slidesPerView: 3,
            // spaceBetween: -40,
            slidesPerView: 'auto',
            effect: 'coverflow',
            centeredSlides: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 100,
                depth: 30,
                modifier: 5,
                slideShadows: true
            },
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            // },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true,
            navigation: {
                nextEl: '.button-next',
                prevEl: '.button-prev',
            },
            speed: 300
        },
        getData: function () {
            this.getBanner();
        },
        getBanner: function () {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { json: 1 },
                url: apiUrls.banner,
                success: function (data) {
                    // //获取<script>标签内的内容,即拼接字符串的规则;
                    var bannerTemp = $(layoutTemp).find('#bannerTemp').text();
                    // console.log(bannerTemp, ".find('#bannerTemp')");
                    // //使用template的render()方法,传入模板及数据生成html片段;
                    var renderHtml = template.render(bannerTemp, { list: data.banners });
                    // //将html片段渲染到页面
                    $('.swiper-wrapper').html(renderHtml)
                    console.log(renderHtml, 'apiUrl.banner')
                    new Swiper('.swiper-container', homeData.swiperOption)
                }
            })
        }
    }
    homeData.getData()
})
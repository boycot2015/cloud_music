$(function(){var a={swiperOption:{slidesPerView:"auto",effect:"coverflow",centeredSlides:!0,coverflowEffect:{rotate:0,stretch:100,depth:30,modifier:5,slideShadows:!0},pagination:{el:".swiper-pagination",clickable:!0},loop:!0,navigation:{nextEl:".button-next",prevEl:".button-prev"},speed:300},getData:function(){this.getBanner()},getBanner:function(){$.ajax({type:"get",dataType:"json",data:{json:1},url:apiUrls.banner,success:function(e){var t=$(layoutTemp).find("#bannerTemp").text(),n=template.render(t,{list:e.banners});$(".swiper-wrapper").html(n),console.log(n,"apiUrl.banner"),new Swiper(".swiper-container",a.swiperOption)}})}};a.getData()});
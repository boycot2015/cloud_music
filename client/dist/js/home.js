"use strict";function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}$(function(){var e,a={swiperOption:(_defineProperty(e={slidesPerView:1},"slidesPerView","auto"),_defineProperty(e,"effect","coverflow"),_defineProperty(e,"centeredSlides",!0),_defineProperty(e,"coverflowEffect",{rotate:0,stretch:100,depth:50,modifier:3,slideShadows:!1}),_defineProperty(e,"autoplay",{delay:5e3,disableOnInteraction:!1}),_defineProperty(e,"pagination",{el:".swiper-pagination",clickable:!0}),_defineProperty(e,"loop",!0),_defineProperty(e,"navigation",{nextEl:".button-next",prevEl:".button-prev"}),_defineProperty(e,"speed",400),e),constantTemp:{recommend:""},tabMenu:[{name:"个性推荐",type:"home"},{name:"歌单",type:"cate"},{name:"主播电台",type:"dj"},{name:"排行榜",type:"ph"},{name:"歌手",type:"singer"},{name:"最新音乐",type:"newest"}],setLocal:function(){var e=$.$store.get("banner"),t=$.$store.get("mvList"),a=$.$store.get("recommendList"),n=$.$store.get("djList"),i=$.$store.get("newestList"),s=$.$store.get("privatecontentList");return null!==e&&$(".swiper-wrapper").render($(layoutTemp).find("#bannerTemp"),e),null!==t&&$(".tab-home-content .recommend-list").render($(layoutTemp).find("#gridListTemp"),a,this.constantTemp.recommend),null!==a&&$(".dj-list").render($(layoutTemp).find("#gridListTemp"),n),null!==n&&$(".mv-list").render($(layoutTemp).find("#gridListTemp"),t),null!==i&&$(".newest-list").render($(layoutTemp).find("#gridListTemp"),i),null!==s&&$(".privatecontent-list").render($(layoutTemp).find("#gridListTemp"),s),e||t||a||n||i||s},init:function(){$(".tab-home-content .recommend-list").find(".date-text").html((new Date).getDate()).siblings(".week").html(commonObj.weeks[(new Date).getDay()]),this.constantTemp.recommend=$(".tab-home-content .recommend-list").html(),$(".music-home .tab-list").render($(contentTemp).find("#tabsTemp"),{list:this.tabMenu}),null==this.setLocal()?(this.getBanner(),this.getRecommend(),this.getPrivatecontent(),this.getTopSong(),this.getMVList(),this.getDjRecommend()):new Swiper(".swiper-container",a.swiperOption),this.onShow()},getBanner:function(){$.ajax({type:"get",dataType:"json",data:{json:1},url:apiUrls.home.banner,success:function(e){$(".swiper-wrapper").render($(layoutTemp).find("#bannerTemp"),{list:e.banners}),$.$store.set("banner",{list:e.banners},(new Date).getTime()+6e4),new Swiper(".swiper-container",a.swiperOption)}})},getRecommend:function(){$.ajax({type:"get",dataType:"json",data:{limit:9},url:apiUrls.home.personalized,success:function(e){var t=e.result;t.forEach(function(e){e.playCount=$.filterPlayCount(e.playCount)}),$(".tab-home-content .recommend-list").render($(layoutTemp).find("#gridListTemp"),{list:t},a.constantTemp.recommend),$.$store.set("recommendList",{list:t},(new Date).getTime()+6e4)}})},getPrivatecontent:function(){$.ajax({type:"get",dataType:"json",data:{limit:9},url:apiUrls.home.privatecontent,success:function(e){var t=e.result;$(".privatecontent-list").render($(layoutTemp).find("#gridListTemp"),{list:t}),$.$store.set("privatecontentList",{list:t},(new Date).getTime()+6e4)}})},getTopSong:function(){$.ajax({type:"get",dataType:"json",data:{limit:9},url:apiUrls.home.topSong,success:function(e){var t=[{ftype:0,list:(t=e.data.slice(0,10)).slice(0,5)},{ftype:0,list:t.slice(5,10)}];$(".newest-list").render($(layoutTemp).find("#gridListTemp"),{list:t}),$.$store.set("newestList",{list:t},(new Date).getTime()+6e4)}})},getMVList:function(){$.ajax({type:"get",dataType:"json",data:{limit:9},url:apiUrls.home.mv,success:function(e){var t;200==e.code&&(t=e.result.slice(0,3),$(".mv-list").render($(layoutTemp).find("#gridListTemp"),{list:t,category:e.category}),$.$store.set("mvList",{list:t,category:e.category},(new Date).getTime()+6e4))}})},getDjRecommend:function(){$.ajax({type:"get",dataType:"json",data:{limit:5},url:apiUrls.home.djrecommend,success:function(e){var t;200==e.code&&(t=e.djRadios.slice(0,5),$(".dj-list").render($(layoutTemp).find("#gridListTemp"),{list:t,category:e.category}),$.$store.set("djList",{list:t,category:e.category},(new Date).getTime()+6e4))}})},onShow:function(){$(document).on("click",".js-list-detail",function(){var e=$(this).attr("data-id"),t=$(this).attr("data-type"),a=$(this).attr("data-ctype");$.$router.push("/songs/list",{id:e,type:t,ctype:a})}),$(".tab-content .recommend .more").click(function(){$(".js-tab-item").eq(1).click()}),$(".tab-content .newest-song .more").click(function(){$(".js-tab-item").eq(5).click()}),$(".tab-content .recommend .more").click(function(){$(".js-tab-item").eq(1).click()}),$(".tab-content .recommend .more").click(function(){$(".js-tab-item").eq(1).click()})}},i={data:{query:{}},setLocal:function(){var e=$.$store.get("hotCateList"),t=$.$store.get("cateList"),a=$.$store.get("songCateList");return null!==e&&$(".tab-cate-content .tags .cates").render($(contentTemp).find("#hotCateTemp"),{data:e}),null!==a&&$(".tab-cate-content .recommend-list").render($(layoutTemp).find("#gridListTemp"),a,this.constantTemp.recommend),null!==t&&$(".mask-cate").render($(contentTemp).find("#cateListTemp"),{data:t}),e&&t&&a},constantTemp:{recommend:""},init:function(){this.constantTemp.recommend=$(".tab-cate-content .recommend-list").html(),this.onShow()},getCateList:function(){$.ajax({type:"get",dataType:"json",data:{limit:50},url:apiUrls.song.catlist,success:function(i){200==i.code&&function(){var a=[],e=(i.sub,i.all),t=i.categories;for(var n in i.categories)!function(t){a[t]=[],i.sub.map(function(e){e.category==t&&a[t].push(e)})}(n);i.subs=a,$(".tab-cate-content .mask-cate").render($(contentTemp).find("#cateListTemp"),{data:{subs:a,all:e,categories:t}}),$.$store.set("cateList",i,(new Date).getTime()+5e3)}()}})},gethotCate:function(){$.ajax({type:"get",dataType:"json",data:{limit:50},url:apiUrls.song.hotCate,success:function(e){200==e.code&&($(".tab-cate-content .tags .cates").render($(contentTemp).find("#hotCateTemp"),{data:e}),$.$store.set("hotCateList",e,(new Date).getTime()+5e3))}})},getRecommend:function(a,e){$.ajax({type:"get",dataType:"json",data:{limit:39,order:"hot",cat:e,offset:a},url:apiUrls.song.topPlaylist,success:function(e){a=a||1;var t=e.playlists;console.log(e,"apiUrl.personalizedTemp"),t.forEach(function(e){e.playCount=$.filterPlayCount(e.playCount)}),i.initPage(e.total),$(".tab-cate-content .recommend-list").render($(layoutTemp).find("#gridListTemp"),{list:t},i.constantTemp.recommend),$.$store.set("songCateList",{list:t},(new Date).getTime()+5e3)}})},initPage:function(e){$("#cate-page").Page({totalPages:e,liNums:7,activeClass:"activP",firstPage:"首页",lastPage:"末页",prv:"<",next:">",hasFirstPage:!0,hasLastPage:!0,hasPrv:!0,hasNext:!0,callBack:function(e){i.getRecommend(e)}})},onShow:function(){$(document).on("click",".js-tab-item",function(){$(this).addClass("active").siblings().removeClass("active"),$(".tab-content").eq($(this).index()).show().siblings(".tab-content").hide();var e=$(this).attr("data-type");null==i.setLocal()&&"cate"==e&&(i.getCateList(),i.gethotCate(),i.getRecommend())}),$(".js-toggle-cate").click(function(){$(this).parent().siblings(".mask-cate").toggleClass("active")}),$(document).on("click",".js-cates-item",function(){var a=$(this).attr("data-cate"),n=!1;$(".js-hot-cate-item").each(function(e,t){$(t).attr("data-cate")==a&&($(t).addClass("active").siblings(".js-hot-cate-item").removeClass("active"),n=!0)}),n||$(".js-hot-cate-item").removeClass("active"),$(this).addClass("active").siblings().removeClass("active").parent().parent().parent().siblings().find(".js-cates-item").removeClass("active"),$(".btn-cate").removeClass("active"),$(".mask-cate").removeClass("active"),$(".js-hot-cate-item").find().addClass("active"),$(".js-toggle-cate .text").html(a),i.data.query.cate=a,i.getRecommend(1,a)}),$(document).on("click",".js-hot-cate-item",function(){var a=$(this).attr("data-cate");$(this).addClass("active").siblings(".js-hot-cate-item").removeClass("active"),$(".btn-cate").removeClass("active"),$(".mask-cate").removeClass("active"),$(".js-cates-item").each(function(e,t){$(t).attr("data-cate")==a&&$(t).addClass("active").siblings().removeClass("active").parent().parent().parent().siblings().find(".js-cates-item").removeClass("active")}),$(".js-toggle-cate .text").html(a),i.data.query.cate=a,i.getRecommend(1,a)}),$(document).on("click",".mask-cate .btn-cate",function(){var e=$(this).attr("data-cate");$(this).addClass("active"),$(".js-cates-item").removeClass("active"),$(".js-hot-cate-item").removeClass("active"),$(".mask-cate").removeClass("active"),$(".js-toggle-cate .text").html(e),i.data.query.cate="",i.getRecommend(1,"")}),$(document).on("click",function(e){$(".mask-cate").parent(".tab-content")[0].contains(e.target)||e.target.contains($(".js-toggle-cate")[0])||$(".mask-cate").removeClass("active")})}};a.init(),i.init(),$.extend({homeData:a})});
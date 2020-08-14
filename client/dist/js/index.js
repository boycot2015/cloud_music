"use strict";$(function(){var a=$("#play-audio")[0];a.load(),window.layOutConfig={setStatus:function(s,i,o,t){var e=0;t=t||1,commonObj.progressPsition&&(e=commonObj.progressPsition.left),e=s*$(".progress .progress-bar").width()/t,e=Math.abs(e),a.loop&&!s&&($(".js-play").removeClass("play"),setTimeout(function(){$(".js-play").addClass("play")},1e3)),commonObj.playData.ended&&(a.pause(),$(".js-play").removeClass("play"),commonObj.playData.loop&&(a.play(),$(".js-play").addClass("play"),a.loop=!0),($(".order-icon").hasClass("icon-music-loop")||$(".order-icon").hasClass("icon-music-loop-random"))&&layOutConfig.playNext(),$(".order-icon").hasClass("icon-music-loop-random")&&layOutConfig.playRandom()),e=e>commonObj.maxPlayWidth?commonObj.maxPlayWidth:e,s<=0&&$(".progress .end-time").html(o),$(".progress .progress-bar .point").css("left",e),$(".progress .progress-bar .js-line").css("width",e),$(".progress .start-time").html(i)},setVolume:function(s,i){if(!s&&!i)return a.volume=.5,$(".volume .progress-bar .point").css("left",42),$(".volume .progress-bar .line").width(50),!0;var o=1<(o=Math.abs(s/i))?1:o;a.volume=o,(commonObj.playData.volume=o)<=0?$(".js-music-volume").addClass("close"):$(".js-music-volume").removeClass("close")},initDrag:function(){$(".js-music-box .header").drag({target:$(".js-music-box"),cancelElem:$(".js-music-box .header").children().not(".logo")}),$(".progress .progress-bar .point").drag({site:commonObj.audioTimePos,fn:function(s){commonObj.progressPsition=s,$(".progress .start-time").html(commonObj.playData.curStr),$(".progress .progress-bar .line").width(s.left),a.pause(),a.currentTime=s.left/$(".progress .progress-bar").width()*commonObj.playData.duration},end:function(){$(".progress .start-time").html(commonObj.playData.curStr),$(".progress .progress-bar .line").width(commonObj.progressPsition.left),$(".js-play").hasClass("play")&&a.play(),a.currentTime=commonObj.progressPsition.left/$(".progress .progress-bar").width()*commonObj.playData.duration}}),$(".js-mini-music-box").drag({cancelElem:$(".js-mini-music-box").find(".more, .volume")}),$(".volume .progress-bar .point").drag({site:commonObj.audioVolumePos,fn:function(s){var i=(commonObj.progressPsition=s).left;layOutConfig.setVolume(i,commonObj.maxVolumeWidth),i=8<i?i+8:i,$(".volume .progress-bar .line").width(i)}})},playNext:function(){$(".js-footer-music-list .music-list-item.play").next().dblclick()},playPrev:function(){$(".js-footer-music-list .music-list-item.play").prev().dblclick()},playRandom:function(){var s=Math.floor(Math.random(0,1)*$(".js-footer-music-list .music-list-item").length);$(".js-footer-music-list .music-list-item").eq(s).dblclick()}},commonObj.initPlayer(a,layOutConfig.setStatus,layOutConfig.setVolume),layOutConfig.initDrag(),window.addEventListener("resize",function(s){layOutConfig.initDrag();var i=document.documentElement.clientWidth||document.body.clientWidth,o=document.documentElement.clientHeight||document.body.clientHeight;$(".js-music-box").css("left",(i-$(".js-music-box").width())/2),$(".js-music-box").css("top",(o-$(".js-music-box").height())/2),$(".js-mini-music-box").css("left",(i-$(".js-mini-music-box").width())/2),$(".js-mini-music-box").css("top",(o-$(".js-mini-music-box").height())/2)}),$(".js-music-min").click(function(){$(".js-music-box").hide().siblings(".js-mini-music-box").show()}),$(".back-btn").click(function(){$.$router.back()}),$(".forward-btn").click(function(){$.$router.forward()}),$(".js-aside-template").on("click",".js-toggle-class",function(){$(this).toggleClass("active"),$(this).siblings(".list").toggleClass("active")}),$(".js-aside-template").on("click",".js-list-item",function(){$.$router.push($(this).attr("data-path")),$(this).addClass("active").siblings().removeClass("active").parent().parent().siblings().find(".js-list-item").removeClass("active")}),$(".progress .progress-bar").click(function(s){var i=s.offsetX;commonObj.progressPsition&&(i=commonObj.progressPsition.left),$(".progress .progress-bar .point").css("left",i),$(".progress .progress-bar .js-line").css("width",i),$(".progress .start-time").html(commonObj.playData.curStr),a.currentTime=i/$(".progress .progress-bar").width()*commonObj.playData.duration,commonObj.progressPsition=""}),$(".volume .progress-bar").click(function(s){var i=s.offsetX;commonObj.progressPsition&&(i=commonObj.progressPsition.left),$(".volume .progress-bar .point").css("left",i),layOutConfig.setVolume(i,commonObj.maxVolumeWidth),i=8<s.offsetX?i+8:i,$(".volume .progress-bar .js-line").width(i),commonObj.progressPsition=""}),$(".volume .progress-bar").mouseenter(function(){$(this).find(".point").show()}).mouseleave(function(){$(this).find(".point").hide()}),$(".js-music-volume").click(function(){var s=parseInt($(".volume .progress-bar .line").css("width")),i=commonObj.progressPsition.left;$(this).toggleClass("close"),s?(commonObj.progressPsition={left:s},a.volume=0,$(".volume .progress-bar .point").css("left",0),$(".volume .progress-bar .line").width(0)):($(".volume .progress-bar .line").width(i),layOutConfig.setVolume(i,commonObj.maxVolumeWidth),i=8<i?i-8:i,$(".volume .progress-bar .point").css("left",i))}),$(".order-icon").click(function(s){commonObj.playData.loop=!1,a.loop=!1,$(this).hasClass("icon-music-loop")?(commonObj.playData.loop=!0,$(this).addClass("icon-music-loop-one").removeClass("icon-music-loop icon-music-loop-random")):$(this).hasClass("icon-music-loop-one")?$(this).addClass("icon-music-loop-random").removeClass("icon-music-loop icon-music-loop-one"):$(this).hasClass("icon-music-loop-random")?$(this).addClass("icon-music-loop").removeClass("icon-music-loop-one icon-music-loop-random"):$(this).addClass("icon-music-loop")}),$(".js-play-list-btn").click(function(){$(this).parent().find(".js-play-list").toggle()}),$(".js-list-close").click(function(){$(this).parent().parent().hide()}),$(".js-list-btn, .js-history-btn").click(function(){$(this).addClass("active").siblings().removeClass("active")}),$(".icon-music-play-left").click(function(){$(".order-icon").hasClass("icon-music-loop-random")?layOutConfig.playRandom():layOutConfig.playPrev()}),$(".icon-music-play-right").click(function(){$(".order-icon").hasClass("icon-music-loop-random")?layOutConfig.playRandom():layOutConfig.playNext()}),$(".js-play").click(function(){var s=window.frames["iframe-pages"].contentWindow.document;commonObj.playData.src&&($(".js-play").hasClass("play")?($(".music-list-item.pause").removeClass("pause").addClass("play"),$(s).find(".song-detail .cover").addClass("pause").parent().find(".handler").removeClass("active"),a.pause()):(a.play(),$(".music-list-item.play").removeClass("play").addClass("pause"),$(s).find(".song-detail .cover").removeClass("pause").addClass("active play").parent().find(".handler").addClass("active")),$(".js-play").toggleClass("play"))}),$(".js-mini-music-box .left").mouseenter(function(){"none"===$(".js-mini-music-list").css("display")&&$(this).find(".js-more").stop().slideDown(200),$(this).find(".js-play-btn").stop().fadeIn(200),$(this).find(".js-play-btn").css("display","flex")}).mouseleave(function(){$(this).find(".js-more").stop().slideUp(200),$(this).find(".js-play-btn").stop().fadeOut(200)}),$(".js-mini-music-box").dblclick(function(s){$(s.target).closest($(".more")).length||$(this).hide().siblings(".js-music-box").show()}),$(".js-list-icon").click(function(){"none"===$(".js-mini-music-list").css("display")?$(".js-mini-music-list").slideDown(200):$(".js-mini-music-list").slideUp(200)}),$(".js-mini-music-list, .js-footer-music-list, .song-detail-list").on("click",".music-list-item",function(){$(this).addClass("active").siblings().removeClass("active")}),$(".js-mini-music-list, .js-footer-music-list").on("dblclick",".music-list-item",function(){var t;$(this).attr("data-id")==commonObj.playData.id&&!commonObj.playData.ended||(t=$(this),commonObj.setCurrentData($(this),function(){var s=$(".js-mini-music-list, .js-footer-music-list, .song-detail-list").find(".music-list-item"),i=$("#iframe-pages")[0].contentWindow.document,o=$(i).find(".song-detail-list .music-list-item");s.each(function(s,i){$(this).attr("data-id")==t.attr("data-id")&&$(this).removeClass("pause").addClass("play active").siblings().removeClass("play active pause")}),o.each(function(s,i){$(this).attr("data-id")==t.attr("data-id")&&$(this).removeClass("pause").addClass("play active").siblings().removeClass("play active pause")})}))}),$(".js-min-music-volume").click(function(){$(this).parent().find(".volume").toggle()}),$(".js-love-icon").click(function(){$(".js-love-icon").hasClass("icon-music-love")?$(".js-love-icon").addClass("icon-music-love-full").removeClass("icon-music-love"):$(".js-love-icon").addClass("icon-music-love").removeClass("icon-music-love-full")}),$(".js-music-box .music-info").click(function(){$(window.parent.document).find(".song-detail").removeClass("active").addClass("active"),$.$router.push("/songs/detail",{id:$(this).attr("data-id")})})});
$(function(){var a=$("#play-audio")[0];a.load();var e={setStatus:function(s,o,i,e){var t=0;e=e||1,commonObj.progressPsition&&(t=commonObj.progressPsition.left),t=s*$(".progress .progress-bar").width()/e,t=Math.abs(t),a.loop&&!s&&($(".js-play").removeClass("play"),setTimeout(function(){$(".js-play").addClass("play")},1e3)),commonObj.playData.ended&&(a.pause(),$(".js-play").removeClass("play"),commonObj.playData.loop&&(a.play(),$(".js-play").addClass("play"),a.loop=!0)),t=t>commonObj.maxPlayWidth?commonObj.maxPlayWidth:t,s<=0&&$(".progress .end-time").html(i),$(".progress .progress-bar .point").css("left",t),$(".progress .progress-bar .js-line").css("width",t),$(".progress .start-time").html(o)},setVolume:function(s,o){if(!s&&!o)return a.volume=.5,$(".volume .progress-bar .point").css("left",42),$(".volume .progress-bar .line").width(50),!0;var i=1<(i=Math.abs(s/o))?1:i;a.volume=i,(commonObj.playData.volume=i)<=0?$(".js-music-volume").addClass("close"):$(".js-music-volume").removeClass("close")},initDrag:function(){commonObj.drag({obj:$(".js-music-box .header")[0],target:$(".js-music-box")[0],cancelElem:$(".js-music-box .header").children().not(".logo")}),commonObj.drag({obj:$(".progress .progress-bar .point")[0],site:commonObj.audioTimePos,fn:function(s){commonObj.progressPsition=s,$(".progress .start-time").html(commonObj.playData.curStr),$(".progress .progress-bar .line").width(s.left),a.pause(),a.currentTime=s.left/$(".progress .progress-bar").width()*commonObj.playData.duration},end:function(s){$(".progress .start-time").html(commonObj.playData.curStr),$(".progress .progress-bar .line").width(commonObj.progressPsition.left),$(".js-play").hasClass("play")&&a.play(),a.currentTime=commonObj.progressPsition.left/$(".progress .progress-bar").width()*commonObj.playData.duration}}),commonObj.drag({obj:$(".js-mini-music-box")[0],cancelElem:$(".js-mini-music-box").find(".more, .volume")}),commonObj.drag({obj:$(".volume .progress-bar .point")[0],site:commonObj.audioVolumePos,fn:function(s){var o=(commonObj.progressPsition=s).left;e.setVolume(o,commonObj.maxVolumeWidth),o=8<o?o+8:o,$(".volume .progress-bar .line").width(o)}})},getData:{init:function(){this.getMenu(),this.getList(function(s){var o=$(layoutTemp).find("#listTemp").text(),t=[];s.tracks.forEach(function(s,o){var i=(i=Math.floor(s.dt/60/1e3))<10?"0"+i:i,e=(e=Math.round(s.dt/1e3%60))<10?"0"+e:e;s.time=i+":"+e,s.src="http://m10.music.126.net/20200807094723/c03a9d05ed395a612e4e1ae62930c0b7/yyaac/obj/wonDkMOGw6XDiTHCmMOi/3355922236/ab61/828a/4c8d/b614204ea9081dcf6db1722c5fa7f398.m4a",$.ajax({type:"post",dataType:"jsonp",data:{encSecKey:"dc67e18ee269b205c7e1513af52d3f2a617cbed3b14dd4c44473a232bfcb73a608a92834498cd6d7d29b0d63456ed68e38ec5e983af02f5e5a1ba024aab66e0caad59bd59d676f6d5898bc1cb566ff10b169563fd7d55363403b9566f4920162624c8d3a7ef14195cdeccf04bd4796089cb5a280e5f585e7856382ee652e2d9a",params:"OCCN9ASTI2yP8n7W5XaoI4dFa4Av5Q9qkJ3F4KOc+X/XvbYL4UM28VgZ/ixbPlK12AxjoL9cvhB1s1dlvghV3Lo281zxHK0fC2h6WCU+DGT+/9R+Ze5Lq4zLCWC7/9EnesQGXrB1os64NfSN8qCKmrizh4hgRhA0TVs4Y8sveojL8tOnzPU2M40y1OV0r9npExt/3EKbstQAano86CIsSg=="},url:"https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token=9dba65809e6f815a53a1d59f6169cf5f",success:function(s){t.push(s.data.data),console.log(t,"srcList")}})});var i=template.render(o,{list:s.tracks,page:s.size});$(".js-footer-music-list").html(i);i=template.render(o,{list:s.tracks});$(".js-music-list").html(i),commonObj.data=s})},getMenu:function(){$.ajax({type:"get",dataType:"json",data:{json:1},url:"./json/menu.json",success:function(s){var o=$(layoutTemp).find("#asideTemp").text(),i=template.render(o,{list:s});$(".js-aside-template").html(i),$(".js-aside-template").on("click",".js-toggle-class",function(){$(this).toggleClass("active"),$(this).siblings(".list").toggleClass("active")}),$(".js-aside-template").on("click",".js-list-item",function(){$(this).addClass("active").siblings().removeClass("active").parent().parent().siblings().find(".js-list-item").removeClass("active")})}})},getList:function(o){$.ajax({type:"get",dataType:"json",data:{json:1},url:"./json/list.json",success:function(s){o(s)}})}},setCurrentData:function(s){console.log(s),$(".js-mini-music-box").find("img").attr("src",s.picUrl),$(".js-music-box .music-info").find("img").attr("src",s.picUrl),$(".js-music-box .music-info .name").html(s.name).parent().siblings().find(".singer").html(s.singer),$(".js-mini-music-box").find(".left .more .name").html(s.name).siblings(".singer").html(s.singer)}};commonObj.initPlayer(a,e.setStatus,e.setVolume),e.initDrag(),e.getData.init(),window.addEventListener("resize",function(s){e.initDrag();var o=document.documentElement.clientWidth||document.body.clientWidth,i=document.documentElement.clientHeight||document.body.clientHeight;$(".js-music-box").css("left",(o-$(".js-music-box").width())/2),$(".js-music-box").css("top",(i-$(".js-music-box").height())/2),$(".js-mini-music-box").css("left",(o-$(".js-mini-music-box").width())/2),$(".js-mini-music-box").css("top",(i-$(".js-mini-music-box").height())/2)}),$(".js-music-min").click(function(){$(".js-music-box").hide().siblings(".js-mini-music-box").show()}),$(".progress .progress-bar").click(function(s){var o=s.offsetX;commonObj.progressPsition&&(o=commonObj.progressPsition.left),$(".progress .progress-bar .point").css("left",o),$(".progress .progress-bar .js-line").css("width",o),$(".progress .start-time").html(commonObj.playData.curStr),a.currentTime=o/$(".progress .progress-bar").width()*commonObj.playData.duration,commonObj.progressPsition=""}),$(".volume .progress-bar").click(function(s){var o=s.offsetX;commonObj.progressPsition&&(o=commonObj.progressPsition.left),$(".volume .progress-bar .point").css("left",o),e.setVolume(o,commonObj.maxVolumeWidth),o=8<s.offsetX?o+8:o,$(".volume .progress-bar .js-line").width(o),commonObj.progressPsition=""}),$(".volume .progress-bar").mouseenter(function(){$(this).find(".point").show()}).mouseleave(function(){$(this).find(".point").hide()}),$(".js-music-volume").click(function(){var s=parseInt($(".volume .progress-bar .line").css("width")),o=commonObj.progressPsition.left;$(this).toggleClass("close"),s?(commonObj.progressPsition={left:s},a.volume=0,$(".volume .progress-bar .point").css("left",0),$(".volume .progress-bar .line").width(0)):($(".volume .progress-bar .line").width(o),e.setVolume(o,commonObj.maxVolumeWidth),o=8<o?o-8:o,$(".volume .progress-bar .point").css("left",o))}),$(".order-icon").click(function(s){commonObj.playData.loop=!1,a.loop=!1,$(this).hasClass("icon-music-loop")?(commonObj.playData.loop=!0,$(this).addClass("icon-music-loop-one").removeClass("icon-music-loop icon-music-loop-random")):$(this).hasClass("icon-music-loop-one")?$(this).addClass("icon-music-loop-random").removeClass("icon-music-loop icon-music-loop-one"):$(this).hasClass("icon-music-loop-random")?$(this).addClass("icon-music-loop").removeClass("icon-music-loop-one icon-music-loop-random"):$(this).addClass("icon-music-loop")}),$(".js-play-list-btn").click(function(){$(this).parent().find(".js-play-list").toggle()}),$(".js-list-close").click(function(){$(this).parent().parent().hide()}),$(".js-list-btn, .js-history-btn").click(function(){$(this).addClass("active").siblings().removeClass("active")}),$(".js-mini-music-box .left").mouseenter(function(){"none"===$(".js-mini-music-list").css("display")&&$(this).find(".js-more").stop().slideDown(200),$(this).find(".js-play-btn").stop().fadeIn(200),$(this).find(".js-play-btn").css("display","flex")}).mouseleave(function(){$(this).find(".js-more").stop().slideUp(200),$(this).find(".js-play-btn").stop().fadeOut(200)}),$(".js-mini-music-box").dblclick(function(s){$(s.target).closest($(".more")).length||$(this).hide().siblings(".js-music-box").show()}),$(".js-list-icon").click(function(){"none"===$(".js-mini-music-list").css("display")?$(".js-mini-music-list").slideDown(200):$(".js-mini-music-list").slideUp(200)}),$(".js-play").click(function(){$(".js-play").hasClass("play")?($(".music-list-item.pause").removeClass("pause").addClass("play"),a.pause()):(a.play(),$(".music-list-item.play").removeClass("play").addClass("pause")),$(".js-play").toggleClass("play")}),$(".js-mini-music-list, .js-footer-music-list").on("click",".music-list-item",function(){$(this).addClass("active").siblings().removeClass("active")}),$(".js-mini-music-list, .js-footer-music-list").on("dblclick",".music-list-item",function(){var o=$(this);commonObj.data.tracks.forEach(function(i,s){i.id==o.attr("data-id")&&(a.muted=!1,a.src=i.src,commonObj.playData.id=i.id,commonObj.playData.name=i.name,commonObj.playData.singer="",i.ar.forEach(function(s,o){commonObj.playData.singer+=s.name+(o<i.ar.length-1?"/":"")}),commonObj.playData.picUrl=i.al.picUrl)}),e.setCurrentData(commonObj.playData),$(".js-mini-music-list, .js-footer-music-list").find(".music-list-item").each(function(s,o){$(this).attr("data-id")==commonObj.playData.id&&$(this).removeClass("pause").addClass("play active").siblings().removeClass("play active pause")}),$(".js-play").addClass("play"),a.play()}),$(".js-min-music-volume").click(function(){$(this).parent().find(".volume").toggle()}),$(".js-love-icon").click(function(){$(".js-love-icon").hasClass("icon-music-love")?$(".js-love-icon").addClass("icon-music-love-full").removeClass("icon-music-love"):$(".js-love-icon").addClass("icon-music-love").removeClass("icon-music-love-full")})});
"use strict";$(function(){var e=commonObj.getTpl("/template/index.html"),a=window.parent.document;window.detailObj={data:function(){return{cover:"",songTextArr:[],$refs:{el:$(".song-detail"),children:$(".song-detail").children()}}},methods:{getData:function(){this.getlyric()},getlyric:function(){$.ajax({type:"get",dataType:"json",data:$.$route.query,url:apiUrls.song.lyric,success:function(t){var i=[];200==t.code&&t.lrc&&t.lrc.lyric.split("\n").map(function(t,e){var a={};0<e&&t&&(t=t.split("]"),a.time=t[0].split("[")[1],a.text=t[1],i.push(a))}),$(".song-detail .top").render($(e).find("#detailTemp"),{lyricList:i,playData:$.$store.get("playData")})}})}},mounted:function(){this.getData(),setTimeout(function(){$(".song-detail, .song-detail .cover").addClass("active"),$(a).find(".js-play").hasClass("play")?$(".song-detail .cover").addClass("play").siblings(".handler").addClass("active"):$(".song-detail .cover").removeClass("play").addClass("pause").siblings(".handler").removeClass("active")},120),$(".song-detail").on("click",".icon-minify",function(){var t=$.getUrlandParam($.$store.get("historyUrl"),"id");$(a).find(".js-aside").removeClass("active"),$.$router.push(t.path,t)})}},Object.assign(detailObj,detailObj.data()),Object.assign(detailObj,detailObj.methods),detailObj.mounted()});
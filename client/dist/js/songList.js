"use strict";function _objectWithoutProperties(t,i){var s={};for(var e in t)0<=i.indexOf(e)||Object.prototype.hasOwnProperty.call(t,e)&&(s[e]=t[e]);return s}$(function(){var l=window.parent.commonObj,t={setLocal:function(){var t=$.$store.get("songList"),i=$.$store.get("coverDetail");if(null==t||null==i)return null;$(".song-list").render($(layoutTemp).find("#gridListTemp"),t);var s=template("coverTemp",i);return $(".song-detail-list .cover").html(s),t&&i},init:function(){null==this.setLocal()&&this.getPlayList(),this.onShow()},getPlayList:function(){$(".song-list").html(""),$.ajax({type:"get",dataType:"json",data:{id:$.$route.query.id||$.$store.get("route").query.id},url:apiUrls.song.playlist,success:function(a){var i;200==a.code&&(i=[],a.playlist.trackIds.forEach(function(t){i.push(t.id)}),i=i.join(","),t.getSongDetail({ids:i},function(t){a.playlist.tracks=t.songs,a.privileges=t.privileges,a.playlist.tracks.map(function(t){t.dt=$.filterDruationTime(t.dt)});var i=a.playlist,s=(i.subscribers,i.trackIds,i.tracks,_objectWithoutProperties(i,["subscribers","trackIds","tracks"]));s.createTime=new Date(s.createTime).toLocaleDateString().split("/").join("-"),s.playCount=$.filterPlayCount(s.playCount),s.subscribedCount=$.filterPlayCount(s.subscribedCount),s.shareCount=$.filterPlayCount(s.shareCount);var e=template("coverTemp",{coverDetail:s});$(".song-detail-list .cover").html(e),l.data.tracks=a.playlist.tracks,$(".song-list").render($(layoutTemp).find("#listTemp"),{list:a.playlist.tracks,order:!0,operation:!0}),s.description&&null!==s.description&&$(".song-detail-list .desc p").html("简介："+s.description.split("\n").join("<br/>"))}))}})},getSongDetail:function(t,i){$.ajax({type:"get",dataType:"json",data:t,url:apiUrls.song.detail,success:function(t){t.result;i(t)}})},onShow:function(){$(".song-detail-list").on("click",".js-more",function(){$(this).toggleClass("active").parent().toggleClass("active line-two")}),$(".song-detail-list").on("click",".music-list-item",function(){$(this).addClass("active").siblings().removeClass("active")}),$(".song-detail-list").on("dblclick",".music-list-item",function(){var t;$(this).attr("data-id")==l.playData.id&&!l.playData.ended||(t=$(this),l.setCurrentData($(this),function(){t.removeClass("pause").addClass("play active").siblings().removeClass("play active pause"),$(window.parent.document).find(".js-mini-music-list, .js-footer-music-list").find(".music-list-item").each(function(t,i){$(i).attr("data-id")==l.playData.id&&$(i).removeClass("pause").addClass("play active").siblings().removeClass("play active pause")}),$(window.parent.document).find(".js-play").addClass("play")}))}),$(".song-detail-list").on("click",".play-btn.play",function(){$(".song-detail-list .music-list-item").eq(0).dblclick()})}};t.init()});
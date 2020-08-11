'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

$(function () {
    var commonObj = window.parent.commonObj;
    var audioPlayer = window.parent.audioPlayer;
    var songsData = {
        setLocal: function setLocal() {
            var songList = $.$store.get('songList');
            var coverDetail = $.$store.get('coverDetail');
            if (songList == null || coverDetail == null) return null;
            $('.song-list').render($(layoutTemp).find('#gridListTemp'), songList);
            var coverTemp = template('coverTemp', coverDetail);
            $('.song-detail-list .cover').html(coverTemp);
            return songList && coverDetail;
        },
        init: function init() {
            if (this.setLocal() == null) {
                this.getPlayList();
            }
            this.onShow();
        },
        getPlayList: function getPlayList() {
            // console.log($.$route, '$.$route');
            $.ajax({
                type: "get",
                dataType: "json",
                data: { id: $.$route.query.id },
                url: apiUrls.song.playlist,
                success: function success(data) {
                    if (data.code == 200) {
                        var ids = [];
                        data.playlist.trackIds.forEach(function (item) {
                            ids.push(item.id);
                        });
                        ids = ids.join(',');
                        songsData.getSongDetail({ ids: ids }, function (res) {
                            data.playlist.tracks = res.songs;
                            data.privileges = res.privileges;
                            data.playlist.tracks.map(function (item) {
                                item.dt = $.filterDruationTime(item.dt);
                            });

                            var _data$playlist = data.playlist,
                                subscribers = _data$playlist.subscribers,
                                trackIds = _data$playlist.trackIds,
                                tracks = _data$playlist.tracks,
                                coverDetail = _objectWithoutProperties(_data$playlist, ['subscribers', 'trackIds', 'tracks']);

                            coverDetail.createTime = new Date(coverDetail.createTime).toLocaleDateString().split('/').join('-');
                            coverDetail.playCount = $.filterPlayCount(coverDetail.playCount);
                            coverDetail.subscribedCount = $.filterPlayCount(coverDetail.subscribedCount);
                            coverDetail.shareCount = $.filterPlayCount(coverDetail.shareCount);
                            var coverTemp = template('coverTemp', { coverDetail: coverDetail });
                            $('.song-detail-list .cover').html(coverTemp);
                            // console.log(data.playlist.tracks, 'getSongDetail')
                            commonObj.data.tracks = data.playlist.tracks;
                            $('.song-list').render($(layoutTemp).find('#listTemp'), { list: data.playlist.tracks, order: true, operation: true });
                            coverDetail.description && coverDetail.description !== null && $('.song-detail-list .desc p').html('简介：' + coverDetail.description.split('\n').join('<br/>'));
                            $.$store.set('songList', { list: data.playlist.tracks, order: true, operation: true }, new Date().getTime() + 2000);
                            $.$store.set('coverDetail', { coverDetail: coverDetail }, new Date().getTime() + 2000);
                        });
                    }
                }
            });
        },
        getSongDetail: function getSongDetail(data, callback) {
            $.ajax({
                type: "get",
                dataType: "json",
                data: data,
                url: apiUrls.song.detail,
                success: function success(data) {
                    var res = data.result;
                    callback(data);
                }
            });
        },
        onShow: function onShow() {
            $('.song-detail-list').on('click', '.js-more', function () {
                $(this).toggleClass('active').parent().toggleClass('active line-two');
            });
            // 点击列表播放歌曲
            $('.song-detail-list').on('click', '.music-list-item', function () {
                $(this).addClass('active').siblings().removeClass('active');
            });
            $('.song-detail-list').on('dblclick', '.music-list-item', function () {
                var _this = $(this);
                if ($(this).attr('data-id') == commonObj.playData.id && !commonObj.playData.ended) return;
                commonObj.data.tracks.forEach(function (item, i) {
                    if (item.id == _this.attr('data-id')) {
                        audioPlayer.muted = false;
                        commonObj.playData.id = item.id;
                        commonObj.playData.name = item.name;
                        commonObj.playData.singer = '';
                        item.ar.forEach(function (singer, cindex) {
                            commonObj.playData.singer += singer.name + (cindex < item.ar.length - 1 ? '/' : '');
                        });
                        commonObj.playData.picUrl = item.al.picUrl;
                    }
                });
                commonObj.getData.getPlayUrl({ id: commonObj.playData.id }, function (data) {
                    audioPlayer.src = data.url;
                    audioPlayer.volume = commonObj.playData.volume;
                    commonObj.playData.src = data.url;
                    commonObj.setCurrentData(commonObj.playData);
                    $.$store.set('playList', commonObj.data);
                    commonObj.getData.getPlayList(commonObj.data);
                    _this.removeClass('pause').addClass('play active').siblings().removeClass('play active pause');
                    var listDom = $(window.parent.document).find('.js-mini-music-list, .js-footer-music-list').find('.music-list-item');
                    listDom.each(function (i, e) {
                        if ($(e).attr('data-id') == commonObj.playData.id) {
                            $(e).removeClass('pause').addClass('play active').siblings().removeClass('play active pause');
                        }
                    });
                    $(window.parent.document).find('.js-play').addClass('play');
                    audioPlayer.play();
                });
            });
        }
    };
    songsData.init();
});
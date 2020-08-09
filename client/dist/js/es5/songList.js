'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

$(function () {
    var songsData = {
        setLocal: function setLocal() {
            var songList = $.$store.get('songList');
            // $('.recommend-list').find('.date-text').html(new Date().getDate())
            // .siblings('.week').html(commonObj.weeks[new Date().getDay()])
            // $('.swiper-wrapper').render($(layoutTemp).find('#bannerTemp'), banner)
            $('.song-list').render($(layoutTemp).find('#gridListTemp'), songList);
            return songList;
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
                            $('.song-list').render($(layoutTemp).find('#listTemp'), { list: data.playlist.tracks, order: true, operation: true });
                            $.$store.set('songList', { list: res }, new Date().getTime() + 1000);
                            var coverTemp = template('coverTemp', { coverDetail: coverDetail });
                            console.log(data.playlist.tracks, 'getSongDetail');
                            $('.song-detail-list .cover').html(coverTemp);
                            coverDetail.description && coverDetail.description !== null && $('.song-detail-list .desc p').html('简介：' + coverDetail.description.split('\n').join('<br/>'));
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
            $(document).on('click', '.js-list-detail', function () {
                var id = $(this).attr('data-id');
                var type = $(this).attr('data-type');
                var ctype = $(this).attr('data-ctype');
                $.$router.push('/songs/list', { id: id, type: type, ctype: ctype });
            });
        }
    };
    songsData.init();
    $('.song-detail-list').on('click', '.js-more', function () {
        $(this).toggleClass('active').parent().toggleClass('active line-two');
    });
});
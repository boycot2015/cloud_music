'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

$(function () {
    var contentTemp = commonObj.getTpl("/template/index.html");
    var parent = window.parent.document;
    window.detailObj = {
        data: function data() {
            return {
                cover: '',
                songTextArr: [],
                $refs: {
                    el: $('.song-detail'),
                    children: $('.song-detail').children()
                }
            };
        },

        methods: {
            getData: function getData() {
                this.getlyric();
                this.getComment();
                this.getSamePlayList();
                this.sameMusicList();
                // console.log($.$route.query);
            },
            getlyric: function getlyric() {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: $.$route.query,
                    url: apiUrls.song.lyric,
                    success: function success(data) {
                        var newArr = [];
                        if (data.code == 200 && data.lrc) {
                            var tempArr = data.lrc.lyric.split('\n');
                            tempArr.map(function (el, i) {
                                var obj = {};
                                if (i > 0 && el) {
                                    el = el.split(']');
                                    obj['time'] = el[0].split('[')[1];
                                    obj['text'] = el[1];
                                    newArr.push(obj);
                                } else if (i == 0) {
                                    // obj = { time: '00:00', text: el.split(']')[0].split('[')[1] }
                                    // newArr.push(obj)
                                }
                            });
                            // console.log(newArr, $.$store.get('playData'));
                        }
                        $('.song-detail .top').render($(contentTemp).find('#detailTemp'), { lyricList: newArr, playData: $.$store.get('playData') });
                        $(parent).find('.js-play').removeClass('pause').addClass('play');
                        $(parent).find('.song-detail .cover').addClass('play').siblings('.handler').addClass('active');
                    }
                });
            },
            filterTime: function filterTime(timeStr) {
                var time = new Date(timeStr);
                var month = time.getMonth() + 1;
                var day = time.getDate();
                var hours = time.getHours();
                hours = hours < 10 ? '0' + hours : hours;
                var min = time.getMinutes();
                min = min < 10 ? '0' + min : min;
                return month + '月' + day + '日 ' + hours + ':' + min;
            },
            getComment: function getComment() {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: _extends({
                        limit: 20
                    }, $.$route.query),
                    url: apiUrls.comment.music,
                    success: function success(data) {
                        if (data.code == 200) {
                            data.hotComments.map(function (el) {
                                el.time = detailObj.filterTime(el.time);
                            });
                            data.comments.map(function (el) {
                                el.time = detailObj.filterTime(el.time);
                            });
                            // console.log(data);
                            $('.song-detail .comment').render($(contentTemp).find('#commentTemp'), { data: data });
                        }
                    }
                });
            },
            getSamePlayList: function getSamePlayList() {
                var _this = this;

                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: _extends({}, $.$route.query),
                    url: apiUrls.simi.playlist,
                    success: function success(data) {
                        if (data.code == 200) {
                            data.playlists.map(function (el) {
                                el.playCount = $.filterPlayCount(el.playCount);
                            });
                            _this.samePlayList = data.playlists;
                            // console.log(data, 'samePlayListTemp');
                            // commonObj.data.tracks = data.playlists
                            // $.$store.set('playList', commonObj.data)
                            $('.song-detail .same-play-list').render($(contentTemp).find('#samePlayListTemp'), { data: data });
                        }
                    }
                });
            },
            sameMusicList: function sameMusicList() {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: _extends({}, $.$route.query),
                    url: apiUrls.simi.song,
                    success: function success(data) {
                        if (data.code == 200) {
                            // console.log(data, 'sameMusicListTemp');
                            // commonObj.data.tracks = data.songs
                            // $.$store.set('playList', data.songs)
                            $('.song-detail .same-music-list').render($(contentTemp).find('#sameMusicListTemp'), { data: data });
                        }
                    }
                });
            }
        },
        mounted: function mounted() {
            this.getData();
            setTimeout(function () {
                $('.song-detail, .song-detail .cover').addClass('active');
                if ($(parent).find('.js-play').hasClass('play')) {
                    $('.song-detail .cover').addClass('play').siblings('.handler').addClass('active');
                } else {
                    $('.song-detail .cover').removeClass('play').addClass('pause').siblings('.handler').removeClass('active');
                }
            }, 120);
            $('.song-detail').on('click', '.icon-minify', function () {
                var params = $.getUrlandParam($.$store.get('historyUrl'), 'id');
                $(parent).find('.js-aside').removeClass('active');
                $.$router.push(params.path, params);
            });
            $('.song-detail').on('click', '.js-list-detail', function () {
                event.stopPropagation();
                commonObj.palyMusic($(this));
                detailObj.getData();
            });
        }
    };
    // 设置方法及属性
    Object.assign(detailObj, detailObj.data());
    Object.assign(detailObj, detailObj.methods);
    detailObj.mounted();
});
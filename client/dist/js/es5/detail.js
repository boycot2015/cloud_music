'use strict';

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
        }
    };
    // 设置方法及属性
    Object.assign(detailObj, detailObj.data());
    Object.assign(detailObj, detailObj.methods);
    detailObj.mounted();
});
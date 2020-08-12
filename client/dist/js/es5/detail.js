"use strict";

$(function () {
    var contentTemp = commonObj.getTpl("/template/index.html");
    window.detailObj = {
        data: function data() {
            return {
                cover: '',
                songTextArr: []
            };
        },

        methods: {
            getData: function getData() {
                this.getlyric();
                console.log($.$route.query);
            },
            getlyric: function getlyric() {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: $.$route.query,
                    url: apiUrls.song.lyric,
                    success: function success(data) {
                        if (data.code == 200) {
                            var tempArr = data.lrc.lyric.split('\n');
                            var newArr = [];
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
                            console.log(newArr, $.$store.get('playData'));
                            $('.song-detail .top').render($(contentTemp).find('#detailTemp'), { lyricList: newArr, playData: $.$store.get('playData') });
                        }
                    }
                });
            }
        },
        mounted: function mounted() {
            this.getData();
        }
    };
    // 设置方法及属性
    Object.assign(detailObj, detailObj.data());
    Object.assign(detailObj, detailObj.methods);
    detailObj.mounted();
});
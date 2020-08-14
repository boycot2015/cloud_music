$(function () {
    var contentTemp = commonObj.getTpl("/template/index.html");
    var parent = window.parent.document
    window.detailObj = {
        data () {
            return {
                cover: '',
                songTextArr: [],
                $refs: {
                    el: $('.song-detail'),
                    children: $('.song-detail').children()
                }
            }
        },
        methods: {
            getData (call) {
                this.getlyric(call)
                this.getComment()
                this.getSamePlayList()
                this.sameMusicList()
                // console.log($.$route.query);
            },
            getlyric (call) {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: $.$route.query,
                    url: apiUrls.song.lyric,
                    success: (data) => {
                        let newArr = []
                        if (data.code == 200 && data.lrc) {
                            let tempArr = data.lrc.lyric.split('\n')
                            tempArr.map((el, i) => {
                                let obj = {}
                                if (i > 0 && el) {
                                    el = el.split(']')
                                    obj['time'] = el[0].split('[')[1]
                                    obj['text'] = el[1]
                                    newArr.push(obj)
                                } else if (i == 0) {
                                    // obj = { time: '00:00', text: el.split(']')[0].split('[')[1] }
                                    // newArr.push(obj)
                                }
                            })
                            // console.log(newArr, $.$store.get('playData'));
                        }
                        $('.song-detail .top').render($(contentTemp).find('#detailTemp'), { lyricList: newArr, playData: $.$store.get('playData') })
                        call && call()
                    }
                })
            },
            filterTime (timeStr) {
                let time = new Date(timeStr)
                let month = time.getMonth() + 1
                let day = time.getDate()
                let hours = time.getHours()
                hours = hours < 10 ? '0' + hours : hours
                let min = time.getMinutes()
                min = min < 10 ? '0' + min : min
                return month + '月' + day + '日 ' + hours + ':' + min
            },
            getComment () {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        limit: 20,
                        // offset: 1,
                        ...$.$route.query
                    },
                    url: apiUrls.comment.music,
                    success: (data) => {
                        if (data.code == 200) {
                            data.hotComments.map(el => {
                                el.time = detailObj.filterTime(el.time)
                            })
                            data.comments.map(el => {
                                el.time = detailObj.filterTime(el.time)
                            })
                            // console.log(data);
                            $('.song-detail .comment').render($(contentTemp).find('#commentTemp'), { data })
                        }
                    }
                })
            },
            getSamePlayList () {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        ...$.$route.query
                    },
                    url: apiUrls.simi.playlist,
                    success: (data) => {
                        if (data.code == 200) {
                            data.playlists.map(el => {
                                el.playCount = $.filterPlayCount(el.playCount)
                            })
                            this.samePlayList = data.playlists
                            // console.log(data, 'samePlayListTemp');
                            // commonObj.data.tracks = data.playlists
                            // $.$store.set('playList', commonObj.data)
                            $('.song-detail .same-play-list').render($(contentTemp).find('#samePlayListTemp'), { data })
                        }
                    }
                })
            },
            sameMusicList () {
                $.ajax({
                    type: "get",
                    dataType: "json",
                    data: {
                        ...$.$route.query
                    },
                    url: apiUrls.simi.song,
                    success: (data) => {
                        if (data.code == 200) {
                            // console.log(data, 'sameMusicListTemp');
                            // commonObj.data.tracks = data.songs
                            // $.$store.set('playList', data.songs)
                            $('.song-detail .same-music-list').render($(contentTemp).find('#sameMusicListTemp'), { data })
                        }
                    }
                })
            }
        },
        mounted () {
            this.getData(function () {
                if ($(parent).find('.js-play').hasClass('play')) {
                    $('.song-detail .cover').addClass('play active').siblings('.handler').addClass('active')
                } else {
                    $('.song-detail .cover').removeClass('play').addClass('pause').siblings('.handler').removeClass('active')
                }
            })
            $('.song-detail, .song-detail .cover').addClass('active')
            $('.song-detail').on('click', '.icon-minify', function () {
                let params = $.getUrlandParam($.$store.get('historyUrl'), 'id')
                $(parent).find('.js-aside').removeClass('active')
                $.$router.push(params.path, params)
            })
            $('.song-detail').on('dblclick', '.js-list-detail', function () {
                event.stopPropagation();
                detailObj.getData(function () {
                    $('.song-detail .cover').addClass('play active').siblings('.handler').addClass('active')
                })
                commonObj.palyMusic($(this))
            })
        }
    }
    // 设置方法及属性
    Object.assign(detailObj, detailObj.data())
    Object.assign(detailObj, detailObj.methods)
    detailObj.mounted()
})
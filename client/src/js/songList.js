$(function () {
    var commonObj = window.parent.commonObj;
    const songsData = {
        setLocal () {
            let songList = $.$store.get('songList')
            let coverDetail = $.$store.get('coverDetail')
            if (songList == null || coverDetail == null) return null
            $('.song-list').render($(layoutTemp).find('#gridListTemp'), songList)
            let coverTemp = template('coverTemp', coverDetail)
            $('.song-detail-list .cover').html(coverTemp)
            return songList && coverDetail
        },
        init () {
            if (this.setLocal() == null) {
                this.getPlayList()
            }
            this.onShow()
        },
        getPlayList () {
            $('.song-list').html('')
            $.ajax({
                type: "get",
                dataType: "json",
                data: { id: $.$route.query.id },
                url: apiUrls.song.playlist,
                success (data) {
                    if (data.code == 200) {
                        let ids = []
                        data.playlist.trackIds.forEach(function (item) {
                            ids.push(item.id)
                        })
                        ids = ids.join(',')
                        songsData.getSongDetail({ ids }, function (res) {
                            data.playlist.tracks = res.songs
                            data.privileges = res.privileges
                            data.playlist.tracks.map(item => {
                                item.dt = $.filterDruationTime(item.dt)
                            })
                            let { subscribers, trackIds, tracks, ...coverDetail } = data.playlist
                            coverDetail.createTime = new Date(coverDetail.createTime).toLocaleDateString().split('/').join('-')
                            coverDetail.playCount = $.filterPlayCount(coverDetail.playCount)
                            coverDetail.subscribedCount = $.filterPlayCount(coverDetail.subscribedCount)
                            coverDetail.shareCount = $.filterPlayCount(coverDetail.shareCount)
                            let coverTemp = template('coverTemp', { coverDetail })
                            $('.song-detail-list .cover').html(coverTemp)
                            // console.log(data.playlist.tracks, 'getSongDetail')
                            commonObj.data.tracks = data.playlist.tracks
                            $('.song-list').render($(layoutTemp).find('#listTemp'), { list: data.playlist.tracks, order: true, operation: true })
                            coverDetail.description && coverDetail.description !== null && $('.song-detail-list .desc p').html('简介：' + coverDetail.description.split('\n').join('<br/>'))
                            // $.$store.set('songList', { list: data.playlist.tracks, order: true, operation: true }, new Date().getTime() + 1000)
                            // $.$store.set('coverDetail', { coverDetail }, new Date().getTime() + 1000)
                        })
                    }
                }
            })
        },
        getSongDetail (data, callback) {
            $.ajax({
                type: "get",
                dataType: "json",
                data,
                url: apiUrls.song.detail,
                success (data) {
                    var res = data.result
                    callback(data)
                }
            })
        },
        onShow () {
            $('.song-detail-list').on('click', '.js-more', function () {
                $(this).toggleClass('active').parent().toggleClass('active line-two')
            })
            // 点击列表播放歌曲
            $('.song-detail-list').on('click', '.music-list-item', function () {
                $(this).addClass('active').siblings().removeClass('active')
            })
            $('.song-detail-list').on('dblclick', '.music-list-item', function () {
                if ($(this).attr('data-id') == commonObj.playData.id && !commonObj.playData.ended) return
                var _this = $(this);
                commonObj.setCurrentData($(this), () =>{
                    _this.removeClass('pause').addClass('play active').siblings().removeClass('play active pause');
                    let listDom = $(window.parent.document).find('.js-mini-music-list, .js-footer-music-list').find('.music-list-item');
                    listDom.each(function (i, e) {
                        if ($(e).attr('data-id') == commonObj.playData.id) {
                            $(e).removeClass('pause').addClass('play active').siblings().removeClass('play active pause');
                        }
                    })
                    $(window.parent.document).find('.js-play').addClass('play');
                });
            })
            $('.song-detail-list').on('click', '.play-btn.play', function () {
                $('.song-detail-list .music-list-item').eq(0).dblclick()
            })
        }
    }
    songsData.init()
})
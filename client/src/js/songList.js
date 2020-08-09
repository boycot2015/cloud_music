$(function () {
    const songsData = {
        setLocal () {
            let songList = $.$store.get('songList')
            // $('.recommend-list').find('.date-text').html(new Date().getDate())
            // .siblings('.week').html(commonObj.weeks[new Date().getDay()])
            // $('.swiper-wrapper').render($(layoutTemp).find('#bannerTemp'), banner)
            $('.song-list').render($(layoutTemp).find('#gridListTemp'), songList)
            return songList
        },
        init () {
            if(this.setLocal() == null) {
                this.getPlayList()
            }
            this.onShow()
        },
        getPlayList () {
            // console.log($.$route, '$.$route');
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
                        ids= ids.join(',')
                        songsData.getSongDetail({ ids }, function (res) {
                            data.playlist.tracks = res.songs
                            data.privileges = res.privileges
                            data.playlist.tracks.map(item => {
                                item.dt = $.filterDruationTime(item.dt)
                            })
                            let { subscribers, trackIds, tracks, ...coverDetail } =  data.playlist
                            coverDetail.createTime = new Date(coverDetail.createTime).toLocaleDateString().split('/').join('-')
                            coverDetail.playCount = $.filterPlayCount(coverDetail.playCount)
                            coverDetail.subscribedCount = $.filterPlayCount(coverDetail.subscribedCount)
                            coverDetail.shareCount = $.filterPlayCount(coverDetail.shareCount)
                            $('.song-list').render($(layoutTemp).find('#listTemp'), { list: data.playlist.tracks, order: true, operation: true })
                            $.$store.set('songList', { list: res }, new Date().getTime() + 1000)
                            let coverTemp = template('coverTemp', { coverDetail })
                            console.log(data.playlist.tracks , 'getSongDetail')
                            $('.song-detail-list .cover').html(coverTemp)
                            coverDetail.description && coverDetail.description!==null && $('.song-detail-list .desc p').html('简介：' + coverDetail.description.split('\n').join('<br/>'))
                        })
                    }
                }
            })
        },
        getSongDetail(data, callback) {
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
            $(document).on('click', '.js-list-detail', function () {
                let id = $(this).attr('data-id')
                let type = $(this).attr('data-type')
                let ctype = $(this).attr('data-ctype')
                $.$router.push('/songs/list', { id, type, ctype })
            })
        }
    }
    songsData.init()
    $('.song-detail-list').on('click', '.js-more',function () {
        $(this).toggleClass('active').parent().toggleClass('active line-two')
    })
})
$(function () {
    //获取audio标签;
    var audioPlayer = $('#play-audio')[0];
    audioPlayer.load()
    window.layOutConfig = { // 整体架构数据配置
        setStatus (currentTime, curStr, endStr, duration) {
            var left = 0;
            duration = duration || 1;
            if (commonObj.progressPsition) {
                left = commonObj.progressPsition.left
            }
            left = currentTime * $('.progress .progress-bar').width() / duration;
            // console.log(currentTime, duration);
            left = Math.abs(left);
            if (audioPlayer.loop && !currentTime) {
                $('.js-play').removeClass('play')
                setTimeout(function () {
                    $('.js-play').addClass('play');
                }, 1000);
            }
            if (commonObj.playData.ended) {
                audioPlayer.pause()
                $('.js-play').removeClass('play')
                // console.log(commonObj.playData.loop);
                if (commonObj.playData.loop) {
                    audioPlayer.play();
                    $('.js-play').addClass('play');
                    audioPlayer.loop = true;
                }
                if ($('.order-icon').hasClass('icon-music-loop')||
                $('.order-icon').hasClass('icon-music-loop-random')) {
                    layOutConfig.playNext()
                }
                if ($('.order-icon').hasClass('icon-music-loop-random')) {
                    layOutConfig.playRandom()
                }
            }
            left = left > commonObj.maxPlayWidth ? commonObj.maxPlayWidth : left;
            currentTime <= 0 && $('.progress .end-time').html(endStr)
            $('.progress .progress-bar .point').css('left', left)
            $('.progress .progress-bar .js-line').css('width', left)
            $('.progress .start-time').html(curStr)
        },
        setVolume: function (left, width) {
            if (!left && !width) {
                audioPlayer.volume = 0.5;
                $('.volume .progress-bar .point').css('left', 42);
                $('.volume .progress-bar .line').width(50);
                return true
            }
            var volume = Math.abs(left / width);
            volume = volume > 1 ? 1 : volume;
            audioPlayer.volume = volume;
            commonObj.playData.volume = volume
            volume <= 0 ? $('.js-music-volume').addClass('close') : $('.js-music-volume').removeClass('close')
        },
        initDrag: function () {
            // 设置窗口可拖动
            $('.js-music-box .header').drag({
                target: $('.js-music-box'),
                cancelElem: $('.js-music-box .header').children().not('.logo')
            })
            // 设置时长进度条可拖动
            $('.progress .progress-bar .point').drag({
                site: commonObj.audioTimePos,
                fn (position) {
                    commonObj.progressPsition = position;
                    $('.progress .start-time').html(commonObj.playData.curStr);
                    $('.progress .progress-bar .line').width(position.left);
                    audioPlayer.pause()
                    audioPlayer.currentTime = (position.left / $('.progress .progress-bar').width() * commonObj.playData.duration);
                },
                end (position) {
                    $('.progress .start-time').html(commonObj.playData.curStr);
                    $('.progress .progress-bar .line').width(commonObj.progressPsition.left);
                    $('.js-play').hasClass('play') && audioPlayer.play()
                    audioPlayer.currentTime = (commonObj.progressPsition.left / $('.progress .progress-bar').width() * commonObj.playData.duration);
                }
            })
            // 设置mini窗口可拖动
            $('.js-mini-music-box').drag({
                cancelElem: $('.js-mini-music-box').find('.more, .volume')
            })
            // 设置音量进度条可拖动
            $('.volume .progress-bar .point').drag({
                site: commonObj.audioVolumePos,
                fn (position) {
                    commonObj.progressPsition = position
                    var left = position.left
                    layOutConfig.setVolume(left, commonObj.maxVolumeWidth)
                    left = left > 8 ? left + 8 : left
                    $('.volume .progress-bar .line').width(left)
                }
            })
        },
        playNext () {
            let nextplay = $('.js-footer-music-list .music-list-item.play').next();
            nextplay.dblclick()
        },
        playPrev () {
            let prevPlay = $('.js-footer-music-list .music-list-item.play').prev();
            prevPlay.dblclick()
        },
        playRandom () {
            let num = Math.floor(Math.random(0, 1) * $('.js-footer-music-list .music-list-item').length)
            let randomPlay = $('.js-footer-music-list .music-list-item').eq(num);
            randomPlay.dblclick()
        }
    }
    commonObj.initPlayer(audioPlayer, layOutConfig.setStatus, layOutConfig.setVolume)
    layOutConfig.initDrag()
    // 缩放窗口设置主体位置
    window.addEventListener('resize', function (e) {
        layOutConfig.initDrag()
        var dmW = document.documentElement.clientWidth || document.body.clientWidth
        var dmH = document.documentElement.clientHeight || document.body.clientHeight
        $('.js-music-box').css('left', (dmW - $('.js-music-box').width()) / 2)
        $('.js-music-box').css('top', (dmH - $('.js-music-box').height()) / 2)
        $('.js-mini-music-box').css('left', (dmW - $('.js-mini-music-box').width()) / 2)
        $('.js-mini-music-box').css('top', (dmH - $('.js-mini-music-box').height()) / 2)
    })
    // window.addEventListener('mousedown', function(){
    //     audioPlayer.muted = false;
    // }, false);

    // 渲染头部==================================
    $('.js-music-min').click(function () {
        // console.log(1231231);
        $('.js-music-box').hide().siblings('.js-mini-music-box').show();
    })
    $('.back-btn').click(function () {
        $.$router.back()
    })
    $('.forward-btn').click(function () {
        $.$router.forward()
    })

    $('.js-aside-template').on('click', '.js-toggle-class', function () {
        $(this).toggleClass('active')
        $(this).siblings('.list').toggleClass('active')
    })
    $('.js-aside-template').on('click', '.js-list-item', function () {
        $.$router.push($(this).attr('data-path'))
        $(this).addClass('active').siblings().removeClass('active').parent().parent().siblings().find('.js-list-item').removeClass('active')
    })

    // 渲染内容===================================


    // 渲染底部===================================

    // 1. 时间进度条js
    $('.progress .progress-bar').click(function (e) {
        var left = e.offsetX
        if (commonObj.progressPsition) {
            left = commonObj.progressPsition.left
        }
        $('.progress .progress-bar .point').css('left', left);
        $('.progress .progress-bar .js-line').css('width', left);
        $('.progress .start-time').html(commonObj.playData.curStr);
        audioPlayer.currentTime = left / $('.progress .progress-bar').width() * commonObj.playData.duration;
        commonObj.progressPsition = '';
    })
    // 2.音量进度条js
    $('.volume .progress-bar').click(function (e) {
        var left = e.offsetX
        if (commonObj.progressPsition) {
            left = commonObj.progressPsition.left
        }
        $('.volume .progress-bar .point').css('left', left)
        layOutConfig.setVolume(left, commonObj.maxVolumeWidth)
        left = e.offsetX > 8 ? left + 8 : left;
        $('.volume .progress-bar .js-line').width(left)
        commonObj.progressPsition = ''
    })
    $('.volume .progress-bar').mouseenter(function () {
        $(this).find('.point').show()
    }).mouseleave(function () {
        $(this).find('.point').hide()
    })
    $('.js-music-volume').click(function () {
        var width = parseInt($('.volume .progress-bar .line').css('width'))
        var left = commonObj.progressPsition.left
        $(this).toggleClass('close')
        if (!width) {
            $('.volume .progress-bar .line').width(left)
            layOutConfig.setVolume(left, commonObj.maxVolumeWidth)
            left = left > 8 ? left - 8 : left
            $('.volume .progress-bar .point').css('left', left)
        } else {
            commonObj.progressPsition = {
                left: width
            }
            audioPlayer.volume = 0;
            $('.volume .progress-bar .point').css('left', 0);
            $('.volume .progress-bar .line').width(0);
        }
    })
    // 3.播放顺序
    $('.order-icon').click(function (e) {
        // if ($(this).hasClass('icon-music-beckoning')) {
        //     return
        // }
        commonObj.playData.loop = false;
        audioPlayer.loop = false;
        if ($(this).hasClass('icon-music-loop')) {
            commonObj.playData.loop = true;
            $(this).addClass('icon-music-loop-one').removeClass('icon-music-loop icon-music-loop-random')
        } else if ($(this).hasClass('icon-music-loop-one')) {
            $(this).addClass('icon-music-loop-random').removeClass('icon-music-loop icon-music-loop-one')
        } else if ($(this).hasClass('icon-music-loop-random')) {
            $(this).addClass('icon-music-loop').removeClass('icon-music-loop-one icon-music-loop-random')
        } else {
            $(this).addClass('icon-music-loop')
        }
        // console.log(commonObj.playData.loop, 'loop');
    })

    // 4. 底部列表展示与收起
    $('.js-play-list-btn').click(function () {
        $(this).parent().find('.js-play-list').toggle()
    })
    $('.js-list-close').click(function () {
        $(this).parent().parent().hide()
    })
    $('.js-list-btn, .js-history-btn').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 5.上一首，下一首
    $('.icon-music-play-left').click(function () {
        if ($('.order-icon').hasClass('icon-music-loop-random')) {
            layOutConfig.playRandom()
            return
        }
        layOutConfig.playPrev()
    })
    $('.icon-music-play-right').click(function () {
        if ($('.order-icon').hasClass('icon-music-loop-random')) {
            layOutConfig.playRandom()
            return
        }
        layOutConfig.playNext()
    })

    /**
     * mini-box
     */
    $('.js-mini-music-box .left').mouseenter(function () {
        if ($('.js-mini-music-list').css('display') === 'none') {
            $(this).find('.js-more').stop().slideDown(200)
        }
        $(this).find('.js-play-btn').stop().fadeIn(200)
        $(this).find('.js-play-btn').css('display', 'flex')
    }).mouseleave(function () {
        $(this).find('.js-more').stop().slideUp(200)
        $(this).find('.js-play-btn').stop().fadeOut(200)
    })

    $('.js-mini-music-box').dblclick(function (e) {
        if ($(e.target).closest($('.more')).length) return;
        $(this).hide().siblings('.js-music-box').show();
    })
    $('.js-list-icon').click(function () {
        // $(this).hide().siblings('.js-music-box').show();
        var isDown = $('.js-mini-music-list').css('display')
        if (isDown === 'none') {
            $('.js-mini-music-list').slideDown(200)
        } else {
            $('.js-mini-music-list').slideUp(200)
        }
    })
    // 播放暂停
    $('.js-play').click(function () {
        if (!$('.js-play').hasClass('play')) {
            audioPlayer.play()
            $('.music-list-item.play').removeClass('play').addClass('pause')
        } else {
            $('.music-list-item.pause').removeClass('pause').addClass('play')
            audioPlayer.pause()
        }
        $('.js-play').toggleClass('play')
    })

    // 点击列表播放歌曲
    $('.js-mini-music-list, .js-footer-music-list, .song-detail-list').on('click', '.music-list-item', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    $('.js-mini-music-list, .js-footer-music-list').on('dblclick', '.music-list-item', function () {
        if ($(this).attr('data-id') == commonObj.playData.id && !commonObj.playData.ended) return
        let _this = $(this)
        commonObj.setCurrentData($(this), function () {
            let listDom = $('.js-mini-music-list, .js-footer-music-list, .song-detail-list').find('.music-list-item');
            let iframeDom = $('#iframe-pages')[0].contentWindow.document;
            let detaillistDom = $(iframeDom).find('.song-detail-list .music-list-item')
            listDom.each(function (i, e) {
                if ($(this).attr('data-id') == _this.attr('data-id')) {
                    $(this).removeClass('pause').addClass('play active').siblings().removeClass('play active pause');
                }
            })
            detaillistDom.each(function (i, e) {
                if ($(this).attr('data-id') == _this.attr('data-id')) {
                    $(this).removeClass('pause').addClass('play active').siblings().removeClass('play active pause');
                }
            })
        })
    })
    $('.js-min-music-volume').click(function () {
        $(this).parent().find('.volume').toggle()
    })

    $('.js-love-icon').click(function () {
        if ($('.js-love-icon').hasClass('icon-music-love')) {
            $('.js-love-icon').addClass('icon-music-love-full').removeClass('icon-music-love')
        } else {
            $('.js-love-icon').addClass('icon-music-love').removeClass('icon-music-love-full')
        }
    })
})
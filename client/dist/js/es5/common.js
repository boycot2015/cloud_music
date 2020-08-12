'use strict';

// 定义公共方法
var commonObj = {
    weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    timer: null,
    progressPsition: '', // 进度条位置
    maxPlayWidth: 372,
    audioTimePos: {
        l: -4,
        t: -6,
        r: 372,
        b: -4
    },
    audioVolumePos: {
        l: -4,
        t: -6,
        r: 82,
        b: -4
    },
    maxVolumeWidth: 82,
    playData: {
        src: '/src/source/前世今生-文武贝钢琴版.mp3',
        name: '至尊宝',
        singer: '徐良/杨威',
        coverImg: '/dist/images/avatar.jpg',
        volume: 0.3,
        loop: false,
        ended: false,
        muted: false,
        currentTime: 0,
        duration: 0
    },
    data: {
        tracks: [],
        code: 200
    },
    TemplateEngine: function TemplateEngine(html, options) {
        var re = /<%([^%>]+)?%>/g,
            reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
            code = 'var r=[];\n',
            cursor = 0;
        var add = function add(line, js) {
            js ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' : code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '';
            return add;
        };
        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    },
    //传入参数为文件路径,return 出返回值的responseText文本
    getTpl: function getTpl(fileUrl) {
        var result = $.ajax({
            type: "GET",
            url: fileUrl,
            async: false
        });
        return result.responseText;
    },
    getAudioInfo: function getAudioInfo(_audio, call) {
        var time = _audio.duration || 0;
        var min = parseInt(time / 60);
        var second = parseInt(time % 60);
        var currentTime = _audio.currentTime;
        var duration = min * 60 + second;
        min = min < 10 ? '0' + min : min;
        second = second < 10 ? '0' + second : second;
        var endStr = min + ':' + second;
        min = Math.round(currentTime) > 59 ? Math.round(currentTime / 60) < 10 ? '0' + parseInt(currentTime / 60) : Math.round(currentTime / 60) : '00';
        second = parseInt(currentTime % 60) < 10 ? '0' + parseInt(currentTime % 60) : parseInt(currentTime % 60);
        second = second == 60 ? '00' : second;
        var curStr = min + ':' + second;
        this.playData.src = _audio.src;
        this.playData.ended = _audio.ended;
        this.playData.muted = _audio.muted;
        this.playData.curStr = curStr;
        this.playData.endStr = endStr;
        this.playData.duration = duration;
        this.playData.currentTime = parseInt(currentTime);
        if (call) call(parseInt(currentTime), curStr, endStr, duration);
    },
    initPlayer: function initPlayer(audioPlayer, setStatus, setVolume) {
        //进度事件监听
        audioPlayer.addEventListener('timeupdate', function () {
            commonObj.getAudioInfo(audioPlayer, setStatus);
        });
        //加载事件监听
        audioPlayer.addEventListener('loadedmetadata', function () {
            // setVolume()
            commonObj.getAudioInfo(audioPlayer, setStatus);
        });
        //结束事件监听
        audioPlayer.addEventListener('ended', function () {
            commonObj.getAudioInfo(audioPlayer, setStatus);
            clearInterval(commonObj.timer);
        });
    },
    setStatus: function setStatus(currentTime, curStr, endStr, duration) {
        var left = 0;
        duration = duration || 1;
        if (commonObj.progressPsition) {
            left = commonObj.progressPsition.left;
        }
        left = currentTime * $('.progress .progress-bar').width() / duration;
        // console.log(currentTime, duration);
        left = Math.abs(left);
        if (audioPlayer.loop && !currentTime) {
            $('.js-play').removeClass('play');
            setTimeout(function () {
                $('.js-play').addClass('play');
            }, 1000);
        }
        if (commonObj.playData.ended) {
            audioPlayer.pause();
            $('.js-play').removeClass('play');
            // console.log(commonObj.playData.loop);
            if (commonObj.playData.loop) {
                audioPlayer.play();
                $('.js-play').addClass('play');
                audioPlayer.loop = true;
            }
        }
        left = left > commonObj.maxPlayWidth ? commonObj.maxPlayWidth : left;
        currentTime <= 0 && $('.progress .end-time').html(endStr);
        $('.progress .progress-bar .point').css('left', left);
        $('.progress .progress-bar .js-line').css('width', left);
        $('.progress .start-time').html(curStr);
    },
    setCurrentData: function setCurrentData(_this, callback) {
        var id = _this && _this.attr('data-id') || '';
        if (!_this && $.$store.get('playData') !== null) {
            id = $.$store.get('playData').id;
        }
        if (!commonObj.data.tracks.length && $.$store.get('playList') !== null) {
            commonObj.data.tracks = $.$store.get('playList').tracks;
        }

        if (!id || !commonObj.data.tracks.length) return;
        commonObj.data.tracks.forEach(function (item, i) {
            if (item.id == id) {
                commonObj.playData.id = item.id;
                commonObj.playData.name = item.name;
                commonObj.playData.alName = item.al.name;
                commonObj.playData.singer = '';
                item.ar.forEach(function (singer, cindex) {
                    commonObj.playData.singer += singer.name + (cindex < item.ar.length - 1 ? '/' : '');
                });
                commonObj.playData.picUrl = item.al.picUrl;
            }
        });
        commonObj.getData.getPlayUrl({ id: id }, function (data) {
            if (audioPlayer) {
                audioPlayer.muted = false;
                audioPlayer.src = data.url;
                audioPlayer.volume = commonObj.playData.volume;
            }
            commonObj.playData.src = data.url;
            commonObj.playData.level = data.level;
            commonObj.playData.type = data.type;
            $.$store.set('playData', commonObj.playData);
            $.$store.set('playList', commonObj.data);
            commonObj.getData.getPlayList(commonObj.data);
            var playData = commonObj.playData;
            $('.js-mini-music-box').find('img').attr('src', playData.picUrl);
            $('.js-music-box .music-info').attr('data-id', data.id);
            $('.js-music-box .music-info').find('img').attr('src', playData.picUrl);
            $('.js-music-box .music-info .name').html(playData.name).parent().siblings().find('.singer').html(playData.singer);
            $('.js-mini-music-box').find('.left .more .name').html(playData.name).siblings('.singer').html(playData.singer);
            var listDom = $(window.parent.document).find('.js-mini-music-list, .js-footer-music-list').find('.music-list-item');
            listDom.each(function (i, e) {
                if ($(e).attr('data-id') == commonObj.playData.id) {
                    $(e).removeClass('pause').addClass('play active').siblings().removeClass('play active pause');
                }
            });
            callback && callback();
            if (!_this) return;
            _this.removeClass('pause').addClass('play active').siblings().removeClass('play active pause');
            $(window.parent.document).find('.js-play').addClass('play');
            audioPlayer.muted = false;
            audioPlayer.src = data.url;
            audioPlayer.volume = commonObj.playData.volume;
            audioPlayer.loop = false;
            audioPlayer.play();
        });
    },

    getData: {
        init: function init() {
            // 渲染左侧菜单=====================================
            this.getMenu();
            // console.log($.$store.get('playList'), window.localStorage.getItem('playData'));
            $.$store.get('playData') !== null && commonObj.setCurrentData();
            this.getPlayList(commonObj.data);
        },
        getMenu: function getMenu() {
            $.ajax({
                type: "get",
                dataType: "json",
                data: { json: 1 },
                url: "/json/menu.json",
                success: function success(data) {
                    // //获取<script>标签内的内容,即拼接字符串的规则;
                    var asideTemp = $(layoutTemp).find('#asideTemp').text();
                    // console.log(asideTemp, ".find('#asideTemp')");
                    // //使用template的render()方法,传入模板及数据生成html片段;
                    var renderHtml = template.render(asideTemp, { list: data });
                    // //将html片段渲染到页面
                    $('.js-aside-template').html(renderHtml);
                    commonObj.onload();
                }
            });
        },
        getPlayList: function getPlayList(data) {
            // 渲染播放列表=====================================
            var localplayList = $.$store.get('playList');
            if (localplayList != null) {
                data = localplayList;
            }
            var listTemp = $(layoutTemp).find('#listTemp');
            $('.js-footer-music-list').render(listTemp, { list: data.tracks, page: data.size, isPlay: true });
            $('.js-mini-music-list ul').render(listTemp, { list: data.tracks, isminiPlay: true });
            $('.js-music-box .total .num i').html(data.tracks.length);
        },
        getPlayUrl: function getPlayUrl(data, callback) {
            $.ajax({
                type: "get",
                dataType: "json",
                data: data,
                url: apiUrls.song.playUrl,
                success: function success(res) {
                    if (res.code == 200) {
                        if (res.data[0].code == 200) {
                            callback(res.data[0]);
                        } else {
                            dialog({
                                title: '温馨提示',
                                okValue: '确定',
                                ok: function ok() {
                                    this.close();
                                    // callback(res.data[0])
                                },
                                content: '该歌曲无法播放！',
                                onshow: function onshow() {
                                    // this.content('dialog ready');
                                }
                            }).showModal();
                        }
                    }
                }
            });
        }
    },
    onload: function onload() {
        var myiframe = $('#iframe-pages');
        var fullPath = $.$store.get('url');
        if (myiframe.attr('src') !== fullPath && fullPath !== null) {
            myiframe.attr('src', fullPath);
        }
        $('.js-aside-template .js-list-item').each(function (i, e) {
            var currPath = '/src/pages';
            currPath += $(this).attr('data-path') + '.html';
            if (currPath == fullPath) {
                console.log(currPath, fullPath);
                $(this).addClass('active').siblings().removeClass('active').parent().parent().siblings().find('.js-list-item').removeClass('active');
            }
        });
    }
};
// 获取iframe
//获取模板规则<script>标签;
window.layoutTemp = commonObj.getTpl("/template/layout.html");
window.contentTemp = commonObj.getTpl("/template/index.html");

//获取audio标签;
window.audioPlayer = $('#play-audio')[0];
// 拓展jq类方法，集成全局方法
$.extend({
    filterPlayCount: function filterPlayCount(num) {
        num = num > 50000 ? parseInt(num / 10000) + '万' : num;
        return num;
    },
    filterDruationTime: function filterDruationTime(dt) {
        var min = Math.floor(dt / 60 / 1000);
        var second = Math.round(dt / 1000 % 60);
        min = min < 10 ? '0' + min : min;
        second = second < 10 ? '0' + second : second;
        return min + ':' + second;
    },

    // 路由信息
    $route: {},
    // 路由导航
    $router: {
        push: function push(path, params) {
            var myiframe = $('#iframe-pages');
            var data = '';
            if (params) {
                data = '?';
                for (var key in params) {
                    data += key + '=' + params[key] + '&';
                }
                data = data.slice(0, data.length - 1);
            }
            var url = '/src/pages' + path + '.html' + data;
            // console.log(myiframe.attr('src'), url)
            $.$store.set('route', {
                path: path,
                query: params
            });
            $.$store.set('url', url);
            myiframe.attr('src', url);
            $(window.parent.document).find('#iframe-pages').attr('src', url);
        },
        replace: function replace() {
            var context = $('#iframe-pages')[0].contentWindow;
            context.location.replace(path);
        },
        go: function go() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var context = $('#iframe-pages')[0].contentWindow;
            context.history.go(num);
        },
        forward: function forward() {
            var context = $('#iframe-pages')[0].contentWindow;
            context.history.forward();
            return context.history.length;
        },
        back: function back() {
            var context = $('#iframe-pages')[0].contentWindow;
            context.history.back();
            return context.history.length;
        }
    },
    // 本地存储
    $store: {
        state: {},
        getters: function getters() {
            return undefined.state;
        },
        /**
         * 获取本地存储
         * @param {*} key 存储的键
         */
        get: function get(key) {
            var data = JSON.parse(localStorage.getItem(key));
            if (data != null) {
                if (data.expirse != null && data.expirse < new Date().getTime()) {
                    this.remove();
                } else {
                    return data.value;
                }
            }
            return null;
        },

        /**
         * 获取本地存储
         * @param {*} key 存储的键名称
         * @param {*} value 值
         * @param {*} time 过期时间，不设置为永久
         */
        set: function set(key, value, time) {
            var data = { value: value, expirse: new Date(time).getTime() };
            localStorage.setItem(key, JSON.stringify(data));
        },

        /**
         * 移除本地存储
         * @param {*} key 存储的键
         */
        remove: function remove(key) {
            window.localStorage.removeItem(key);
        },

        action: {},
        mutations: {}
    }
});

// 拓展jquery 实例方法，用于dom调用
$.fn.extend({
    drag: function drag(options) {
        var obj = this,
            target = options.target || obj,
            site = options.site || {},
            fn = options.fn,
            cancelElem = options.cancelElem;
        var dmW = document.documentElement.clientWidth || document.body.clientWidth;
        var dmH = document.documentElement.clientHeight || document.body.clientHeight;
        site = site || {};
        obj = obj[0];
        target = target[0];
        var adsorb = site.n || 0; //磁性吸附的吸附范围
        var l = site.l || 0;
        var r = site.r || site.r == 0 ? site.r : dmW - target.offsetWidth;
        var t = site.t || 0;
        var b = site.b || site.b == 0 ? site.b : dmH - target.offsetHeight;
        obj.onmousedown = function (ev) {
            r = site.r || site.r == 0 ? site.r : dmW - target.offsetWidth;
            b = site.b || site.b == 0 ? site.b : dmH - target.offsetHeight;
            var oEvent = ev || event;
            var siteX = oEvent.clientX - target.offsetLeft;
            var siteY = oEvent.clientY - target.offsetTop;
            ev.stopPropagation();
            // 获取需要排除的元素
            var elemCancel = $(ev.target).closest(cancelElem);
            // 如果拖拽的是排除元素，函数返回
            if (elemCancel.length) {
                return true;
            }
            if (obj.setCapture) {
                //兼容IE低版本的阻止默认行为，并实现事件捕获
                obj.onmousemove = move;
                obj.onmouseup = up;
                obj.setCapture();
            } else {
                document.onmousemove = move;
                document.onmouseup = up;
            }
            function move(ev) {
                var oEvent = ev || event;
                var iLeft = oEvent.clientX - siteX;
                var iTop = oEvent.clientY - siteY;
                ev.stopPropagation();
                if (iLeft <= l + adsorb) {
                    //限制拖动范围
                    iLeft = 0;
                }
                if (iLeft >= r - adsorb) {
                    iLeft = r;
                }
                if (iTop <= t + adsorb) {
                    iTop = 0;
                }
                if (iTop >= b - adsorb) {
                    iTop = b;
                }
                if (fn) {
                    //执行回调函数，如果有其他附加情况需要处理
                    fn({ left: iLeft, top: iTop });
                }
                $(obj).find('.point').show();
                $('.js-mini-music-box').find('.volume').hide();
                target.style.left = iLeft + 'px';
                target.style.top = iTop + 'px';
            }
            function up() {
                var oEvent = ev || event;
                var iLeft = oEvent.clientX - siteX;
                var iTop = oEvent.clientY - siteY;
                if (obj.setCapture) {
                    //拖放结束后释放捕获
                    obj.releaseCapture();
                }
                if (options.end) options.end({ left: iLeft, top: iTop });
                this.onmousemove = null;
                this.onmouseup = null;
                this.onclick = null;
            }
            return this;
        };
    },
    render: function render(obj, data, constTemp) {
        // //获取<script>标签内的内容,即拼接字符串的规则;
        var temp = obj.text();
        // //使用template的render()方法,传入模板及数据生成html片段;
        // //将html片段渲染到页面
        if (constTemp) {
            this.html(constTemp);
            this.append(template.render(temp, data));
        } else {
            this.html(template.render(temp, data));
        }
    }
});
$(function () {
    var route = $.$store.get('route');
    if (route !== null) {
        $.$route = {
            path: $.$store.get('route').path,
            query: $.$store.get('route').query
        };
    }
    // 点击外出关闭弹框
    $(document).on('click', function (e) {
        if (!$('.js-play-list')[0]) {
            $(window.parent.document).find('.js-play-list').hide();
        } else if (!$('.js-play-list')[0].contains(e.target) && !e.target.contains($('.js-play-list-btn')[0])) {
            $('.js-play-list').hide();
            $(window.parent.document).find('.js-play-list').hide();
        }
    });
    commonObj.getData.init();
});
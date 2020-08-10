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
        volume: 0.5,
        loop: false,
        ended: false,
        muted: false,
        currentTime: 0,
        duration: 0
    },
    data: {},
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
        this.playData.volume = _audio.volume;
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
    }
    // 获取iframe
    //获取模板规则<script>标签;
};window.layoutTemp = commonObj.getTpl("/template/layout.html");
window.contentTemp = commonObj.getTpl("/template/index.html");

//获取audio标签;
var audioPlayer = $('#play-audio')[0];
// 拓展jq类方法，集成全局方法
$.extend({
    filterPlayCount: function filterPlayCount(num) {
        num = num > 10000 ? parseInt(num / 10000) + '万' : num;
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
                    this.state.key = null;
                    this.remove(key);
                } else {
                    return this.state.key || data.value;
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
            this.state.key = value;
        },

        /**
         * 移除本地存储
         * @param {*} key 存储的键
         */
        remove: function remove(key) {
            window.localStorage.removeItem(key);
            this.state.key = null;
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
        // this.html(this.children(0))
        if (constTemp) {
            this.html(constTemp);
            this.append(template.render(temp, data));
        } else {
            this.html(template.render(temp, data));
        }
    }
});
$(function name() {
    var route = $.$store.get('route');
    if (route !== null) {
        $.$route = {
            path: $.$store.get('route').path,
            query: $.$store.get('route').query
        };
    }
});
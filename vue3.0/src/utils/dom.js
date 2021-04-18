const _doc = document
const _docEl = document.documentElement
let scrollBarWidth = window.scrollBarWidth
const domUtils = {
    /**
     * 获取滚动条宽度（避免滚动条出现/消失，页面挤压）
     */
    getScrollBarSize: function () {
        if (scrollBarWidth !== undefined) return scrollBarWidth

        const outer = document.createElement('div')
        outer.style.visibility = 'hidden'
        outer.style.width = '100px'
        outer.style.position = 'absolute'
        outer.style.top = '-9999px'
        document.body.appendChild(outer)

        const widthNoScroll = outer.offsetWidth
        outer.style.overflow = 'scroll'

        const inner = document.createElement('div')
        inner.style.width = '100%'
        outer.appendChild(inner)

        const widthWithScroll = inner.offsetWidth
        outer.parentNode.removeChild(outer)
        scrollBarWidth = widthNoScroll - widthWithScroll

        return scrollBarWidth
    },
    /**
     * 生成弹窗随机ID
     */
    generateId: function () {
        return Math.floor(Math.random() * 10000)
    },
    convert: function (str) {
        const c = str.charAt(0)
        return c.toUpperCase() + str.replace(c, '')
    },
    scroll: function (type) {
        const _s = this.convert(type)
        return _docEl['scroll' + _s] || _doc.body['scroll' + _s]
    },
    client: function (type) {
        const _s = this.convert(type)
        return _docEl['client' + _s] || _doc.body['client' + _s]
    },
    getFollowRect: function (follow, oW, oH) {
        let followo
        const t = typeof follow
        let rT, rL, sT, sL, _top, _left, _placement
        const wW = this.client('width')
        const wH = this.client('height')

        // 定位元素（class或id .xxx|#xxx）
        if (t === 'string') {
            followo = document.querySelector(follow)
            rT = Math.round(followo.getBoundingClientRect().top)
            rL = Math.round(followo.getBoundingClientRect().left)
            sT = rT + this.scroll('top')
            sL = rL + this.scroll('left')
            if ((rT + oH + followo.offsetHeight) > wH) {
                _top = sT - oH
                _placement = 'top'
            } else {
                _top = sT + followo.offsetHeight
                _placement = 'bottom'
            }
            _left = (rL + oW) > wW ? (sL - oW + followo.offsetWidth) : sL
        }
        // 定位元素（坐标点 clientX|clientY）
        if (t === 'object') {
            rT = follow[1]
            rL = follow[0]
            sT = rT + this.scroll('top')
            sL = rL + this.scroll('left')
            _top = (rT + oH) > wH ? (sT - oH) : sT
            _left = (rL + oW) > wW ? (sL - oW) : sL
        }

        return [_left, _top, _placement]
    },
    // 获取弹窗最大层级
    getZIndex: function (zIndex) {
        for (var $idx = parseInt(zIndex), $elm = document.getElementsByTagName('*'), i = 0, len = $elm.length; i < len; i++) { $idx = Math.max($idx, $elm[i].style.zIndex) }
        return $idx
    },
    // 获取样式
    getStyle: function (el, styleName) {
        if (!el || !styleName) return
        return el.currentStyle ? el.currentStyle[styleName] : _doc.defaultView.getComputedStyle(el, null)[styleName]
    },
    on: function (el, event, handle) {
        el.attachEvent ? el.attachEvent('on' + event, handle) : el.addEventListener(event, handle, false)
    },
    off: function (el, event, handle) {
        el.detachEvent ? el.detachEvent('on' + event, handle) : el.removeEventListener(event, handle, false)
    }
}
export default domUtils

export const drag = (options) => {
    var obj = this
    var target = options.target || obj
    var site = options.site || {}
    var fn = options.fn
    // var cancelElem = options.cancelElem
    var dmW = document.documentElement.clientWidth || document.body.clientWidth
    var dmH = document.documentElement.clientHeight || document.body.clientHeight
    site = site || {}
    obj = obj[0]
    target = target[0]
    var adsorb = site.n || 0 // 磁性吸附的吸附范围
    var l = site.l || 0
    var r = (site.r || site.r === 0) ? site.r : dmW - target.offsetWidth
    var t = site.t || 0
    var b = (site.b || site.b === 0) ? site.b : dmH - target.offsetHeight
    obj.onmousedown = function (ev) {
        r = (site.r || site.r === 0) ? site.r : dmW - target.offsetWidth
        b = (site.b || site.b === 0) ? site.b : dmH - target.offsetHeight
        var oEvent = ev || event
        var siteX = oEvent.clientX - target.offsetLeft
        var siteY = oEvent.clientY - target.offsetTop
        ev.stopPropagation()
        // 获取需要排除的元素
        // var elemCancel = $(ev.target).closest(cancelElem)
        // // 如果拖拽的是排除元素，函数返回
        // if (elemCancel.length) {
        //     return true
        // }
        if (obj.setCapture) { // 兼容IE低版本的阻止默认行为，并实现事件捕获
            obj.onmousemove = move
            obj.onmouseup = up
            obj.setCapture()
        } else {
            document.onmousemove = move
            document.onmouseup = up
        }
        function move (ev) {
            var oEvent = ev || event
            var iLeft = oEvent.clientX - siteX
            var iTop = oEvent.clientY - siteY
            ev.stopPropagation()
            if (iLeft <= l + adsorb) { // 限制拖动范围
                iLeft = 0
            }
            if (iLeft >= r - adsorb) {
                iLeft = r
            }
            if (iTop <= t + adsorb) {
                iTop = 0
            }
            if (iTop >= b - adsorb) {
                iTop = b
            }
            if (fn) { // 执行回调函数，如果有其他附加情况需要处理
                fn({ left: iLeft, top: iTop })
            }
            target.style.left = iLeft + 'px'
            target.style.top = iTop + 'px'
        }
        function up () {
            var oEvent = ev || event
            var iLeft = oEvent.clientX - siteX
            var iTop = oEvent.clientY - siteY
            if (obj.setCapture) { // 拖放结束后释放捕获
                obj.releaseCapture()
            }
            if (options.end) options.end({ left: iLeft, top: iTop })
            this.onmousemove = null
            this.onmouseup = null
            this.onclick = null
        }
        return this
    }
}

export const filterPlayCount = (num) => {
    num = num > 50000 ? parseInt(num / 10000) + '万' : num
    return num
}
export const filterDruationTime = (dt) => {
    var min = Math.floor(dt / 60 / 1000)
    var second = Math.round(dt / 1000 % 60)
    min = min < 10 ? '0' + min : min
    second = second < 10 ? '0' + second : second
    return min + ':' + second
}
export const filterTime = (timeStr) => {
    const time = new Date(timeStr)
    const month = time.getMonth() + 1
    const day = time.getDate()
    let hours = time.getHours()
    hours = hours < 10 ? '0' + hours : hours
    let min = time.getMinutes()
    min = min < 10 ? '0' + min : min
    return month + '月' + day + '日 ' + hours + ':' + min
}

// 本地存储
export const store = {
    state: {},
    getters: () => {
        return this.state
    },
    /**
         * 获取本地存储
         * @param {*} key 存储的键
         */
    get (key) {
        const data = JSON.parse(localStorage.getItem(key))
        if (data != null) {
            if (data.expirse != null && data.expirse < new Date().getTime()) {
                this.remove()
            } else {
                return data.value
            }
        }
        return null
    },
    /**
         * 获取本地存储
         * @param {*} key 存储的键名称
         * @param {*} value 值
         * @param {*} time 过期时间，不设置为永久
         */
    set (key, value, time) {
        const data = { value, expirse: new Date(time).getTime() }
        localStorage.setItem(key, JSON.stringify(data))
    },
    /**
         * 移除本地存储
         * @param {*} key 存储的键
         */
    remove (key) {
        window.localStorage.removeItem(key)
    },
    action: {},
    mutations: {}
}

import { createApp } from 'vue'
import msgboxDom from './index.vue'
import domUtils from '@/utils/dom.js'
// const MessageBox = {}
let $inst
// 创建挂载实例
const createMount = (opts) => {
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)

    const app = createApp(msgboxDom, {
        ...opts,
        modelValue: true,
        remove () {
            app.unmount(mountNode)
            document.body.removeChild(mountNode)
        }
    })
    return app.mount(mountNode)
}
function MessageBox (options = {}) {
    options.id = options.id || 'MessageBox_' + domUtils.generateId()
    $inst = createMount(options)

    return $inst
}

MessageBox.install = app => {
    app.component('message-box', msgboxDom)
    app.config.globalProperties.$MessageBox = MessageBox
    app.provide('messageBox', MessageBox)
}
export default MessageBox

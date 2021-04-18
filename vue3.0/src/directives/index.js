/**
 * 加载动画类
 */
class LoadingInterface {
    constructor (props) {
        this.props = props
        this.loadingMask = document.createElement('div')
        this.loadingText = document.createElement('span')
        this.spinner = document.createElement('div')
        this.spinner.classList = 'spinner'
        for (let index = 0; index < 5; index++) {
            this.spinnerItem = document.createElement('div')
            this.spinnerItem.classList = 'rect' + (index + 1)
            this.spinner.appendChild(this.spinnerItem)
        }
        this.loadingText.classList = 'loading-text'
        this.loadingMask.classList = 'loading-dialog flexbox-h just-c'
        this.loadingText.innerHTML = '加载中...'
    }
}
const loadingEl = new LoadingInterface()

export const loading = {
    mounted (el, binding) {
        if (binding.value) {
            loadingEl.loadingMask.appendChild(loadingEl.spinner)
            loadingEl.loadingMask.appendChild(loadingEl.loadingText)
            el.appendChild(loadingEl.loadingMask)
        } else {
            el.removeChild(loadingEl.loadingMask)
        }
    },
    inserted (el, binding) {
    },
    updated (el, binding) {
        if (binding.value) {
            loadingEl.loadingMask.appendChild(loadingEl.spinner)
            loadingEl.loadingMask.appendChild(loadingEl.loadingText)
            el.appendChild(loadingEl.loadingMask)
        } else if (!binding.value && el.querySelector('.loading-dialog') !== null) {
            el.removeChild(el.querySelector('.loading-dialog'))
        }
    }
}

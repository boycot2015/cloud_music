const loadingMask = document.createElement('div')
const loadingText = document.createElement('span')
loadingText.classList = 'loading-text'
loadingMask.classList = 'loading-dialog flexbox-h just-c'
loadingText.innerHTML = '加载中...'
export const loading = {
    mounted (el, binding) {
        if (binding.value) {
            loadingMask.appendChild(loadingText)
            el.appendChild(loadingMask)
        } else {
            el.removeChild(loadingMask)
        }
    },
    inserted (el, binding) {
    },
    updated (el, binding) {
        if (binding.value) {
            loadingMask.appendChild(loadingText)
            el.appendChild(loadingMask)
        } else if (!binding.value && el.querySelector('.loading-dialog') !== null) {
            el.removeChild(el.querySelector('.loading-dialog'))
        }
    }
}

/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
// import Cookies from 'js-cookie'
import store from '@/store'
import router from '@/router'
const errorHandle = (status, response) => {
    // 401 未登陆
    // 403 token过期
    switch (status) {
    case 401:
    case 403:
        console.log('身份认证失败，请重新登录！')
        break
    // 500 服务器错误
    case 500:
    case 503:
        // router.push({ name: 'error_500' })
        break
    // 404 请求不存在
    case 404:
        console.log('404 请求不存在')
        // router.push({ name: 'error_404' })
        break
    // 其它错误，直接抛出错误提示
    default:
        // console.log('其它错误', response)
        break
    }
    return true
}

// 创建axios实例
var service = axios.create({
    timeout: 10000
})

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
service.defaults.headers.put['Content-Type'] = 'application/json'
// 添加请求拦截器

// console.log('添加请求拦截器config', router)
// console.log('---------------------------添加请求拦截器config------------------')

service.interceptors.request.use(
    (config) => {
        if ((config.method === 'post' || config.method === 'put') && config.headers['Content-Type'] === 'application/json') {
            // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
            config.data = JSON.stringify(config.data)
        }
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        const token = store.state.user.token
        token && (config.headers.Authorization = 'Bearer ' + token)
        router.beforeEach((to, from, next) => {
            config.headers.OperationCode = (to.meta.roles && to.meta.roles[0]) || ''
            // 本地存储权限code，刷新使用
            localStorage.setItem('OperationCode', (to.meta.roles && to.meta.roles[0]) || '')
            next()
        })
        let OperationCode = localStorage.getItem('OperationCode')
        if (config.params && config.params.token) {
            OperationCode = 'operation_center'
        }
        // console.log('OperationCode', OperationCode)
        // config.headers.OperationCode = OperationCode
        !config.headers.OperationCode && OperationCode && (config.headers.OperationCode = OperationCode)

        // config.headers.OperationCode = 'to.meta.code'
        // console.log('添加请求拦截器config', config)
        return config
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 请求成功
        // console.log('请求成功', response)
        if (response.status === 200) {
            // 是否为首次登录进入系统
            if (response.headers.menulist && response.headers.menulist.length) {
                if (store.state.user.menuList && store.state.user.menuList.length) {
                    store.dispatch('user/setMenuList', response.headers)
                } else {
                    return Promise.resolve(response)
                }
            }
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }
    },
    (error) => {
        // 请求失败
        const {
            response
        } = error
        if (response) {
            if (!errorHandle(response.status, response)) {
                return Promise.reject(response)
            }
        } else {
            // console.log('网咯错误****', error)
        }
    }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default service

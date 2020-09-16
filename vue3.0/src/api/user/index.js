import axios from '@/api/axios'
import urls from './urls'

export default {
    cellphone (data) {
        return axios.post(urls.cellphone, data)
    },
    login (data) {
        return axios.post(urls.login, data)
    },
    status (data) {
        return axios.post(urls.status, data)
    },
    refresh (data) {
        return axios.post(urls.refresh, data)
    },
    profile (data) {
        return axios.post(urls.profile, data)
    },
    captcha (data) {
        return axios.post(urls.captcha, data)
    },
    verify (data) {
        return axios.post(urls.verify, data)
    },
    register (data) {
        return axios.post(urls.register, data)
    },
    check (data) {
        return axios.post(urls.check, data)
    },
    rebind (data) {
        return axios.post(urls.rebind, data)
    },
    logout (data) {
        return axios.post(urls.logout, data)
    },
    subcount (data) {
        return axios.post(urls.subcount, data)
    },
    update (data) {
        return axios.post(urls.update, data)
    },
    dailySignin (data) {
        return axios.post(urls.dailySignin, data)
    },
    detail (data) {
        return axios.post(urls.detail, data)
    }
}

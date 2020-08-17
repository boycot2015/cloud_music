import axios from '@/api/axios'
import urls from './urls'

export const login = ({
    userName,
    password
}) => {
    const data = {
        userName,
        password
    }
    // return出去了一个promise
    return axios.post(urls.login, {
        data: data
    })
}

export const getMenuByToken = ({ token, userId }) => {
    return axios.get(urls.getMenuByToken, {
        params: { token, userId, appCode: 'yzh-order-service' }
    })
}

export const getUserInfo = (token) => {
    return axios.get(urls.userInfo, {
        params: token
    })
}

export const logout = (token) => {
    return urls.login
}

export const getUnreadCount = () => {
    return axios.post(urls.UnreadCount)
}

export const getMessage = () => {
    return axios.get({
        url: 'message/init',
        method: 'get'
    })
}

export const getContentByMsgId = msgId => {
    return axios.get({
        url: 'message/content',
        method: 'get',
        params: {
            msgId
        }
    })
}

export const hasRead = msgId => {
    return axios.post({
        url: 'message/has_read',
        method: 'post',
        data: {
            msgId
        }
    })
}

export const removeReaded = msgId => {
    return axios.post({
        url: 'message/remove_readed',
        method: 'post',
        data: {
            msgId
        }
    })
}

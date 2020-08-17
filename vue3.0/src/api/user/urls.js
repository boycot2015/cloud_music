import baseUrl, { loginUrl } from '../baseUrl'
export default {
    login: loginUrl + '/login',
    userInfo: baseUrl + '/userInfo',
    getMenuByToken: baseUrl + '/userApi/queryUserById'
}

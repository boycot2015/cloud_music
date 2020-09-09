import baseUrl from '../baseUrl'
export default {
    cellphone: baseUrl + '/login/cellphone', // 手机登录
    login: baseUrl + '/login', // 邮箱登录
    status: baseUrl + '/login/status', // 调用此接口,可获取登录状态
    refresh: baseUrl + '/login/refresh', // 调用此接口 , 可刷新登录状态
    profile: baseUrl + '/activate/init/profile', // 调用此接口 ,可初始化昵称
    captcha: baseUrl + '/captcha/sent', // 传入手机号码, 可发送验证码
    verify: baseUrl + '/captcha/verify', // 传入手机号码和验证码, 可校验验证码是否正确
    register: baseUrl + '/register/cellphone', // 注册网易云音乐账号
    check: baseUrl + '/cellphone/existence/check', // 检测手机号码是否已注册
    rebind: baseUrl + '/rebind', // 调用此接口 ,可更换绑定手机(流程:先发送验证码到原手机号码,再发送验证码到新手机号码然后再调用此接口)
    logout: baseUrl + '/logout', // 调用此接口 , 可退出登录
    subcount: baseUrl + '/user/subcount', // 登陆后调用此接口 , 可以获取用户信息
    update: baseUrl + '/user/update' // 登陆后调用此接口 , 传入相关信息,可以更新用户信息
}

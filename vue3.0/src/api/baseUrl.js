// 根据不同的环境设定不同的baseUrl，

let baseUrl = 'http://music.boycot.top:3000' // 本地代理
let loginUrl
const env = process.env.NODE_ENV === 'development'
    ? 'development' : process.env.VUE_APP_TITLE === 'show'
        ? 'show' : process.env.VUE_APP_TITLE === 'test'
            ? 'test' : process.env.VUE_APP_TITLE === 'test219'
                ? 'test219' : process.env.VUE_APP_TITLE === 'app.test'
                    ? 'app.test' : 'production'
switch (env) {
case 'development':
    // baseUrl = 'http://192.168.1.216:2003/api' // 测试环境url
    baseUrl = 'http://music.boycot.top:3000'
    break
case 'test':
    loginUrl = 'http://user.test.limofang.cn' // 测试环境url
    baseUrl = 'http://gateway.test.limofang.cn/api' // 测试环境url
    // loginUrl = 'http://user.reg.yunzhonghe.com' // 测试环境url
    // baseUrl = 'http://gateway.reg.yunzhonghe.com/api' // 测试环境url
    break
case 'app.test':
    loginUrl = 'http://user.app.test.yunzhonghe.com' // k8s测试环境url
    baseUrl = 'http://gateway.app.test.yunzhonghe.com/api' // k8s测试环境url
    break
case 'test219':
    loginUrl = 'http://user.219.limofang.cn' // 测试环境url
    baseUrl = 'http://gateway.219.limofang.cn/api' // 测试环境url
    break
case 'show':
    loginUrl = 'http://user.show.yunzhonghe.com' // aliyun预演环境url
    baseUrl = 'http://gateway.show.yunzhonghe.com/api' // aliyun预演环境url
    break
case 'production':
    loginUrl = 'http://user.yunzhonghe.com' // aliyun生产环境url
    baseUrl = 'http://gateway.yunzhonghe.com/api' // aliyun生产环境url
    // baseUrl = 'http://k8s.gateway.yunzhonghe.com/api' // k8s测试环境url
    break
}
export default baseUrl
export { loginUrl }

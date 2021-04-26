// 根据不同的环境设定不同的baseUrl，

// let baseUrl = 'http://music.api.boycot.top' // 本地代理
let baseUrl = 'http://music.api.boycot.top/' // 本地代理
let loginUrl
const env = process.env.NODE_ENV === 'development'
    ? 'development' : process.env.VUE_APP_TITLE === 'show'
        ? 'show' : process.env.VUE_APP_TITLE === 'test'
            ? 'test' : process.env.VUE_APP_TITLE === 'test219'
                ? 'test219' : process.env.VUE_APP_TITLE === 'app.test'
                    ? 'app.test' : 'production'
switch (env) {
case 'development':
    baseUrl = '/api'
    break
case 'test':
    baseUrl = '/api'
    break
case 'show':
    baseUrl = '/api'
    break
case 'production':
    baseUrl = 'https://boycot-music-api.vercel.app'
    break
}
export default baseUrl
export { loginUrl }

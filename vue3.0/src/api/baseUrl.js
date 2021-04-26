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
    baseUrl = 'http://music.api.boycot.top'
    break
case 'test':
    baseUrl = 'http://music.api.boycot.top'
    break
case 'show':
    baseUrl = 'http://music.api.boycot.top'
    break
case 'production':
    baseUrl = 'https://boycot-music-api.vercel.app'
    break
}
export default baseUrl
export { loginUrl }

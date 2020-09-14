module.exports = {
    css: {
        sourceMap: true,
        loaderOptions: {
            less: {
                prependData: '@import "@/assets/less/base/variables.less";'
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://music.boycot.top:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}

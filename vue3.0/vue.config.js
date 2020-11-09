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
                target: 'http://music.api.boycot.top',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}

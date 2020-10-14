var ManifestPlugin = require('webpack-manifest-plugin');
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
    },
    configureWebpack: (config) => {
        return {
            plugins: [
                new ManifestPlugin({
                    fileName: 'p-' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()+'-zch.json'
                    // publicPath: ''
                })
            ]
        }
    }
}

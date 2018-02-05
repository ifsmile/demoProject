const path = require('path')

module.exports = {
    proxy: '',
    port: 8080,
    distDir: path.resolve(__dirname, '../dist'),
    localPublicPath: '/',      // 本地
    remotePublicPath: '//cdn.xxx.cn/pub/', // 远程
    apiRoot: '/api',
    useEslint: true,
    bundleAnalyzerReport: true,
    productionGzip: false
}
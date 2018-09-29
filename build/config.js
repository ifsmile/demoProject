const path = require('path')
const fs = require('fs')

const pagesDir = 'src/pages/'
const pagePath = path.join(__dirname, '..', pagesDir)

const pages = fs.readdirSync(pagePath).reduce((acc, item) => {
    acc.push({
        name: item,
        chunk: item
    })
    return acc
}, [])

module.exports = {
    proxy: 'http://192.168.1.143:9999',
    port: 6061,
    distDir: path.resolve(__dirname, '../dist'),
    localPublicPath: '/',      // 本地
    remotePublicPath: './', // 远程
    useEslint: true,
    bundleAnalyzerReport: false,
    productionGzip: false,
    pagesDir,
    pages
}

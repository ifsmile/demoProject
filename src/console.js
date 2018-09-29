const target = 'vconsole'
const cdn = '//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/2.5.1/vconsole.min.js'
const needConsole = /debug=true/.test(location.search)
const hasConsole = !!document.getElementById(target)

if(!hasConsole && !needConsole) {
    const script = document.createElement('script')
    script.src = cdn
    script.id = target
    script.onload = () => console.log(`[${target}]: loaded`)
    document.getElementsByTagName('head')[0].appendChild(script)
}

/**
 * 在页面 url 添加 query 参数 ?debug=true，召唤神龙
 * 按需异步加载
 */

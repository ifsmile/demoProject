import weixin from 'weixin-js-sdk'
import { GET } from 'core/ajax'

// const weixin = window.wx

const wxConf = url => GET(`/wechat/jsApiSignature`, { url })

weixin.$config = (apiList = []) => {
    // weixin.checkJsApi({
    //     // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //     jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage'],
    //     success: function (res) {
    //         console.log('check', res)
    //         // 以键值对的形式返回，可用的api值true，不可用为false
    //         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //     }
    // })
    // const url = encodeURIComponent(location.href.split('#')[0])
    const url = location.href.split('#')[0]
    console.dir('[wxConf]: at', url)
    wxConf(url).then(data => {
        console.log(data)
        if (!data) {
            console.warn('[wxConf]: Not found!')
            return
        }

        weixin.config({
            beta: true,
            debug: process.env.NODE_ENV !== 'production',
            // 必填，公众号的唯一标识
            appId: data.appId,
            // 必填，生成签名的时间戳
            timestamp: data.timestamp,
            // 必填，生成签名的随机串
            nonceStr: data.nonceStr,
            // 必填，签名，见附录1
            signature: data.signature,
            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            jsApiList: apiList
        })
    })
}

export default weixin

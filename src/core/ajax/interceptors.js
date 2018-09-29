let SHOW

export const REQ_INTERCEPTOR = conf => {
    if (conf.method === 'get') conf.url += `?t=${Date.now()}`
    return conf
}

export const RES_INTERCEPTOR = ({ status, data: resData }) => {
    // 分页
    if (resData.pagination) {
        return resData
    }
    const { data } = resData
    // code 600 跳转至登录页面
    if (status === 600) {
        localStorage.removeItem('isLogin')

        const hasRedirctRoRrl = location.href.includes('redirct_to_url')
        if (!hasRedirctRoRrl) location.href = location.pathname + '#/login?redirct_to_url=' + location.href
        return Promise.reject(resData)
    }
    // 返回错误提示
    if (!resData.success) {
        SHOW && SHOW('error', resData.msg || '未知错误')
        return Promise.reject(resData)
    } else if (resData.msg) {
        SHOW && SHOW('success', resData.msg)
    }

    // success
    return data
}
export const SHOW_MESSAGE = show => {
    SHOW = show
}

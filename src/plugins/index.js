export default {
    install(Vue) {
        Vue.filter('slice', (val, len = 0) => {
            return val.substr(0, len)
        })
    }
}

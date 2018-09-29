import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'less/index.less'
// import store from './store'
// import mixin from 'mixin'
// import plugins from 'plugins'

// Vue.use(ElementUI)
// Vue.use(mixin)
// Vue.use(plugins)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    // store,
    template: '<router-view/>'
})

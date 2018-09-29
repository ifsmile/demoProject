import Vue from 'vue'
import Router from 'vue-router'

import Base from 'view/base'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Base
    }]
})

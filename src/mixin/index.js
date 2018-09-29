import _ from 'lodash'

export default {
    install(Vue) {
        Vue.mixin({
            pageTitle: '',
            data() {
                return {
                    // 枚举值维护，尽量大写避免重复
                }
            },
            filters: {
                getAgeFromDate(date) {
                    if (!date) return ''
                    const newdate = new Date(date.replace(/-/g, '/'))
                    const now = Date.now()
                    const dateTime = newdate.getTime()
                    const nowYear = new Date().getFullYear()
                    let dateYear = newdate.getFullYear()
                    let leapYearNum = 0
                    while (dateYear < nowYear && leapYearNum >= 0) {
                        if (dateYear % 4 === 0) {
                            leapYearNum += 1
                        }
                        dateYear += 1
                    }
                    const allDay = Math.floor((now - dateTime) / (24 * 60 * 60 * 1000))
                    return Math.floor((allDay - leapYearNum * 366) / 365 + leapYearNum)
                }
            },
            methods: {
                mixinArrByPid(originTableList, pid = '0') {
                    const children = []
                    _.each(originTableList, item => {
                        if (item.pid === pid) {
                            const child = this.mixinArrByPid(originTableList, item.id)
                            children.push({
                                ...item,
                                children: child.length ? child : undefined
                            })
                        }
                    })
                    return children
                }
            },
            created() {
                const title = this.$options.pageTitle
                if (title) document.title = title
            }
        })
    }
}

export default {
    methods: {
        phoneValidator(rule, value, cb) {
            if(!value) return cb()
            if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) return cb(new Error('请输入正确的手机号'))
            return cb()
        },
        usernameValidator(rule, value, cb) {
            if(!/^[0-9a-zA-Z_]+$/.test(value)) return cb(new Error('用户名只能由字母、数字、下划线组成'))
            return cb()
        }
    }
}

import { on } from 'utils/dom'
import _ from 'lodash'
/**
 * top需要固定
 * 此指令需加在和浏览器底部可能和底部相邻的元素上
 * 当节点的底部到达浏览器底部时固定此时的高度并添加滚动
 * 绑定值为节点中需要滚动的节点的类
 * {
 *  el: 需要滚动的节点类名,
 *  show: 弹窗是否打开,
 * }
 */
let arr = []
const change = ({ parent, className }) => {
    const scrollDom = document.querySelector(`.${className}`)
    if(!scrollDom) return
    scrollDom.style.height = 'auto'
    let btmHeight = 0
    let child
    let childH = 0
    let childT = 0
    const isSelf = parent.classList.contains(className)
    const clientH = document.body.clientHeight
    const parentAttr = parent.getBoundingClientRect()
    const parentH = parentAttr.height
    const parentT = parentAttr.top
    if(isSelf) {
        child = parent
        childH = parentH
        childT = parentT
    } else {
        child = parent.querySelector(`.${className}`)
        const childAttr = child.getBoundingClientRect()
        childH = childAttr.height
        childT = childAttr.top
    }
    btmHeight = parentH + parentT - (childH + childT) + 3
    if(parentH + parentT >= clientH) {
        child.style.height = `${clientH - childT - btmHeight}px`
        child.style.overflowY = 'auto'
    } else child.style.height = 'auto'
}
const onresize = () => {
    arr.forEach(item => {
        if(!item.isShow) return
        change(item)
    })
}

on(window, 'resize', _.debounce(onresize, 100))
export default {
    install(Vue) {
        Vue.directive('bottomScroll', {
            update(el, binding) {
                const isShow = binding.value.show
                if(isShow) {
                    arr.push({
                        parent: el,
                        className: binding.value.el,
                        isShow
                    })
                } else {
                    arr = arr.filter(({ className }) => className !== binding.value.el)
                }
                Vue.nextTick(() => {
                    onresize()
                })
            }
        })
    }
}

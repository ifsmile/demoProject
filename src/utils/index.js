export const findFromArr = (arr, fn) => {
    // fn: item => item.id === '213'
    let obj = null
    arr.forEach(item => {
        if(fn(item)) {
            obj = item
            return false
        } else if(item.children && item.children.length) {
            const tmpObj = findFromArr(item.children, fn)
            if(tmpObj) obj = tmpObj
        }
    })
    return obj
}

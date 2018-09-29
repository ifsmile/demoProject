export default () => {
    const query = {}
    const tmpArr = location.search.substr(1).split('&')
    tmpArr.forEach(item => {
        const arr = item.split('=')
        query[arr[0]] = arr[1]
    })
    return query
}

export default {
    message: {
        add(store, data) {
            console.log(data)
            store.commit('addMessage', data)
        }
    }
}

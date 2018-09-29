import { Stomp } from 'stompjs/lib/stomp.min'
import { curConfig } from 'appConfig'
import { workspaceDest } from './pipes'
import bus from 'utils/bus'

import base from './base'
import maintenance from './maintenance'
let pushObj = {}

const { socketUrl } = curConfig
let client = null
const waitTime = 10 * 1000

const createSocketAndConnect = store => {
    const ws = new WebSocket(socketUrl)
    client = Stomp.over(ws)

    if (process.env === 'production') client.debug = false

    client.heartbeat.outgoing = 2 * 60 * 1000
    client.connect({}, () => {
        console.log('succ')
        // 订阅
        switch (curConfig.name) {
            case 'base':
                pushObj = base
                break
            case 'maintenance':
                pushObj = maintenance
                moduleSubscribe('workspace', workspaceDest, store)
                break
            default:
        }
    }, () => {
        console.log('err')
        client = null
        ws.close()
        setTimeout(createSocketAndConnect(store), waitTime)
    })
}

const subscribe = (pipe, store) => {
    if (!client) return
    client.subscribe(pipe, msg => {
        const body = JSON.parse(msg.body)
        if(!pushObj[body.event]) {
            console.warn('[Event]:', `'${body.event}' 未注册.`)
        } else {
            pushObj[body.event](store, body.message)
        }
        msg.ack()
    })
}
const moduleSubscribe = (module, dest, store) => {
    const sub = {}
    bus.$on(`${module}Enter`, id => {
        if(!id || sub[id]) return
        sub[id] = subscribe(dest(id), store)
    })
    bus.$on(`${module}Leave`, id => {
        if(!sub[id]) return
        sub[id].unsubscribe()
        delete sub[id]
    })
}

export default store => createSocketAndConnect(store)

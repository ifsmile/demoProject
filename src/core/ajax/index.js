import axios from 'axios'
import { REQ_INTERCEPTOR, RES_INTERCEPTOR, SHOW_MESSAGE } from './interceptors'
import { curConfig } from 'appConfig'

const CONTENT_TYPE = 'application/json'

axios.defaults.baseURL = curConfig.apiBaseUrl

axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE
axios.defaults.headers.put['Content-Type'] = CONTENT_TYPE

axios.defaults.headers.accpet = CONTENT_TYPE
axios.defaults.responseType = 'json'
axios.defaults.validateStatus = status => status >= 200 && status <= 600

axios.interceptors.request.use(REQ_INTERCEPTOR)
axios.interceptors.response.use(RES_INTERCEPTOR, err => Promise.reject(err))

export const GET = (url, params) => axios.get(url, { params })
export const PUT = (url, params) => axios.put(url, params)
export const POST = (url, params) => axios.post(url, params)
export const DELETE = (url, params) => axios.delete(url, params)
export const SHOW = fn => SHOW_MESSAGE(fn)

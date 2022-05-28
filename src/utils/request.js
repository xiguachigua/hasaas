import axios from 'axios'
import { Message } from 'element-ui'

import store from '@/store'
// create an axios instance
// process.env当前进程的环境变量
const service = axios.create({
  // 设置请求根路径
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 响应拦截器

service.interceptors.request.use(config => {
  const token = store.getters.token
  config.headers.Authorization = 'Bearer ' + token
  return config
}, (error) => {
  return Promise.reject(error)
})

// 请求拦截器
service.interceptors.response.use(response => {
  const res = response.data
  const { message, success } = res
  if (!success) {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
  return res
}, (error) => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default service

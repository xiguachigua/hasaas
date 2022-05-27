import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
// process.env当前进程的环境变量
const service = axios.create({
  // 设置请求根路径
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

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

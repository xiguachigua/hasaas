import axios from 'axios'

// create an axios instance
// process.env当前进程的环境变量
const service = axios.create({
  // 设置请求根路径
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

export default service

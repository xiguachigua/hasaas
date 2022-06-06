import request from '@/utils/request'
// 登录
export function reqLogin(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data

  })
}
// 获取用户数据
export function reqGetProfle() {
  return request({
    method: 'post',
    url: '/sys/profile'

  })
}
// 根据id获取详情
export function reqGetBaseInfo(id) {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}

// 员工详情获取数据
export function reqFromEmployees(id) {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}
/** *
 * 保存员工的基本信息
 * **/
export function reqSaveUserDetailById(data) {
  return request({
    method: 'put',
    url: `/sys/user/${data.id}`,
    data
  })
}

import request from '@/utils/request'

// 获取所有角色列表
// 默认参数 如果传递参数以实参为准 没有传递参数 默认参数
export function getAllRoleList(page = 1, pagesize = 10) {
  return request({
    method: 'get',
    url: '/sys/role',
    params: {
      page,
      pagesize
    }
  })
}
// 根据id删除
export function reqDeleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 添加表单

export function reqAddRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
/** *
 * 修改角色
 * **/
export function reqUpdateRole(data) {
  return request({
    method: 'put',
    url: `/sys/role/${data.id}`,
    data
  })
}

/**
 * 根据 id 获取角色详情, 用于回显
 * **/
export function reqGetRoleDetail(id) {
  return request({
    method: 'get',
    url: `/sys/role/${id}`
  })
}

import request from '@/utils/request'

// 获取用户列表信息
export function Reqgetdepartment() {
  return request({
    method: 'get',
    url: '/company/department'

  })
}
// 根据id删除部门信息
export function Reqdeldepartment(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`

  })
}
/**
 * 新增部门接口
 **/
export function reqAddDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 根据id获取部门详情
export function reqGetDepartments(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 根据id修改
export function reqPutDepartments(form) {
  return request({
    url: `/company/department/${form.id}`,
    method: 'put',
    data: form
  })
}

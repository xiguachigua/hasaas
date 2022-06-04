import request from '@/utils/request'

/**
 * 获取员工的简单列表
 * **/
export function reqGetSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// 获取员工的综合列表数据 (分页)

export function reqGetEmployeeList(page, size) {
  return request({
    methods: 'get',
    url: '/sys/user',
    params: {
      page,
      size
    }
  })
}

/**
 * 删除员工 ()
 */
export function reqDelEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}
// 新增员工
export function AddEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

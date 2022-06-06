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
/** *
 * 封装一个批量导入员工的接口
 * data: [{}, {}, {}, {}, ... ]
 * ***/
export function reqAddEmployeeBatch(arr) {
  return request({
    method: 'post',
    url: 'sys/user/batch',
    data: arr // 数组
  })
}

/** *
 *  读取用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function reqGetPersonalDetail(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function reqUpdatePersonal(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

/** **
 * 获取用户的岗位信息  (岗位信息)
 * ****/
export function reqGetJobDetail(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息  (岗位信息)
 * ****/
export function reqUpdateJob(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}

import request from '@/utils/request'

export function reqLogin(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data

  })
}

export function reqGetProfle() {
  return request({
    method: 'post',
    url: '/sys/profile'

  })
}

export function reqGetBaseInfo(id) {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}

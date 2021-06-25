import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/reply',
    method: 'get',
    params
  })
}

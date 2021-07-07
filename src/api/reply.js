import request from '@/utils/request'

export function getReplies(params) {
  return request({
    url: '/reply',
    method: 'get',
    params
  })
}

export function updateReply(data) {
  return request({
    url: `/reply/${data.id}`,
    method: 'put',
    data
  })
}

export function createReply(data) {
  return request({
    url: '/reply',
    method: 'post',
    data
  })
}

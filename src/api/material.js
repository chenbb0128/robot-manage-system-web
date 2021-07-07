import request from '@/utils/request'

export function getImages(params) {
  return request({
    url: '/material/images',
    method: 'get',
    params
  })
}

export function getTexts(params) {
  return request({
    url: '/material/texts',
    method: 'get',
    params
  })
}

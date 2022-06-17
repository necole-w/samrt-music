import { get } from './base'

export function getRecommend () {
  return get('/banner?type=2')
}
export function getGdRecommend () {
  return get('/personalized?limit=150')
}

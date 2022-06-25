import { get } from './base'

export function getRecommend () {
  return get('/banner?type=2')
}
export function getGdRecommend () {
  return get('/top/playlist?limit=200&cat=华语')
}

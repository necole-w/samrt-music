import { get } from './base'

export function getGdRecommend () {
  return get('/personalized?limit=10')
}

import { get } from './base.js'
export function Search (value) {
  return get(`/cloudsearch?keywords=${value}`)
}

import { get } from './base'

export function getSongUrl (id) {
  return get(`/song/url?id=${id}`)
}

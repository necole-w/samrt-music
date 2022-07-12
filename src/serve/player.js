import { get } from './base'

export function getSongUrl (id) {
  return get(`/song/url?id=${id}`)
}

export function getSonglyric (id) {
  return get(`/lyric?id=${id}`)
}
// 歌曲详情
export function getSongTime (id) {
  return get(`/song/detail?ids=${id}`)
}


import { get } from './base'

export function getArtists () {
  return get('/top/artists?limit=10')
}
export function getArtist () {
  return get('/artist/list?type=-1&area=7&limit=100')
}
export function getArtistsongs (id) {
  return get(`/artist/top/song?id=${id}`)
}

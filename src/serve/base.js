import axios from 'axios'

const baseURL = 'https://music-7qqgl5tp4-necole-w.vercel.app'

axios.defaults.baseURL = baseURL

export function get (url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const serverData = res.data
    if (serverData.code) {
      return serverData
    }
  }).catch((e) => {
    console.log(e)
  })
}

import axios from 'axios'

const baseURL = 'http://necole.top:3000'

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

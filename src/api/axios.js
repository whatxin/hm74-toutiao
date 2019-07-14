import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0',
  timeout: 1000,
  headers: {
    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
  }
})

export default instance

import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0'
//   headers: {
//     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
//   }
})

instance.interceptors.request.use(function (config) {
  const user = window.sessionStorage.getItem('hm-toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, function (error) {
  // 一定错误的对象
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance

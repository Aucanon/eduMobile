import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://edufront.lagounews.com'
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 标记 token 刷新状态
let isRefreshing = false
// 存储等待时等待的请求
let requests = []

// 响应拦截器
request.interceptors.response.use(response => {
  return response
}, async (error) => {
  // 存在响应 但是出错
  if (error.response) {
    // 检测状态码 401
    if (error.response.status === 401) {
      // 检测是否存在用户登录信息
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 发送请求前判断 是否已存在刷新 token 的请求
      if (isRefreshing) {
        return requests.push(() => {
          // error.config 指的是失败请求的配置对象
          request(error.config)
        })
      }
      isRefreshing = true
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({ refreshtoken: store.state.user.refresh_token }).toString()
      })
      console.log(data)
      if (data.state !== 1) {
        // token刷新失败
        store.commit('SETUSER', null)
        redirectLogin()
        return Promise.reject(error)
      }
      // token 刷新成功
      store.commit('SETUSER', data.content)
      // 将 requests 中的所有请求重新发送
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return request(error.config)
    }
  }
  return Promise.reject(error)
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request

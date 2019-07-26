import Vue from 'vue'
// import { getToken } from '@/utils'
// import { Message } from 'iview'
// 引用axios
const login_token = process.env.LOGIN_TOKEN;
const axios = require('axios')
const qs = require('qs')
import { Toast,Indicator } from 'mint-ui'

axios.interceptors.request.use(config => {
  if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }
  // if (config.data && config.data.hasToken && config.data.hasToken == 'no'){ // 不写入token
  //
  // } else {
  //     config.headers['token'] = Vue.cookie.get(login_token) || ''
  // }
  return config
}, (error) => {
  return Promise.reject(error)
})
// response拦截器
axios.interceptors.response.use(res => {
    if (res.status == 200) {
        if (res.data.errorCode == 1) {
            //Vue.cookie.delete(login_token);
            // window.location.href = '/console/login';
        }
        return res.data;
    } else {
        return {
            msg: res.statusText
        };
    }
}, err => {
    return Promise.reject(err)
})

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios(method, url, params, file) {
  return new Promise((resolve, reject) => {
    if (params) {
      params = filterNull(params)
    }
    // params['token'] = getToken('token') ? getToken('token') : ''
    // params['token'] = params['token'] ? params['token'] : getToken('token')
    var ctype
    if (file) {
      ctype = 'multipart/form-data'
    } else {
      ctype = 'application/x-www-form-urlencoded'
    }
    // let loadSer = null
    // if (load) {
    //   loadSer = Loading.service({ fullscreen: false, background: 'transparent' })
    // }

    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      withCredentials: true,
      timeout: 1000 * 40,
      headers: { 'Content-Type': ctype }
      // headers: { 'Content-Type': 'application/json ' }
    })
      .then(res => {
        // load && loadSer.close()
        setTimeout(() => {
          Indicator.close();
        },100)
        if (parseInt(res.resultCode) == 1) {
            resolve(res)
        } else {
            Toast(res.resultMessage);
            reject(res)
        }
    }).catch(err => {
        // load && loadSer.close()
        if (err) {
            // Message.error(err)
            console.error(err)
        }
      })
  })
}

// 返回在vue模板中的调用接口
export default {
  get: async(url, params = {}) => {
    return apiAxios('GET', url, params)
  },
  post: async(url, params = {}) => {
    return apiAxios('POST', url, params)
  },
  postFile: async(url, params = {}) => {
    return apiAxios('POST', url, params, 'file')
  },
  put: async(url, params = {}) => {
    return apiAxios('PUT', url, params)
  },
  delete: async(url, params = {}) => {
    return apiAxios('DELETE', url, params)
  }
}

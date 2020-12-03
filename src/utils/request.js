import axios from 'axios'
import {
    MessageBox,
    Message
} from 'element-ui'
import qs from 'qs'
import store from '@/store'
import {
    getToken
} from '@/utils/auth'
import { showLoading, hideLoading } from './loading';

export default class AX {
    constructor() {
        this.options = {
            baseURL: process.env.VUE_APP_BASE_API,
            timeout: 50000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            paramsSerializer: params => qs.stringify(params),
            responseType: 'json'
        }
        this.ax = axios.create(this.options)
        this.ax.interceptors.request.use(
            config => {
                showLoading();
                if (store.getters.token) {
                    config.headers['token'] = getToken()
                    config.headers['language'] = store.state.app.language
                }
                return config
            },
            error => {
                console.log(error)
                return Promise.reject(error)
            }
        )

        this.ax.interceptors.response.use(
            response => {
                console.log('response--->', response)
                const res = response.data || { code: 0 }
                hideLoading();
                if (res.code !== 0) {
                    if (res.code === 10005) {
                        if (document.getElementsByClassName('el-message-box').length > 0) return
                        MessageBox.confirm('您的登陆失效了',
                            '确认登出', {
                            closeOnPressEscape: false,
                            closeOnClickModal: false,
                            confirmButtonText: '重新登陆',
                            showCancelButton: false,
                            showClose: false,
                            // cancelButtonText: 'Cancel',
                            type: 'warning'
                        }).then(() => {
                            store.dispatch('user/resetToken').then(() => {
                                location.reload()
                            })
                        })
                    } else {
                        Message({
                            message: res.msg || 'Error',
                            type: 'error',
                            duration: 5 * 1000
                        })
                    }
                    return Promise.reject(new Error(res.msg || 'Error'))
                } else {
                    return res.data
                }
            },
            error => {
                hideLoading();
                console.log('err' + error)
                Message({
                    message: error.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(error)
            }
        )
    }

    get(url, params) {
        return this.ax.get(url, {
            params
        })
    }

    post(url, data) {
        console.log('post--->', url)
        return this.ax.post(url, data)
    }
}

export const Axios = new AX()

export const AxPlugin = {
    install(vue) {
        vue.prototype.$ax = Axios
    }
}

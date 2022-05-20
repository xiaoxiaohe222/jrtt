import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Toast} from "vant";
import store from '@/store'
const instance = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    timeout:2000
})
//请求拦截器
instance.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    token && (config.headers['Authorization'] = 'Bearer '+token)
    NProgress.start()
    return config
})

//响应拦截器
instance.interceptors.response.use(
    (res) => {
        NProgress.done();
        return res.data
    },
    (error) => {
       // console.log(error);
        store.commit('user/SAVE_LOADING',false)
        if (error.response.status === 400){
            Toast.fail(error.response.data.message)
        }else if (error.response.status === 507){
            Toast.fail('服务器异常')
        }else {
            alert(error.message)
        }
        NProgress.done();
        return new Promise(() => {
        })
    }
)

export default instance

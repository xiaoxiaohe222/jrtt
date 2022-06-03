import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Toast, Dialog} from "vant";
import store from '@/store'
import {reqRefreshToken} from "@/api/index";
import router from '@/router'
const instance = axios.create({
    baseURL: 'http://geek.itheima.net',
    timeout: 2000
})
//请求拦截器
instance.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    //之所以要判断header里面有没有authorization就是因为我们要使用refresh-token
    token && config.headers.Authorization === undefined && (config.headers['Authorization'] = 'Bearer ' + token)
    NProgress.start()
    return config
})
//响应拦截器
instance.interceptors.response.use(
    (res) => {
        NProgress.done();
        return res.data
    },
    async (error) => {
        console.log(error);
        store.commit('user/SAVE_LOADING', false)
        if (error.response.status === 400) {
            Toast.fail(error.response.data.message)
        } else if (error.response.status === 507) {
            Toast.fail('服务器异常')
        } else if (error.response.status === 401) {
            // Dialog({message: '认证已过期，请先登录'});
            //登录过期之后，我们之前都是跳转到登录页面重新登录并且删除之前的token
            const res = await reqRefreshToken()
            localStorage.setItem('token', res.data.token)
            location.reload(); //刷新页面

        } else if (error.response.status === 500 && error.response.data.message === 'refresh_token失效') {
            Dialog.alert({
                message: '登录已失效，清重新登录',
            }).then(() => {
                // on close
            });
            localStorage.clear()
            router.replace('/login')
        } else {
            alert(error.message)
        }
        NProgress.done();
        return new Promise(() => {
        })
    }
)

export default instance

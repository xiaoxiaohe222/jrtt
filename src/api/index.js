import axios from './http'

//获取所有频道
export const reqAllChannels = () => axios({url: `/v1_0/channels`})

//登录接口
export  const reqLogin = (data) => axios({
    url:`/v1_0/authorizations`,
    method:'POST',
    data
})
// 获取用户渠道
export  const reqUseChannels = ()=>axios({
    url:`/v1_0/user/channels`
})
//获取文章列表  /v1_0/articles
export  const reqArticleList = ({channel_id,timestamp})=>axios({
    url:`/v1_0/articles`,
    params:{
        channel_id,
        timestamp

    }
})

import axios from './http'

//刷新token
export const reqRefreshToken = () =>axios({
    url:`/v1_0/authorizations`,
    method:'PUT',
    headers:{
        ['Content-Type']:'application/x-www-form-urlencoded',
        Authorization:'Bearer '+localStorage.getItem('refresh_token')
    }
})

//获取所有频道
export const reqAllChannels = () => axios({
    url: `/v1_0/channels`,
})

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
//对文章列表不感兴趣 /v1_0/article/dislikes
export  const reqDislikeArticle = (id)=>axios({
    url:`/v1_0/article/dislikes`,
    method:'POST',
    data:{
        target:id
    }
})
//举报文章/v1_0/article/reports
export  const reqReportArticle = (art_id,type,remark='就是其他问题')=>axios({
    url:`/v1_0/article/reports`,
    method:'POST',
    data:{
        target:art_id,
        type,
        remark
    }
})
//获取搜索建议
export const reqSuggest = (keywords)=>axios({
    url:`/v1_0/suggestion`,
    method:'GET',
    params:{
        q:keywords
    }
})

//获取文章详情数据
export const reqArticleDetail = (id) =>axios({
    url:`/v1_0/articles/${id}`
})

// 获取用户个人信息
export  const reqUserInfo = ()=>axios({
    url:'/v1_0/user'
})
// 获取用户个人信息
export  const reqProfile = ()=>axios({
    url:'/v1_0/user/profile'
})
//编辑用户头像
export  const reqEditPhoto = (photo) =>axios({
    url:`/v1_0/user/photo`,
    method:'PATCH',
    headers:{
        ['Content-Type']:'multipart/form-data'
    },
    data:{
        photo
    }
})
// 编辑用户资料
export  const reqEditProfile1 = (
    {name=undefined,gender=undefined,birthday=undefined
    ,real_name=undefined,intro=undefined
    }
)=>axios({
    url:'/v1_0/user/profile',
    method:'PATCH',
    data:{
        name,
        gender,
        birthday,
        real_name,
        intro
    }

})

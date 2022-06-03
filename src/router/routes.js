//常量路由配置
export default [
    {
        path:'/',
        redirect:'/eat'
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/login'),
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token')){
                next(false)
            }else {
                next()
            }
        }
    },
    {
        name: 'chat',
        path: '/chat',
        component: () => import('@/pages/Chat'),

    },
    {
        name: 'userEditor',
        path: '/userEditor',
        component: () => import('@/pages/UserEditor'),

    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            showFooter: true,
            scrollT:0
        }
    },
    {
        name: 'search',
        path: '/search',
        component: () => import('@/pages/Search')
    },
    {
        name: 'eat',
        path: '/eat',
        component: () => import('@/pages/Eat')
    },
    {
        name: 'test',
        path: '/test',
        component: () => import('@/pages/Test')
    },
    {
        name: 'detail',
        path: '/detail/:id',
        component: () => import('@/pages/Detail')
    },
    {
        name: 'user',
        path: '/user',
        component: () => import('@/pages/User'),
        meta: {
            showFooter: true
        }
    }
]

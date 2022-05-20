//常量路由配置
export default [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/login'),

    },
    {name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            showFooter: true
        }
    },
    {name: 'user',
        path: '/user',
        component: () => import('@/pages/User'),
        meta: {
            showFooter: true
        }
    }
]

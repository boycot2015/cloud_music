import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import store from '@/store'
import Layout from '../views/layout/index.vue'
import { store } from '@/utils'
import Cookies from 'js-cookie'
const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: () => import('../views/About.vue'),
    //     meta: {
    //         title: ''
    //     }
    // },
    {
        name: '推荐',
        path: '/',
        redirect: '/index',
        component: Layout,
        meta: {
            icon: 'record',
            title: '推荐',
            unfold: true
        },
        children: [
            {
                id: 1,
                name: 'index',
                path: '/index',
                component: () => import('../views/index.vue'),
                meta: {
                    icon: 'music',
                    title: '发现音乐'
                }
            },
            {
                id: 2,
                name: 'FM',
                path: '/FM/index',
                component: () => import('../views/FM/index.vue'),
                meta: {
                    icon: 'FM',
                    title: '私人FM',
                    hideInMenu: true

                }
            },
            {
                id: 3,
                name: 'look',
                path: '/look/index',
                component: () => import('../views/look/index.vue'),
                meta: {
                    icon: 'replay',
                    title: 'LOOK直播',
                    login: true,
                    hideInMenu: true

                }
            },
            {
                id: 4,
                name: 'videos',
                path: '/video/index',
                component: () => import('../views/video/index.vue'),
                meta: {
                    icon: 'video',
                    login: true,
                    title: '视频'

                }
            },
            {
                id: 5,
                name: 'friend',
                path: '/friend/index',
                component: () => import('../views/friend/index.vue'),
                meta: {
                    icon: 'friend',
                    login: true,
                    title: '朋友'

                }
            }
        ]
    },
    {
        name: 'myMusic',
        path: '/index',
        component: Layout,
        meta: {
            icon: 'record',
            title: '我的音乐',
            unfold: true

        },
        unfold: true,
        children: [
            {
                id: 1,
                name: 'myMusicIndex',
                path: '/myMusic/index',
                component: () => import('../views//myMusic/index.vue'),
                meta: {
                    title: '本地音乐',
                    login: true,
                    icon: 'my-music'

                }
            },
            {
                id: 2,
                name: 'download',
                path: '/myMusic/download',
                component: () => import('../views/myMusic/download.vue'),
                meta: {
                    icon: 'download',
                    login: true,
                    title: '下载管理'

                }
            },
            {
                id: 3,
                name: 'cloud',
                path: '/myMusic/cloud',
                component: () => import('../views/myMusic/cloud.vue'),
                meta: {
                    icon: 'cloud',
                    login: true,
                    title: '我的音乐云盘'

                }
            },
            {
                id: 4,
                name: 'dj',
                path: '/myMusic/dj',
                component: () => import('../views/myMusic/dj.vue'),
                meta: {
                    icon: 'radio',
                    login: true,
                    title: '我的电台'

                }
            },
            {
                id: 5,
                name: 'collect',
                path: '/myMusic/collect',
                component: () => import('../views/myMusic/collect.vue'),
                meta: {
                    title: '我的收藏',
                    login: true,
                    icon: 'star-user'

                }
            }
        ]
    },
    {
        name: 'record',
        path: '/index',
        component: Layout,
        meta: {
            icon: 'right',
            title: '创建的歌单'

        },
        children: [
            {
                id: 1,
                name: 'songs',
                path: '/songs/index',
                component: () => import('../views/songs/index.vue'),
                meta: {
                    icon: 'love',
                    login: true,
                    title: '我喜欢的音乐'

                },
                rightIcon: 'beckoning'
            }]
    },
    {
        name: '收藏的歌单',
        path: '/index',
        component: Layout,
        meta: {
            title: '收藏的歌单',
            login: true,
            icon: 'right'

        }
    },
    {
        name: 'list',
        path: '/songs/list',
        component: Layout,
        meta: {
            icon: 'right',
            hideInMenu: true,
            title: '歌单详情列表'

        },
        children: [
            {
                id: 1,
                name: 'list',
                path: '/songs/list',
                component: () => import('../views/songs/list.vue'),
                meta: {
                    icon: 'right',
                    login: true,
                    title: '歌单详情列表'

                },
                rightIcon: 'beckoning'
            }
        ]
    },
    {
        name: 'detail',
        path: '/songs/detail',
        component: Layout,
        meta: {
            icon: '',
            title: '歌单详情',
            hideMenu: true,
            hideInMenu: true

        },
        children: [
            {
                id: 1,
                name: 'detail',
                path: '/songs/detail',
                component: () => import('../views/songs/detail.vue'),
                meta: {
                    icon: 'right',
                    title: '歌单详情'

                },
                rightIcon: 'beckoning'
            }
        ]
    },
    {
        name: 'list',
        path: '/songs/list',
        component: Layout,
        meta: {
            icon: 'right',
            hideInMenu: true,
            title: '歌单详情列表'

        },
        children: [
            {
                id: 1,
                name: 'list',
                path: '/songs/list',
                component: () => import('../views/songs/list.vue'),
                meta: {
                    icon: 'right',
                    login: true, // 是否需要登录 true 需要，false 不需要，默认不需要
                    title: '歌单详情列表'

                },
                rightIcon: 'beckoning'
            }
        ]
    },
    {
        name: 'videoDetail',
        path: '/video/detail',
        component: Layout,
        meta: {
            icon: '',
            title: '视频详情',
            hideMenu: true,
            hideInMenu: true

        },
        children: [
            {
                id: 1,
                name: 'videoDetail',
                path: '/video/detail',
                component: () => import('../views/video/detail.vue'),
                meta: {
                    icon: 'right',
                    hideFooter: true,
                    title: '视频详情'

                },
                rightIcon: 'beckoning'
            }
        ]
    },
    {
        name: 'commonPage',
        path: '/common/page',
        component: Layout,
        meta: {
            icon: '',
            title: '更多列表',
            hideInMenu: true

        },
        children: [
            {
                id: 1,
                name: 'commonPage',
                path: '/common/page',
                component: () => import('../views/list-page.vue'),
                meta: {
                    icon: 'right',
                    title: '更多列表'
                },
                rightIcon: 'beckoning'
            }
        ]
    },
    {
        path: '/upgrade',
        name: 'upgrade',
        component: Layout,
        meta: {
            title: '更新日志',
            hideInMenu: true
        },
        children: [{
            path: '/upgrade',
            name: 'upgrade',
            component: () => import('../views/upgrade.vue'),
            meta: {
                title: '更新日志',
                hideInMenu: true
            }
        }]
    },
    {
        path: '/error',
        name: 'error',
        component: Layout,
        meta: {
            title: 'error',
            hideInMenu: true
        },
        children: [{
            path: '/error',
            name: 'error',
            component: () => import('../views/error.vue'),
            meta: {
                title: '网页不存在！',
                hideInMenu: true
            }
        }]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    document.title = '网抑云音乐-' + to.meta.title
    const isLogin = store.get('userInfo') && Cookies.get('cookie')
    if (to.matched.length === 0) { // 匹配不到页面跳转错误页面
        next({ path: '/error' })
        return
    }
    if (!isLogin && to.meta.login && to.path !== '/error') { // 跳转登录页面
        if (to.path === '/songs/list' && !to.query.isDaily) {
            next()
            return
        }
        next({ path: '/error', query: { isLogin: true } })
        return
    }
    next()
})

export default router

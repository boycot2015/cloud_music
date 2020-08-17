import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '../views/layout/index.vue'

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
                    title: '私人FM'

                }
            },
            {
                id: 3,
                name: 'look',
                path: '/look/index',
                component: () => import('../views/look/index.vue'),
                meta: {
                    icon: 'replay',
                    title: 'LOOK直播'

                }
            },
            {
                id: 4,
                name: 'video',
                path: '/video/index',
                component: () => import('../views/video/index.vue'),
                meta: {
                    icon: 'video',
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
            icon: 'record',
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
            icon: 'record'

        }
    },
    {
        name: 'list',
        path: '/songs/list',
        component: () => import('../views/songs/list.vue'),
        meta: {
            icon: 'cloud',
            hideInMenu: true,
            title: '歌单详情列表'

        }
    },
    {
        name: 'detail',
        path: '/songs/detail',
        component: () => import('../views/songs/detail.vue'),
        meta: {
            icon: '',
            title: '歌单详情',
            hideInMenu: true

        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

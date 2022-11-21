import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index/Home'
import store from "@/store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect:'/home',
        component: ()=>import("@/layout/index"),
        children: [
            {
                path: '/home',
                component: Home,
                meta: {
                    isLogin: false
                }

            },
            {
                path: '/search',
                name:'search',
                meta: {
                    isLogin: false
                },
                component: () => import("@/views/index/AdvancedSearch")
            },
            {
                path: '/compound',
                component: () => import("@/views/index/Compound"),
                meta: {
                    isLogin: false
                }
            },
            {
                path: '/product',
                component: () => import("@/views/index/Product"),
                meta: {
                    isLogin: false
                }
            },
            {
                path: '/oildatabase',
                component: () => import("@/views/index/Oil"),
            },
            {
                path: '/downloadpro',
                component: () => import("@/views/index/DownloadPro"),
            },
            {
                path: '/about',
                redirect: '/about/team',
                component: () => import("@/views/index/About"),
                children: [
                    {
                        path: 'team',
                        component: () => import("@/views/index/About/AboutTeam")
                    },
                    {
                        path: 'field',
                        component: () => import("@/views/index/About/AboutField")
                    },
                    {
                        path: 'paper',
                        component: () => import("@/views/index/About/AboutPapers")
                    }
                ]
            },
            {
                path: '/agency',
                redirect:'/agency/tf',
                component: () => import("@/views/index/Agency"),
                children:[
                    {
                        path:'tf',
                        component:()=>import("@/views/index/components/ThermoFisher")
                    },
                    {
                        path: 'gom',
                        component:()=>import("@/views/index/components/GCOrbitrapMS")
                    }
                ]
            },
            {
                path: '/contact',
                component:()=>import("@/views/index/Contact"),
                meta: {
                    isLogin: true
                }

            },

            {
                path: '/userlogin',
                meta: {
                    isLogin: false
                },
                component:()=>import("@/views/index/userlogin")
            },
            {
                path: '/Register',
                component:()=>import("@/views/index/Register"),
                meta: {
                    isLogin: false
                }

            }

        ]
    },
    {
        path: '/login',
        meta: {
            isLogin: false
        },
        component:()=>import("@/views/admin/Login")
    },
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/edit',
        component:()=>import("@/layout/Admin"),
        children:[
            {
                path: 'edit',
                component: ()=>import("@/views/admin/Compound")
            },
            {
                path: 'add',
                component: ()=>import("@/views/admin/Compound/add")
            },
            {
                path: 'editoil',
                component: ()=>import("@/views/admin/Oil/Table")
            },
            {
                path: 'editproduct',
                component: ()=>import("@/views/admin/Product/Table")
            },
            {
                path: 'addoil',
                component: ()=>import("@/views/admin/Oil/Add")
            },
            {
                path: 'addproduct',
                component: ()=>import("@/views/admin/Product/Add")
            },
            {
                path: 'security',
                component: ()=>import("@/views/admin/Security/Security")
            },
            {
                path: 'citySN',
                component: ()=>import("@/views/admin/Log/CitySNTable")
            },
            {
                path: 'log',
                component: ()=>import("@/views/admin/Log/DatabaseLog")
            },
            {
                path: 'download',
                component: ()=>import("@/views/admin/views/Download")
            },
            {
                path: 'editarticle',
                component: ()=>import("@/views/admin/Article/edit")
            },
            {
                path: 'addarticle',
                component: ()=>import("@/views/admin/Article/add")
            },
            {
                path: 'user',
                component: ()=>import("@/views/admin/User/list")
            },
            {
                path: 'userlog',
                component: ()=>import("@/views/admin/Log/UserLog")
            }
        ]
    },
    {
        path: '/upload',
        name: 'upload',
        redirect: '/upload/list',
        component:()=>import("@/layout/Upload"),
        children:[
            {
                path: 'list',
                component: ()=>import("@/views/upload/List")
            },
            {
                path: 'add',
                component: ()=>import("@/views/upload/Add")
            }
        ]
    },
    {
        path: '/review',
        name: 'review',
        redirect: '/review/list',
        component:()=>import("@/layout/Review"),
        children:[
            {
                path: 'list',
                component: ()=>import("@/views/review/List")
            }
        ]
    },
    {
        path: '/v2',
        name: 'v2',
        redirect: '/v2/home',
        component:()=>import("@/layout/v2Index"),
        children:[
            {
                path: 'home',
                component: ()=>import("@/views/v2Index/Home")
            },
            {
                path: 'compound',
                component: ()=>import("@/views/v2Index/Compound")
            },
            {
                path: 'oil',
                component: ()=>import("@/views/v2Index/Oil")
            },
            {
                path: 'download',
                component: ()=>import("@/views/v2Index/Download")
            },
            {
                path: 'about',
                component: ()=>import("@/views/v2Index/About")
            }
        ]
    }
];


const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith("/admin")) {
        let token = store.state.Authorization;
        if (token === null || token === '')
            next('/login');
        else
            next();
    } else
        next();

});

export default router

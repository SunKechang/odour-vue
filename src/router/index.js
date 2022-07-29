import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index/Home.vue'
import store from "@/store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect:'/home',
        component: ()=>import("@/layout/Home"),
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
                path: '/database',
                component: () => import("@/views/index/Database"),
                meta: {
                    isLogin: false
                }

            },
            {
                path: '/oildatabase',
                component: () => import("@/views/index/OilDatabase"),
            },
            {
                path: '/downloadpro',
                component: () => import("@/views/index/Downloadpro"),
            },
            {
                path: '/about',
                redirect: '/about/team',
                component: () => import("@/views/index/About"),
                children: [
                    {
                        path: 'team',
                        component: () => import("@/views/index/components/AboutTeam")
                    },
                    {
                        path: 'field',
                        component: () => import("@/views/index/components/AboutField")
                    },
                    {
                        path: 'paper',
                        component: () => import("@/views/index/components/AboutPapers")
                    }
                ]
            },
            {
                path: '/agency',
                redirect:'/agency/tf',
                component: () => import("@/views/index/CooperationAgency"),
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
        component:()=>import("@/views/admin/views/Login")
    },
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/edit',
        component:()=>import("@/layout/Admin"),
        children:[
            {
                path: 'edit',
                component: ()=>import("@/views/admin/components/CompoundTable")
            },
            {
                path: 'add',
                component: ()=>import("@/views/admin/views/AddCompound")
            },
            {
                path: 'editoil',
                component: ()=>import("@/views/admin/components/OilTable")
            },
            {
                path: 'editproduct',
                component: ()=>import("@/views/admin/components/ProductTable")
            },
            {
                path: 'addoil',
                component: ()=>import("@/views/admin/views/AddOil")
            },
            {
                path: 'addproduct',
                component: ()=>import("@/views/admin/views/AddProduct")
            },
            {
                path: 'security',
                component: ()=>import("@/views/admin/views/Security")
            },
            {
                path: 'citySN',
                component: ()=>import("@/views/admin/components/CitySNTable")
            },
            {
                path: 'log',
                component: ()=>import("@/views/admin/views/DatabaseLog")
            },
            {
                path: 'download',
                component: ()=>import("@/views/admin/views/Download")
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

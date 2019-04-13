import Vue from 'vue'
import VueRouter from 'vue-router'

// import HelloWorld from '../components/HelloWorld.vue'
import dashboard from '../components/dashboard.vue'
import Login from '../components/pages/Login.vue'
import products from '../components/pages/products.vue'


Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'*',
            redirect: 'login'
        },
        // {
        //     name: 'HelloWorld',
        //     path:'/',
        //     component: HelloWorld,
        //     meta: { requiresAuth: true }
        // },
        {
            name: 'Login',
            path: '/login',
            component: Login
        },
        {
            name: 'dashboard',
            path:'/admin',
            component: dashboard,
            children:[
                {
                    name: 'products',
                    path:'products',
                    component:products,
                    meta: { requiresAuth: true }
                }
            ]
        }
    ]
})


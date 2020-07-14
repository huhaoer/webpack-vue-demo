import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Home from "../components/Home.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path:"/home",
        component: Home
    },
    {
        path: "/about",
        component: () => import('../components/About.vue')
    }
]

const router =  new VueRouter({
    mode: 'hash',//这里要使用hash模式，不然刷新页面就空白了
    routes,
    linkExactActiveClass:'active'
})

export default router;
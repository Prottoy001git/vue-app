import CategoryManage from "@/views/pages/categories/CategoryManage.vue";
import CreateCategory from "@/views/pages/categories/CategoryCreate.vue";
import ComparePlans from "@/views/pages/ComparePlans.vue";
import Form from "@/views/pages/Form.vue";
import Home from "@/views/pages/Home.vue";
import PlanDetails from "@/views/pages/PlanDetails.vue";
import CreatePost from "@/views/pages/posts/CreatePost.vue";
import PostDetails from "@/views/pages/posts/PostDetails.vue";
import PostManage from "@/views/pages/posts/PostManage.vue";
import Pricing from "@/views/pages/Pricing.vue";
import { createRouter, createWebHistory } from "vue-router";
import CategoryCreate from "@/views/pages/categories/CategoryCreate.vue";
import CategoryUpdate from "@/views/pages/categories/CategoryUpdate.vue";
import FormObject from "@/views/pages/FormObject.vue";
import AI from "@/views/pages/AI.vue";
import ProductManage from "@/views/pages/products/ProductManage.vue";
import Login from "@/views/pages/Login.vue";

const myRouter = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'Home', meta: { auth: true } },                   // Here name is unique identifier
    
        { path: '/login', component: Login, name: 'Login', meta: { auth: false, noLayout: true } },    // meta is used to add extra custom information, those who are not authenticated will be redirected to login page
        { path: '/register', component: Login, name: 'Register', meta: { auth: false, noLayout: true } },    // meta is used to add extra custom information, those who are not authenticated will be redirected to login page
        //these routes can be accessed without authentication
        { path: '/pricing', component: Pricing, name: 'Pricing', meta: { guard: false } },      // Here name is unique identifier   
        { path: '/compare-plans', component: ComparePlans, meta: { guard: false } },
        //these routes require authentication
        { path: '/form', component: Form, meta: { auth: true } },
        { path: '/form2', component: FormObject, meta: { auth: true } },
        { path: '/plan-details/:id', component: PlanDetails, meta: { auth: true } },
        { path: '/posts', component: PostManage, meta: { auth: true } },
        { path: '/post/:id/details/:userid', component: PostDetails, meta: { auth: true } },
        { path: '/post/create', component: CreatePost, meta: { auth: true } },
        { path: '/categories', component: CategoryManage, meta: { auth: true } },
        { path: '/category/create', component: CategoryCreate, meta: { auth: true } },
        { path: '/category/update/:id', component: CategoryUpdate, meta: { auth: true } },
        { path: '/products', component: ProductManage, meta: { auth: true } },
        { path: '/ai/chat', component: AI, meta: { auth: true } },
    ]
});

myRouter.beforeEach((to, from, next) => {
    // const authenticated = !!localStorage.getItem('token');
    const hasToken = localStorage.getItem('token') ? true : false;
    if (!hasToken && to.meta.auth) {        // if not authenticated and trying to access a route that requires authentication
        // return { name: 'Login' };        // or can use name
        next('/login');               // can use path
    } else if (hasToken && !to.meta.auth && to.meta.guard !== false) {  // if authenticated and trying to access a route that doesn't require authentication
        next('/');                    // redirect to home page
    } else {
        next();
    }
});

export default myRouter
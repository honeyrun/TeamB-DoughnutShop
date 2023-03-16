import { createWebHistory, createRouter } from "vue-router";

import LoginPage from '../pages/LoginPage.vue';
import ProductListPage from '../pages/ProductListPage.vue';
import ShoppingCartPage from '../pages/ShoppingCartPage.vue';
import ProductDetailPage from '../pages/ProductDetailPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import CustomDoughnutPage from '../pages/CustomDoughnutPage.vue'
import NotFound from '../pages/NotFound.vue';
import UserPage from '../pages/UserPage.vue'

const routes = [
    {
        path: "/",
        alias: "/login",
        name: "login",
        component: LoginPage
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage
    },
    {
        path: "/productlist",
        name: "product-list",
        component: ProductListPage
    },
    {
        path: "/shoppingcart",
        name: "shopping-cart",
        component: ShoppingCartPage
    },
    {
        path: "/productdetail",
        name: "product-detail",
        component: ProductDetailPage,
        props: route=>({pid:route.query.pid}),
    },
    {
        path: "/custom",
        name: "custom",
        component: CustomDoughnutPage
    },
    {
        path: "/user",
        name: "user",
        component: UserPage
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
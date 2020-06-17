import Router from 'vue-router';
import Vue from 'vue';
const Home = () => import('./components/pages/Home.vue');
const Recommend= () => import('./components/pages/Recommend.vue');
const Publish = () => import('./components/pages/Publish.vue');
const GoodsDetail = () => import('./components/pages/GoodsDetail.vue');
const Cart = () => import('./components/pages/Cart.vue');
const UserCenter = () => import('./components/pages/UserCenter.vue');
const Login = () => import('./components/pages/Login.vue');
const Order = () => import('./components/pages/Order.vue');
const AddressManage = () => import('./components/childrenPages/AddressManage.vue');
const OrderManage = () => import('./components/childrenPages/OrderManage.vue');
const InfoManage = () => import('./components/childrenPages/InfoManage.vue');
const FeedbackManage = () => import('./components/childrenPages/FeedbackManage.vue');
const PublisherOrder = () => import('./components/childrenPages/PublisherOrder.vue');
const Register = () => import('./components/pages/Register.vue');
Vue.use(Router);

// 解决点击2次切换路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
    mode: 'hash',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/site/recommend',
            component: Recommend
        },
        {
            name: 'publish',
            path: '/site/publish',
            component: Publish,
            meta: {
                auth: true
            }
        },
        {
            path: '/site/goodsDetail',
            component: GoodsDetail
        },
        {
            path: '/site/cart',
            component: Cart
        },
        {
            name: 'login',
            path: '/site/login',
            component: Login
        },
        {
            name: 'register',
            path: '/site/register',
            component: Register
        },
        {
            path: '/site/userCenter',
            component: UserCenter,
            meta: {
                auth: true
            },
            children: [
                {
                    path: '/userCenter/addressManage',
                    component: AddressManage
                },
                {
                    path: '/userCenter/orderManage',
                    component: OrderManage,
                    name: 'orderManage'
                },
                {
                    path: '/userCenter/infoManage',
                    component: InfoManage
                },
                {
                    path: '/userCenter/feedbackManage',
                    component: FeedbackManage
                },
                {
                    path: '/userCenter/publisherOrder',
                    component: PublisherOrder,
                    name: 'publisherOrder'
                }
            ]
        },
        {
            path: '/site/order',
            name: 'order',
            component: Order
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     if(to.meta.auth) {
//         if(this.$cookieStore.getCookie('sid')) next();
//         else next('/site/login');
//     }
//     next();
// });

export default router;
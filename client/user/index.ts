import Vue from 'vue';
import router from './router';
import App from './App.vue';
import Axios from 'axios';
import Vuex from 'vuex';
import '../filters/phoneFilter.ts';
import { 
    Input, Button, Row, Col, Upload, Dialog, Form, FormItem, Pagination, Message, Select, Option,
    InputNumber, Loading, Notification, Carousel, CarouselItem, Table, TableColumn, MessageBox, 
    Cascader, Dropdown, DropdownMenu, DropdownItem, Card
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { getCookie, setCookie, delCookie } from './config/cookie';
Vue.use(Input).use(Button).use(Row).use(Col).use(Upload).use(Dialog).use(Form).use(FormItem).use(Card)
    .use(Pagination).use(Select).use(Option).use(InputNumber).use(Carousel).use(CarouselItem)
    .use(Table).use(TableColumn).use(Cascader).use(Dropdown).use(DropdownMenu).use(DropdownItem);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Vuex);
Vue.prototype.$cookieStore = {
    getCookie,
    setCookie,
    delCookie
};

// 允许携带cookie
Axios.defaults.withCredentials = true;
Vue.prototype.axios = Axios;
Axios.interceptors.request.use(function(config) {
    if(process.env.NODE_ENV === 'development') {
        config.url = '/api' + config.url;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

const store = new Vuex.Store({
    state: {
        settlementGoodsList: []    // 待结算物品列表
    },
    mutations: {
        // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
        addGoods(state, payload) {  
            state.settlementGoodsList.push(payload.goods);
        },
        // 清空待结算商品列表
        clearGoodsList(state) {
            state.settlementGoodsList = [];
        }
    },
    getters: {
        // 返回待结算商品列表
        getGoodsList: state => {
            return state.settlementGoodsList;
        } 
    }
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
import Vue from 'vue';

// 定义全局过滤器，隐藏手机中间四位
export default Vue.filter('phoneFilter', (tel) => {
    let phone = String(tel);
    if(phone) return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
});
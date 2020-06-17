<template>
    <div id="user-center">
        <div class="image-wrapper">
            <img src="../../../../static/img/timg.jpg">
        </div>
        <div class="content-wrapper" v-if="isLogin">
            <div class="title">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <b v-if="user.phone_num">欢迎您，{{ user.phone_num | phoneFilter }}</b>
                        <b>个人中心</b>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">地址管理</el-dropdown-item>
                        <el-dropdown-item command="1">订单管理</el-dropdown-item>
                        <el-dropdown-item command="2">发布管理</el-dropdown-item>
                        <el-dropdown-item command="3">修改密码</el-dropdown-item>
                        <el-dropdown-item command="4">反馈</el-dropdown-item>
                        <el-dropdown-item command="5">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="typescript">
import Login from '../pages/Login.vue';

export default {
    data() {
        return {
            user: {},
            isLogin: this.$cookieStore.getCookie('sid')
        }
    },
    components: {
        'login-input': Login
    },
    created() {
        if(this.$cookieStore.getCookie('sid')) {
            this.getUserInfo();
        } else {
            this.$confirm('您还未登录, 是否去登录?', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                this.$router.push({ name: 'login' });
            }).catch(() => {
                this.$router.push({ name: 'login' });
            });
        }
    },
    methods: {
        handleCommand(command) {
            let c = Number(command);
            switch(c) {
                case 0: 
                    this.$router.push({ path: '/userCenter/addressManage' });
                    break;
                case 1:
                    this.$router.push({ name: 'orderManage' });
                    break;
                case 2:
                    this.$router.push({ name: 'publisherOrder' });
                    break;
                case 3:
                    this.$router.push({ path: '/userCenter/infoManage' });
                    break;
                case 4:
                    this.$router.push({ path: '/userCenter/feedbackManage' });
                    break;
                case 5:
                    this.$cookieStore.delCookie('sid');
                    this.isLogin = false;
                    this.$router.push({ name: 'login' });
                    break;
                default:
                    break;
            }
        },
        getUserInfo() {
            if(this.$cookieStore.getCookie('sid')) {
                let uid = this.$cookieStore.getCookie('sid');
                this.axios.get('/site/user/' + uid).then(res => {
                    this.user = res.data[0];
                }, err => {
                    console.error(err);
                })
            }
        }
    }
}
</script>

<style lang="stylus">
    #user-center
        padding 20px;
        display flex;
        .image-wrapper
            flex 4;
            >img 
                width 420px;
        .content-wrapper
            flex 6;
            .title
                text-align right;
                margin-bottom 10px;
                .el-dropdown-link
                    cursor: pointer;
                    color: #409EFF;
                .el-icon-arrow-down
                    font-size: 12px;
                .dropdown-menu
                    a
                        text-decoration none;
                        color #b2bac2;
            .content
                border 1px solid black;
                border-bottom none;
        .tip-wrapper
            text-align center;
            flex 6;
</style>
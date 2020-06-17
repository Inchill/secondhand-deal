<template>
    <div id="app">
        <header-section v-if="$route.name !== 'login' && $route.name !== 'register'"></header-section>
        <div id="main" :class="$route.name === 'login' || $route.name === 'register' ? '':'main'">
            <router-view></router-view>
        </div>
        <footer v-if="$route.name !== 'login' && $route.name !== 'register'">
            版权所有 ©2016-{{ year }} chuckliu 版权所有
        </footer>
        <div class="toTop" v-if="$route.name !== 'login' && $route.name !== 'register'">
            <el-button type="info" icon="el-icon-caret-top" circle @click="back2Top"></el-button>
        </div>
    </div>
</template>

<script lang="typescript">
import Header from './components/base/Header.vue';

export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    },
    created() {
        if(sessionStorage.getItem('store')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
        }
    },
    components: {
        'header-section': Header
    },
    methods: {
        back2Top() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }
}
</script>

<style lang="stylus">
    #app
        background-color #f6f7fa;
        .main
            width 1080px;
            margin 10px auto;
            background-color #fff;
            box-shadow 2px 2px 10px #b2bac2;
        >footer
            background-color #fff;
            text-align center;
            padding 60px;
        .toTop
            position fixed;
            right 120px;
            bottom 120px;
</style>
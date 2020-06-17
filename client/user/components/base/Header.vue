<template>
    <div id="header">
        <div class="header-content">
            <div class="img-wrapper">
                <img src="../../../../static/img/logo.png">
            </div>
            <div class="link-wrapper">
                <router-link to="/">首页</router-link>
                <router-link to="/site/recommend">推荐</router-link>
                <router-link to="/site/publish">发布</router-link>
                <router-link to="/site/cart">购物车</router-link>
                <router-link to="/site/userCenter">我的</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="typescript">
export default {
    name: 'HeaderSection',
    data() {
        return {
            
        }
    }
}
</script>

<style lang="stylus">
    #header
        height 80px;
        background-color #fff;
        border-bottom 1px solid black;
        .header-content
            width 1080px;
            margin 0 auto;
            display flex;
            align-self center;
            .img-wrapper
                flex 10;
                >img
                    height 80px;
            .link-wrapper
                flex 6;
                .active
                    color blue;
                a
                    font-size 16px;
                    line-height 80px;
                    padding 20px;
                    text-decoration none;
                    color #b2bac2;
                a:hover
                    color #007fff;
</style>
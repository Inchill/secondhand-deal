<template>
    <div id="goods" @click="goodsDetail">
        <div class="img-wrapper">
            <img :src="imgUrl">
        </div>
        <div class="goods-info">
            <p class="goods-price">￥{{ price }}</p>
            <p class="goods-name">{{ name }}</p>
            <p class="goods-desc">{{ desc }}</p>
        </div>
    </div>
</template>

<script lang="typescript">
export default {
    data() {
        return {

        }
    },
    props: {
        price: Number, 
        name: String,
        desc: String,
        imgUrl: String,
        id: Number
    },
    methods: {
        goodsDetail() {
            this.$router.push({ path: '/site/goodsDetail?id=' + this.id });
        }
    }
}
</script>

<style lang="stylus">
    #goods
        cursor pointer;
        .img-wrapper
            >img
                width 230px;
                height 230px;
                border-radius 4%;
                border-bottom 1px solid black;
                box-sizing border-box;
        .goods-info
            padding 5px;
            .goods-desc
                color #b2bac2;
                text-overflow ellipsis;
                white-space nowrap;
                overflow hidden;
            .goods-price
                color red;
</style>
<template>
    <div id="recommend">
        <ul class="goods-list">
            <li class="goods-item" v-for="goods in goodsList" :key="goods.goods_id">
                <div>
                    <goods-card 
                        :price="goods.goods_price" 
                        :name="goods.goods_name" 
                        :desc="goods.goods_desc" 
                        :imgUrl="goods.goods_image"
                        :id="goods.goods_id">
                    </goods-card>
                </div>
            </li>
        </ul>
        <div class="refresh">
            <el-button type="primary" icon="el-icon-refresh" circle @click="refresh"></el-button>
        </div>
    </div>
</template>

<script lang="typescript">
import Goods from '../base/Goods.vue';

export default {
    data() {
        return {
            goodsList: []
        }
    },
    components: {
        'goods-card': Goods
    },
    created() {
        this.getRecommendGoods();
    },
    methods: {
        getRecommendGoods() {
            this.axios.get('/site/recommend').then(res => {
                this.goodsList = res.data;
            }, err => {
                console.error(err);
            })
        },
        refresh() {
            this.getRecommendGoods();
        }
    }
}
</script>

<style lang="stylus">
    #recommend
        padding 40px;  // 主体设置内边距
        box-sizing border-box;
        .goods-list
            padding 20px;
            .goods-item
                list-style-type none;
                display inline-block;
                width 25%;
                height 320px;
                vertical-align top;
                margin 5px 0;
                >div
                    margin 0 5px;
                    height 320px;
                    border-radius 4%;
                    box-shadow 2px 2px 10px #3378dd;
                    box-sizing border-box;
        .refresh
            position fixed;
            left 200px;
            top 120px;
</style>
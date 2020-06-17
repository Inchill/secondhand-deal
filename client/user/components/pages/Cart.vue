<template>
    <div id="cart">
        <div class="cart-wrapper">
            <ul class="goods-list" v-if="cartList.length">
                <el-table
                    ref="multipleTable"
                    :data="cartList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                        type="selection"
                        width="100"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goods_name"
                        label="商品名称"
                        width="360"
                        >
                        <template slot-scope="scope">
                            <img :src="scope.row.goods_image" style="height: 50px;width: 50px;vertical-align: middle;">
                            <span style="padding-left: 20px;vertical-align: middle;">{{ scope.row.goods_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="goods_price"
                        label="单价"
                        width="120"
                        >
                        <template slot-scope="scope">
                            {{ scope.row.goods_price }}元
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="cart_count"
                        label="数量"
                        width="180"
                        >
                        <template slot-scope="scope">
                            <el-input-number 
                                size="mini"
                                v-model="scope.row.cart_count" 
                                :min="1" :max="scope.row.goods_count" 
                                label="描述文字"
                                @change="countChangeHandler(scope.row.goods_id, scope.row.cart_count)">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        label="小计"
                        width="120"
                        >
                        <template slot-scope="scope">
                            <span style="color: red;">{{ scope.row.goods_price * scope.row.cart_count }}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        label="操作"
                        width="120"
                        >
                        <template slot-scope="scope">
                            <el-button type="danger" icon="el-icon-delete" size="mini" circle
                                @click="delCartGoods(scope.$index, scope.row)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="cart-bar">
                    <div class="section-left">
                        <span>共<em>{{ cartList.length }}</em>件商品</span>
                        <span>已选择<em>{{ multipleSelection.length || 0 }}</em>件</span>
                    </div>
                    <div class="section-right">
                        <span>总计<em>{{ totalAmount }}元</em></span>
                        <el-button type="danger" size="medium" 
                            @click="purchase" 
                            :disabled="multipleSelection.length === 0 ? true : false">去结算
                        </el-button>
                    </div>
                </div>
            </ul>
            <ul class="image-wrapper" v-else>
                <div><img src="../../../../static/img/emptyCart.png"></div>
                <div>
                    <h1>您的购物车还是空的！</h1>
                    <p>
                        <el-button size="medium" type="primary" @click="toShopping">马上去购物</el-button>
                    </p>
                </div>
            </ul>
        </div>
        <div class="recommend-wrapper">
            <h2 class="recommend-title">
                <span v-if="cartList.length">买购物车中商品的人还买了</span>
                <span v-else>为您推荐</span>
            </h2>
            <ul class="recommend-goods-list">
                <li class="recommend-item" v-for="goods in goodsList" :key="goods.goods_id">
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
        </div>
    </div>
</template>

<script lang="typescript">
import Goods from '../base/Goods.vue';

export default {
    data() {
        return {
            goodsList: [],  // 推荐商品
            cartList: [],   // 购物车商品
            multipleSelection: []
        }
    },
    computed: {
        totalAmount() {
            let sum = 0;
            for(var i = 0, len = this.multipleSelection.length; i < len; i++) {
                let goods = this.multipleSelection[i];
                sum += goods.goods_price * goods.cart_count;
            }
            return sum;
        }
    },
    methods: {
        toShopping() {
            this.$router.push({ path: '/' });
        },
        getRecommendGoods() {
            this.axios.get('/site/recommend').then(res => {
                this.goodsList = res.data;
            }, err => {
                console.error(err);
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        delCartGoods(index, row) {
            this.$confirm('您确定要删除该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/site/delCartGoods', {
                    cart_id: row.cart_id
                }).then(res => {
                    this.$notify({
                        title: '成功',
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.getUserCart();
                }, err => {
                    console.error(err);
                })
            }).catch(() => {
                // do nothing
            });
        },
        getUserCart() {
            if(this.$cookieStore.getCookie('sid')) {  // 登录是否过期
                let uid = this.$cookieStore.getCookie('sid');
                this.axios.get('/site/cart/' + uid).then(res => {
                    this.cartList = res.data;
                }, err => {
                    console.error(err);
                })
            }else {
                this.$confirm('您还未登录, 是否去登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({ name: 'login' });
                }).catch(() => {
                    // do nothing
                });
            }
        },
        // 购物车数量改变时更新数据库
        countChangeHandler(goods_id, currentVal) {
            this.axios.post('/site/cart', {
                goods_id: goods_id,
                cart_count: currentVal
            }).then(res => {
                this.getUserCart();
            }, err => {
                console.error(err);
            })
        },
        // 去结算
        purchase() {
            // 每次先清空state，因为立即购买也可以跳转到结算页面
            this.$store.commit('clearGoodsList');
            for(var i = 0, len = this.multipleSelection.length; i < len; i++) {
                let goods = {
                    goods_id: this.multipleSelection[i].goods_id,
                    goods_image: this.multipleSelection[i].goods_image,
                    goods_name: this.multipleSelection[i].goods_name,
                    goods_price: this.multipleSelection[i].goods_price,
                    count: this.multipleSelection[i].cart_count,
                    cart_id: this.multipleSelection[i].cart_id
                };
                this.$store.commit('addGoods', { goods });
                sessionStorage.setItem('store', JSON.stringify(this.$store.state));  // 数据持久化，防刷新内存里vuex数据丢失
            }
            this.$router.push({ 
                name: 'order'
            });
        }
    },
    components: {
        'goods-card': Goods
    },
    created() {
        this.getRecommendGoods();
        this.getUserCart();
    }
}
</script>

<style lang="stylus">
    #cart
        padding 40px;
        .cart-bar
            display flex;
            text-align center;
            margin 20px 0;
            em
                color red;
                margin 0 10px;
            .section-left
                flex 6;
                text-align left;
                >span
                    vertical-align middle;
                    display inline-block;
                    margin-right 30px;
            .section-right
                flex 4;
                text-align right;
                >span 
                    margin-right 30px;
        .image-wrapper
            display flex;
            margin-bottom 20px;
            >div:nth-child(1)
                flex 6;
                >img
                    max-width 600px;
            >div:nth-child(2)
                flex 4;
                text-align center;
                padding-top 200px;
                >h1
                    margin-bottom 20px;
        .recommend-wrapper
            .recommend-title
                position relative;
                margin-top 20px;
                height 50px;
                font-size 30px;
                font-weight 400;
                color #757575;
                border-top 1px solid #e0e0e0;
                >span 
                    position absolute;
                    top -20px;
                    left 282px;
                    height 40px;
                    width 462px;
                    line-height 40px;
                    text-align center;
                    display block;
            .recommend-goods-list
                padding 20px;
                .recommend-item
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
</style>
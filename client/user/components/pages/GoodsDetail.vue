<template>
    <div id="goodsDetail">
        <div class="image-wrapper">
            <el-carousel height="500px">
                <el-carousel-item v-for="(image, index) in images" :key="index">
                    <h3 class="small"><img :src="image"></h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="options-wrapper">
            <div class="name">
                <label>商品名称：</label>
                <em>{{ goods.goods_name }}</em>
            </div>
            <div class="desc">
                <label>商品描述：</label>
                <span>{{ goods.goods_desc }}</span>
            </div>
            <div class="price">
                <label>商品价格：</label>
                <em>￥{{ goods.goods_price }}</em>
            </div>
            <div class="num">
                <label>数量</label>
                <el-input-number 
                    v-model="num" 
                    :min="1" :max="goods.count" 
                    label="描述文字">
                </el-input-number>
            </div>
            <div class="operation">
                <el-button type="primary" plain @click="addToCart">加入购物车</el-button>
                <el-button type="danger" @click="purchase">立即购买</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="typescript">
export default {
    name: 'goodsDetail',
    data() {
        return {
            id: this.$route.query.id,
            goods: {},
            num: 1,
            images: []
        }
    },
    methods: {
        getGoodsById() {
            this.axios.get('/site/findGoods/' + this.id).then(res => {
                this.goods = res.data[0];
            }, err => {
                console.error(err);
            });
            this.axios.get('/site/getImages/' + this.id).then(res => {
                this.images.push(this.goods.goods_image);
                for(var i = 0; i < res.data.length; i++) {
                    this.images.push(res.data[i].image_url);
                }
            }, err => {
                console.error(err);
            })
        },
        addToCart() {
            if(this.$cookieStore.getCookie('sid')) {
                let uid = this.$cookieStore.getCookie('sid'),
                    gid = this.goods.goods_id,
                    count = this.num;
                this.axios.post('/site/addToCart', {
                    uid: uid,
                    gid: gid,
                    count: count
                }).then(res => {
                    this.$notify({
                        title: '成功',
                        message: '加入购物车成功！',
                        type: 'success'
                    });
                }, err => {
                    console.error(err);
                    this.$notify({
                        title: '失败',
                        message: '加入购物车失败！',
                        type: 'danger'
                    });
                })
            } else {
                this.$confirm('您还未登录, 是否去登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({ name: 'login' });
                }).catch(() => {
                    this.$router.push({ name: 'login' });
                });
            }
        },
        purchase() {
            if(this.$cookieStore.getCookie('sid')) {
                let goods = {
                    goods_id: this.goods.goods_id,
                    goods_image: this.goods.goods_image,
                    goods_name: this.goods.goods_name,
                    goods_price: this.goods.goods_price,
                    count: this.num
                }
                // 每次先清空state，因为购物车也可以跳转到结算页面
                this.$store.commit('clearGoodsList');
                this.$store.commit('addGoods', { goods });
                sessionStorage.setItem('store', JSON.stringify(this.$store.state));  // 数据持久化，防刷新内存里vuex数据丢失
                this.$router.push({ 
                    name: 'order'
                });
            }
            else {
                this.$confirm('您还未登录, 是否去登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({ name: 'login' });
                }).catch(() => {
                    this.$router.push({ name: 'login' });
                });
            }
        }
    },
    created() {
        this.getGoodsById();
    }
}
</script>

<style lang="stylus">
    #goodsDetail
        padding 10px;
        display flex;
        .image-wrapper
            flex 6;
            text-align center;
            margin-right 10px;
            .el-carousel__item h3
                color #475669;
                font-size 14px;
                opacity 0.75;
                line-height 150px;
                margin 0;
                >img
                    width 500px;
                    height 500px;
            .el-carousel__item:nth-child(2n)
                background-color #99a9bf;
            .el-carousel__item:nth-child(2n+1)
                background-color #d3dce6;
        .options-wrapper
            flex 6;
            text-align center;
            background-color #F2F6FC;
            .price
                >em
                    color red;
            .name
                >em
                    font-weight bold;
            >div
                margin 60px 0;
</style>
<template>
    <div id="publisher-order">
        <h4>发布管理</h4>
        <el-card class="box-card" v-for="order in orderList" :key="order.order_id">
            <div slot="header" class="clearfix">
                <span style="font-weight: bold;">{{ order.goods_name }}</span>
                <el-button style="float: right; padding: 3px 0" v-if="order.order_status === 1"
                    type="text" @click="getReceiverAddress(order)">去送货</el-button>
            </div>
            <div class="text item">
                <img :src="order.goods_image" style="height: 100px;width: 100px;vertical-align: middle;">
                <span>商品数量：{{ order.count }}件</span>
                <span>总价：<em style="color: red;">{{ order.total_amount }}元</em></span>
            </div>
            <div class="text item" style="text-align: right;">
                <label>订单状态：<em v-if="order.order_status === 1" style="color: red;">进行中</em><em v-else style="color: gray;">已完成</em></label>
            </div>
        </el-card>
    </div>
</template>

<script lang="typescript">
export default {
    data() {
        return {
            orderList: []
        }
    },
    created() {
        this.getOrder();
    },
    methods: {
        getOrder() {
            let uid = this.$cookieStore.getCookie('sid');
            this.axios.get('/site/publisherOrder/' + uid).then(res => {
                this.orderList = res.data;
            }, err => {
                console.error(err);
            })
        },
        getReceiverAddress(order) {
            this.axios.get('/site/getReceiverAddress/' + order.address_id)
            .then(res => {
                let address = res.data[0];
                this.$alert('<h4>姓名：' + address.name + '</h4><p>手机号：' + address.phone_num + 
                    '</p><p>详细地址：' + address.address + '</p>', '收货人信息', {
                    dangerouslyUseHTMLString: true,
                    showClose: false
                });
            }, err => {
                console.error(err);
            })
        }
    }
}
</script>

<style lang="stylus">
    #publisher-order
        padding 20px;
        >h4
            margin-bottom 20px;
        .order-info-wrqpper
            display flex;
            .order-image
                flex 3;
                display inline-block;
            .order-detail
                flex 7;
                display inline-block;
</style>
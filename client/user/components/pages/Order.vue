<template>
    <div id="order">
        <div class="address">
            <h3>收货地址</h3>
            <div type="text" class="address-item" id="address-item"
                v-for="address in addressList" 
                :key="address.address_id" 
                @click="selectAddress(address)"
                :class="address.address_id === selectedAddress.address_id ? 'clicked' : ''">
                <div>
                    <h4>{{ address.name }}</h4>
                    <p>{{ address.phone_num | phoneFilter }}</p>
                    <p>{{ address.address }}</p>
                </div>
                <div v-if="address.address_id === selectedAddress.address_id" 
                    class="del-address"
                    @click="delAddress(address)">删除
                </div>
            </div>
            <el-button type="text" @click="dialogFormVisible = true" class="add-btn">
                <i class="el-icon-circle-plus">添加地址</i>
            </el-button>
            <el-dialog title="添加收货地址" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules" status-icon ref="ruleForm">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" type="tel"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" :label-width="formLabelWidth">
                        <address-input @sendMsg="getAddress"></address-input>
                        <el-input v-model="street" placeholder="街道和门牌号"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="goods-list">
            <h3>商品</h3>
            <el-table :data="goodsList" style="width: 100%">
                <el-table-column label="商品名称">
                    <template slot-scope="scope">
                        <img :src="scope.row.goods_image" style="height: 50px;width: 50px;vertical-align: middle;">
                        <span style="padding-left: 20px;vertical-align: middle;">{{ scope.row.goods_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="单价x数量">
                    <template slot-scope="scope">
                        {{ scope.row.goods_price }}元x{{ scope.row.count }}
                    </template>
                </el-table-column>
                <el-table-column label="商品总价">
                    <template slot-scope="scope">
                        <em style="color: red;">{{ scope.row.goods_price * scope.row.count }}元</em>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="totalAmount">
            <div class="showAddress" v-if="Object.keys(selectedAddress).length">
                <p>{{ selectedAddress.name }} {{ selectedAddress.phone_num | phoneFilter }}</p>
                <p>{{ selectedAddress.address }}</p>
            </div>
            <div class="btn-bar">
                <span>应付总额：<em style="color: red;">{{ totalAmount }}元</em></span>
                <el-button type="danger" @click="toPay">去支付</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="typescript">
import Address from '../base/Address.vue';

export default {
    name: 'order',
    data() {
        var validateTel = (rule, value, callback) => {
            if(!value) callback(new Error('请输入手机号'));
            else {
                if(!(/^1[3456789]\d{9}$/.test(value))) {
                    callback(new Error('手机号格式不对'));
                }
                callback();
            }
        }
        return {
            dialogTableVisible: false,
            dialogFormVisible: false,
            street: '',
            form: {
                name: '',
                phone: '',
                address: ''
            },
            formLabelWidth: '80px',
            rules: { 
                phone: [
                    { validator: validateTel, trigger: ['change', 'blur'] }
                ]
            },
            addressList: [],
            goodsList: this.$store.getters.getGoodsList,     // 结算商品列表
            selectedAddress: {}   // 选择的地址
        }
    },
    components: {
        'address-input': Address
    },
    created() {
        if(this.$cookieStore.getCookie('sid')) {
            this.getUserAddress();
        }else {
            this.$confirm('您还未登录, 是否去登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push({ path: '/site/login' });
            }).catch(() => {
                // do nothing
            });
        }
    },
    methods: {
        // 从三级联动地址输入组件里获取省市区
        getAddress(province, city, block) {
            this.form.address = province + city + block;
        },
        submit() {
            if(this.form.name !== '' && this.form.phone !== '' && this.form.address !== '' &&
            this.street !== '') {
                this.dialogFormVisible = false;
                let uid = this.$cookieStore.getCookie('sid');
                this.form.address += this.street;
                this.axios.post('/site/addAddress', {
                    form: this.form,
                    uid: uid
                }).then(res => {
                    this.getUserAddress();
                }, err => {
                    console.error(err);
                })
            }else {
                this.$message.error('请输入完整信息');
            }
        },
        cancel() {
            this.dialogFormVisible = false;
            this.form.name = this.form.phone = '';
            this.detailAddress = '';
        },
        // 获取用户的地址
        getUserAddress() {
            let uid = this.$cookieStore.getCookie('sid');
            this.axios.get('/site/getAddress/' + uid).then(res => {
                this.addressList = res.data;
            }, err => {
                console.error(err);
            })
        },
        selectAddress(address) {
            this.selectedAddress = address;
        },
        // 删除地址
        delAddress(address) {
            this.axios.post('/site/delAddress', {
                address_id: address.address_id
            }).then(res => {
                this.getUserAddress();
            }, err => {
                console.error(err);
            })
        },
        // 清空购物车
        emptyCart() {
            this.axios.post('/site/emptyCart', {
                goodsList: this.goodsList
            }).then(res => {

            }, err => {

            })
        },
        // 支付生成订单
        toPay() {
            if(Object.keys(this.selectedAddress).length) {
                this.axios.post('/site/addOrder', {
                    orderList: this.goodsList,
                    buyer_id: this.$cookieStore.getCookie('sid'),
                    address_id: this.selectedAddress.address_id
                }).then(res => {
                    if(res.data === 200) {
                        // 清空购物车(从购物车界面过来会传递cart_id)
                        if(this.goodsList[0].cart_id) {
                            this.emptyCart();
                        };
                        this.$message({
                            message: '下单成功，请注意及时收货！',
                            type: 'success',
                            duration: 2000
                        });
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                            loading.close();
                            this.$router.push('/site/userCenter');
                        }, 2000);
                    }
                }, err => {
                    console.error(err);
                })
            } else {
                this.$alert('<h4>请选择地址</h4>', '', {
                    dangerouslyUseHTMLString: true,
                    showClose: false
                });
            }
        }
    },
    computed: {
        totalAmount() {
            let sum = 0;
            for(var i = 0, len = this.goodsList.length; i < len; i++) {
                sum += this.goodsList[i].goods_price * this.goodsList[i].count;
            }
            return sum;
        }
    }
}
</script>

<style lang="stylus">
    #order
        padding 20px;
        .address
            margin-bottom 20px;
            .add-btn,.address-item
                width 200px;
                height 200px;
                justify-content center;
                align-items center;
                border 1px solid #e0e0e0;
                margin-top 20px;
                vertical-align middle;
            .address-item
                display inline-block;
                margin-right 10px;
                cursor pointer;
                position relative;
                .del-address
                    position absolute;
                    bottom 0;
                    right 0;
                    padding 10px;
                    color red;
                    cursor pointer;
                >div
                    padding 40px 20px;
                    text-align center;
                    >h4, p
                        margin 5px 0;
                    >p:nth-child(2)
                        word-wrap break-word;
        .totalAmount
            display flex;
            margin-top 20px;
            .showAddress
                flex 6;
            .btn-bar
                flex 4;
                text-align right;
</style>
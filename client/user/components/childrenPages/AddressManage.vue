<template>
    <div id="address-manage">
        <h4>地址管理</h4>
        <el-table :data="addressList" style="width: 100%;">
            <el-table-column prop="name" label="姓名">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column prop="phone_num" label="手机号">
                <template slot-scope="scope">
                    {{ scope.row.phone_num }}
                </template>
            </el-table-column>
            <el-table-column prop="phone_num" label="地址">
                <template slot-scope="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" @click="delAddress(scope.row.address_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="typescript">
export default {
    data() {
        return {
            addressList: []
        }
    },
    created() {
        this.getUserAddress();
    },
    methods: {
        getUserAddress() {
            let uid = this.$cookieStore.getCookie('sid');
            this.axios.get('/site/getAddress/' + uid).then(res => {
                this.addressList = res.data;
            }, err => {
                console.error(err);
            })
        },
        delAddress(address_id) {
            this.axios.post('/site/delAddress', {
                address_id: address_id
            }).then(res => {
                this.getUserAddress();
            }, err => {
                console.error(err);
            })
        }
    },
}
</script>

<style lang="stylus">
    #address-manage
        padding 20px;
        >h4
            margin-bottom 20px;
</style>
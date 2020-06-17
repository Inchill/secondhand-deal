<template>
    <div id="address-input">
        <el-select
            v-model="sheng"
            @change="choseProvince"
            placeholder="省级地区">
            <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id">
            </el-option>
        </el-select>
        <el-select
            v-model="shi"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
                v-for="item in shi1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
            </el-option>
        </el-select>
        <el-select
            v-model="qu"
            @change="choseBlock"
            placeholder="区级地区">
            <el-option
                v-for="item in qu1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script lang="typescript">
import mapJson from '../../../../static/json/map.json';

export default {
    name: 'address-input',
    data() {
        return {
            province: '',
            sheng: '',
            shi: '',
            shi1: [],
            qu: '',
            qu1: [],
            city: [],
            block: [],
            selectedProvince: '',
            selectedCity: '',
            selectedBlock: ''
        }
    },
    created() {
        this.getCityData();
    },
    methods: {
        getCityData() {
            this.province = [];
            this.city = [];
            this.block = [];
            // 省市区数据分类
            for (var item in mapJson) {
                if (item.match(/0000$/)) {//省
                    this.province.push({id: item, value: mapJson[item], children: []});
                } else if (item.match(/00$/)) {//市
                    this.city.push({id: item, value: mapJson[item], children: []});
                } else {//区
                    this.block.push({id: item, value: mapJson[item]});
                }
            }
            // 分类市级
            for (var index in this.province) {
                for (var index1 in this.city) {
                    if (this.province[index].id.slice(0, 2) === this.city[index1].id.slice(0, 2)) {
                        this.province[index].children.push(this.city[index1]);
                    }
                }
            }
            // 分类区级
            for(var item1 in this.city) {
                for(var item2 in this.block) {
                    if (this.block[item2].id.slice(0, 4) === this.city[item1].id.slice(0, 4)) {
                        this.city[item1].children.push(this.block[item2]);
                    }
                }
            }
        },
        // 选省
        choseProvince(e) {
            for (var index2 in this.province) {
                if (e === this.province[index2].id) {
                    this.shi1 = this.province[index2].children;
                    this.shi = this.province[index2].children[0].value;
                    this.selectedCity = this.shi;
                    this.qu1 =this.province[index2].children[0].children;
                    this.qu = this.province[index2].children[0].children[0].value;
                    this.selectedBlock = this.qu;
                    this.E = this.qu1[0].id;
                    this.selectedProvince = this.province[index2].value;
                }
            }
            this.$emit('sendMsg', this.selectedProvince, this.selectedCity, this.selectedBlock);
        },
        // 选市
        choseCity(e) {
            for (var index3 in this.city) {
                if(e === this.city[index3].id) {
                    this.qu1 = this.city[index3].children;
                    this.qu = this.city[index3].children[0].value;
                    this.E = this.qu1[0].id;
                    this.selectedCity = this.city[index3].value;
                }
            }
            this.$emit('sendMsg', this.selectedProvince, this.selectedCity, this.selectedBlock);
        },
        // 选区
        choseBlock(e) {
            for(var index4 in this.block) {
                if(e === this.block[index4].id) {
                    this.selectedBlock = this.block[index4].value;
                }
            }
            this.$emit('sendMsg', this.selectedProvince, this.selectedCity, this.selectedBlock);
        }
    }
}
</script>

<style lang="stylus">

</style>
<template>
    <div id="home">
        <el-row :gutter="20">
            <el-col :span="10" :offset="6">
                <el-input
                    placeholder="搜索商品"
                    v-model="keyword"
                    clearable>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-col>
        </el-row>
        <div class="nav-content">
            <ul class="nav-bar">
                <li class="nav-item"
                    v-for="item in categoryList" 
                    :key="item.category_id"
                    :class="categoryNum === item.category_id ? 'clicked':''" 
                    @click="getGoodsByKind(item.category_id)">
                {{ item.goods_type }}
                </li>
            </ul>
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
        </div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                 <el-pagination
                    background
                    layout="prev, pager, next"
                    class="pagination"
                    :hide-on-single-page="true"
                    :page-count="page.pageCount"
                    :page-size="page.pageSize"
                    :current-page="page.currentPage"
                    @current-change="pageChange">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="typescript">
import Goods from '../base/Goods.vue';

export default {
    name: 'home',
    data() {
        return {
            categoryNum: 0,      // 导航编号
            goodsList: [],
            categoryList: [],
            keyword: '',
            page: {
                currentPage: 1,
                pageSize: 20,    // 每页显示条目个数
                pageCount: 1    // 总页数
            }
        }
    },
    created() {
        this.getAllGoods();
        this.getCategory();
    },
    methods: {
        getGoodsByKind(categoryNum) {
            this.categoryNum = categoryNum;
            if(this.categoryNum === 0) this.getAllGoods();
            else {
                this.axios.get('/site/goods/' + categoryNum).then(res => {
                    this.goodsList = res.data;
                }, err => {
                    console.error(err);
                })
            }
        },
        getAllGoods() {
            this.axios.get('/site/index').then(res => {
                this.page.pageCount = Math.ceil(res.data.length / this.page.pageSize);
                this.pageChange(this.page.currentPage);
            }, err => {
                console.error(err);
            })
        },
        getCategory() {
            this.axios.get('/site/category').then(res => {
                this.categoryList = res.data;
            }, err => {
                console.error(err);
            })
        },
        search() {
            this.axios.get('/site/search', {
                params: {
                    keyword: this.keyword
                }
            }).then(res => {
                this.goodsList = res.data;
            }, err => {
                console.error(err);
            })
        },
        pageChange(currentPage) {
            this.page.currentPage = currentPage;
            this.axios.get('/site/goodsPage', {
                params: {
                    currentPage: currentPage,
                    pageSize: this.page.pageSize
                }
            }).then(res => {
                this.goodsList = res.data;
            }, err => {
                console.error(err);
            })
        }
    },
    components: {
        'goods-card': Goods
    }
}
</script>

<style lang="stylus">
    .clicked
        cursor pointer;
        color #007fff !important;
        border-bottom 1px solid #007fff;
    #home
        padding 20px;  // 主体设置内边距
        box-sizing border-box;
        .nav-content
            padding 20px;
            .nav-bar
                .nav-item
                    list-style-type none;
                    display inline-block;
                    padding 20px;
                    cursor pointer;
                    color #b2bac2;
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
</style>
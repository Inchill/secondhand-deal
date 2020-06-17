<template>
    <div id="publish">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-select v-model="category" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input-number v-model="form.price"></el-input-number>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input-number 
                v-model="form.num" 
                :min="1" :max="10" 
                label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :auto-upload="false"
                    :limit="4"
                    :file-list="fileList"
                    :http-request="Upload"
                    :on-change="handleChange"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发布</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="typescript">
import client from '../../config/aliOss.ts';

export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            form: {
                name: '',
                categoryId: 1,
                price: 0,
                num: 1,
                desc: '',
                imageUrl: ''
            },
            imageUrls: [],
            goods_id: '',  // 插入商品记录后返回
            category: '',
            fileList: [],
            options: [],
            categoryList: []
        }
    },
    created() {
        if(this.$cookieStore.getCookie('sid')) {
            this.getCategory();
        } else {
            this.$confirm('您还未登录, 是否去登录?', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                this.$router.push({ name: 'login' });
            }).catch(() => {
                this.$router.push({ name: 'login' });
            });
        }
    },
    methods: {
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
        },
        onSubmit() {
            if(this.$cookieStore.getCookie('sid')) {
                // 表单校验
                if(this.form.name !== '' && this.form.type !== '' && this.form.price !== 0 
                && this.form.num !== 0 && this.form.desc !== '') {
                    this.categoryList.forEach(item => {
                        if(this.category === item.goods_type) {
                            this.form.categoryId = item.category_id;
                        }
                    });
                    this.Upload();
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close();
                        this.$router.push({ path: '/' });
                    }, 2000);
                } else {
                    this.$message({
                        message: '请输入完整信息!',
                        type: 'warning'
                    });
                }
            }else {
                this.$confirm('您还未登录, 是否去登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({ path: '/site/userCenter' });
                }).catch(() => {
                    // do nothing
                });
            }
        },
        getCategory() {
            this.axios.get('/site/category').then(res => {
                this.categoryList = res.data;
                this.categoryList.forEach(item => {
                    if(item.category_id !== 0) {
                        this.options.push({
                            label: item.goods_type,
                            value: item.goods_type
                        })
                    }
                })
            }, err => {
                console.error(err);
            })
        },
        async Upload() {
            try {
                //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，
                // 实现将文件上传至当前Bucket或Bucket下的指定目录。
                let file = this.fileList[0];
                let name = file.name.substring(0, file.name.indexOf('.'));
                let result = await client.multipartUpload(name, file.raw);
                // 判断?后是否带有uploadId，有则截取不要
                let url = result.res.requestUrls[0];
                if(url.indexOf('?') !== -1) {
                    let end = url.indexOf('?');
                    this.form.imageUrl = url.substring(0, end);
                }else {
                    this.form.imageUrl = url;
                }
                this.axios.post('/site/goods', {
                    form: this.form,
                    uid: this.$cookieStore.getCookie('sid')
                }).then(res => {
                    this.goods_id = res.data.goods_id;
                    this.uploadImages();  // 上传辅图
                    if(res.status === 200) {
                        this.$message({
                            message: '发布成功!',
                            type: 'success',
                            duration: 2000
                        });
                    }
                }, err => {
                    console.log(err);
                });
            } catch (e) {
                console.log(e);
            }
        },
        // 上传辅图
        async uploadImages() {
            for(var i = 1, len = this.fileList.length; i < len; i++) {
                let file = this.fileList[i];
                let name = file.name.substring(0, file.name.indexOf('.'));
                let result = await client.multipartUpload(name, file.raw);
                // 判断?后是否带有uploadId，有则截取不要
                let url = result.res.requestUrls[0];
                if(url.indexOf('?') !== -1) {
                    let end = url.indexOf('?');
                    let imageUrl = url.substring(0, end);
                    this.imageUrls.push(imageUrl);
                }else {
                    let imageUrl = url;
                    this.imageUrls.push(imageUrl);
                }
            }
            this.axios.post('/site/uploadImages', {
                imageUrls: this.imageUrls,
                goods_id: this.goods_id
            }).then(res => {
                // console.log(res);
            }, err => {
                console.error(err);
            })
        }
    }
}
</script>

<style lang="stylus">
    #publish
        padding 10px;
        text-align center;  //内部元素居中
        width 40%;
        margin 0 auto;  //自身相对父元素居中
</style>
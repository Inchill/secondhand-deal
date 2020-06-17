<template>
    <div id="feedback-manage">
        <h4>留言反馈</h4>
        <el-input type="textarea" 
            :maxlength="200"
            :rows="6" 
            placeholder="请输入反馈(限200字)" 
            v-model="textarea">
        </el-input>
        <div class="btn-bar">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="clear">清空</el-button>
        </div>
    </div>
</template>

<script lang="typescript">
export default {
    data() {
        return {
            textarea: ''
        }
    },
    methods: {
        clear() {
            this.textarea = ''
        },
        submit() {
            if(this.$cookieStore.getCookie('sid')) {
                if(this.textarea !== '') {
                    this.axios.post('/site/feedback', {
                        uid: this.$cookieStore.getCookie('sid'),
                        content: this.textarea,
                        add_time: Date.now()
                    }).then(res => {
                        this.$message({
                            showClose: true,
                            message: '反馈已提交',
                            type: 'success'
                        });
                        this.textarea = '';
                    }, err => {
                        console.error(err);
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '反馈不能为空',
                        type: 'warning'
                    })
                }
            }
        }
    }
}
</script>

<style lang="stylus">
    #feedback-manage
        padding 20px;
        >h4
            margin-bottom 20px;
        .btn-bar
            margin-top 20px;
</style>
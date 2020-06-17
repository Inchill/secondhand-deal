<template>
    <div id="login">
        <div class="login-wrapper">
            <div class="lgn-title">
                <h2>登录</h2>
                <p>新用户<a href="#/site/register">注册</a></p>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="phone">
                    <el-input type="tel" placeholder="手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <h3><a href="javascript:;">忘记密码?</a></h3>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="typescript">
export default {
    data() {
        var validateTel = (rule, value, callback) => {
            if(!value) callback(new Error('请输入手机号'));
            else {
                if(!(/^1[3456789]\d{9}$/.test(value))) {
                    callback(new Error('手机号格式不对'));
                }
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                phone: '',
                pass: ''
            },
            rules: {
                phone: [
                    { validator: validateTel, trigger: ['change', 'blur'] }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        loginForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/site/login', {
                        phone: this.ruleForm.phone,
                        password: this.ruleForm.pass
                    }).then(res => {
                        if(res.data.success) {
                            this.$router.push({ path: '/' });
                            this.$message({
                                type: 'success',
                                message: '登录成功'
                            });
                        }else {
                            this.$message.error(res.data.msg);
                        }
                    }, err => {
                        console.error(err);
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="stylus">
    #login
        height 100vh;
        // 设置子元素水平垂直居中
        display:flex; 
        justify-content: center;
        align-items: center;   
        .login-wrapper
            background-color #fff;
            text-align center;
            border-radius 2%;
            width 300px;
            height 300px;
            padding 20px 40px 0 40px;
            h3
                a
                    float right;
                    font-size: 13px;
                    color: #999;
                    text-decoration none;
                    opacity .6;
            .el-button 
                width 100%;
            .lgn-title
                display flex;
                margin 10px 0;
                h2
                    flex 1;
                    justify-content flex-start;
                    text-align left;
                p
                    flex 1;
                    display flex;
                    align-items center;
                    justify-content flex-end;
                    a
                        text-decoration none;
                        color blue;
</style>
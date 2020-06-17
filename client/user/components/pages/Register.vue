<template>
    <div id="register">
        <div class="register-wrapper">
            <div class="reg-title">
                <h2>注册</h2>
                <p>已有账号?<a href="#/site/login">登录</a></p>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="phone">
                    <el-input type="tel" placeholder="手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" placeholder="确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="registerForm('ruleForm')">注册</el-button>
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
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                phone: '',
                pass: '',
                checkPass: ''
            },
            rules: {
                phone: [
                    { validator: validateTel, trigger: ['change', 'blur'] }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        registerForm(formName) {
            this.showLogin = false;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/site/register', {
                        phone: this.ruleForm.phone,
                        password: this.ruleForm.pass
                    }).then(res => {
                        if(res.data.success) {
                            this.$router.push({ path: '/site/login' });
                            this.$message({
                                type: 'success',
                                message: '注册成功'
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
    #register
        height 100vh;
        // 设置子元素水平垂直居中
        display:flex; 
        justify-content: center;
        align-items: center;
        .register-wrapper
            background-color #fff;
            padding 20px;
            text-align center;
            border-radius 2%;
            width 300px;
            height 300px;
            padding 20px 40px 0 40px;
            .el-button 
                width 100%;
            .reg-title
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
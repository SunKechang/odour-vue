<template>
    <el-container>
        <el-header></el-header>
        <el-main class="auth-form">
            <h2 class="auth-form-header">找回密码</h2>
            <el-form label-position="top" ref="authForm" :model="authForm" >
                <div class="auth-form-body">
                    <el-form-item label="邮箱" prop="email" style="margin-top:-15px">
                        <el-input v-model="authForm.email" style="width: 250px" type="text" placeholder="邮箱"></el-input>
                        <el-button @click="sendCode" :disabled="sent">发送验证码</el-button>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" style="margin-top:-15px">
                        <el-input v-model="authForm.code" style="width: 250px" type="text" placeholder="验证码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password" style="margin-top:-25px">
                        <el-input v-model="authForm.password" style="width: 250px"  type="password" placeholder="新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  @click="submitForm" style="width: 250px">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
            <div style="padding-left: 20px;padding-top: 20px">
                <el-link href="/#/v2/register"  style="margin-right: 20px">注册账户</el-link>
                <el-link href="/#/v2/login"  style="margin-right: 20px">登录</el-link>
            </div>
        </el-main>
        <el-footer></el-footer>
    </el-container>
</template>

<script>
    import request from "@/network/request";
    import store from "@/store"
    export default {
        name: "login",
        data() {
            return {
                authForm: {
                    email: '',
                    password: '',
                    code: '',
                },
                sent: false,
            }
        },
        methods: {
            submitForm() {
                let email = this.authForm.email
                let password = this.authForm.password
                let code = this.authForm.code
                if (!this.authEmail(email)) {
                    this.$message({
                        message: '请输入正确格式邮箱',
                        type: 'error'
                    })
                    return
                }
                if(password === '') {
                    this.$message({
                        message: '密码不能为空',
                        type: 'error'
                    })
                    return
                }
                if(code === '') {
                    this.$message({
                        message: '验证码不能为空',
                        type: 'error'
                    })
                    return
                }
                this.$api.upload.updatePassword(email, password, code).then(({data, success}) => {
                    if(data === 1) {
                        this.$message('修改成功')
                        this.$router.push('/v2/login')
                    } else {
                        this.$message({
                            message: '验证码无效',
                            type: 'error'
                        })
                    }
                })
            },
            sendCode() {
                if(this.authForm.email === '') {
                    this.$message({
                        message: '请输入要找回账号的邮箱',
                        type: 'error'
                    })
                    return
                }
                let email = this.authForm.email
                
                if(!this.authEmail(email)){
                    this.$message({
                        message: '请输入正确格式邮箱',
                        type: 'error'
                    })
                    return
                }
                this.$api.upload.sendEmail(email).then(({data, success}) => {
                    if(success) {
                        this.$message('邮件已发送到邮箱，请查收')
                    }
                    this.sent = true
                })
            },
            authEmail(email) {
                let reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(reg.test(email)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>


<style scoped>
    label{
        display: block;
        margin-top: -20px;
    }

    .auth-form-header{
        text-align: center;
    }

    .auth-form-body{
        border-radius: 5px;
        width: fit-content;
        text-align: left;
        margin: 0 auto;
        padding: 20px;
        font-size: 14px;
        background-color:#f6f8fa;
        border: 1px solid #eaecef;
    }
    .auth-form-body button{
        background-color: #2a8f47;
        box-shadow: inset 0 1px 0 rgba(20,70,32,0.2);
        color: #ffffff;
    }


</style>
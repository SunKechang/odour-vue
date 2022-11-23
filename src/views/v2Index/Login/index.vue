<template>
    <el-container>
        <el-header></el-header>
        <el-main class="auth-form">
            <h2 class="auth-form-header">用户登录</h2>
            <el-form label-position="top" ref="authForm" :model="authForm" >
                <div class="auth-form-body">
                    <el-form-item label="邮箱" prop="account" style="margin-top:-15px">
                        <el-input v-model="authForm.userEmail" style="width: 250px" type="text" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style="margin-top:-25px">
                        <el-input v-model="authForm.userPassword" style="width: 250px"  type="password" placeholder="密码"  ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  @click="submitForm" style="width: 250px">登录</el-button>
                    </el-form-item>
                </div>
            </el-form>
            <div style="padding-left: 20px;padding-top: 20px">
                <el-link href="/#/Register"  style="margin-right: 20px">注册账户</el-link>
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
                    userEmail: '',
                    userPassword: '',
                }
            }
        },
        methods: {
            async submitForm() {

                // request.post('/user/login',authForm)
                //     .then(function (res) {
                //         console.log(res);
                //         if(res.data=='0')
                //             alert("用户不存在")
                //         else if (res.data == '1')
                //             alert("登录失败，账号或密码错误")
                //         else if (res.data == '2')
                //         //当前窗体跳转
                //             alert("登录成功")

                //         v.$router.push("/");

                //     }).catch(err=>{
                //     console.log(err);
                //     v.$alert("Error!", "Message", {
                //         confirmButtonText: 'Confirm'
                //     });
                // });
                let authForm = {
                    account: this.authForm.userEmail,
                    password: this.authForm.userPassword,
                }
                let res =  await this.$store.dispatch('user/userLogin', authForm)
                if(res) {
                    this.$router.push('/')
                } else {
                this.$message('用户名或密码错误')
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
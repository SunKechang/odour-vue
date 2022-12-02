<template>
    <el-container>
        <el-header></el-header>
        <el-main class="auth-form">
            <h2 class="auth-form-header">用户注册</h2>
            <el-form label-position="top">
                <div class="auth-form-body">
                    <el-form-item label="邮箱" style="margin-top:-15px">
                        <el-input v-model="authForm.userEmail" style="width: 250px" type="text" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" style="margin-top:-15px">
                        <el-input v-model="authForm.name" style="width: 250px" type="text" placeholder="姓名" @input="userNameLimit"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" style="margin-top:-25px">
                        <el-input v-model="authForm.userPassword" style="width: 250px"  type="password" placeholder="密码" @input="userPasswordLimit" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  @click="submitForm" style="width: 250px">注册</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-main>
        <el-footer></el-footer>
    </el-container>
</template>

<script>
    import request from "@/network/request";
    export default {
        name: "register",
        data() {
            return {
                authForm: {
                    userEmail: '',
                    userPassword: '',
                    name: '',
                }
            }
        },

        methods: {
            // submitForm() {
            //     if (this.authForm.userEmail.length <= 0) {
            //         alert("用户名不能为空")
            //     }
            //     else if(this.authForm.userPassword.length <= 0) {
            //         alert("密码不能为空")
            //     }
            //     else {
            //         let authForm=new FormData();
            //         const v=this;
            //         authForm.append("userEmail",this.authForm.userEmail);
            //         authForm.append("userPassword",this.authForm.userPassword);
            //
            //         request.post('/user/register',authForm)
            //             .then(function (res) {
            //                 console.log(res);
            //                 if(res.data=='1')
            //                     alert("注册成功")
            //                 window.location.href = '/userlogin'
            //             else
            //                 alert("注册失败")
            //
            //
            //             }).catch(err=>{
            //             console.log(err);
            //             v.$alert("Error!", "Message", {
            //                 confirmButtonText: 'Confirm'
            //             });
            //         });
            //     }
            // },

            //只能输入英文、数字
            userPasswordLimit:function() {
                this.authForm.userPassword = this.authForm.userPassword.replace(/[^\a-\z\A-\Z0-9]/g, '')
            },
            // 限制输入特殊字符
            userNameLimit:function() {
                this.authForm.name = this.authForm.name.replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '')
            },
            submitForm() {

                if (this.authForm.userEmail.length <= 0) {
                    alert("用户名不能为空")
                    return
                }
                if(this.authForm.userPassword.length <= 0) {
                    alert("密码不能为空")
                    return
                }
                if(this.authForm.name.length <= 0) {
                    alert("姓名不能为空")
                    return
                }
                if(!this.authEmail(this.authForm.userEmail)) {
                    this.$message({
                        message: '请输入正确格式邮箱',
                        type: 'error'
                    })
                    return
                }
                let data= {
                    userEmail: this.authForm.userEmail,
                    userPassword: this.authForm.userPassword,
                    name: this.authForm.name
                };
                const v=this;
                
                request.post('/user/register',data)
                .then(function (res) {
                    console.log(res);
                    if(res=='1') {
                        alert("注册成功")
                        v.$router.replace('/v2/login')
                    }
                    else {
                        alert("注册失败")
                    }
                }).catch(err=>{
                    console.log(err);
                    v.$alert("Error!", "Message", {
                        confirmButtonText: 'Confirm'
                    });
                });
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
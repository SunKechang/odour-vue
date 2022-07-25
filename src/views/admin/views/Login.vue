<template>
    <el-container>
        <el-header></el-header>
        <el-main class="auth-form">
            <h2 class="auth-form-header">Sign in to Compound Information Management System</h2>
            <el-form label-position="top" ref="authForm" :model="authForm" >
                <div class="auth-form-body">
                    <el-form-item label="Account" prop="account" style="margin-top:-15px">
                        <el-input v-model="authForm.account" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password" style="margin-top:-25px">
                        <el-input v-model="authForm.password" style="width: 250px"  type="password"  ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button  @click="submitForm" style="width: 250px">Sign in</el-button>
                    </el-form-item>
                </div>
            </el-form>
            <div style="padding-left: 20px;padding-top: 20px">
                <el-link href="/"  style="margin-right: 20px">Home</el-link>
                <el-link href="/#/about" style="margin-right: 20px">About</el-link>
                <el-link href="/#/agency" style="margin-right: 20px">Cooperation Agency</el-link>
                <el-link href="/#/contact" style="margin-right: 20px">Contact us</el-link>
            </div>
        </el-main>
        <el-footer></el-footer>
    </el-container>
</template>

<script>
    import request from "@/network/request";
    import store from "@/store"
    export default {
        name: "Login",
        data() {
            return {
                authForm: {
                    account: '',
                    password: '',
                }
            }
        },
        methods: {
            submitForm() {
                this.$api.admin.login(this.authForm)
                    .then( (res) => {
                        if(res.state===0) {
                            sessionStorage.setItem("Authorization",res.data);
                            store.commit('changeLogin',res.data);
                            this.$router.push("/admin");
                        }else{
                          this.$alert("Incorrect account or password", "Message", {
                                confirmButtonText: 'Confirm'
                            });
                        }
                }).catch(err=>{
                    console.log(err);
                    this.$alert("Error!", "Message", {
                        confirmButtonText: 'Confirm'
                    });
                });
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
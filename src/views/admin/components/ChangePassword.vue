<template>
    <div class="change-password-form">
        <div class="itemTitle">
            <p>Change Password</p>
            <img src="../../../assets/line.png" width="100%" alt="">
        </div>
        <el-form :model="changePwdForm" status-icon :rules="rules" ref="changePwdForm" label-width="200px" >
            <el-form-item label="New password" prop="newPassword">
                <el-input type="password" v-model="changePwdForm.newPassword" style="width: 200px" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm new password" prop="confirmNewPassword">
                <el-input type="password" v-model="changePwdForm.confirmNewPassword" style="width: 200px" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('changePwdForm')">Update Password</el-button>
                <el-button  @click="resetForm('changePwdForm')">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import request from "@/network/request";
    import store from "@/store/index"

    export default {
        name: "ChangePassword",
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.changePwdForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                changePwdForm:{
                    newPassword:'',
                    confirmNewPassword:''
                },
                rules:{
                    newPassword: [
                        {required:true,message:"Password can't be blank",trigger:'blur'}
                    ],
                    confirmNewPassword: [
                        { required:true,message:" ",trigger:'blur'},
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            };

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let v=this;
                        let param=new FormData();
                        param.append("newPassword",v.changePwdForm.newPassword);
                        request.post('/admin/password',param)
                            .then(res=>{
                                if(res.data.state===0){
                                    v.$message("You have changed your password,please login again");
                                    sessionStorage.setItem("Authorization","");
                                    store.commit("changeLogin","");
                                    v.$router.push("/login");
                                }else{
                                    v.$alert("Failed!", "Message", {
                                        confirmButtonText: 'Confirm'
                                    });
                                }
                            }).catch(err=>{
                            console.log(err);
                            v.$alert("Error!", "Message", {
                                confirmButtonText: 'Confirm'
                            });
                        })
                    } else {
                        //console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }

    .change-password-form {
        text-align: left;
        background-color: #ffffff;
        padding-left: 50px;
        padding-bottom: 50px;
        border-color: #e7eaec;
        border-width:3px 0 0;
        border-style:solid solid none;
    }
    .change-password-form form{
        padding-top: 30px;
    }
</style>
<template>
  <el-container>
    <el-header></el-header>
    <el-main class="auth-form">
      <h2 class="auth-form-header">Sign in to Compound Information Management System</h2>
      <el-switch
          style="margin-bottom: 20px;"
          v-model="adminLogin"
          active-text="管理员登录"
          inactive-text="普通用户登录">
        </el-switch>
      <el-form ref="authForm" :model="authForm" label-position="top">
        <div class="auth-form-body">
          <el-form-item label="Account" prop="account" style="margin-top:-15px">
            <el-input v-model="authForm.account" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password" style="margin-top:-25px">
            <el-input v-model="authForm.password" style="width: 250px" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 250px" @click="submitForm">Sign in</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div style="padding-left: 20px;padding-top: 20px">
        <el-link href="/" style="margin-right: 20px">Home</el-link>
        <el-link href="/#/about" style="margin-right: 20px">About</el-link>
        <el-link href="/#/agency" style="margin-right: 20px">Cooperation Agency</el-link>
        <el-link href="/#/contact" style="margin-right: 20px">Contact us</el-link>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import jwtDecode from "jwt-decode"
export default {
  name: "Login",
  data() {
    return {
      authForm: {
        account: '',
        password: '',
      },
      adminLogin: false
    }
  },
  methods: {
    async submitForm() {
      if(this.adminLogin) {
        let res =  await this.$store.dispatch('user/login', this.authForm)
        if(res) {
          this.$router.push('/admin')
        } else {
          this.$message('用户名或密码错误')
        }
      } else {
        let res =  await this.$store.dispatch('user/userLogin', this.authForm)
        if(res) {
          let token=this.$store.state.user.Authorization
          const decode=jwtDecode(token)
          if(decode.role === '1' || decode.role === '3') {
            this.$router.push('/upload')
          } else if(decode.role === '2'){
            this.$router.push('/review')
          } else {
            this.$router.push('/')
          }
          
        } else {
          this.$message('用户名或密码错误')
        }
      }
      
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: -20px;
}

.auth-form-header {
  text-align: center;
}

.auth-form-body {
  border-radius: 5px;
  width: fit-content;
  text-align: left;
  margin: 0 auto;
  padding: 20px;
  font-size: 14px;
  background-color: #f6f8fa;
  border: 1px solid #eaecef;
}

.auth-form-body button {
  background-color: #2a8f47;
  box-shadow: inset 0 1px 0 rgba(20, 70, 32, 0.2);
  color: #ffffff;
}


</style>
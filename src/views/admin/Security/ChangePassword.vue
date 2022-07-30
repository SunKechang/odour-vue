<template>
  <div class="change-password-form">
    <div class="itemTitle">
      <p>Change Password</p>
      <img alt="" src="../../../assets/line.png" style="width: 100%" >
    </div>
    <el-form ref="changePwdForm" :model="changePwdForm" :rules="rules" label-width="200px" status-icon>
      <el-form-item label="New password" prop="newPassword">
        <el-input v-model="changePwdForm.newPassword" auto-complete="off" style="width: 200px"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm new password" prop="confirmNewPassword">
        <el-input v-model="changePwdForm.confirmNewPassword" auto-complete="off" style="width: 200px"
                  type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('changePwdForm')">Update Password</el-button>
        <el-button @click="resetForm('changePwdForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.changePwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      changePwdForm: {
        newPassword: '',
        confirmNewPassword: ''
      },
      rules: {
        newPassword: [
          {required: true, message: "Password can't be blank", trigger: 'blur'}
        ],
        confirmNewPassword: [
          {required: true, message: " ", trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    };

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let v = this;
          let param = new FormData();
          param.append("newPassword", v.changePwdForm.newPassword);
          this.$api.admin.password(param)
              .then(({state}) => {
                if (state === 0) {
                  v.$message("You have changed your password,please login again");
                  sessionStorage.setItem("Authorization", "");
                  this.$store.dispatch("signOut");
                  v.$router.push("/login");
                } else {
                  v.$alert("Failed!", "Message", {
                    confirmButtonText: 'Confirm'
                  });
                }
              }).catch(err => {
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

.itemTitle p {
  font-size: 30px;
  color: #529287;
}

.change-password-form {
  text-align: left;
  background-color: #ffffff;
  padding-left: 50px;
  padding-bottom: 50px;
  border-color: #e7eaec;
  border-width: 3px 0 0;
  border-style: solid solid none;
}

.change-password-form form {
  padding-top: 30px;
}
</style>
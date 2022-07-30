<template>
  <div class="oil-info-form">
    <div class="itemTitle">
      <p>Add Oil</p>
      <img :src="lineUrl" alt="line" style="width: 100%">
    </div>
    <el-form ref="oilInfoForm" :model="oilInfoForm" :rules="rules" label-width="200px">
      <el-form-item label="Oil Name" prop="oilName">
        <el-input v-model="oilInfoForm.oilName" clearable style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="Oil Type" prop="oilType">
        <el-input v-model="oilInfoForm.oilType" clearable type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Oil Brand" prop="oilBrand">
        <el-input v-model="oilInfoForm.oilBrand" clearable style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="Oil Production Date" prop="oilDate">
        <input v-model="oilInfoForm.oilDate" placeholder="生产日期" type="datetime-local">
      </el-form-item>

      <el-form
          ref="okForm"
          :inline="true"
          :model="oilInfoForm"
          label-width="200px">
        <div v-for="(item, index) in oilInfoForm.okList" :key="index">
          <el-form-item
              :prop="'okList.' + index + '.keycompoundName'"
              label="Key Compound">
            <el-input v-model="item.keycompoundName"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'okList.' + index + '.casNo'"
              label="Key Compound CAS">
            <el-input v-model="item.casNo"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'okList.' + index + '.concentration'"
              label="Concentration">
            <el-input v-model="item.concentration"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'okList.' + index + '.okNote'"
              label="Note">
            <el-input v-model="item.okNote"></el-input>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="removeok(item, index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="addok">Add Key Compound</el-button>
        </div>
      </el-form>

      <el-form
          ref="ooForm"
          :inline="true"
          :model="oilInfoForm"
          label-width="200px">
        <div v-for="(item, index) in oilInfoForm.ooList" :key="index">
          <el-form-item
              :prop="'ooList.' + index + '.oilOdour'"
              label="Oil Odour">
            <el-input v-model="item.oilOdour"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'ooList.' + index + '.oilOdourIntensity'"
              label="Oil Odour Intensity">
            <el-input v-model="item.oilOdourIntensity"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'ooList.' + index + '.ooNote'"
              label="Note">
            <el-input v-model="item.ooNote"></el-input>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="removeoo(item, index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="addoo">Add Oil Odour</el-button>
        </div>
      </el-form>
      <div style="text-align: right;margin-top: 10px">
        <el-button type="primary" @click="submitForm('oilInfoForm')">Add</el-button>
        <el-button @click="resetForm('oilInfoForm')">Reset</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import line from "@/assets/line.png"

export default {
  name: "AddCompound",
  data() {
    return {
      lineUrl: line,
      oilInfoForm: {
        id: '',
        oilName: '',
        oilType: '',
        oilBrand: '',
        oilDate: '',
        okList: [{
          id: '',
          concentration: 0,
          keycompoundName: '',
          casNo: '',
          oilId: '',
          okNote: ''
        }],
        ooList: [{
          id: '',
          oilOdour: '',
          oilOdourIntensity: 0,
          oilId: '',
          ooNote: ''
        }],

      },
      rules: {
        oilName: [
          {required: true, message: "Oil name can't be blank", trigger: 'blur'}
        ]
      }
    }
  },
  create() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const v = this;
          v.oilInfoForm.id = v.oilInfoForm.id.replace(new RegExp("-", "g"), "");
          if (v.oilInfoForm.oilDate === '') {
            v.oilInfoForm.oilDate = null
          } else
            this.$api.oil.add(v.oilInfoForm)
                .then(({state}) => {
                  if (state === 0) {
                    v.$alert("Add " + v.oilInfoForm.oilName + " to database successfully!", "Message", {
                      confirmButtonText: 'Confirm'
                    });
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
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addoo() {
      this.oilInfoForm.ooList.push({
        id: '',
        oilOdour: '',
        oilOdourIntensity: 0,
        oilId: '',
        ooNote: ''
      });
    },
    removeoo(item, index) {
      this.oilInfoForm.ooList.splice(index, 1);
    },
    addok() {
      this.oilInfoForm.okList.push({
        id: '',
        concentration: 0,
        keycompoundName: '',
        casNo: '',
        oilId: '',
        okNote: ''
      });
    },
    removeok(item, index) {
      this.oilInfoForm.okList.splice(index, 1);
    },

  }
}
</script>

<style scoped>
.oil-info-form {
  text-align: left;
}

.itemTitle p {
  font-size: 30px;
  color: #529287;
}

.oil-info-form {
  text-align: left;
  background-color: #ffffff;
  padding-left: 50px;
  padding-bottom: 50px;
  border-color: #e7eaec;
  border-width: 3px 0 0;
  border-style: solid solid none;
}

.oil-info-form form {
  padding-top: 30px;
  padding-right: 30px;
}

</style>
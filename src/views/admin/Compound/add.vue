<template>
  <div class="compound-info-form">
    <div class="itemTitle">
      <p>Add Compound</p>
      <img :src="lineUrl" style="width: 100%" alt="line">
    </div>
    <el-form ref="compoundInfoForm" :model="compoundInfoForm" :rules="rules" label-position="left" label-width="200px">
      <el-divider content-position="left"><span class="span">Compound Info</span></el-divider>
      <el-form-item class="form-item" style="margin-bottom: 22px;" label="Compound Name" label-width="135px" prop="compoundName" required>
        <el-input v-model="compoundInfoForm.compoundName" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="Synonym" label-width="135px" prop="synonym">
        <el-input v-model="compoundInfoForm.synonym" clearable type="textarea"></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="CAS NO." label-width="135px" prop="casNo">
        <el-input v-model="compoundInfoForm.casNo" clearable></el-input>
      </el-form-item>
      <!--极性-->
      <el-divider content-position="left"><span class="span">RI (Polar)</span></el-divider>
      <el-card v-for="(item, index) in compoundInfoForm.riList" :key="'RI' + index" body-style="{ padding: '10px' !important }"
               shadow="hover">
        <el-row :gutter="10">
          <el-col :lg="10">
            <el-form-item class="form-item" label="RI" label-width="100px">
              <el-input v-model="item.compoundRi" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item class="form-item" label="Chromatographic Column" label-width="175px">
              <el-input v-model="item.chromatographicColumn" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="22">
            <el-form-item class="form-item" label="RI Resource" label-width="100px">
              <el-input v-model="item.riResource" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="2">
            <i class="el-icon-delete rowBtn" @click="removeRI(item, index)"></i>
          </el-col>
        </el-row>
      </el-card>
      <div style="text-align: right">
        <el-button size="small" type="primary" @click="addRI">Add RI</el-button>
      </div>

      <!--非极性-->
      <el-divider content-position="left"><span class="span">RI(Non-Polar)</span></el-divider>
      <el-card v-for="(item, index) in compoundInfoForm.nriList" :key="'NRI' + index" shadow="hover">
        <el-row :gutter="10">
          <el-col :lg="10">
            <el-form-item class="form-item" label="RI" label-width="100px">
              <el-input v-model="item.compoundNri" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item class="form-item" label="Chromatographic Column" label-width="175px">
              <el-input v-model="item.chromatographicColumn" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="22">
            <el-form-item class="form-item" label="NRI Resource" label-width="100px">
              <el-input v-model="item.nriResource" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="2">
            <i class="el-icon-delete rowBtn" @click="removeNRI(item, index)"></i>
          </el-col>
        </el-row>
      </el-card>
      <div style="text-align: right">
        <el-button size="small" type="primary" @click="addNRI">Add NRI</el-button>
      </div>

      <!--香气阈值-->
      <el-divider content-position="left"><span class="span">Odour Threshold</span></el-divider>
      <el-card v-for="(item, index) in compoundInfoForm.otList" :key="index" shadow="hover">
        <el-row :gutter="10">
          <el-col :lg="12">
            <el-form-item class="form-item" label="Odour Threshold(μg/kg)">
              <el-input v-model="item.odourThreshold" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="10">
            <el-form-item class="form-item" label="Odour Base" label-width="90px">
              <el-input v-model="item.odourBase" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="22">
            <el-form-item class="form-item" label="Odour Threshold Reference">
              <el-input v-model="item.odourThresholdReference" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="2">
            <i class="el-icon-delete rowBtn" @click="removeot(item, index)"></i>
          </el-col>
        </el-row>
      </el-card>
      <div style="text-align: right">
        <el-button size="small" type="primary" @click="addot">Add Threshold</el-button>
      </div>

      <!--风味描述-->
      <el-divider content-position="left"><span class="span">Odour Description</span></el-divider>
      <el-card v-for="(item, index) in compoundInfoForm.odList" :key="'od' + index" shadow="hover">
        <el-row :gutter="10" type="flex">
          <el-col :lg="10">
            <el-form-item class="form-item" label="Odour Description" label-width="130px">
              <el-input v-model="item.odourDescription" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item class="form-item" label="Odour Description Reference">
              <el-input v-model="item.odourDescriptionReference" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="2">
            <i class="el-icon-delete rowBtn" @click="removeod(item, index)"></i>
          </el-col>
        </el-row>
      </el-card>
      <div style="text-align: right">
        <el-button size="small" type="primary" @click="addod">Add Description</el-button>
      </div>

      <!--Chemical Structure-->
      <el-divider content-position="left"><span class="span">Chemical Structure</span></el-divider>
      <el-upload
          ref="uploadChemicalStructure"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
          :on-change="onChangeChemicalStructure"
          accept=".jpeg,.jpg,.png"
          action=""
          class="upload-demo"
          style="text-align: right;"
      >
        <el-button slot="trigger" size="small" type="primary">Select chemical structure</el-button>
      </el-upload>

      <!--Orbitrap-MS mass spectrometry-->
      <el-divider content-position="left"><span class="span">Orbitrap-MS mass spectrometry</span></el-divider>
      <el-upload
          ref="uploadMassSpectrogram"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
          :on-change="onChangeMassSpectrogram"
          accept=".jpeg,.jpg,.png"
          action=""
          style="text-align: right"
      >
        <el-button slot="trigger" size="small" type="primary">Select Orbitrap-MS mass spectrometry</el-button>
      </el-upload>

      <!--Low-resolution mass spectrometry-->
      <el-divider content-position="left"><span class="span">Low-resolution mass spectrometry</span></el-divider>
      <el-upload
          ref="uploadMassSpectrogramNist"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
          :on-change="onChangeMassSpectrogramNist"
          accept=".jpeg,.jpg,.png"
          action=""
          style="text-align: right;"
      >
        <el-button slot="trigger" size="small" type="primary">Select Low-resolution mass spectrometry</el-button>
      </el-upload>

      <!--高分辨率质谱-->
      <el-divider content-position="left"><span class="span">(High-resolution)Measured & Relative Abundance</span>
      </el-divider>
      <el-upload
          ref="uploadMRExcel"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
          accept=".xlsx"
          action=""
          style="text-align: right;margin-bottom: 20px;"
      >
        <el-button slot="trigger" size="small" type="primary">Select Excel</el-button>
        &nbsp
        <el-button size="small" type="primary" @click="readExcel">Read Excel</el-button>
      </el-upload>


      <el-card v-for="(item, index) in compoundInfoForm.mrList" :key=" 'mr' + index" shadow="hover">
        <el-row :gutter="10" type="flex">
          <el-col :lg="10">
            <el-form-item class="form-item" label="Measured" label-width="80px">
              <el-input v-model="item.measured" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item class="form-item" label="Relative Abundance" label-width="140px">
              <el-input v-model="item.relativeAbundance" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="2">
            <i class="el-icon-delete rowBtn" @click="removeMR(item, index)"></i>
          </el-col>
        </el-row>
      </el-card>
      <div style="text-align: right">
        <el-button size="small" type="primary" @click="addMR">Add measured and relative abundance</el-button>
      </div>

      <!--低分辨率质谱-->
      <el-divider content-position="left"><span class="span">(Low-resolution)Measured & Relative Abundance</span>
      </el-divider>
      <el-upload
          ref="uploadlowMRExcel"
          :auto-upload="false"
          :multiple="false"
          :limit="1"
          accept=".xlsx"
          action=""
          style="text-align: right;margin-bottom: 20px;"
      >
        <el-button slot="trigger" size="small" type="primary">Select Excel</el-button>
        &nbsp
        <el-button size="small" type="primary" @click="readLowExcel">Read Excel</el-button>
      </el-upload>

      <el-card v-for="(item, index) in compoundInfoForm.lowmrList" :key="'lowmr' + index" shadow="hover">
        <el-row :gutter="10" type="flex">
          <el-col :lg="10">
            <el-form-item class="form-item" label="Measured" label-width="80px">
              <el-input v-model="item.measured" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item class="form-item" label="Relative Abundance" label-width="140px">
              <el-input v-model="item.relativeAbundance" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="2">
            <i class="el-icon-delete rowBtn" @click="removelowMR(item, index)"></i>
          </el-col>
        </el-row>
      </el-card>
      <div style="text-align: right">
        <el-button size="small" type="primary" @click="addlowMR">Add measured and relative abundance</el-button>
      </div>

      <el-divider content-position="left"><span class="span">Products</span></el-divider>
      <el-form-item class="form-item" label="Products" label-width="80px">
        <el-select v-model="compoundInfoForm.products" multiple placeholder="" @change="selectProduct"
                   @remove-tag="removeProduct">
          <el-option
              v-for="{id, productName} in productOptions"
              :key="id"
              :label="productName"
              :value="id">
          </el-option>
        </el-select>
      </el-form-item>
      <div v-for="({id, productName}, productIndex) in compoundInfoForm.productList" :key="productName">
        <div v-if="id">
          <el-divider content-position="center">{{ productName }}</el-divider>
          <el-card v-for="(item, otIndex) in compoundInfoForm.productList[productIndex].otList"
                   :key="productIndex + 'threshold' +otIndex" shadow="hover">
            <el-row :gutter="10" type="flex">
              <el-col :lg="11">
                <el-form-item class="form-item" label="Odour Threshold(μg/kg) ">
                  <el-input v-model="item.odourThreshold" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="11">
                <el-form-item class="form-item" label="Odour Threshold Reference">
                  <el-input v-model="item.odourThresholdReference" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="11">
                <el-form-item class="form-item" label="Odour Threshold Base">
                  <el-input v-model="item.odourThresholdBase" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <i class="el-icon-delete rowBtn" @click="removeProductThreshold(productIndex, otIndex)"></i>
              </el-col>
            </el-row>

          </el-card>
          <div style="text-align: right">
            <el-button size="small" type="primary" @click="addProductThreshold(productIndex, id)">
              {{ 'Add Threshold for ' + productName }}
            </el-button>
          </div>
          <br>
          <el-card v-for="(item, odIndex) in compoundInfoForm.productList[productIndex].odList"
                   :key="productIndex + 'description' +odIndex" shadow="hover">
            <el-row :gutter="10" type="flex">
              <el-col :lg="11">
                <el-form-item class="form-item" label="Odour Description">
                  <el-input v-model="item.odourDescription" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="11">
                <el-form-item class="form-item" label="Odour Description Reference">
                  <el-input v-model="item.odourDescriptionReference" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <i class="el-icon-delete rowBtn" @click="removeProductDescription(productIndex, odIndex)"></i>
              </el-col>
            </el-row>
          </el-card>
          <div style="text-align: right">
            <el-button size="small" type="primary" @click="addProductDescription(productIndex, id)">
              {{ 'Add Description for ' + productName }}
            </el-button>
          </div>
        </div>
      </div>
      <el-divider content-position="left"><span class="span">Uploader & Reviewer</span></el-divider>
      <el-row :gutter="10">
        <el-col :lg="12">
          <el-form-item class="form-item" label="Uploader" label-width="80px" prop="uploader">
            <el-input v-model="compoundInfoForm.uploader" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item class="form-item" label="Reviewer" label-width="80px" prop="reviewer">
            <el-input v-model="compoundInfoForm.reviewer" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="text-align: right;margin-top: 10px">
        <el-button type="primary" @click="submitForm">Add</el-button>
        <el-button @click="resetForm">Reset</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import request from "@/network/request";
import {convertImgToBase64} from "@/utils/image";
import line from "@/assets/line.png"
export default {
  name: "AddCompound",
  data() {
    return {
      lineUrl: line,
      compoundInfoForm: {
        compoundName: '',
        synonym: '',
        casNo: '',
        otList: [],
        odList: [],
        riList: [],
        nriList: [],
        mrList: [],
        lowmrList: [],
        chemicalStructure: '',
        massSpectrogram: '',
        massSpectrogramNist: '',
        uploader: '',
        reviewer: '',
        products: [],
        productList: []
      },
      rules: {
        compoundName: [
          {required: true, message: "Compound name can't be blank", trigger: 'blur'}
        ]
      },
      productOptions: []
    }
  },
  created() {
    this.$api.product.getAll().then(res => {
      this.productOptions = res.data
    }).catch(err => {
      console.error(err)
    })
  },
  methods: {
    // 移除产品描述
    removeProductDescription(productIndex, descriptionIndex) {
      this.compoundInfoForm.productList[productIndex].odList.splice(descriptionIndex, 1);
    },
    // 为产品添加描述
    addProductDescription(productIndex, productId) {
      this.compoundInfoForm.productList[productIndex].odList.push({
        odourDescription: '',
        odourDescriptionReference: '',
        productId: productId
      })
    },
    // 移除产品阈值
    removeProductThreshold(productIndex, thresholdIndex) {
      this.compoundInfoForm.productList[productIndex].otList.splice(thresholdIndex, 1);
    },
    // 为产品添加阈值
    addProductThreshold(productIndex, productId) {
      this.compoundInfoForm.productList[productIndex].otList.push({
        odourThreshold: 0,
        odourThresholdReference: '',
        productId: productId,
        odourThresholdBase: ''
      })
    },
    // 选择产品-选中值发生变化时触发
    selectProduct(val) {
      // @change 回调参数为目前的选中值，所以判断选中产品列表长度大于产品风味列表时，向产品风味列表push数据
      if (val.length > this.compoundInfoForm.productList.length) {
        this.compoundInfoForm.productList.push({
          // 将产品本身的信息push到产品风味中
          ...this.productOptions.filter((item) => item.id === val.at(-1))[0],
          // 产品阈值列表
          otList: [],
          // 产品描述列表
          odList: []
        })
      }
    },
    // 移除一个产品-移除tag时触发
    removeProduct(val) {
      // 产品风味列表移除该项即可
      this.compoundInfoForm.productList = this.compoundInfoForm.productList.filter(item => item.id !== val)
    },
    submitForm() {
      this.$refs.compoundInfoForm.validate((valid) => {
        if (!valid) return
        this.compoundInfoForm.casNo = this.compoundInfoForm.casNo.replace(new RegExp("-", "g"), "");
        this.$api.compound.add(this.compoundInfoForm)
            .then(({state}) => {
              if (state === 0) {
                this.$alert("Add " + this.compoundInfoForm.compoundName + " to database successfully!", "Message", {
                  confirmButtonText: 'Confirm'
                });
              } else {
                this.$alert("Failed!", "Message", {
                  confirmButtonText: 'Confirm'
                });
              }
            })
            .catch(err => {
              console.error(err);
              this.$alert("Error!", "Message", {
                confirmButtonText: 'Confirm'
              })
            })
      })
    },
    resetForm() {
      this.$refs.compoundInfoForm.resetFields();
    },
    onChangeChemicalStructure() {
      let chemicalStructure = this.$refs.uploadChemicalStructure.$refs['upload-inner'].$refs.input.files[0];

      convertImgToBase64(chemicalStructure, (base64Str) => {
        this.compoundInfoForm.chemicalStructure = base64Str;
      }, () => {
        console.log("convert error");
      });
      console.log(this.compoundInfoForm.chemicalStructure)
    },
    onChangeMassSpectrogram() {
      let massSpectrogram = this.$refs.uploadMassSpectrogram.$refs['upload-inner'].$refs.input.files[0];
      convertImgToBase64(massSpectrogram, (base64Str) => {
        this.compoundInfoForm.massSpectrogram = base64Str;
      }, () => {
        console.log("convert error");
      });
    },
    onChangeMassSpectrogramNist() {
      let massSpectrogramNist = this.$refs.uploadMassSpectrogramNist.$refs['upload-inner'].$refs.input.files[0];
      convertImgToBase64(massSpectrogramNist, (base64Str) => {
        this.compoundInfoForm.massSpectrogramNist = base64Str;
      }, () => {
        console.log("convert error");
      });
    },
    addot() {
      this.compoundInfoForm.otList.push({
        id: '',
        odourThreshold: 0,
        odourThresholdReference: '',
        odourBase: '',
        compoundId: ''
      });
    },
    removeot(item, index) {
      this.compoundInfoForm.otList.splice(index, 1);
    },
    addod() {
      this.compoundInfoForm.odList.push({
        id: '',
        odourDescription: '',
        odourDescriptionReference: '',
        compoundId: ''
      });
    },
    removeod(item, index) {
      this.compoundInfoForm.odList.splice(index, 1);
    },
    addRI() {
      this.compoundInfoForm.riList.push({
        id: '',
        compoundRi: 0,
        chromatographicColumn: 0,
        riResource: '',
        compoundId: ''
      });
    },
    removeRI(item, index) {
      this.compoundInfoForm.riList.splice(index, 1);
    },
    addNRI() {
      this.compoundInfoForm.nriList.push({
        id: '',
        compoundNri: 0,
        chromatographicColumn: 0,
        nriResource: '',
        compoundId: ''
      });
    },
    removeNRI(item, index) {
      this.compoundInfoForm.nriList.splice(index, 1);
    },
    addMR() {
      this.compoundInfoForm.mrList.push({
        id: '',
        measured: 0,
        relativeAbundance: 0,
        compoundId: ''
      });
    },
    removeMR(item, index) {
      this.compoundInfoForm.mrList.splice(index, 1);
    },
    addlowMR() {
      this.compoundInfoForm.lowmrList.push({
        id: '',
        measured: 0,
        relativeAbundance: 0,
        compoundId: ''
      });
    },
    removelowMR(item, index) {
      this.compoundInfoForm.lowmrList.splice(index, 1);
    },
    readExcel() {
      const v = this;
      let param = new FormData();
      param.append("mrExcel", v.$refs.uploadMRExcel.$refs['upload-inner'].$refs.input.files[0]);
      request.post('/compound/mr', param)
          .then(res => {
            if (res.data.state === 0) {
              console.log(res.data.data);
              v.compoundInfoForm.mrList = res.data.data;
            } else {
              v.$alert("Failed!", "Message", {
                confirmButtonText: 'Confirm'
              });
            }
          }).catch(err => {
        console.log(err);
      });
    },
    readLowExcel() {
      const v = this;
      let param = new FormData();
      param.append("lmrExcel", v.$refs.uploadlowMRExcel.$refs['upload-inner'].$refs.input.files[0]);

      request.post('/compound/lowmr', param)
          .then(res => {
            if (res.data.state === 0) {
              console.log(res.data.data);
              v.compoundInfoForm.lowmrList = res.data.data;
            } else {
              v.$alert("Failed!", "Message", {
                confirmButtonText: 'Confirm'
              });
            }
          }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>
.span {
  color: #529287;
  font-size: large
}

.form-item {
  padding-left: 25px;
  padding-bottom: 5px;
  padding-top: 5px;
  margin: 0;
}

.rowBtn {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5em;
  cursor: pointer;
  color: #F56C6C;
}

.compound-info-form {
  text-align: left;
}

.itemTitle p {
  font-size: 30px;
  color: #529287;
}

.compound-info-form {
  text-align: left;
  background-color: #ffffff;
  padding-left: 50px;
  padding-bottom: 50px;
  border-color: #e7eaec;
  border-width: 3px 0 0;
  border-style: solid solid none;
}

.compound-info-form form {
  padding-top: 30px;
  padding-right: 30px;
}

</style>

<template>
  <div class="compound-info-form">
    <div class="itemTitle">
      <p>Add Compound</p>
      <img alt="" src="../../../assets/line.png" style="width: 100%">
    </div>
    <el-form ref="compoundInfoForm" :model="compoundInfoForm" :rules="rules" label-width="200px">
      <el-form-item label="Compound Name" prop="compoundName">
        <el-input v-model="compoundInfoForm.compoundName" clearable style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="Synonym" prop="synonym">
        <el-input v-model="compoundInfoForm.synonym" clearable type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="CAS NO." prop="casNo">
        <el-input v-model="compoundInfoForm.casNo" clearable style="width: 200px"></el-input>
      </el-form-item>
      <!--极性-->
      <el-form
          ref="riForm"
          :inline="true"
          :model="compoundInfoForm"
          label-width="200px">
        <div v-for="(item, index) in compoundInfoForm.riList" :key="index">
          <el-form-item
              :prop="'riList.' + index + '.compoundRi'"
              label="(polar)RI">
            <el-input-number v-model="item.compoundRi" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item
              :prop="'riList.' + index + '.chromatographicColumn'"
              label="Chromatographic Column">
            <el-input v-model="item.chromatographicColumn"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'riList.' + index + '.riResource'"
              label="RI Resource">
            <el-input v-model="item.riResource"></el-input>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="removeRI(item, index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="addRI">Add RI</el-button>
        </div>
      </el-form>
      <!--非极性-->
      <el-form
          ref="nriForm"
          :inline="true"
          :model="compoundInfoForm"
          label-width="200px">
        <div v-for="(item, index) in compoundInfoForm.nriList" :key="index">
          <el-form-item
              :prop="'nriList.' + index + '.compoundNri'"
              label="(non-polar)RI">
            <el-input-number v-model="item.compoundNri" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item
              :prop="'nriList.' + index + '.chromatographicColumn'"
              label="Chromatographic Column">
            <el-input v-model="item.chromatographicColumn"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'nriList.' + index + '.nriResource'"
              label="NRI Resource">
            <el-input v-model="item.nriResource"></el-input>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="removeNRI(item, index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="addNRI">Add NRI</el-button>
        </div>
      </el-form>

      <!--            <el-form-item label="Odour Threshold" prop="odourThreshold" >-->
      <!--                <el-input-number v-model="compoundInfoForm.odourThreshold" :controls="false" clearable style="width: 120px"></el-input-number>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="Odour Threshold Reference" prop="odourThresholdReference" >-->
      <!--                <el-input v-model="compoundInfoForm.odourThresholdReference" clearable ></el-input>-->
      <!--            </el-form-item>-->
      <!--香气阈值-->
      <el-form
          ref="otForm"
          :inline="true"
          :model="compoundInfoForm"
          label-width="200px">
        <div v-for="(item, index) in compoundInfoForm.otList" :key="index">
          <el-form-item
              :prop="'otList.' + index + '.odourThreshold'"
              label="Odour Threshold(μg/kg) ">
            <el-input-number v-model="item.odourThreshold" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item
              :prop="'otList.' + index + '.odourThresholdReference'"
              label="Odour Threshold Reference">
            <el-input v-model="item.odourThresholdReference"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'otList.' + index + '.odourBase'"
              label="Odour Base">
            <el-input v-model="item.odourBase"></el-input>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="removeot(item, index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="addot">Add Threshold</el-button>
        </div>
      </el-form>

      <!--            <el-form-item label="Odour Description" prop="odourDescription">-->
      <!--                <el-input type="textarea" v-model="compoundInfoForm.odourDescription" clearable></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="Odour Description Reference" prop="odourDescriptionReference" >-->
      <!--                <el-input v-model="compoundInfoForm.odourDescriptionReference" clearable></el-input>-->
      <!--            </el-form-item>-->

      <!--            风味描述-->
      <el-form
          ref="otForm"
          :inline="true"
          :model="compoundInfoForm"
          label-width="200px">
        <div v-for="(item, index) in compoundInfoForm.odList" :key="index">
          <el-form-item
              :prop="'otList.' + index + '.odourDescription'"
              label="Odour Description">
            <el-input v-model="item.odourDescription"></el-input>
          </el-form-item>
          <el-form-item
              :prop="'odList.' + index + '.odourDescriptionReference'"
              label="Odour Description Reference">
            <el-input v-model="item.odourDescriptionReference"></el-input>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="removeod(item, index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="addod">Add Description</el-button>
        </div>
      </el-form>

      <el-form-item label="Chemical Structure">
        <el-upload
            ref="uploadChemicalStructure"
            :auto-upload="false"
            :limit="1"
            :on-change="onChangeChemicalStructure"
            accept=".jpeg,.jpg,.png"
            action=""
            class="upload-demo">
          <el-button slot="trigger" size="small" type="primary">Select chemical structure</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="Orbitrap-MS mass spectrometry">
        <el-upload
            ref="uploadMassSpectrogram"
            :auto-upload="false"
            :limit="1"
            :on-change="onChangeMassSpectrogram"
            accept=".jpeg,.jpg,.png"
            action="">
          <el-button slot="trigger" size="small" type="primary">Select Orbitrap-MS mass spectrometry</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="Low-resolution mass spectrometry">
        <el-upload
            ref="uploadMassSpectrogramNist"
            :auto-upload="false"
            :limit="1"
            :on-change="onChangeMassSpectrogramNist"
            accept=".jpeg,.jpg,.png"
            action="">
          <el-button slot="trigger" size="small" type="primary">Select Low-resolution mass spectrometry</el-button>
        </el-upload>
      </el-form-item>

      <!--            <el-form-item label="Wine" prop="wine" >-->
      <!--                <el-input type="textarea" v-model="compoundInfoForm.wine" clearable></el-input>-->
      <!--            </el-form-item>-->
      <!--高分辨率质谱-->
      <el-form
          ref="mrForm"
          :inline="true"
          :model="compoundInfoForm"
          label-width="200px">
        <el-form-item label="(High-resolution)Measured & Relative Abundance">
          <el-upload
              ref="uploadMRExcel"
              :auto-upload="false"
              :limit="1"
              accept=".xlsx"
              action="">
            <el-button slot="trigger" size="small" type="primary">Select Excel</el-button>
            &nbsp
            <el-button size="small" type="primary" @click="readExcel">Read Excel</el-button>
          </el-upload>
        </el-form-item>
        <br>
        <div v-for="(item, index) in compoundInfoForm.mrList" :key="index">
          <el-form-item
              :prop="'mrList.' + index + '.measured'"
              label="Measured">
            <el-input-number v-model="item.measured" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item
              :prop="'mrList.' + index + '.relativeAbundance'"
              label="Relative Abundance">
            <el-input-number v-model="item.relativeAbundance" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="removeMR(item, index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="addMR">Add measured and relative abundance</el-button>
        </div>
      </el-form>
      <!--低分辨率质谱-->
      <el-form
          ref="lowmrForm"
          :inline="true"
          :model="compoundInfoForm"
          label-width="200px">
        <el-form-item label="(Low-resolution)Measured & Relative Abundance">
          <el-upload
              ref="uploadlowMRExcel"
              :auto-upload="false"
              :limit="1"
              accept=".xlsx"
              action="">
            <el-button slot="trigger" size="small" type="primary">Select Excel</el-button>
            &nbsp
            <el-button size="small" type="primary" @click="readLowExcel">Read Excel</el-button>
          </el-upload>
        </el-form-item>
        <br>
        <div v-for="(item, index) in compoundInfoForm.lowmrList" :key="index">
          <el-form-item
              :prop="'lowmrList.' + index + '.measured'"
              label="Measured">
            <el-input-number v-model="item.measured" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item
              :prop="'lowmrList.' + index + '.relativeAbundance'"
              label="Relative Abundance">
            <el-input-number v-model="item.relativeAbundance" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item>
            <i class="el-icon-delete" @click="removelowMR(item, index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button type="primary" @click="addlowMR">Add measured and relative abundance</el-button>
        </div>
        <br>
        <el-form-item label="Products">
          <el-select v-model="compoundInfoForm.products" multiple @change="selectProduct" @remove-tag="removeProduct">
            <el-option
                v-for="{id, productName} in productOptions"
                :key="id"
                :label="productName"
                :value="id">
            </el-option>
          </el-select>
        </el-form-item>
        <br>
        <div v-for="({id, productName}, productIndex) in compoundInfoForm.productList" :key="productName">
          <div v-if="id">{{ productName }}
            <div v-for="(item, otIndex) in compoundInfoForm.productList[productIndex].otList" :key="productIndex + 'threshold' +otIndex">
              <el-form-item label="Odour Threshold(μg/kg) ">
                <el-input-number v-model="item.odourThreshold" :controls="false"></el-input-number>
              </el-form-item>
              <el-form-item label="Odour Threshold Reference">
                <el-input v-model="item.odourThresholdReference"></el-input>
              </el-form-item>
              <el-form-item>
                <i class="el-icon-delete" @click="removeProductThreshold(productIndex, otIndex)"></i>
              </el-form-item>
            </div>
            <div style="text-align: center">
              <el-button type="primary" @click="addProductThreshold(productIndex, id)">
                {{ 'Add Threshold for ' + productName }}
              </el-button>
            </div>
            <br>
            <div v-for="(item, odIndex) in compoundInfoForm.productList[productIndex].odList" :key="productIndex + 'description' +odIndex">
              <el-form-item label="Odour Description">
                <el-input v-model="item.odourDescription"></el-input>
              </el-form-item>
              <el-form-item label="Odour Description Reference">
                <el-input v-model="item.odourDescriptionReference"></el-input>
              </el-form-item>
              <el-form-item>
                <i class="el-icon-delete" @click="removeProductDescription(productIndex, odIndex)"></i>
              </el-form-item>
            </div>
            <div style="text-align: center">
              <el-button @click="addProductDescription(productIndex, id)" type="primary" >
                {{ 'Add Description for ' + productName }}
              </el-button>
            </div>
          </div>
        </div>
        <br>
        <el-form-item label="Uploader" prop="uploader">
          <el-input v-model="compoundInfoForm.uploader" :controls="false"></el-input>
        </el-form-item>
        <el-form-item label="Reviewer" prop="reviewer">
          <el-input v-model="compoundInfoForm.reviewer" :controls="false"></el-input>
        </el-form-item>
      </el-form>

      <div style="text-align: right;margin-top: 10px">
        <el-button type="primary" @click="submitForm('compoundInfoForm')">Add</el-button>
        <el-button @click="resetForm('compoundInfoForm')">Reset</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import request from "@/network/request";
import {convertImgToBase64} from "@/utils/image";

export default {
  name: "AddCompound",
  data() {
    return {
      compoundInfoForm: {
        compoundName: '',
        synonym: '',
        casNo: '',
        otList: [{
          id: '',
          odourThreshold: 0,
          odourThresholdReference: '',
          odourBase: '',
          compoundId: ''
        }],
        odList: [{
          id: '',
          odourDescription: '',
          odourDescriptionReference: '',
          compoundId: ''
        }],
        riList: [],
        nriList: [],
        mrList: [{
          id: '',
          measured: 0,
          relativeAbundance: 0,
          compoundId: ''
        }],
        lowmrList: [{
          id: '',
          measured: 0,
          relativeAbundance: 0,
          compoundId: ''
        }],
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
    request.get('/product/all')
        .then(res => {
          this.productOptions = res.data.data
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
        productId: productId
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const v = this;
          v.compoundInfoForm.casNo = v.compoundInfoForm.casNo.replace(new RegExp("-", "g"), "");
          request.post('/compound/add', v.compoundInfoForm)
              .then(res => {
                if (res.data.state === 0) {
                  v.$alert("Add " + v.compoundInfoForm.compoundName + " to database successfully!", "Message", {
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
      this.compoundInfoForm.lowmrList.splice(index, 1);
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
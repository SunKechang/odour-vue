<template>
  <div class="product-info-form">
    <div class="itemTitle">
      <p>Add Product</p>
      <img alt="" src="../../../assets/line.png" width="1500">
    </div>
    <el-form ref="productInfoForm" :model="productInfoForm" :rules="rules" label-width="200px">
      <el-divider content-position="left"><span class="span">Product Info</span></el-divider>
      <el-form-item label="Product Name" prop="productName">
        <el-input v-model="productInfoForm.productName" clearable></el-input>
      </el-form-item>
      <el-form-item label="Product Description" prop="synonym">
        <el-input v-model="productInfoForm.productDescription" clearable type="textarea"></el-input>
      </el-form-item>
      <el-divider content-position="left"><span class="span">Product Picture</span></el-divider>
      <el-upload
          ref="uploadProductPicture"
          :auto-upload="false"
          :limit="1"
          :multiple="false"
          :on-change="onChangeProductPicture"
          accept=".jpeg,.jpg,.png"
          action=""
          class="upload-demo"
          style="text-align: right"
      >
        <el-button slot="trigger" size="small" type="primary">Select chemical structure</el-button>
      </el-upload>

      <div style="text-align: right;margin-top: 10px">
        <el-button type="primary" @click="submitForm">Add</el-button>
        <el-button @click="resetForm()">Reset</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {convertImgToBase64} from "@/utils/image";

export default {
  name: "AddProduct",
  data() {
    return {
      productInfoForm: {
        productName: '',
        productDescription: '',
        productPicture: '',
      },
      rules: {
        productName: [
          {required: true, message: "Product name can't be blank", trigger: 'blur'}
        ]
      }
    }
  },
  create() {
  },
  methods: {
    submitForm() {
      this.$refs.productInfoForm.validate((valid) => {
        if (!valid) return
        this.$api.product.add(this.productInfoForm)
            .then(({state}) => {
              if (state === 0) {
                this.$alert("Add " + this.productInfoForm.productName + " to database successfully!", "Message", {
                  confirmButtonText: 'Confirm'
                });
              } else {
                this.$alert("Failed!", "Message", {
                  confirmButtonText: 'Confirm'
                });
              }
            }).catch(err => {
          console.log(err);
          this.$alert("Error!", "Message", {
            confirmButtonText: 'Confirm'
          })
        })
      })
    },
    resetForm() {
      this.$refs.productInfoForm.resetFields();
    },
    onChangeProductPicture() {
      let productPicture = this.$refs.uploadProductPicture.$refs['upload-inner'].$refs.input.files[0];
      convertImgToBase64(productPicture, (base64Str) => {
        this.productInfoForm.productPicture = base64Str;
      }, () => {
        console.log("convert error");
      });
      console.log(this.productInfoForm.productPicture)
    },
  }
}
</script>

<style scoped>
.span {
  color: #529287;
  font-size: large
}

.product-info-form {
  text-align: left;
}

.itemTitle p {
  font-size: 30px;
  color: #529287;
}

.product-info-form {
  text-align: left;
  background-color: #ffffff;
  padding-left: 50px;
  padding-bottom: 50px;
  border-color: #e7eaec;
  border-width: 3px 0 0;
  border-style: solid solid none;
}

.product-info-form form {
  padding-top: 30px;
  padding-right: 30px;
}

</style>
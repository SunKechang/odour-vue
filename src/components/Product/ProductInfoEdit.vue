<template>
  <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      top="20px"
      width="90%"
      @close="getProductData"
  >
    <template v-slot:title>
      <div class="product-title">
        <span>{{'Edit' + productInfo.productName }}</span>
      </div>
    </template>
    <el-scrollbar>
      <el-form ref="productInfoForm" :model="productInfoForm" :rules="rules" label-width="200px">
        <el-divider content-position="left"><span class="span">Product Info</span></el-divider>
        <el-form-item label="Product Name" prop="productName">
          <el-input v-model="productInfoForm.productName" clearable></el-input>
        </el-form-item>
        <el-form-item label="Product Description" prop="synonym">
          <el-input v-model="productInfoForm.productDescription" clearable type="textarea"></el-input>
        </el-form-item>
        <el-divider content-position="left"><span class="span">Product Picture</span></el-divider>
        <img width="30%" style="margin: auto" :src="oldProductPicture" alt="">

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
          <el-button slot="trigger" size="small" type="primary">Select product picture</el-button>
        </el-upload>

        <div style="text-align: right;margin-top: 10px">
          <el-button type="success" @click="submitForm">Update</el-button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </div>
      </el-form>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
import {convertImgToBase64} from "@/utils/image";

export default {
  name: "ProductInfoView",
  props: {
    getProductData: {
      type: Function
    },
    visible: {
      type: Boolean,
      default: false
    },
    productInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      oldProductPicture: '',
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
  watch: {
    productInfo: {
      handler(val) {
        this.productInfoForm = val
        this.oldProductPicture = val.productPicture;
      },
      deep: true
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.productInfoForm.validate((valid) => {
        if (!valid) return
        this.$api.product.update(this.productInfoForm)
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

.form-item {
  padding-left: 25px;
  padding-bottom: 5px;
  padding-top: 5px;
  margin: 0;
}
>>> .el-dialog__header {
  border-bottom: #888888 solid 1px;
}

>>> .el-dialog__body {
  padding: 20px;
}

.product-title {
  text-align: left;
  font-size: 16px;
}

.product-info {
  margin: 0 auto;
  width: 80%;
  text-align: left;
  font-size: 18px;
}
</style>

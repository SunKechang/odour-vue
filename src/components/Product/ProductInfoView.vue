<template>
  <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      top="20px"
      width="90%"
  >
    <template v-slot:title>
      <div class="product-title">
        <span>{{ productInfo.productName }}</span>
      </div>
    </template>
    <el-scrollbar>
      <div class="product-info" style="height: calc(100vh - 190px);">
        <b>Information</b><br/>
        <el-table
            :data="[{
                  productName: productInfo.productName,
                  productDescription: productInfo.productDescription
                }]"
            border
            style="width: 100%;"
        >
          <el-table-column label="Product Name" prop="productName" :width="200"></el-table-column>
          <el-table-column label="Product Description" prop="productDescription"></el-table-column>
        </el-table><br/>
        <b>Product Picture: </b><br/>
        <el-image
            :src="productInfo.productPicture"
            alt="Product Picture"
            style="position: relative;width: 300px;"
        />
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
export default {
  name: "ProductInfoView",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    productInfo: {
      type: Object,
      default: {}
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
  }
}
</script>

<style scoped>
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

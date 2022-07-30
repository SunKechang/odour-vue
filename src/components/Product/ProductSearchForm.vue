<template>
  <div style="text-align: left;">
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.searchValue" clearable>
          <el-select slot="prepend" v-model="searchForm.searchProperty">
            <el-option label="Product Name" value="product_name"></el-option>
            <el-option label="Product Description" value="product_description"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button circle icon="el-icon-search" @click="onSubmit"></el-button>
      </el-form-item>
      <el-form-item v-if="$store.state.user.Authorization">
        <el-button style="float:right" @click="onDownload">Download</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      searchForm: {
        searchProperty: 'product_name',
        searchValue: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.searchForm)
    },
    onDownload() {
      this.$emit('onDownload')
    }
  }
}
</script>

<style scoped>
>>> .el-input-group__prepend {
  background-color: transparent;
  width: 190px;
}

>>> .el-form-item {
  margin-bottom: 10px;
}
</style>
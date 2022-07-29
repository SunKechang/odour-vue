<template>
  <el-form :inline="true" :model="searchForm" style="text-align: left">
    <el-form-item>
      <el-input v-model="searchForm.searchValue" clearable>
        <el-select slot="prepend" v-model="searchForm.searchProperty">
          <el-option label="Compound Name" value="compound_name"></el-option>
          <el-option label="CAS NO." value="cas_no"></el-option>
          <el-option label="Odour Description" value="odour_description"></el-option>
          <el-option label="Odour Threshold" value="odour_threshold"></el-option>
          <el-option label="RI" value="compound_ri"></el-option>
          <el-option label="NRI" value="compound_nri"></el-option>
          <el-option label="Measured" value="measured"></el-option>
          <el-option label="Low-resolution Measured" value="lowmeasured"></el-option>
          <el-option label="Product" value="product"></el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button circle icon="el-icon-search" @click="onSubmit"></el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      searchForm: {
        property: 'compound_name',
        propertyDescription: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$api.compound.search({
        ...this.searchForm,
        page: this.currentPage,
        size: this.size
      }).then(({state, data: {content, totalSize}}) => {
        if (state === 0) {
          this.compoundData = content
          this.total = totalSize
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
>>> .el-input-group__prepend {
  background-color: transparent;
  width: 170px;
}

>>> .el-form-item {
  margin-bottom: 10px;
}
</style>
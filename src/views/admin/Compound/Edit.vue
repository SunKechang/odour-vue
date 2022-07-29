<template>
  <div ref="container">
    <div style="text-align: left;">
      <el-form :inline="true" :model="searchForm">
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
        <el-form-item>
          <el-button style="float:right" @click="onDownload">下载化合物表单</el-button>
        </el-form-item>
      </el-form>
    </div>
    <compound-table/>
  </div>
</template>

<script>
import CompoundTable from "@/components/CompoundTable"
export default {
  name: "EditCompound",
  component: [CompoundTable],
  components: {
    "compound-table": CompoundTable
  },
  data() {
    return {
      searchForm: {
        searchProperty: 'compound_name',
        searchValue: ''
      }
    }
  },
  methods: {
    onDownload() {
      this.$api.compound.download(this.downloadList)
    },
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
        console.log(err);
      });
    }
  },
  created() {
    console.log("test")
  },
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
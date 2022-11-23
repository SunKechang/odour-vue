<template>
  <div style="text-align: left;">
    <el-form :inline="true" :model="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.searchValue" clearable>
          <el-select slot="prepend" v-model="searchForm.searchProperty">
            <el-option label="Compound Name" value="compound_name"></el-option>
            <el-option label="CAS NO." value="cas_no"></el-option>
            <el-option label="Odour Description" value="odour_description"></el-option>
              <el-option label="Odour Threshold" value="odour_threshold" v-show="searchForm.searchKind == 0"></el-option>
              <!-- <el-option label="RI" value="compound_ri"></el-option>
              <el-option label="NRI" value="compound_nri"></el-option>
              <el-option label="Measured" value="measured"></el-option>
              <el-option label="Low-resolution Measured" value="lowmeasured"></el-option>
              <el-option label="Product" value="product" v-if="product"></el-option> -->
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" circle icon="el-icon-search" @click="onSubmit"></el-button>
      </el-form-item>
      <el-form-item v-if="$store.state.user.Authorization">
        <el-button style="float:right" @click="onDownload">下载化合物表单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CompoundSearchForm",
  props: {
    product: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchForm: {
        searchProperty: 'compound_name',
        searchValue: '',
        searchKind: 0,
        base: ''
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
  },
  mounted() {
    if(this.$route.query.search !== undefined) {
      this.searchForm.searchValue = this.$route.query.search
      this.$emit('onSubmit', this.searchForm)
    } else {
      this.searchForm.searchValue = ''
    }
    if(this.$route.query.base !== undefined) {
      this.searchForm.base = this.$route.query.base
    } else {
      this.searchForm.base = ''
    }
    if(this.$route.query.kind !== undefined) {
      this.searchForm.searchKind = this.$route.query.kind
    } else {
      this.searchForm.searchKind = 0
    }
    this.$emit('onSubmit', this.searchForm)
  },
  watch: {
    '$route.query.base': {
      handler(newVal, oldVal) {
        this.searchForm.base = newVal
      }
    },
    '$route.query.kind': {
      handler(newVal, oldVal) {
        this.searchForm.searchKind = newVal
      }
    },
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
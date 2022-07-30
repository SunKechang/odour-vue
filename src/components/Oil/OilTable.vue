<template>
  <div>
    <el-form :inline="true" :model="searchForm" style="float: left;position: relative;top: 30%">
      <el-form-item>
        <el-select v-model="searchForm.property">
          <el-option label="Oil Name" value="oil_name"></el-option>
          <el-option label="Oil Type" value="oil_type"></el-option>
          <el-option label="Oil Brand" value="oil_brand"></el-option>
          <el-option label="Key Compound CAS" value="key_compound_cas"></el-option>
          <el-option label="Oil Odour" value="oil_odour"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
            v-model="searchForm.propertyDescription"
            class="condition-description"
            clearable
            style="width: 200px">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button circle icon="el-icon-search" @click="onSearch"></el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="oilData.slice((this.currentPage - 1) * this.size, (this.currentPage - 1) * this.size + this.size)"
        stripe
        style="width: 100%">
      <el-table-column
          :label="$t('oil.oilName')"
          prop="oilName"
          width="250">
      </el-table-column>
      <el-table-column
          :label="$t('oil.oilType')"
          prop="oilType"
          width="200">
      </el-table-column>
      <el-table-column
          :label="$t('oil.oilBrand')"
          prop="oilBrand"
          width="200">
      </el-table-column>
      <el-table-column
          :label="$t('oil.oilDate')"
          prop="oilDate"
          width="200">
      </el-table-column>

      <el-table-column label="">
        <template v-slot="scope">
          <el-button
              size="mini"
              @click="handleView(scope.$index)">{{ $t("view") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <div class="block">
        <el-pagination
            :current-page="currentPage"
            :page-size="size"
            :total="total"
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <oil-info :oilInfo="oilInfo" :visible.sync="viewDialogVisible"></oil-info>
  </div>
</template>

<script>
const OilInfo = () => import("@/components/Oil/OilInfoView");

export default {
  name: "OilTable",
  component: [OilInfo],
  components: {
    "oil-info": OilInfo
  },
  data() {
    return {
      oilData: [],
      viewDialogVisible: false,
      oilInfo: {},
      size: 10,
      currentPage: 1,
      total: 0,
      searchForm: {
        property: 'oil_name',
        propertyDescription: ''
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleView(index) {
      this.viewDialogVisible = !this.viewDialogVisible;
      this.oilInfo = this.oilData[(this.currentPage - 1) * this.size + index];
    },
    getOilData() {
      let v = this;
      this.$api.oil.getAll()
          .then(res => {
            v.oilData = res.data;
            v.total = res.data.length;
          }).catch(err => {
        console.log(err);
      });
    },
    onSearch() {
      let v = this;
      let param = new FormData();
      param.append("property", v.searchForm.property);
      param.append("propertyDescription", v.searchForm.propertyDescription);
      this.$api.oil.search(param)
          .then(res => {
            if (res.data.state === 0) {
              v.oilData = res.data.data;
              v.total = res.data.data.length;
            }
          }).catch(err => {
        console.log(err);
      });
    },
  },
  created() {
    this.getOilData();

  }
}
</script>

<style scoped>
</style>


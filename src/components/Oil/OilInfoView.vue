<template>
  <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="90%">
    <div class="oil-info">
      <p><b>Oil Name : </b>{{ oilInfo.oilName }}</p>
      <p><b>Oil Type : </b>{{ oilInfo.oilType }}</p>
      <p><b>Oil Brand : </b>{{ oilInfo.oilBrand }}</p>
      <p><b>Production date: </b>{{ oilInfo.oilDate }}</p>
      <b>Key compound: </b>
      <el-table
          :data="oilInfo.okList"
          border
          style="width: 100%">
        <el-table-column
            label="compound Name"
            prop="keycompoundName">
        </el-table-column>
        <el-table-column
            label="CAS NO"
            prop="casNo">
        </el-table-column>
        <el-table-column
            label="concentration"
            prop="concentration">
        </el-table-column>
        <el-table-column
            label="Note"
            prop="okNote">
        </el-table-column>

      </el-table>

      <b>Oil Odour: </b>
      <el-table
          :data="oilInfo.ooList"
          border
          style="width: 100%">
        <el-table-column
            label="oil odour"
            prop="oilOdour">
        </el-table-column>
        <el-table-column
            label="Oil Odour Intensity"
            prop="oilOdourIntensity">
        </el-table-column>
        <el-table-column
            label="Note"
            prop="ooNote">
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import jwtDecode from "jwt-decode"
export default {
  name: "OilInfo",
  data() {
    return {
      account: ''
    }
  },
  created() {
    let token = this.$store.state.user.Authorization;
    const decode = jwtDecode(token);
    this.account = decode.account;
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    oilInfo: {
      type: Object,
      default: function () {
        return {}
      }
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
.oil-info {
  margin: 0 auto;
  padding-right: 200px;
  padding-bottom: 100px;
  width: 60%;
  text-align: left;
  font-size: 18px;
  border-color: #e7eaec;
  border-width: 3px 0 0;
  border-style: solid solid none;
}
</style>
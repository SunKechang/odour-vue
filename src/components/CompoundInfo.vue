<template>
  <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="90%">
    <div class="compound-info">
      <p><b>Compound Name : </b>{{ compoundInfo.compoundName }}</p>
      <!--            <div>-->
      <!--                <b>Chemical Structure: </b><br>-->
      <!--                <img :src="compoundInfo.chemicalStructure" alt="">-->
      <!--            </div>-->
      <div>
        <b>Chemical Structure: </b><br>
        <img :src="$store.state.config.host + compoundInfo.chemicalStructure" alt="" style="position: relative;" width="300">
      </div>
      <p><b>Synonym : </b>{{ compoundInfo.synonym }}</p>
      <p><b>CAS NO. : </b>{{ compoundInfo.casNo }}</p>
      <b>(polar)RI : </b>
      <el-table
          :data="compoundInfo.riList"
          border
          style="width: 100%">
        <el-table-column
            label="RI"
            prop="compoundRi">
        </el-table-column>
        <el-table-column
            label="Chromatographic Column"
            prop="chromatographicColumn">
        </el-table-column>
        <el-table-column
            label="Ri Resource"
            prop="riResource">
        </el-table-column>
      </el-table>

      <b>(non polar)RI : </b>
      <el-table
          :data="compoundInfo.nriList"
          border
          style="width: 100%">
        <el-table-column
            label="NRi"
            prop="compoundNri">
        </el-table-column>
        <el-table-column
            label="Chromatographic Column"
            prop="chromatographicColumn">
        </el-table-column>
        <el-table-column
            label="Nri Resource"
            prop="nriResource">
        </el-table-column>
      </el-table>
      <br>
      <b>Odour Threshold : </b>
      <br>
      <el-table
          :data="compoundInfo.otList"
          border
          style="width: 100%;margin-left: 100px">
        <el-table-column
            label="Odour Threshold(μg/kg) "
            prop="odourThreshold">
        </el-table-column>
        <el-table-column
            label="Odour Base"
            prop="odourBase">
        </el-table-column>
        <el-table-column
            label="Odour Reference"
            prop="odourThresholdReference">
        </el-table-column>

      </el-table>
      <br>
      <b>Odour Description : </b>
      <br>
      <el-table
          :data="compoundInfo.odList"
          border
          style="width: 100%;margin-left: 100px">
        <el-table-column
            label="Odour Description"
            prop="odourDescription">
        </el-table-column>
        <el-table-column
            label="Odour Description Reference"
            prop="odourDescriptionReference">
        </el-table-column>
      </el-table>

      <div>
        <b>Orbitrap-MS mass spectrometry:</b><br>
        <img :src="compoundInfo.massSpectrogram" alt="" style="position: relative;" width="700">
      </div>
      <div>
        <b>low-resolution mass spectrometry:</b><br>
        <img :src="compoundInfo.massSpectrogramNist" alt="" style="position: relative;" width="700">
      </div>
      <!--            <div v-if="account!==''">-->
      <!--                <b>Low-resolution mass spectrometry:</b><br>-->
      <!--                <img :src="compoundInfo.massSpectrogramNist" width="850" alt="">-->
      <!--                <span>(source: the NIST11 library)</span>-->
      <!--            </div>-->
      <br>
      <br>
      <b>High-solution Measured & Relative Abundance : </b>
      <br>
      <el-table
          :data="compoundInfo.mrList"
          border
          style="width: 100%;margin-left: 100px">
        <el-table-column
            label="Measured m/z"
            prop="measured">
        </el-table-column>
        <el-table-column
            label="Relative Abundance"
            prop="relativeAbundance">
        </el-table-column>
      </el-table>

      <b>Low-solution Measured & Relative Abundance : </b>
      <br>
      <el-table
          :data="compoundInfo.lowmrList"
          border
          style="width: 100%;margin-left: 100px">
        <el-table-column
            label="Measured m/z"
            prop="measured">
        </el-table-column>
        <el-table-column
            label="Relative Abundance"
            prop="relativeAbundance">
        </el-table-column>
      </el-table>
      <b>Uploader & Reviewer : </b>
      <br>
      <el-table
          :data="[{
                uploader: compoundInfo.uploader,
                reviewer: compoundInfo.reviewer
              }]"
          border
          style="width: 100%;margin-left: 100px">
        <el-table-column label="Uploader" prop="uploader"></el-table-column>
        <el-table-column label="Reviewer" prop="reviewer"></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>

import jwtDecode from "jwt-decode";
import {mapGetters} from "vuex";

export default {
  name: "CompoundInfo",
  data() {
    return {
      account: ''
    }
  },
  computed: {
    ...mapGetters({
      authorization: 'user/Authorization',
    })
  },
  created() {
    if (this.authorization !== '') {
      const decode = jwtDecode(this.authorization);
      this.account = decode.account;
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    compoundInfo: {
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
.compound-info {
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
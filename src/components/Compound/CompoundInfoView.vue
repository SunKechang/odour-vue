<template>
  <el-dialog
      :visible.sync="dialogVisible"
      top="20px"
      width="90%"
  >
    <template v-slot:title>
      <div class="compound-title">
        <span>{{ compoundInfo.compoundName }}</span>
      </div>
    </template>
    <el-scrollbar>
      <div class="compound-info" style="height: calc(100vh - 190px);">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Information" name="info">
            <div>
              <b>Information</b>
              <el-table
                  :data="[{
                  compoundName: compoundInfo.compoundName,
                  synonym: compoundInfo.synonym,
                  casNo: compoundInfo.casNo,
                }]"
                  border
                  style="width: 100%;"
              >
                <el-table-column label="Compound Name" prop="compoundName"></el-table-column>
                <el-table-column label="Synonym" prop="synonym"></el-table-column>
                <el-table-column label="CAS NO." prop="casNo"></el-table-column>
              </el-table>
            </div>
            <br/>
            <div>
              <b>Uploader & Reviewer : </b>
              <el-table
                  :data="[{
                  uploader: compoundInfo.uploader,
                  reviewer: compoundInfo.reviewer
                }]"
                  border
                  style="width: 100%;"
              >
                <el-table-column label="Uploader" prop="uploader"></el-table-column>
                <el-table-column label="Reviewer" prop="reviewer">{{compoundInfo.reviewerName}}({{compoundInfo.reviewer}})</el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Structure" name="structure">
            <div>
              <b>Chemical Structure: </b><br/>
              <el-image
                  :src="'/api'+compoundInfo.chemicalStructure"
                  alt="Chemical Structure"
                  style="position: relative;width: 300px;"
              />
            </div>

          </el-tab-pane>
          <el-tab-pane label="RI/NRI" name="ri">
            <div>
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
            </div>
            <br/>
            <div>
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="Threshold & Description" name="threshold">
            <div>
              <b>Odour Threshold : </b>
              <el-table
                  :data="compoundInfo.otList"
                  border
                  style="width: 100%;">
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
            </div>
            <br/>
            <div>
              <b>Odour Description : </b>
              <el-table
                  :data="compoundInfo.odList"
                  border
                  style="width: 100%;">
                <el-table-column
                    label="Odour Description"
                    prop="odourDescription">
                </el-table-column>
                <el-table-column
                    label="Odour Description Reference"
                    prop="odourDescriptionReference">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Mass Spectrometry" name="spectrometry">
            <div>
              <b>Orbitrap-MS mass spectrometry:</b><br>
              <img :src="'/api'+compoundInfo.massSpectrogram" alt="" style="position: relative;" width="700">
            </div>
            <br/>
            <div>
              <b>low-resolution mass spectrometry:</b><br>
              <img :src="'/api'+compoundInfo.massSpectrogramNist" alt="" style="position: relative;" width="700">
            </div>
          </el-tab-pane>
          <el-tab-pane label="Measured & Relative Abundance" name="abundance">
            <div>
              <b>High-solution Measured & Relative Abundance : </b>
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
            </div>
            <br/>
            <div>
              <b>Low-solution Measured & Relative Abundance : </b>
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
            </div>
          </el-tab-pane >
          <el-tab-pane label="Production" name="Production">
            <div v-for="product in compoundInfo.productList">
              <b>{{product.productName}}</b>
              <div>Product Threshold</div>
              <el-table
                  :data="product.otList"
                  border
                  style="width: 100%;margin-left: 100px">
                <el-table-column
                    label="Odour Threshold(μg/kg) "
                    prop="odourThreshold">
                </el-table-column>
                <el-table-column
                    label="Odour Threshold Reference"
                    prop="odourThresholdReference">
                </el-table-column>
                <el-table-column
                    label="Odour Threshold Base"
                    prop="odourThresholdBase">
                </el-table-column>
              </el-table>
              <div>Product Description</div>
              <el-table
                  :data="product.odList"
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
            </div>


          </el-tab-pane>
          <el-tab-pane label="Article" name="Article">
            <div>
              <b>Article : </b>
              <el-form label-position="left" label-width="200px">
                <el-form-item class="form-item" style="margin-bottom: 22px;" label="Name" label-width="135px">
                  <span>{{compoundInfo.articleName}}</span>
                </el-form-item>
                <el-form-item class="form-item" style="margin-bottom: 22px;" label="Download" label-width="135px" prop="status">
                  <el-button type="primary" @click="articleDownload">下载</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
        <br>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
export default {
  name: "CompoundInfo",
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
  data() {
    return {
      activeName: 'info'
    }
  },
  methods: {
    articleDownload() {
      let _pk = this.compoundInfo.article
      window.open(this.$target + '/article/getFile?pk='+_pk, '_blank');
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

.compound-title {
  text-align: left;
  font-size: 16px;
}

.compound-info {
  margin: 0 auto;
  width: 80%;
  text-align: left;
  font-size: 18px;
}
</style>

<template>
  <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      class="compound-info-form"
      width="90%"
      @close="getCompoundData">
    <template v-slot:title>
      <div class="compound-title">
        <span>{{'Edit ' + compoundInfo.compoundName }}</span>
      </div>
    </template>
    <el-scrollbar>
      <div>
        <el-form ref="compoundInfoForm" :model="compoundInfoForm" :rules="rules" label-position="left" label-width="200px">
          <el-divider content-position="left"><span class="span">Compound Info</span></el-divider>
          <el-form-item class="form-item" style="margin-bottom: 22px;" label="Compound Name" label-width="135px" prop="compoundName" required>
            <el-input v-model="compoundInfoForm.compoundName" clearable></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="Synonym" label-width="135px" prop="synonym">
            <el-input v-model="compoundInfoForm.synonym" clearable type="textarea"></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="CAS NO." label-width="135px" prop="casNo">
            <el-input v-model="compoundInfoForm.casNo" clearable></el-input>
          </el-form-item>
          <!--极性-->
          <el-divider content-position="left"><span class="span">RI (Polar)</span></el-divider>
          <el-card v-for="(item, index) in compoundInfoForm.riList" :key="'RI' + index" body-style="{ padding: '10px' !important }"
                   shadow="hover">
            <el-row :gutter="10">
              <el-col :lg="10">
                <el-form-item class="form-item" label="RI" label-width="100px">
                  <el-input v-model="item.compoundRi" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12">
                <el-form-item class="form-item" label="Chromatographic Column" label-width="175px">
                  <el-input v-model="item.chromatographicColumn" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="22">
                <el-form-item class="form-item" label="RI Resource" label-width="100px">
                  <el-input v-model="item.riResource" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <i class="el-icon-delete rowBtn" @click="removeRI(item, index)"></i>
              </el-col>
            </el-row>
          </el-card>
          <div style="text-align: right">
            <el-button size="small" type="primary" @click="addRI">Add RI</el-button>
          </div>

          <!--非极性-->
          <el-divider content-position="left"><span class="span">RI(Non-Polar)</span></el-divider>
          <el-card v-for="(item, index) in compoundInfoForm.nriList" :key="'NRI' + index" shadow="hover">
            <el-row :gutter="10">
              <el-col :lg="10">
                <el-form-item class="form-item" label="RI" label-width="100px">
                  <el-input v-model="item.compoundNri" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12">
                <el-form-item class="form-item" label="Chromatographic Column" label-width="175px">
                  <el-input v-model="item.chromatographicColumn" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="22">
                <el-form-item class="form-item" label="NRI Resource" label-width="100px">
                  <el-input v-model="item.nriResource" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <i class="el-icon-delete rowBtn" @click="removeNRI(item, index)"></i>
              </el-col>
            </el-row>
          </el-card>
          <div style="text-align: right">
            <el-button size="small" type="primary" @click="addNRI">Add NRI</el-button>
          </div>

          <!--香气阈值-->
          <el-divider content-position="left"><span class="span">Odour Threshold</span></el-divider>
          <el-card v-for="(item, index) in compoundInfoForm.otList" :key="index" shadow="hover">
            <el-row :gutter="10">
              <el-col :lg="12">
                <el-form-item class="form-item" label="Odour Threshold(μg/kg)">
                  <el-input v-model="item.odourThreshold" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="10">
                <el-form-item class="form-item" label="Odour Base" label-width="90px">
                  <el-input v-model="item.odourBase" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <i class="el-icon-delete rowBtn" @click="removeot(item, index)"></i>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :lg="12">
                <el-form-item class="form-item" label="Origin Article" v-if="item.article.originParam">
                  <el-button @click="viewArticle(item.articleId)">{{item.articleName}}</el-button>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="form-item" label="Change Article" v-if="item.article.originParam">
                  <el-switch
                    v-model="item.article.articleChanged"
                    active-text="修改文献">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-show="item.article.articleChanged">
              <el-col :lg="12">
                <el-form-item class="form-item" label="Article" label-width="80px">
                  <el-switch
                    v-model="item.article.useExist"
                    active-text="使用已有文献"
                    inactive-text="上传新文献"
                    @change="(val)=>otArticleChanged(val, index)"
                    >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-show="item.article.articleChanged && item.article.useExist">
              <el-col :lg="12">
                <el-form-item class="form-item" label="Article" label-width="80px">
                  <el-select
                    filterable
                    :value="item.article.name"
                    value-key="name"
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteSearch"
                    :loading="articleSearchLoading"
                    @change="(item)=>otSelectChange(item, index)">
                    <el-option
                      v-for="(item1,index1) in articleList"
                      :key="item1.pk"
                      :label="item1.name"
                      :value="index1">
                    </el-option>
                  </el-select>
                  <el-button size="small" type="primary" style="margin-left: 20px;" @click="otViewArticle(index)">
                    View
                  </el-button>
                  
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-show="item.article.articleChanged && !item.article.useExist">
              <el-col :lg="12">
                <el-form-item label="Article Name">
                <el-input v-model="item.article.name" clearable style="width: 500px" @blur="otAddArticleBlur(index)"></el-input>
              </el-form-item>
              <el-form-item label="Article File">
                  <el-upload
                    accept=".pdf"
                    action="/"
                    :on-change="(file, fileList) => otfileChange(file, fileList, index)"
                    :file-list="[]"
                    :auto-upload="false"
                    :limit="1">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
              </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <div style="text-align: right">
            <el-button size="small" type="primary" @click="addot">Add Threshold</el-button>
          </div>

          <!--风味描述-->
          <el-divider content-position="left"><span class="span">Odour Description</span></el-divider>
          <el-card v-for="(item, index) in compoundInfoForm.odList" :key="'od' + index" shadow="hover">
            <el-row :gutter="10" type="flex">
              <el-col :lg="10">
                <el-form-item class="form-item" label="Odour Description" label-width="130px">
                  <el-input v-model="item.odourDescription" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <i class="el-icon-delete rowBtn" @click="removeod(item, index)"></i>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :lg="12">
                <el-form-item class="form-item" label="Origin Article" v-if="item.article.originParam">
                  <el-button @click="viewArticle(item.articleId)">{{item.articleName}}</el-button>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item class="form-item" label="Change Article" v-if="item.article.originParam">
                  <el-switch
                    v-model="item.article.articleChanged"
                    active-text="修改文献">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-show="item.article.articleChanged">
              <el-col :lg="12">
                <el-form-item class="form-item" label="Article" label-width="80px">
                  <el-switch
                    v-model="item.article.useExist"
                    active-text="使用已有文献"
                    inactive-text="上传新文献"
                    @change="(val)=>odArticleChanged(val, index)"
                    >
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-show="item.article.articleChanged && item.article.useExist">
              <el-col :lg="12">
                <el-form-item class="form-item" label="Article" label-width="80px">
                  <el-select
                    filterable
                    :value="item.article.name"
                    value-key="name"
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteSearch"
                    :loading="articleSearchLoading"
                    @change="(item)=>odSelectChange(item, index)">
                    <el-option
                      v-for="(item1,index1) in articleList"
                      :key="item1.pk"
                      :label="item1.name"
                      :value="index1">
                    </el-option>
                  </el-select>
                  <el-button size="small" type="primary" style="margin-left: 20px;" @click="odViewArticle(index)">
                    View
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-show="item.article.articleChanged && !item.article.useExist">
              <el-col :lg="12">
                <el-form-item label="Article Name">
                <el-input v-model="item.article.name" clearable style="width: 500px" @blur="odAddArticleBlur(index)"></el-input>
              </el-form-item>
              <el-form-item label="Article File">
                  <el-upload
                    accept=".pdf"
                    action="/"
                    :on-change="(file, fileList) => odfileChange(file, fileList, index)"
                    :file-list="[]"
                    :auto-upload="false"
                    :limit="1">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
              </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <div style="text-align: right">
            <el-button size="small" type="primary" @click="addod">Add Description</el-button>
          </div>

          <!--Chemical Structure-->
          <el-divider content-position="left"><span class="span">Chemical Structure</span></el-divider>
          <img width="50%" style="margin: auto" :src="oldChemicalStructure" alt="">
          <el-upload
              ref="uploadChemicalStructure"
              :auto-upload="false"
              :limit="1"
              :multiple="false"
              :on-change="onChangeChemicalStructure"
              accept=".jpeg,.jpg,.png"
              action=""
              class="upload-demo"
              style="text-align: right;"
          >
            <el-button slot="trigger" size="small" type="primary">Select chemical structure</el-button>
          </el-upload>

          <!--Orbitrap-MS mass spectrometry-->
          <el-divider content-position="left"><span class="span">Orbitrap-MS mass spectrometry</span></el-divider>
          <img :src="oldMassSpectrogram" width="50%" alt="">
          <el-upload
              ref="uploadMassSpectrogram"
              :auto-upload="false"
              :multiple="false"
              :limit="1"
              :on-change="onChangeMassSpectrogram"
              accept=".jpeg,.jpg,.png"
              action=""
              style="text-align: right"
          >
            <el-button slot="trigger" size="small" type="primary">Select Orbitrap-MS mass spectrometry</el-button>
          </el-upload>

          <!--Low-resolution mass spectrometry-->
          <el-divider content-position="left"><span class="span">Low-resolution mass spectrometry</span></el-divider>
          <img :src="oldMassSpectrogramNist" width="50%" alt="">
          <el-upload
              ref="uploadMassSpectrogramNist"
              :auto-upload="false"
              :multiple="false"
              :limit="1"
              :on-change="onChangeMassSpectrogramNist"
              accept=".jpeg,.jpg,.png"
              action=""
              style="text-align: right;"
          >
            <el-button slot="trigger" size="small" type="primary">Select Low-resolution mass spectrometry</el-button>
          </el-upload>

          <!--高分辨率质谱-->
          <el-divider content-position="left"><span class="span">(High-resolution)Measured & Relative Abundance</span>
          </el-divider>
          <el-upload
              ref="uploadMRExcel"
              :auto-upload="false"
              :multiple="false"
              :limit="1"
              accept=".xlsx"
              action=""
              style="text-align: right;margin-bottom: 20px;"
          >
            <el-button slot="trigger" size="small" type="primary">Select Excel</el-button>
            &nbsp
            <el-button size="small" type="primary" >Read Excel</el-button>
          </el-upload>


          <el-card v-for="(item, index) in compoundInfoForm.mrList" :key=" 'mr' + index" shadow="hover">
            <el-row :gutter="10" type="flex">
              <el-col :lg="10">
                <el-form-item class="form-item" label="Measured" label-width="80px">
                  <el-input v-model="item.measured" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12">
                <el-form-item class="form-item" label="Relative Abundance" label-width="140px">
                  <el-input v-model="item.relativeAbundance" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <i class="el-icon-delete rowBtn" @click="removeMR(item, index)"></i>
              </el-col>
            </el-row>
          </el-card>
          <div style="text-align: right">
            <el-button size="small" type="primary" @click="addMR">Add measured and relative abundance</el-button>
          </div>

          <!--低分辨率质谱-->
          <el-divider content-position="left"><span class="span">(Low-resolution)Measured & Relative Abundance</span>
          </el-divider>
          <el-upload
              ref="uploadlowMRExcel"
              :auto-upload="false"
              :limit="1"
              :multiple="false"
              accept=".xlsx"
              action=""
              style="text-align: right;margin-bottom: 20px;"
          >
            <el-button slot="trigger" size="small" type="primary">Select Excel</el-button>
            &nbsp
            <el-button size="small" type="primary">Read Excel</el-button>
          </el-upload>

          <el-card v-for="(item, index) in compoundInfoForm.lowmrList" :key="'lowmr' + index" shadow="hover">
            <el-row :gutter="10" type="flex">
              <el-col :lg="10">
                <el-form-item class="form-item" label="Measured" label-width="80px">
                  <el-input v-model="item.measured" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12">
                <el-form-item class="form-item" label="Relative Abundance" label-width="140px">
                  <el-input v-model="item.relativeAbundance" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="2">
                <i class="el-icon-delete rowBtn" @click="removelowMR(item, index)"></i>
              </el-col>
            </el-row>
          </el-card>
          <div style="text-align: right">
            <el-button size="small" type="primary" @click="addlowMR">Add measured and relative abundance</el-button>
          </div>

          <el-divider content-position="left"><span class="span">Products</span></el-divider>
          <el-form-item class="form-item" label="Products" label-width="80px">
            <el-select v-model="compoundInfoForm.products" multiple placeholder="" @change="selectProduct"
                       @remove-tag="removeProduct">
              <el-option
                  v-for="{id, productName} in productOptions"
                  :key="id"
                  :label="productName"
                  :value="id">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-for="({id, productName}, productIndex) in compoundInfoForm.productList" :key="productName">
            <div v-if="id">
              <el-divider content-position="center">{{ productName }}</el-divider>
              <el-card v-for="(item, otIndex) in compoundInfoForm.productList[productIndex].otList"
                       :key="productIndex + 'threshold' +otIndex" shadow="hover">
                <el-row :gutter="10" type="flex">
                  <el-col :lg="11">
                    <el-form-item class="form-item" label="Odour Threshold(μg/kg) ">
                      <el-input v-model="item.odourThreshold" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="11">
                    <el-form-item class="form-item" label="Odour Threshold Base">
                      <el-input v-model="item.odourThresholdBase" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="2">
                    <i class="el-icon-delete rowBtn" @click="removeProductThreshold(productIndex, otIndex)"></i>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :lg="12">
                    <el-form-item class="form-item" label="Origin Article" v-if="item.article.originParam">
                      <el-button @click="viewArticle(item.articleId)">{{item.articleName}}</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item class="form-item" label="Change Article" v-if="item.article.originParam">
                      <el-switch
                        v-model="item.article.articleChanged"
                        active-text="修改文献">
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-show="item.article.articleChanged">
                  <el-col :lg="12">
                    <el-form-item class="form-item" label="Article" label-width="80px">
                      <el-switch
                        v-model="item.article.useExist"
                        active-text="使用已有文献"
                        inactive-text="上传新文献"
                        @change="(val)=>procOtArticleChanged(val, productIndex, otIndex)"
                        >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-show="item.article.articleChanged && item.article.useExist">
                  <el-col :lg="12">
                    <el-form-item class="form-item" label="Article" label-width="80px">
                      <el-select
                        filterable
                        :value="item.article.name"
                        value-key="name"
                        remote
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="remoteSearch"
                        :loading="articleSearchLoading"
                        @change="(item)=>procOtSelectChange(productIndex, otIndex, item)">
                        <el-option
                          v-for="(item1,index1) in articleList"
                          :key="item1.pk"
                          :label="item1.name"
                          :value="index1">
                        </el-option>
                      </el-select>
                      <el-button size="small" type="primary" style="margin-left: 20px;" @click="procOtViewArticle(productIndex, otIndex)">
                        View
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-show="item.article.articleChanged && !item.article.useExist">
                  <el-col :lg="12">
                    <el-form-item label="Article Name">
                    <el-input v-model="item.article.name" clearable style="width: 500px" @blur="procOtAddArticleBlur(productIndex, otIndex)"></el-input>
                  </el-form-item>
                  <el-form-item label="Article File">
                      <el-upload
                        accept=".pdf"
                        action="/"
                        :on-change="(file, fileList) => procOtfileChange(file, fileList, productIndex, otIndex)"
                        :file-list="[]"
                        :auto-upload="false"
                        :limit="1">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                  </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
              <div style="text-align: right">
                <el-button size="small" type="primary" @click="addProductThreshold(productIndex, id)">
                  {{ 'Add Threshold for ' + productName }}
                </el-button>
              </div>
              <br>
              <el-card v-for="(item, odIndex) in compoundInfoForm.productList[productIndex].odList"
                       :key="productIndex + 'description' +odIndex" shadow="hover">
                <el-row :gutter="10" type="flex">
                  <el-col :lg="11">
                    <el-form-item class="form-item" label="Odour Description">
                      <el-input v-model="item.odourDescription" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="2">
                    <i class="el-icon-delete rowBtn" @click="removeProductDescription(productIndex, odIndex)"></i>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :lg="12">
                    <el-form-item class="form-item" label="Origin Article" v-if="item.article.originParam">
                      <el-button @click="viewArticle(item.articleId)">{{item.articleName}}</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item class="form-item" label="Change Article" v-if="item.article.originParam">
                      <el-switch
                        v-model="item.article.articleChanged"
                        active-text="修改文献">
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-show="item.article.articleChanged">
                  <el-col :lg="12">
                    <el-form-item class="form-item" label="Article" label-width="80px">
                      <el-switch
                        v-model="item.article.useExist"
                        active-text="使用已有文献"
                        inactive-text="上传新文献"
                        @change="(val)=>procOdArticleChanged(val, productIndex, odIndex)"
                        >
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-show="item.article.articleChanged && item.article.useExist">
                  <el-col :lg="12">
                    <el-form-item class="form-item" label="Article" label-width="80px">
                      <el-select
                        filterable
                        :value="item.article.name"
                        value-key="name"
                        remote
                        reserve-keyword
                        placeholder="请输入关键词"
                        :remote-method="remoteSearch"
                        :loading="articleSearchLoading"
                        @change="(item)=>procOdSelectChange(productIndex, odIndex, item)">
                        <el-option
                          v-for="(item1,index1) in articleList"
                          :key="item1.pk"
                          :label="item1.name"
                          :value="index1">
                        </el-option>
                      </el-select>
                      <el-button size="small" type="primary" style="margin-left: 20px;" @click="procOdViewArticle(productIndex, odIndex)">
                        View
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-show="item.article.articleChanged && !item.article.useExist">
                  <el-col :lg="12">
                    <el-form-item label="Article Name">
                    <el-input v-model="item.article.name" clearable style="width: 500px" @blur="procOdAddArticleBlur(productIndex, odIndex)"></el-input>
                  </el-form-item>
                  <el-form-item label="Article File">
                      <el-upload
                        accept=".pdf"
                        action="/"
                        :on-change="(file, fileList) => procOdfileChange(file, fileList, productIndex, odIndex)"
                        :file-list="[]"
                        :auto-upload="false"
                        :limit="1">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                  </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
              <div style="text-align: right">
                <el-button size="small" type="primary" @click="addProductDescription(productIndex, id)">
                  {{ 'Add Description for ' + productName }}
                </el-button>
              </div>
            </div>
          </div>
          <el-divider content-position="left"><span class="span">Uploader & Reviewer</span></el-divider>
          <el-row :gutter="10">
            <el-col :lg="12">
              <el-form-item class="form-item" label="原上传人" label-width="80px" prop="uploader" v-if="admin">
                <span>{{compoundInfoForm.uploader}}</span>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item class="form-item" label="原审批人" label-width="80px" prop="reviewer">
                <span>{{compoundInfo.reviewerName}}({{compoundInfo.reviewer}})</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :lg="12">
              <el-form-item class="form-item" label="Uploader" label-width="80px" prop="uploader" v-if="admin">
                <el-input v-model="compoundInfoForm.uploader" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item class="form-item" label="Reviewer" label-width="80px" prop="reviewer">
                <el-select
                  filterable
                  :value="selectedReviewer"
                  value-key="email"
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="reviewerSearch"
                  :loading="reviewerSearchLoading"
                  @change="reviewerSelectChange">
                  <el-option
                    v-for="(item,index) in reviewerList"
                    :key="item.email"
                    :label="item.name"
                    :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
    </el-scrollbar>

    <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="submitForm">Update</el-button>
                <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
  </el-dialog>
</template>

<script>
import {convertImgToBase64} from "@/utils/image";
import jwtDecode from "jwt-decode"
export default {
  name: "CompoundInfoEdit",
  data() {
    return {
      compoundInfoForm: {
        id: '',
        compoundName: '',
        synonym: '',
        casNo: '',
        otList: [],
        odList: [],
        riList: [],
        nriList: [],
        mrList: [],
        lowmrList: [],
        chemicalStructure: '',
        massSpectrogram: '',
        massSpectrogramNist: '',
        uploader: '',
        reviewer: '',
        products: [],
        productList: []
      },
      oldChemicalStructure: '',
      oldMassSpectrogram: '',
      oldMassSpectrogramNist: '',
      rules: {
        compoundName: [
          {required: true, message: "Compound name can't be blank", trigger: 'blur'}
        ]
      },
      productOptions: [],
      selectedArticle: {
        name: '',
        pk: null
      },
      articleSearchLoading: false,
      articleList: [],
      uploadArticle: {
        name: '',
        file : null
      },
      admin: false,
      selectedReviewer: '',
      reviewerSearchLoading: false,
      reviewerList: [],
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
  },
  created() {
    let token=this.$store.state.user.Authorization;
    if (token) {
      const decode=jwtDecode(token);
      if (decode.role === undefined || decode.role === null) {
        this.admin = true
      }
    }
    let that = this
    this.$api.product.getAll().then(res => {
      that.productOptions = res.data
    }).catch(err => {
      console.error(err)
    })
  },
  watch: {
    compoundInfo: {
      handler(val) {
        this.compoundInfoForm = val
        this.compoundInfoForm.products = val.productList.map(item => {
          return item.id
        })
        this.oldChemicalStructure = val.chemicalStructure;
        this.oldMassSpectrogram = val.massSpectrogram;
        this.oldMassSpectrogramNist = val.massSpectrogramNist;
      },
      deep: true
    }
  },
  methods: {
    getCompoundData() {
      this.$emit('close', this.compoundInfoForm)
    },
    // 移除产品描述
    removeProductDescription(productIndex, descriptionIndex) {
      this.compoundInfoForm.productList[productIndex].odList.splice(descriptionIndex, 1);
    },
    // 为产品添加描述
    addProductDescription(productIndex, productId) {
      this.compoundInfoForm.productList[productIndex].odList.push({
        odourDescription: '',
        productId: productId,
        article: {
                  pk: '0',
                  name: '',
                  file: null,
                  useExist: true,
                  judgeName: false,
                  articleChanged: true,
                  originParam: false
                }
      })
    },
    // 移除产品阈值
    removeProductThreshold(productIndex, thresholdIndex) {
      this.compoundInfoForm.productList[productIndex].otList.splice(thresholdIndex, 1);
    },
    // 为产品添加阈值
    addProductThreshold(productIndex, productId) {
      this.compoundInfoForm.productList[productIndex].otList.push({
        odourThreshold: 0,
        productId: productId,
        odourThresholdBase: '',
        article: {
                  pk: '0',
                  name: '',
                  file: null,
                  useExist: true,
                  judgeName: false,
                  articleChanged: true,
                  originParam: false
                }
      })
    },
    // 选择产品-选中值发生变化时触发
    selectProduct(val) {
      // @change 回调参数为目前的选中值，所以判断选中产品列表长度大于产品风味列表时，向产品风味列表push数据
      if (val.length > this.compoundInfoForm.productList.length) {
        this.compoundInfoForm.productList.push({
          // 将产品本身的信息push到产品风味中
          ...this.productOptions.filter((item) => item.id === val.at(-1))[0],
          // 产品阈值列表
          otList: [],
          // 产品描述列表
          odList: []
        })
      }
    },
    // 移除一个产品-移除tag时触发
    removeProduct(val) {
      // 产品风味列表移除该项即可
      this.compoundInfoForm.productList = this.compoundInfoForm.productList.filter(item => item.id !== val)
    },
    async uploadOneArticle(name, file) {
      let form = new FormData();
      let res = null
      form.append('name', name)
      form.append('file', file)
      await this.$api.article.add(form)
        .then(({data, success})=> {
          if (success) {
            res = data
          }
        })
      return res
    },
    async submitForm() {
      let that = this
      // 检查化合物阈值文献索引
      for(let i=0;i<this.compoundInfoForm.otList.length;i++) {
        let article = this.compoundInfoForm.otList[i].article
        if(article.originParam && !article.articleChanged) {
          continue
        }
        if(!article.useExist) {
          if(article.file === null) {
            this.$message({
              type: 'error',
              message: '未选择文献'
            })
            return
          }
          if(!article.judgeName) {
            this.$message({
              type: 'error',
              message: '文献文件名已存在，请修改'
            })
            return
          }
          await this.uploadOneArticle(article.name, article.file).then(res=> {
            that.compoundInfoForm.otList[i].articleId = res
          })
        } else {
          this.compoundInfoForm.otList[i].articleId = article.pk
        }
      }

      // 检查化合物香气描述文献索引
      for(let i=0;i<this.compoundInfoForm.odList.length;i++) {
        let article = this.compoundInfoForm.odList[i].article
        if(article.originParam && !article.articleChanged) {
          continue
        }
        if(!article.useExist) {
          if(article.file === null) {
            this.$message({
              type: 'error',
              message: '未选择文献'
            })
            return
          }
          if(!article.judgeName) {
            this.$message({
              type: 'error',
              message: '文献文件名已存在，请修改'
            })
            return
          }
          await this.uploadOneArticle(article.name, article.file).then(res=> {
            that.compoundInfoForm.odList[i].articleId = res
          })
        } else {
          this.compoundInfoForm.odList[i].articleId = article.pk
        }
      }

      //检查产品阈值的文献（名称是否合法，文件是否存在）
      for(let procIndex = 0; procIndex<this.compoundInfoForm.productList.length;procIndex++) {
        for(let i=0;i<this.compoundInfoForm.productList[procIndex].otList.length;i++) {
          let article = this.compoundInfoForm.productList[procIndex].otList[i].article
          if(article.originParam && !article.articleChanged) {
            continue
          }
          if(!article.useExist) {
            if(article.file === null) {
              this.$message({
                type: 'error',
                message: '未选择文献'
              })
              return
            }
            if(!article.judgeName) {
              this.$message({
                type: 'error',
                message: '文献文件名已存在，请修改'
              })
              return
            }
            await this.uploadOneArticle(article.name, article.file).then(res=> {
              that.compoundInfoForm.productList[procIndex].otList[i].articleId = res
            })
          } else {
            this.compoundInfoForm.productList[procIndex].otList[i].articleId = article.pk
          }
        }
      }
      //检查产品香气描述的文献（名称是否合法，文件是否存在）
      for(let procIndex = 0; procIndex<this.compoundInfoForm.productList.length;procIndex++) {
        for(let i=0;i<this.compoundInfoForm.productList[procIndex].odList.length;i++) {
          let article = this.compoundInfoForm.productList[procIndex].odList[i].article
          if(article.originParam && !article.articleChanged) {
            continue
          }
          if(!article.useExist) {
            if(article.file === null) {
              this.$message({
                type: 'error',
                message: '未选择文献'
              })
              return
            }
            if(!article.judgeName) {
              this.$message({
                type: 'error',
                message: '文献文件名已存在，请修改'
              })
              return
            }
            await this.uploadOneArticle(article.name, article.file).then(res=> {
              that.compoundInfoForm.productList[procIndex].odList[i].articleId = res
            })
          } else {
            this.compoundInfoForm.productList[procIndex].odList[i].articleId = article.pk
          }
        }
      }

      let token=this.$store.state.user.Authorization;
      let admin = false
      if (token) {
        const decode=jwtDecode(token);
        if (decode.role === undefined || decode.role === null) {
          admin = true
        }
      }
      await this.$refs.compoundInfoForm.validate((valid) => {
      if (valid) {
        this.compoundInfoForm.casNo = this.compoundInfoForm.casNo.replace(new RegExp("-", "g"), "");
        if(admin) {
          this.$api.compound.update(this.compoundInfoForm)
            .then(({state}) => {
              if (state === 0) {
                this.dialogVisible = false;
                this.$alert("Update " + this.compoundInfoForm.compoundName + " successfully!", "Message", {
                  confirmButtonText: 'Confirm'
                });
              } else {
                this.$alert("Failed!", "Message", {
                  confirmButtonText: 'Confirm'
                });
              }
            }).catch(err => {
              console.error(err);
              this.$alert("Error!", "Message", {
                confirmButtonText: 'Confirm'
              });
            });
        } else {
          this.$api.compound.userUpdate(this.compoundInfoForm)
            .then(({state}) => {
              if (state === 0) {
                this.dialogVisible = false;
                this.$alert("Update " + this.compoundInfoForm.compoundName + " successfully!", "Message", {
                  confirmButtonText: 'Confirm'
                });
              } else {
                this.$alert("Failed!", "Message", {
                  confirmButtonText: 'Confirm'
                });
              }
            }).catch(err => {
              console.error(err);
              this.$alert("Error!", "Message", {
                confirmButtonText: 'Confirm'
              });
            });
        }
        
        } else {
          return false;
        }
      });
      
    },
    onChangeChemicalStructure() {
      let chemicalStructure = this.$refs.uploadChemicalStructure.$refs['upload-inner'].$refs.input.files[0];
      convertImgToBase64(chemicalStructure, (base64Str) => {
        this.compoundInfoForm.chemicalStructure = base64Str;
      }, () => {
        console.error("convert error");
      });
    },
    onChangeMassSpectrogram() {
      let massSpectrogram = this.$refs.uploadMassSpectrogram.$refs['upload-inner'].$refs.input.files[0];
      convertImgToBase64(massSpectrogram, (base64Str) => {
        this.compoundInfoForm.massSpectrogram = base64Str;
      }, () => {
        console.error("convert error");
      });
    },
    onChangeMassSpectrogramNist() {
      let massSpectrogramNist = this.$refs.uploadMassSpectrogramNist.$refs['upload-inner'].$refs.input.files[0];
      convertImgToBase64(massSpectrogramNist, (base64Str) => {
        this.compoundInfoForm.massSpectrogramNist = base64Str;
      }, () => {
        console.error("convert error");
      });
    },
    addot() {
      this.compoundInfoForm.otList.push({
        id: '',
        odourThreshold: 0,
        odourBase: '',
        compoundId: '',
        article: {
                  pk: '0',
                  name: '',
                  file: null,
                  useExist: true,
                  judgeName: false,
                  articleChanged: true,
                  originParam: false
                }
      });
    },
    removeot(item, index) {
      this.compoundInfoForm.otList.splice(index, 1);
    },
    addod() {
      this.compoundInfoForm.odList.push({
        id: '',
        odourDescription: '',
        compoundId: '',
        article: {
                  pk: '0',
                  name: '',
                  file: null,
                  useExist: true,
                  judgeName: false,
                  articleChanged: true,
                  originParam: false
                }
      });
    },
    removeod(item, index) {
      this.compoundInfoForm.odList.splice(index, 1);
    },
    addRI() {
      this.compoundInfoForm.riList.push({
        id: '',
        compoundRi: 0,
        chromatographicColumn: '',
        compoundId: ''
      });
    },
    removeRI(item, index) {
      this.compoundInfoForm.riList.splice(index, 1);
    },
    addNRI() {
      this.compoundInfoForm.nriList.push({
        id: '',
        compoundnRi: 0,
        chromatographicColumn: 0,
        compoundId: ''
      });
    },
    removeNRI(item, index) {
      this.compoundInfoForm.nriList.splice(index, 1);
    },
    addMR() {
      this.compoundInfoForm.mrList.push({
        id: '',
        measured: 0,
        relativeAbundance: 0,
        compoundId: ''
      });
    },
    removeMR(item, index) {
      this.compoundInfoForm.mrList.splice(index, 1);
    },
    addlowMR() {
      this.compoundInfoForm.lowmrList.push({
        id: '',
        measured: 0,
        relativeAbundance: 0,
        compoundId: ''
      });
    },
    removelowMR(item, index) {
      this.compoundInfoForm.lowmrList.splice(index, 1);
    },
    remoteSearch(query) {
      let that = this
      this.articleSearchLoading = true
      this.$api.compound.allSearch(query)
        .then(({data, success}) => {
          if(success) {
            that.articleList = data.list
            console.log(that.articleList)
          }else {
            that.$message("查找失败")
          }
          that.articleSearchLoading = false
        }).catch(err => {
          console.log(err)
          that.articleSearchLoading = false
        })
    },
    otSelectChange(item, index) {
      this.compoundInfoForm.otList[index].article.name = this.articleList[item].name
      this.compoundInfoForm.otList[index].article.pk = this.articleList[item].pk
    },
    procOtSelectChange(productIndex, otIndex, item) {
      this.compoundInfoForm.productList[productIndex].otList[otIndex].article.name = this.articleList[item].name
      this.compoundInfoForm.productList[productIndex].otList[otIndex].article.pk = this.articleList[item].pk
    },
    odSelectChange(item, index) {
      this.compoundInfoForm.odList[index].article.name = this.articleList[item].name
      this.compoundInfoForm.odList[index].article.pk = this.articleList[item].pk
    },
    procOdSelectChange(productIndex, odIndex, item) {
      this.compoundInfoForm.productList[productIndex].odList[odIndex].article.name = this.articleList[item].name
      this.compoundInfoForm.productList[productIndex].odList[odIndex].article.pk = this.articleList[item].pk
    },
    viewArticle(_pk) {
      window.open(this.$target + '/article/getFile?pk='+_pk, '_blank');
    },
    otViewArticle(index) {
      let article = this.compoundInfoForm.otList[index].article
      if(article.name === '') {
        this.$message({
          message: "未选择文献",
          type: 'error'
        })
        return
      }
      this.viewArticle(article.pk)
    },
    odViewArticle(index) {
      let article = this.compoundInfoForm.odList[index].article
      if(article.name === '') {
        this.$message({
          message: "未选择文献",
          type: 'error'
        })
        return
      }
      this.viewArticle(article.pk)
    },
    procOtViewArticle(productIndex, otIndex) {
      let article = this.compoundInfoForm.productList[productIndex].otList[otIndex].article
      if(article.name === '') {
        this.$message({
          message: "未选择文献",
          type: 'error'
        })
        return
      }
      this.viewArticle(article.pk)
    },
    procOdViewArticle(productIndex, odIndex) {
      let article = this.compoundInfoForm.productList[productIndex].odList[odIndex].article
      if(article.name === '') {
        this.$message({
          message: "未选择文献",
          type: 'error'
        })
        return
      }
      this.viewArticle(article.pk)
    },
    fileChange(file, fileList) {
      if(fileList.length == 1) {
          this.uploadArticle.file = fileList[0].raw
      }
    },
    reviewerSearch(query) {
      let that = this
      this.reviewerSearchLoading = true
      this.$api.compound.searchReviewer(query)
        .then(({data, success}) => {
          if(success) {
            that.reviewerList = data
          }else {
            that.$message("查找失败")
          }
          that.reviewerSearchLoading = false
        }).catch(err => {
          console.log(err)
          that.reviewerSearchLoading = false
        })
    },
    reviewerSelectChange(index) {
      this.compoundInfoForm.reviewer = this.reviewerList[index].email
      this.selectedReviewer = this.reviewerList[index].name
    },
    otArticleChanged(val, index) {
      this.compoundInfoForm.otList[index].article.name = ''
    },
    odArticleChanged(val, index) {
      this.compoundInfoForm.odList[index].article.name = ''
    },
    procOtArticleChanged(val, productIndex, otIndex) {
      this.compoundInfoForm.productList[productIndex].otList[otIndex].article.name = ''
    },
    procOdArticleChanged(val, productIndex, odIndex) {
      this.compoundInfoForm.productList[productIndex].odList[odIndex].article.name = ''
    },
    otAddArticleBlur(index) {
      let name = this.compoundInfoForm.otList[index].article.name
      if(name === '') {
        return
      }
      let that = this
      this.$api.article.judgeName(name)
      .then(({data}) => {
        that.compoundInfoForm.otList[index].article.judgeName = data
        if(!data) {
          that.$message({
            message: "文献文件名已存在，请修改",
            type: 'error'
          })
        }
      })
    },
    odAddArticleBlur(index) {
      let name = this.compoundInfoForm.odList[index].article.name
      if(name === '') {
        return
      }
      let that = this
      this.$api.article.judgeName(name)
      .then(({data}) => {
        that.compoundInfoForm.odList[index].article.judgeName = data
        if(!data) {
          that.$message({
            message: "文献文件名已存在，请修改",
            type: 'error'
          })
        }
      })
    },
    procOtAddArticleBlur(productIndex, otIndex) {
      let name = this.compoundInfoForm.productList[productIndex].otList[otIndex].article.name
      if(name === '') {
        return
      }
      let that = this
      this.$api.article.judgeName(name)
      .then(({data}) => {
        that.compoundInfoForm.productList[productIndex].otList[otIndex].article.judgeName = data
        if(!data) {
          that.$message({
            message: "文献文件名已存在，请修改",
            type: 'error'
          })
        }
      })
    },
    procOdAddArticleBlur(productIndex, odIndex) {
      let name = this.compoundInfoForm.productList[productIndex].odList[odIndex].article.name
      if(name === '') {
        return
      }
      let that = this
      this.$api.article.judgeName(name)
      .then(({data}) => {
        that.compoundInfoForm.productList[productIndex].odList[odIndex].article.judgeName = data
        if(!data) {
          that.$message({
            message: "文献文件名已存在，请修改",
            type: 'error'
          })
        }
      })
    },
    otfileChange(file, fileList, index) {
      if(fileList.length == 1) {
        this.compoundInfoForm.otList[index].article.file = fileList[0].raw
      }
    },
    odfileChange(file, fileList, index) {
      if(fileList.length == 1) {
        this.compoundInfoForm.odList[index].article.file = fileList[0].raw
      }
    },
    procOtfileChange(file, fileList, productIndex, otIndex) {
      if(fileList.length == 1) {
        this.compoundInfoForm.productList[productIndex].otList[otIndex].article.file = fileList[0].raw
      }
    },
    procOdfileChange(file, fileList, productIndex, odIndex) {
      if(fileList.length == 1) {
        this.compoundInfoForm.productList[productIndex].odList[odIndex].article.file = fileList[0].raw
      }
    }
  }
}
</script>

<style scoped>
.compound-title {
  text-align: left;
  font-size: 16px;
}
>>> .el-dialog__header {
  border-bottom: #888888 solid 1px;
}

>>> .el-dialog__body {
  padding: 20px;
}
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

.rowBtn {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5em;
  cursor: pointer;
  color: #F56C6C;
}
.compound-info-form form {
  text-align: left;
  background-color: transparent;
  padding: 0 50px;
}
</style>

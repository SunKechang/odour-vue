<template>
    <div class="advanced-search-form">
        <div class="itemTitle">
            <p>{{$t("search.title")}}</p>
            <img src="../../assets/line.png" width="100%" alt="">
        </div>
        <el-form :model="advancedSearchForm" ref="advancedSearchForm" label-width="200px" >
            <el-form-item :label="$t('compound.compoundName')" prop="compound_name" >
                <el-input v-model="advancedSearchForm.compound_name" clearable style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item :label="$t('compound.casNo')" prop="cas_no" >
                <el-input v-model="advancedSearchForm.cas_no" clearable style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item :label="$t('compound.ri')" prop="compound_ri" >
                <el-input-number v-model="advancedSearchForm.compound_ri" :controls="false" clearable style="width: 200px"></el-input-number>
            </el-form-item>
            <el-form-item :label="$t('compound.odourDescription')" prop="odour_description">
                <el-input type="textarea" v-model="advancedSearchForm.odour_description" clearable></el-input>
                <span style="font-size: 12px"><i class="el-icon-info"></i>Example: Aldehyde, citrus, orange peel </span>
            </el-form-item>
            <el-form-item :label="$t('compound.measured')" prop="measured">
                <el-input-number v-model="advancedSearchForm.measured"  :controls="false" clearable style="width: 200px"></el-input-number>
            </el-form-item>

            <div style="text-align: center;margin-top: 10px">
                <el-button type="success" @click="submitForm('advancedSearchForm')">{{$t("search.search")}}</el-button>
                <el-button @click="resetForm('advancedSearchForm')">{{$t("reset")}}</el-button>
            </div>
        </el-form>
        <h4 style="margin-top: 50px">{{$t("search.result")}}</h4>
        <el-collapse v-if="result.length>0">
            <el-collapse-item  v-for="(item,index) in result" v-bind:key="index" :title="item.compoundName" >
                <p style="text-align: center;font-size: 25px"><b>{{item.compoundName}}</b></p>
                <div>
                    <b>{{$t("compound.chemicalStructure")}}: </b><br>
                    <img :src="item.chemicalStructure" alt="">
                </div>
                <p><b>{{$t("compound.Synonym")}} : </b>{{item.synonym}}</p>
                <p><b>{{$t("compound.casNo")}} : </b>{{item.casNo}}</p>
                <b>{{$t("compound.ri")}} : </b>
                <el-table
                        :data="item.riList"
                        border
                        style="width: 50%">
                    <el-table-column
                            prop="compoundRi"
                            :label="$t('compound.ri')">
                    </el-table-column>
                    <el-table-column
                            prop="chromatographicColumn"
                            :label="$t('compound.chromatographicColumn')">
                    </el-table-column>
                </el-table>
                <p><b>{{$t("compound.odourThreshold")}} : </b>{{item.odourThreshold}}</p>
                <p><b>{{$t("compound.odourThresholdReference")}} : </b>{{item.odourThresholdReference}}</p>
                <p><b>{{$t("compound.odourDescription")}} : </b>{{item.odourDescription}}</p>
                <p><b>{{$t("compound.odourDescriptionReference")}} : </b>{{item.odourDescriptionReference}}</p>
                <p><b>{{$t("compound.wine")}} : </b>{{item.wine}}</p>
                <div>
                    <b>{{$t("compound.massSpectrogram")}}:</b><br>
                    <img :src="item.massSpectrogram" style="position: relative;left: -100px" width="950" alt="">
                </div>
                <div v-if="account!==''">
                    <b>{{$t("compound.massSpectrogramNist")}}:</b><br>
                    <img :src="item.massSpectrogramNist" width="950" alt="" >
                    <br>
                    <span >(source: the NIST11 library)</span>
                </div>
                <br>
                <br>
                <el-table
                        :data="item.mrList"
                        border
                        style="width: 50%">
                    <el-table-column
                            prop="measured"
                            :label="$t('compound.measured')">
                    </el-table-column>
                    <el-table-column
                            prop="relativeAbundance"
                            :label="$t('compound.relativeAbundance')">
                    </el-table-column>
                </el-table>

            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import request from "../../network/request";
    import jwtDecode from "jwt-decode"
    import store from "@/store"

    export default {
        name: "AdvancedSearch",
        data(){
            return {
                advancedSearchForm: {
                    compound_name:'',
                    cas_no:'',
                    compound_ri:'',
                    odour_description:'',
                    measured:''
                },
                result:[],
                account:''
            }
        },
        created() {
            let token=store.state.Authorization;
            const decode=jwtDecode(token);
            this.account=decode.account;
        },
        mounted() {
            let params=this.$route.params;
            if(params!==undefined&&params.result!==undefined){
                this.result=params.result;
            }
        },
        methods: {
            submitForm() {
                let v=this;
                let param=new FormData();
                if(v.advancedSearchForm.compound_name!=='')
                    param.append("compound_name",v.advancedSearchForm.compound_name);
                if(v.advancedSearchForm.cas_no!=='')
                    param.append("cas_no", v.advancedSearchForm.cas_no.replaceAll("-",""));

                if(v.advancedSearchForm.odour_description!=='')
                    param.append("odour_description",v.advancedSearchForm.odour_description);
                if(v.advancedSearchForm.compound_ri!==0&&v.advancedSearchForm.compound_ri!==undefined)
                    param.append("compound_ri",v.advancedSearchForm.compound_ri);
                if(v.advancedSearchForm.measured!==0&&v.advancedSearchForm.measured!==undefined)
                    param.append("measured",v.advancedSearchForm.measured);
                request.post('/compound/advanced',param)
                    .then(res=>{
                        if(res.data.state===0) {
                            v.result = res.data.data;
                            v.total=res.data.data.length;
                        }
                    }).catch(err=>{
                    console.log(err);
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

    .advanced-search-form{
        text-align: left;
        background-color: #ffffff;
        padding-left: 50px;
        padding-bottom: 50px;
    }

    .advanced-search-form form{
        padding-top: 30px;
        padding-right: 30px;
    }

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }


</style>
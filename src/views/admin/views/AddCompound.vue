<template>
    <div class="compound-info-form">
        <div class="itemTitle">
            <p>Add Compound</p>
            <img src="../../../assets/line.png" width="100%" alt="">
        </div>
        <el-form :model="compoundInfoForm" :rules="rules" ref="compoundInfoForm" label-width="200px" >
            <el-form-item label="Compound Name" prop="compoundName" >
                <el-input v-model="compoundInfoForm.compoundName" clearable style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Synonym" prop="synonym" >
                <el-input type="textarea" v-model="compoundInfoForm.synonym" clearable></el-input>
            </el-form-item>
            <el-form-item label="CAS NO." prop="casNo" >
                <el-input v-model="compoundInfoForm.casNo" clearable style="width: 200px"></el-input>
            </el-form-item>
<!--极性-->
            <el-form
                    ref="riForm"
                    :inline="true"
                    :model="compoundInfoForm"
                    label-width="200px">
                <div v-for="(item, index) in compoundInfoForm.riList" :key="index">
                    <el-form-item
                            label="(polar)RI"
                            :prop="'riList.' + index + '.compoundRi'">
                        <el-input-number :controls="false" v-model="item.compoundRi"></el-input-number>
                    </el-form-item>
                    <el-form-item
                            label="Chromatographic Column"
                            :prop="'riList.' + index + '.chromatographicColumn'">
                        <el-input v-model="item.chromatographicColumn"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="RI Resource"
                            :prop="'riList.' + index + '.riResource'">
                        <el-input v-model="item.riResource"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <i class="el-icon-delete" @click="removeRI(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addRI" type="primary" >Add RI</el-button>
                </div>
            </el-form>
<!--非极性-->
            <el-form
                    ref="nriForm"
                    :inline="true"
                    :model="compoundInfoForm"
                    label-width="200px">
                <div v-for="(item, index) in compoundInfoForm.nriList" :key="index">
                    <el-form-item
                            label="(non-polar)RI"
                            :prop="'nriList.' + index + '.compoundNri'">
                        <el-input-number :controls="false" v-model="item.compoundNri"></el-input-number>
                    </el-form-item>
                    <el-form-item
                            label="Chromatographic Column"
                            :prop="'nriList.' + index + '.chromatographicColumn'">
                        <el-input v-model="item.chromatographicColumn"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="NRI Resource"
                            :prop="'nriList.' + index + '.nriResource'">
                        <el-input v-model="item.nriResource"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <i class="el-icon-delete" @click="removeNRI(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addNRI" type="primary" >Add NRI</el-button>
                </div>
            </el-form>

<!--            <el-form-item label="Odour Threshold" prop="odourThreshold" >-->
<!--                <el-input-number v-model="compoundInfoForm.odourThreshold" :controls="false" clearable style="width: 120px"></el-input-number>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="Odour Threshold Reference" prop="odourThresholdReference" >-->
<!--                <el-input v-model="compoundInfoForm.odourThresholdReference" clearable ></el-input>-->
<!--            </el-form-item>-->
            <!--香气阈值-->
            <el-form
                    ref="otForm"
                    :inline="true"
                    :model="compoundInfoForm"
                    label-width="200px">
                <div v-for="(item, index) in compoundInfoForm.otList" :key="index">
                    <el-form-item
                            label="Odour Threshold(μg/kg) "
                            :prop="'otList.' + index + '.odourThreshold'">
                        <el-input-number :controls="false" v-model="item.odourThreshold"></el-input-number>
                    </el-form-item>
                    <el-form-item
                            label="Odour Threshold Reference"
                            :prop="'otList.' + index + '.odourThresholdReference'">
                        <el-input v-model="item.odourThresholdReference"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="Odour Base"
                            :prop="'otList.' + index + '.odourBase'">
                        <el-input v-model="item.odourBase"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <i class="el-icon-delete" @click="removeot(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addot" type="primary" >Add Threshold</el-button>
                </div>
            </el-form>

<!--            <el-form-item label="Odour Description" prop="odourDescription">-->
<!--                <el-input type="textarea" v-model="compoundInfoForm.odourDescription" clearable></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="Odour Description Reference" prop="odourDescriptionReference" >-->
<!--                <el-input v-model="compoundInfoForm.odourDescriptionReference" clearable></el-input>-->
<!--            </el-form-item>-->

<!--            风味描述-->
            <el-form
                    ref="otForm"
                    :inline="true"
                    :model="compoundInfoForm"
                    label-width="200px">
                <div v-for="(item, index) in compoundInfoForm.odList" :key="index">
                    <el-form-item
                            label="Odour Description"
                            :prop="'otList.' + index + '.odourDescription'">
                        <el-input v-model="item.odourDescription"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="Odour Description Reference"
                            :prop="'odList.' + index + '.odourDescriptionReference'">
                        <el-input v-model="item.odourDescriptionReference"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <i class="el-icon-delete" @click="removeod(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addod" type="primary" >Add Description</el-button>
                </div>
            </el-form>

            <el-form-item label="Chemical Structure" >
                <el-upload
                    class="upload-demo"
                    ref="uploadChemicalStructure"
                    accept=".jpeg,.jpg,.png"
                    action=""
                    :limit="1"
                    :auto-upload="false"
                    :on-change="onChangeChemicalStructure">
                <el-button slot="trigger" size="small" type="primary">Select chemical structure</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="Orbitrap-MS mass spectrometry" >
                <el-upload
                    ref="uploadMassSpectrogram"
                    accept=".jpeg,.jpg,.png"
                    action=""
                    :limit="1"
                    :auto-upload="false"
                    :on-change="onChangeMassSpectrogram">
                    <el-button slot="trigger" size="small" type="primary">Select Orbitrap-MS mass spectrometry</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="Low-resolution mass spectrometry" >
                <el-upload
                        ref="uploadMassSpectrogramNist"
                        accept=".jpeg,.jpg,.png"
                        action=""
                        :limit="1"
                        :auto-upload="false"
                        :on-change="onChangeMassSpectrogramNist">
                    <el-button slot="trigger" size="small" type="primary">Select Low-resolution mass spectrometry</el-button>
                </el-upload>
            </el-form-item>

<!--            <el-form-item label="Wine" prop="wine" >-->
<!--                <el-input type="textarea" v-model="compoundInfoForm.wine" clearable></el-input>-->
<!--            </el-form-item>-->
            <!--高分辨率质谱-->
            <el-form
                    ref="mrForm"
                    :inline="true"
                    :model="compoundInfoForm"
                    label-width="200px">
                <el-form-item label="(High-resolution)Measured & Relative Abundance">
                    <el-upload
                            ref="uploadMRExcel"
                            accept=".xlsx"
                            action=""
                            :limit="1"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">Select Excel</el-button>&nbsp
                        <el-button size="small" type="primary" @click="readExcel">Read Excel</el-button>
                    </el-upload>
                </el-form-item>
                <br>
                <div v-for="(item, index) in compoundInfoForm.mrList" :key="index">
                    <el-form-item
                            label="Measured"
                            :prop="'mrList.' + index + '.measured'">
                        <el-input-number :controls="false" v-model="item.measured"></el-input-number>
                    </el-form-item>
                    <el-form-item
                            label="Relative Abundance"
                            :prop="'mrList.' + index + '.relativeAbundance'">
                        <el-input-number :controls="false" v-model="item.relativeAbundance"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <i class="el-icon-delete" @click="removeMR(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addMR" type="primary" >Add measured and relative abundance </el-button>
                </div>
            </el-form>
            <!--低分辨率质谱-->
            <el-form
                    ref="lowmrForm"
                    :inline="true"
                    :model="compoundInfoForm"
                    label-width="200px">
                <el-form-item label="(Low-resolution)Measured & Relative Abundance">
                    <el-upload
                            ref="uploadlowMRExcel"
                            accept=".xlsx"
                            action=""
                            :limit="1"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">Select Excel</el-button>&nbsp
                        <el-button size="small" type="primary" @click="readLowExcel">Read Excel</el-button>
                    </el-upload>
                </el-form-item>
                <br>
                <div v-for="(item, index) in compoundInfoForm.lowmrList" :key="index">
                    <el-form-item
                            label="Measured"
                            :prop="'lowmrList.' + index + '.measured'">
                        <el-input-number :controls="false" v-model="item.measured"></el-input-number>
                    </el-form-item>
                    <el-form-item
                            label="Relative Abundance"
                            :prop="'lowmrList.' + index + '.relativeAbundance'">
                        <el-input-number :controls="false" v-model="item.relativeAbundance"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <i class="el-icon-delete" @click="removelowMR(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addlowMR" type="primary" >Add measured and relative abundance </el-button>
                </div>
                <br>
                <el-form-item label="Uploader" prop="uploader">
                  <el-input :controls="false" v-model="compoundInfoForm.uploader"></el-input>
                </el-form-item>
                <el-form-item label="Reviewer" prop="reviewer">
                  <el-input :controls="false" v-model="compoundInfoForm.reviewer"></el-input>
                </el-form-item>
            </el-form>

            <div style="text-align: right;margin-top: 10px">
                <el-button type="primary" @click="submitForm('compoundInfoForm')">Add</el-button>
                <el-button @click="resetForm('compoundInfoForm')">Reset</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import request from "@/network/request";
    import {convertImgToBase64} from "@/utils/image";

    export default {
        name: "AddCompound",
        data(){
            return{
                compoundInfoForm:{
                    compoundName:'',
                    synonym:'',
                    casNo:'',

                    otList: [{
                        id:'',
                        odourThreshold:0,
                        odourThresholdReference:'',
                        odourBase:'',
                        compoundId:''
                    }],
                    odList: [{
                        id:'',
                        odourDescription:'',
                        odourDescriptionReference:'',
                        compoundId:''
                    }],
                    riList: [{
                        id:'',
                        compoundRi: 0,
                        chromatographicColumn: '',
                        riResource:'',
                        compoundId:''
                    }],
                    nriList: [{
                        id:'',
                        compoundNri: 0,
                        chromatographicColumn: '',
                        nriResource:'',
                        compoundId:''
                    }],
                    mrList: [{
                        id:'',
                        measured: 0,
                        relativeAbundance: 0,
                        compoundId:''
                    }],
                    lowmrList: [{
                        id:'',
                        measured: 0,
                        relativeAbundance: 0,
                        compoundId:''
                    }],
                    chemicalStructure:'',
                    massSpectrogram:'',
                    massSpectrogramNist:'',
                    uploader: '',
                    reviewer: ''
                },
                rules:{
                    compoundName:[
                        {required:true,message:"Compound name can't be blank",trigger:'blur'}
                    ]
                }
            }
        },
        create(){
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const v=this;
                        v.compoundInfoForm.casNo=v.compoundInfoForm.casNo.replace(new RegExp("-","g"),"");
                        request.post('/compound/add',v.compoundInfoForm)
                            .then(res=>{
                                if(res.data.state===0){
                                    v.$alert("Add "+v.compoundInfoForm.compoundName+" to database successfully!", "Message", {
                                        confirmButtonText: 'Confirm'
                                    });
                                }else{
                                    v.$alert("Failed!", "Message", {
                                        confirmButtonText: 'Confirm'
                                    });
                                }
                            }).catch(err=>{
                                console.log(err);
                            v.$alert("Error!", "Message", {
                                confirmButtonText: 'Confirm'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            onChangeChemicalStructure(){
                let chemicalStructure=this.$refs.uploadChemicalStructure.$refs['upload-inner'].$refs.input.files[0];

                convertImgToBase64(chemicalStructure,(base64Str)=>{
                    this.compoundInfoForm.chemicalStructure=base64Str;
                },()=>{
                    console.log("convert error");
                });
                console.log(this.compoundInfoForm.chemicalStructure)
            },
            onChangeMassSpectrogram(){
                let massSpectrogram=this.$refs.uploadMassSpectrogram.$refs['upload-inner'].$refs.input.files[0];
                convertImgToBase64(massSpectrogram,(base64Str)=>{
                    this.compoundInfoForm.massSpectrogram=base64Str;
                },()=>{
                    console.log("convert error");
                });
            },
            onChangeMassSpectrogramNist(){
                let massSpectrogramNist=this.$refs.uploadMassSpectrogramNist.$refs['upload-inner'].$refs.input.files[0];
                convertImgToBase64(massSpectrogramNist,(base64Str)=>{
                    this.compoundInfoForm.massSpectrogramNist=base64Str;
                },()=>{
                    console.log("convert error");
                });
            },
            addot(){
                this.compoundInfoForm.otList.push({
                    id:'',
                    odourThreshold:0,
                    odourThresholdReference:'',
                    odourBase:'',
                    compoundId:''
                });
            },
            removeot(item,index){
                this.compoundInfoForm.otList.splice(index, 1);
            },
            addod(){
                this.compoundInfoForm.odList.push({
                    id:'',
                    odourDescription:'',
                    odourDescriptionReference:'',
                    compoundId:''
                });
            },
            removeod(item,index){
                this.compoundInfoForm.odList.splice(index, 1);
            },
            addRI(){
                this.compoundInfoForm.riList.push({
                    id:'',
                    compoundRi: 0,
                    chromatographicColumn: 0,
                    riResource:'',
                    compoundId:''
                });
            },
            removeRI(item,index){
                this.compoundInfoForm.riList.splice(index, 1);
            },
            addNRI(){
                this.compoundInfoForm.nriList.push({
                    id:'',
                    compoundNri: 0,
                    chromatographicColumn: 0,
                    nriResource:'',
                    compoundId:''
                });
            },
            removeNRI(item,index){
                this.compoundInfoForm.nriList.splice(index, 1);
            },
            addMR(){
                this.compoundInfoForm.mrList.push({
                    id:'',
                    measured: 0,
                    relativeAbundance: 0,
                    compoundId:''
                });
            },
            removeMR(item,index){
                this.compoundInfoForm.lowmrList.splice(index, 1);
            },
            addlowMR(){
                this.compoundInfoForm.lowmrList.push({
                    id:'',
                    measured: 0,
                    relativeAbundance: 0,
                    compoundId:''
                });
            },
            removelowMR(item,index){
                this.compoundInfoForm.lowmrList.splice(index, 1);
            },
            readExcel(){
                const v=this;
                let param=new FormData();
                param.append("mrExcel",v.$refs.uploadMRExcel.$refs['upload-inner'].$refs.input.files[0]);
                request.post('/compound/mr',param)
                    .then(res=>{
                        if(res.data.state===0){
                            console.log(res.data.data);
                            v.compoundInfoForm.mrList=res.data.data;
                        }else{
                            v.$alert("Failed!", "Message", {
                                confirmButtonText: 'Confirm'
                            });
                        }
                    }).catch(err=>{
                    console.log(err);
                });
            },
            readLowExcel(){
                const v=this;
                let param=new FormData();
                param.append("lmrExcel",v.$refs.uploadlowMRExcel.$refs['upload-inner'].$refs.input.files[0]);

                request.post('/compound/lowmr',param)
                    .then(res=>{
                        if(res.data.state===0){
                            console.log(res.data.data);
                            v.compoundInfoForm.lowmrList=res.data.data;
                        }else{
                            v.$alert("Failed!", "Message", {
                                confirmButtonText: 'Confirm'
                            });
                        }
                    }).catch(err=>{
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
    .compound-info-form{
        text-align: left;
    }

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }

    .compound-info-form {
        text-align: left;
        background-color: #ffffff;
        padding-left: 50px;
        padding-bottom: 50px;
        border-color: #e7eaec;
        border-width:3px 0 0;
        border-style:solid solid none;
    }
    .compound-info-form form{
        padding-top: 30px;
        padding-right: 30px;
    }

</style>
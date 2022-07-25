<template>
    <el-dialog
            class="compound-info-form"
            :close-on-click-modal="false"
            :title="'Edit '+compoundInfo.compoundName"
            :visible.sync="dialogVisible"
            @open="onOpen"
            @close="getCompoundData"
            width="90%">
        <el-form :model="compoundInfoForm" :rules="rules" ref="compoundInfoForm" label-width="250px" >
            <el-form-item label="Compound Name" prop="compoundName" >
                <el-input v-model="compoundInfoForm.compoundName" clearable style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Synonym" prop="synonym" >
                <el-input v-model="compoundInfoForm.synonym" clearable style="width: 500px"></el-input>
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
                        <el-input  v-model="item.riResource"></el-input>
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
                        <i class="el-icon-delete" @click="removenRI(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addnRI" type="primary" >Add nRI</el-button>
                </div>
            </el-form>
            <!--            风味描述-->
            <el-form
                    ref="odForm"
                    :inline="true"
                    :model="compoundInfoForm"
                    label-width="200px">
                <div v-for="(item, index) in compoundInfoForm.odList" :key="index">
                    <el-form-item
                            label="Odour Description"
                            :prop="'odList.' + index + '.odourDescription'">
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

            <el-form-item label="Chemical Structure">
                <img :src="$host+oldChemicalStructure" alt="">
                <el-upload
                        class="upload-demo"
                        ref="uploadChemicalStructure"
                        accept=".jpeg,.jpg,.png"
                        action=""
                        :limit="1"
                        :auto-upload="false"
                        :on-change="onChangeChemicalStructure">
                    <el-button slot="trigger" size="small" type="primary">Select new chemical structure</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="Orbitrap-MS mass spectrometry:">
                <br>
                <img :src="$host+oldMassSpectrogram" width="1000" alt="">
                <el-upload
                        class="upload-demo"
                        ref="uploadMassSpectrogram"
                        accept=".jpeg,.jpg,.png"
                        action=""
                        :limit="1"
                        :auto-upload="false"
                        :on-change="onChangeMassSpectrogram">
                    <el-button slot="trigger" size="small" type="primary">Select new Orbitrap-MS mass spectrometry</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="Low-resolution mass spectrometry:">
                <br>
                <img :src="$host+oldMassSpectrogramNist" width="1000" alt="">
                <el-upload
                        class="upload-demo"
                        ref="uploadMassSpectrogramNist"
                        accept=".jpeg,.jpg,.png"
                        action=""
                        :limit="1"
                        :auto-upload="false"
                        :on-change="onChangeMassSpectrogramNist">
                    <el-button slot="trigger" size="small" type="primary">Select new Low-resolution mass spectrometry</el-button>
                </el-upload>
            </el-form-item>

            <!--高分辨率质谱-->
            <el-form
                    ref="mrForm"
                    :inline="true"
                    :model="compoundInfoForm"
                    label-width="200px">
                <el-form-item label="(High-resolution)Measured & Relative Abundance">

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
                        <i class="el-icon-delete" @click="removeMR1(item, index)"></i>
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
            </el-form>
        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="submitForm('compoundInfoForm')">Update</el-button>
                <el-button @click="dialogVisible = false">Cancel</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import request from "@/network/request";
    import {convertImgToBase64} from "@/utils/image";

    export default {
        name: "CompoundInfoEdit",
        data(){
            return{
                compoundInfoForm:{
                    id:'',
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
                        compoundId:''
                    }],
                    nriList: [{
                        id:'',
                        compoundnRi: 0,
                        chromatographicColumn: '',
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
                },
                oldChemicalStructure:'',
                oldMassSpectrogram:'',
                oldMassSpectrogramNist:'',
                rules:{
                    compoundName:[
                        {required:true,message:"Compound name can't be blank",trigger:'blur'}
                    ]
                }
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            getCompoundData:{
                type:Function
            },
            compoundInfo:{
                type:Object,
                default: function () {
                    return{
                    }
                }
            }
        },
        computed: {
            dialogVisible: {
                get () {
                    return this.visible
                },
                set (val) {
                    this.$emit('update:visible', val)
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const v=this;
                        v.compoundInfoForm.casNo=v.compoundInfoForm.casNo.replace(new RegExp("-","g"),"");
                        request.post('/compound/update',v.compoundInfoForm)
                            .then(res=>{
                                if(res.data.state===0){
                                    v.dialogVisible=false;
                                    v.$alert("Update "+v.compoundInfoForm.compoundName+" successfully!", "Message", {
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
            onChangeChemicalStructure(){
                let chemicalStructure=this.$refs.uploadChemicalStructure.$refs['upload-inner'].$refs.input.files[0];
                convertImgToBase64(chemicalStructure,(base64Str)=>{
                    this.compoundInfoForm.chemicalStructure=base64Str;
                },()=>{
                    console.log("convert error");
                });
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
            onOpen(){
                this.compoundInfoForm.id=this.compoundInfo.id;
                this.compoundInfoForm.compoundName=this.compoundInfo.compoundName;
                this.compoundInfoForm.synonym=this.compoundInfo.synonym;
                this.compoundInfoForm.casNo=this.compoundInfo.casNo;
                this.compoundInfoForm.odourThreshold=this.compoundInfo.odourThreshold;
                this.compoundInfoForm.odourThresholdReference=this.compoundInfo.odourThresholdReference;
                this.compoundInfoForm.odourDescription=this.compoundInfo.odourDescription;
                this.compoundInfoForm.odourDescriptionReference=this.compoundInfo.odourDescriptionReference;
                this.compoundInfoForm.riList=this.compoundInfo.riList;
                this.compoundInfoForm.nriList=this.compoundInfo.nriList;
                this.compoundInfoForm.odList=this.compoundInfo.odList;
                this.compoundInfoForm.otList=this.compoundInfo.otList;
                this.compoundInfoForm.mrList=this.compoundInfo.mrList;
                this.compoundInfoForm.lowmrList=this.compoundInfo.lowmrList;
                this.compoundInfoForm.chemicalStructure=this.compoundInfo.chemicalStructure;
                this.compoundInfoForm.massSpectrogram=this.compoundInfo.massSpectrogram;
                this.compoundInfoForm.massSpectrogramNist=this.compoundInfo.massSpectrogramNist;
                this.compoundInfoForm.wine=this.compoundInfo.wine;

                this.oldChemicalStructure=this.compoundInfo.chemicalStructure;
                this.oldMassSpectrogram=this.compoundInfo.massSpectrogram;
                this.oldMassSpectrogramNist=this.compoundInfo.massSpectrogramNist;
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
                    chromatographicColumn: '',
                    compoundId:''
                });
            },
            removeRI(item,index){
                this.compoundInfoForm.riList.splice(index, 1);
            },
            addnRI(){
                this.compoundInfoForm.nriList.push({
                    id:'',
                    compoundnRi: 0,
                    chromatographicColumn: 0,
                    compoundId:''
                });
            },
            removenRI(item,index){
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
            removeMR1(item,index){
                this.compoundInfoForm.mrList.splice(index, 1);
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
        }
    }
</script>

<style scoped>
    .compound-info-form form{
        text-align: left;
        background-color: #ffffff;
        padding: 50px;
        border-color: #e7eaec;
        border-width:3px 0 0;
        border-style:solid solid none;
    }
</style>
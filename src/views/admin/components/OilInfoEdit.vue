<template>
    <el-dialog
            class="compound-info-form"
            :close-on-click-modal="false"
            :title="'Edit '+oilInfo.oilName"
            :visible.sync="dialogVisible"
            @open="onOpen"
            @close="getOilData"
            width="90%">
        <el-form :model="oilInfoForm" :rules="rules" ref="oilInfoForm" label-width="250px" >
            <el-form-item label="Oil Name" prop="oilName" >
                <el-input v-model="oilInfoForm.oilName" clearable style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Oil Type" prop="oilType" >
                <el-input v-model="oilInfoForm.oilType" clearable style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Oil Brand" prop="oilBrand" >
                <el-input v-model="oilInfoForm.oilBrand" clearable style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="Oil Date" prop="oilDate" >
                <input v-model="oilInfoForm.oilDate" type="datetime-local" >
            </el-form-item>
            <!--            关键呈香化合物-->
            <el-form
                    ref="okForm"
                    :inline="true"
                    :model="oilInfoForm"
                    label-width="200px">
                <div v-for="(item, index) in oilInfoForm.okList" :key="index">
                    <el-form-item
                            label="Key Compound Name"
                            :prop="'okList.' + index + '.keycompoundName'">
                        <el-input v-model="item.keycompoundName"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="Key Compound Name CAS"
                            :prop="'okList.' + index + '.casNo'">
                        <el-input v-model="item.casNo"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="Concentration"
                            :prop="'okList.' + index + '.concentration'">
                        <el-input v-model="item.concentration"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="Note"
                            :prop="'okList.' + index + '.okNote'">
                        <el-input v-model="item.okNote"></el-input>
                    </el-form-item>



                    <el-form-item>
                        <i class="el-icon-delete" @click="removeok(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addok" type="primary" >Add Key Compound</el-button>
                </div>
            </el-form>
            <!--食用油风味-->
            <el-form
                    ref="ooForm"
                    :inline="true"
                    :model="oilInfoForm"
                    label-width="200px">
                <div v-for="(item, index) in oilInfoForm.ooList" :key="index">
                    <el-form-item
                            label="Oil Odour"
                            :prop="'ooList.' + index + '.oilOdour'">
                        <el-input v-model="item.oilOdour"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="Oil Odour Intensity"
                            :prop="'ooList.' + index + '.oilOdourIntensity'">
                        <el-input v-model="item.oilOdourIntensity"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="Note"
                            :prop="'ooList.' + index + '.ooNote'">
                        <el-input v-model="item.ooNote"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <i class="el-icon-delete" @click="removeoo(item, index)"></i>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addoo" type="primary" >Add Oil Odour</el-button>
                </div>
            </el-form>


        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="submitForm('oilInfoForm')">Update</el-button>
                <el-button @click="dialogVisible = false">Cancel</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import request from "@/network/request";

    export default {
        name: "OilInfoEdit",
        data(){
            return{
                oilInfoForm:{
                    id:'',
                    oilName:'',
                    oilType:'',
                    oilBrand:'',
                    oilDate:'',
                    okList: [{
                        id:'',
                        concentration:0,
                        keycompoundName:'',
                        casNo:'',
                        okNote:'',
                        oilId:''
                    }],
                    ooList: [{
                        id:'',
                        oilOdour:'',
                        oilOdourIntensity:0,
                        ooNote:'',
                        oilId:''
                    }],

                },
                rules:{
                    oilName:[
                        {required:true,message:"Oil name can't be blank",trigger:'blur'}
                    ]
                }
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            getOilData:{
                type:Function
            },
            oilInfo:{
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
                        // v.oilInfoForm.id=v.oilInfoForm.id.replace(new RegExp("-","g"),"");
                        request.post('/oil/update',v.oilInfoForm)
                            .then(res=>{
                                if(res.data.state===0){
                                    v.dialogVisible=false;
                                    v.$alert("Update "+v.oilInfoForm.oilName+" successfully!", "Message", {
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
            onOpen(){
                this.oilInfoForm.id=this.oilInfo.id;
                this.oilInfoForm.oilName=this.oilInfo.oilName;
                this.oilInfoForm.oilType=this.oilInfo.oilType;
                this.oilInfoForm.oilBrand=this.oilInfo.oilBrand;
                this.oilInfoForm.oilDate=this.oilInfo.oilDate;
                this.oilInfoForm.okList=this.oilInfo.okList;
                this.oilInfoForm.ooList=this.oilInfo.ooList;

            },
            addoo(){
                this.oilInfoForm.ooList.push({
                    id:'',
                    oilOdour:'',
                    oilOdourIntensity:0,
                    oilId:''
                });
            },
            removeoo(item,index){
                this.oilInfoForm.ooList.splice(index, 1);
            },
            addok(){
                this.oilInfoForm.okList.push({
                    id:'',
                    concentration:0,
                    keycompoundName:'',
                    casNo:'',
                    oilId:''
                });
            },
            removeok(item,index){
                this.oilInfoForm.okList.splice(index, 1);
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
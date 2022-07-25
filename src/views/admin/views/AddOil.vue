<template>
    <div class="oil-info-form">
        <div class="itemTitle">
            <p>Add Oil</p>
            <img src="../../../assets/line.png" width="100%" alt="">
        </div>
        <el-form :model="oilInfoForm" :rules="rules" ref="oilInfoForm" label-width="200px" >
            <el-form-item label="Oil Name" prop="oilName" >
                <el-input v-model="oilInfoForm.oilName" clearable style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Oil Type" prop="oilType" >
                <el-input type="textarea" v-model="oilInfoForm.oilType" clearable></el-input>
            </el-form-item>
            <el-form-item label="Oil Brand" prop="oilBrand" >
                <el-input v-model="oilInfoForm.oilBrand" clearable style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="Oil Production Date" prop="oilDate" >
                <input v-model="oilInfoForm.oilDate" type="datetime-local" placeholder="生产日期" >
            </el-form-item>

            <el-form
                    ref="okForm"
                    :inline="true"
                    :model="oilInfoForm"
                    label-width="200px">
                <div v-for="(item, index) in oilInfoForm.okList" :key="index">
                    <el-form-item
                            label="Key Compound"
                            :prop="'okList.' + index + '.keycompoundName'">
                        <el-input v-model="item.keycompoundName"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="Key Compound CAS"
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
            <div style="text-align: right;margin-top: 10px">
                <el-button type="primary" @click="submitForm('oilInfoForm')">Add</el-button>
                <el-button @click="resetForm('oilInfoForm')">Reset</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import request from "@/network/request";

    export default {
        name: "AddCompound",
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
                        oilId:'',
                        okNote:''
                    }],
                    ooList: [{
                        id:'',
                        oilOdour:'',
                        oilOdourIntensity:0,
                        oilId:'',
                        ooNote:''
                    }],

                },
                rules:{
                    oilName:[
                        {required:true,message:"Oil name can't be blank",trigger:'blur'}
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
                        v.oilInfoForm.id=v.oilInfoForm.id.replace(new RegExp("-","g"),"");
                        if(v.oilInfoForm.oilDate===''){
                            v.oilInfoForm.oilDate = null
                        }
                        else
                        console.log(v.oilInfoForm)
                        request.post('/oil/add',v.oilInfoForm)
                            .then(res=>{
                                if(res.data.state===0){
                                    v.$alert("Add "+v.oilInfoForm.oilName+" to database successfully!", "Message", {
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
            addoo(){
                this.oilInfoForm.ooList.push({
                    id:'',
                    oilOdour:'',
                    oilOdourIntensity:0,
                    oilId:'',
                    ooNote:''
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
                    oilId:'',
                    okNote:''
                });
            },
            removeok(item,index){
                this.oilInfoForm.okList.splice(index, 1);
            },

        }
    }
</script>

<style scoped>
    .oil-info-form{
        text-align: left;
    }

    .itemTitle p{
        font-size: 30px;
        color: #529287;
    }

    .oil-info-form {
        text-align: left;
        background-color: #ffffff;
        padding-left: 50px;
        padding-bottom: 50px;
        border-color: #e7eaec;
        border-width:3px 0 0;
        border-style:solid solid none;
    }
    .oil-info-form form{
        padding-top: 30px;
        padding-right: 30px;
    }

</style>
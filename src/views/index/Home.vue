<template>
    <div>
        <h2>{{$t("home.title")}}</h2>
<!--        <el-form :inline="true" :model="searchForm" class="demo-form-inline">-->
<!--            <el-form-item>-->
<!--                <el-select v-model="searchForm.property" >-->
<!--                    <el-option :label="$t('compound.compoundName')" value="compound_name"></el-option>-->
<!--                    <el-option :label="$t('compound.casNo')" value="cas_no"></el-option>-->
<!--                    <el-option :label="$t('compound.odourDescription')" value="odour_description"></el-option>-->
<!--                    <el-option :label="$t('compound.ri')" value="compound_ri"></el-option>-->
<!--                    <el-option :label="$t('compound.measured')" value="measured"></el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--                <el-input-->
<!--                        class="condition-description"-->
<!--                        v-model="searchForm.propertyDescription"-->
<!--                        style="width: 600px"-->
<!--                        clearable>-->
<!--                </el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--                <el-button icon="el-icon-search" circle @click="onSubmit"></el-button>-->
<!--            </el-form-item>-->
<!--        </el-form>-->
        <div class="compound-info-list">
            <div class="itemTitle">
                <p>{{$t("home.summary")}}</p>
                <img src="../../assets/line.png" width="100%" alt="">
            </div>
            <div style="text-align: left;margin-bottom: 20px">
                <span style="line-height: 25px">{{$t("compounds.introduction")[0]}}</span><br>
                <span style="line-height: 25px">{{$t("compounds.introduction")[1]}}</span>
            </div>
        </div>

        <div class="compound-info-list">
            <div class="itemTitle">
                <p>{{$t("home.notice")}}</p>
                <img src="../../assets/line.png" width="100%" alt="">
            </div>
        </div>
        <el-carousel indicator-position="outside" :interval="5000">
            <el-carousel-item >
                <update-news></update-news>
            </el-carousel-item>
            <el-carousel-item >
                <team-news></team-news>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import request from "../../network/request";
    const UpdateNews=()=>import("./components/UpdateNews");
    const TeamNews=()=>import("./components/TeamNews");
    export default {
        name: "Home",
        data() {
            return {
                searchForm: {
                    property:'compound_name',
                    propertyDescription:''
                },
                rules:{
                    property:[
                        {required:true,message:" ",trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                let v=this;
                let param=new FormData();
                param.append("property",v.searchForm.property);
                param.append("propertyDescription",v.searchForm.propertyDescription);
                request.post('/compound/search',param)
                    .then(res=>{
                        if(res.data.state===0) {
                            v.$router.push({
                                name: 'search',
                                params: {
                                    result: res.data.data
                                }
                            });
                        }
                    }).catch(err=>{
                    console.log(err);
                });
            }
        },
        component:[UpdateNews,TeamNews],
        components:{
            "update-news":UpdateNews,
            "team-news":TeamNews
        }
    }
</script>

<style scoped>
    .compound-info-list{
        margin: 0 auto;
        width: 90%;
    }

    .compound-info-list .itemTitle {
        text-align: left;
    }
    .compound-info-list .itemTitle p{
        margin-block-start: 0;
        margin-block-end: 0;
        font-size: 30px;
        color: #529287;
    }
</style>
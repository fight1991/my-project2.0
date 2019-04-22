<template>
  <section class='sys-main'>
    <el-row class = "query-condition">
      <el-button size="mini" type="primary" @click="upload()" style="padding:0px 20px;">导入</el-button>
      <div class="info-content">
        <el-form label-width="100px" :model="submitData" ref="submitData" :rules="rules">
          <el-form-item :label="editOrDetail?'编辑业务单证':'业务单证详情'" class="service-money-form">
            <el-card class="box-card service-card" v-for="(item,index) in submitData.licenseList" :key="index">
              <i class="service-close-icon" @click="delLicense(index)" v-if="editOrDetail"></i>
              <el-form-item label="单证类型" :prop="'licenseList.'+index+'.licenseId'" :rules="rules.licenseSelect">
                <el-select size="mini" v-model="item.licenseId"
                  filterable :disabled=isDetail
                  @change="licenseInfo(item.licenseId,index)" clearable placeholder="请选择">
                  <el-option
                    v-for="(item,k) in licenses"
                    :key="'licenses'+index+k+item.licenseId"
                    :label="item.serviceName"
                    :value="item.licenseId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单证编号">
                <el-input clearable size="mini" maxlength="100" v-model="item.licensePath" :disabled=isDetail></el-input>
              </el-form-item>
              <el-form-item label="上传时间">
                <el-input clearable size="mini" maxlength="100" v-model="item.licensePath" v-if="editOrDetail" disabled></el-input>
                <span v-else></span>
              </el-form-item>
              <el-form-item label="上传人">
                <el-input clearable size="mini" maxlength="100" v-model="item.licensePath" v-if="editOrDetail" disabled></el-input>
                <span v-else></span>
              </el-form-item>
            </el-card>
          </el-form-item>
        </el-form>
        <el-col :span="24" class="role-submit-btn">
          <el-button type="primary" size="small" @click="edit" v-if="editOrDetail">编辑</el-button>
          <el-button type="primary" size="small" @click="submit">确认</el-button>
          <el-button type="primary" size="small" @click="$router.go(-1)" v-if="editOrDetail">取消</el-button>
        </el-col>
      </div>
    </el-row>
  </section>
</template>

<script>
export default {
  data () {
    return {
      rules: {
        licenseSelect: [{ required: true, message: '请选择单证类型', trigger: 'blur' }, { validator: this.serviceChange, message: '请不要输入"~"符号', trigger: 'change' }]
      },
      submitData: {
        licenseList: [
          {
            licensePath: '',
            licenseId: ''
          }
        ]
      },
      editOrDetail: true, // true编辑 false详情
      isDetail: false
    }
  },
  created () {
  },
  methods: {
    // 业务单证信息
    licenseInfo () {},
    // 导入
    upload () {
    },
    // 删除
    delLicense () {

    },
    // 编辑
    edit () {},
    // 确认
    submit () {

    }
  }
}
</script>

<style lang="less" scoped>
  .query-condition {
    background-color: #fff;
    padding: 20px;
  }
  .query-table {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
  }
  .sys-back-btn{
    display: inline-block;
    font-size: 13px;
    color: @font-color-main;
    cursor: pointer;
    .back-btn{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        background: url('../../../../assets/img/icon/back.png') no-repeat center center;
        background-size: 100%;
        vertical-align: middle;
    }
  }
  .sys-fr{
    float: right;
  }
  .sys-table-detail-expand{
    padding:0 15px;
    .detail-infos{
        margin:0 20px;
        border-left: 1px solid #dfe6ec;
        border-right: 1px solid #dfe6ec;
        border-top: 1px solid #dfe6ec;
        .detail-info{
        padding: 5px 0;
        }
        .detail-info-title{
        background-color: #eef1f6;
        }
        .detail-img,.no-pic{
        display: inline-block;
        margin-right: 20px;
        height:100px;
        cursor: pointer;
        }
    }
    .detail-infos:last-child{
        border-bottom: 1px solid #dfe6ec;
    }
}
</style>

<template>
  <section class='sys-main'>
    <el-row class = "query-condition">
      <el-row v-if="editOrDetail">
        <el-button type="primary" icon="fa fa-upload" size="small" style="margin: 10px 0px">&nbsp;导入</el-button>
      </el-row>
        <el-form label-width="100px" :model="submitData" ref="submitData" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in submitData.licenseList" :key="index">
              <el-card class="license-card">
                <i class="license-close-icon" @click="delLicense(index)" v-if="editOrDetail"></i>
                <el-row>
                  <el-col :span="10">
                    <el-upload
                    v-if="editOrDetail"
                    class="avatar-uploader"
                    action="http://127.0.0.1"
                    :before-upload="beforeUpload"
                    list-type="picture"
                    :show-file-list="false">
                    <img v-if="submitData.licenseList" :src="submitData.licenseList" class="detail-img">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <img  class="detail-img" v-if='!editOrDetail' @click="showfile(submitData.licenseList)" :src="submitData.licenseList">
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="单证类型:" :prop="'licenseList.'+index+'.licenseId'" :rules="rules.licenseSelect">
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
                    <el-form-item label="单证编号:" prop="licensePath">
                      <el-input clearable size="mini" :maxlength="30" v-model="item.licensePath" :disabled=isDetail></el-input>
                    </el-form-item>
                    <el-form-item label="上传时间:">
                      <el-input clearable size="mini" v-model="item.licensePath" v-if="editOrDetail" disabled></el-input>
                      <span v-else></span>
                    </el-form-item>
                    <el-form-item label="上传人:">
                      <el-input clearable size="mini" v-model="item.licensePath" v-if="editOrDetail" disabled></el-input>
                      <span v-else></span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            </el-row>
        </el-form>
        <el-col :span="24" class="query-btn">
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="edit" v-if="editOrDetail">编辑</el-button>
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="submit">确认</el-button>
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="$router.go(-1)" v-if="!editOrDetail">取消</el-button>
        </el-col>
    </el-row>
  </section>
</template>

<script>
import util from '../../../../common/util'
export default {
  data () {
    return {
      rules: {
        licenseSelect: [{ required: true, message: '请选择单证类型', trigger: 'change' }],
        licensePath: [{ required: true, message: '请输入单证编号', trigger: 'blur' }]
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
      isDetail: false,
      licenses: []
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

    },
    // 文件上传
    beforeUpload (file) {
      if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp')) {
        this.$message({
          message: '上传文件只支持jpg、png、gif、bmp格式',
          type: 'error'
        })
        this.$emit('closeEditUpload')
      } else if (!(Math.ceil(file.size / 1024) <= 1024)) {
        this.$message({
          message: '上传文件大小不能超过1MB',
          type: 'error'
        })
        this.$emit('closeEditUpload')
      } else {
        let param = new FormData()
        param.append('multiFile', file, file.name)
        this.$store.dispatch('upload', {
          url: 'FILE@/saas-upload/upload/uploadFile',
          data: param,
          router: this.$router,
          success: (res) => {
            this.fileList = []
            this.fileList.push(res.result)
            this.decMarkLobsVo.attachName = this.fileList[0].name
            this.decMarkLobsVo.attachUrl = this.fileList[0].url
            this.configBtn()
          }
        })
      }
      return false
    },
    // 文件点击事件
    showfile (url) {
      if (!util.isEmpty(url)) {
        util.fileView(url)
      }
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
  .query-btn {
    text-align: center;
  }
  .license-close-icon{
      width: 20px;
      height: 20px;
      display: inline-block;
      background: url('../../../../assets/img/icon/close.png') no-repeat;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  .license-card{
    position: relative;
    margin-bottom: 20px;
    padding-right: 10px;
  }
  .detail-img,.no-pic{
    display: inline-block;
    padding-right: 10px;
    margin-bottom: 12px;
    width: 178px;
    height: 178px;
    cursor: pointer;
  }
  .avatar-uploader {
    margin:20px auto;
    text-align: center;
  }
  .avatar-uploader-icon {
    border: 1px solid #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>

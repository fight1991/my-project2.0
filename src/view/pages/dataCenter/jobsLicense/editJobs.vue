<template>
  <section class='sys-main'>
    <el-row class = "query-condition">
      <el-row>
        <el-button type="primary" icon="fa fa-upload" size="small" style="margin: 10px 0px" @click="upload(decPid)">&nbsp;导入</el-button>
      </el-row>
        <el-form label-width="100px" :model="submitData" ref="submitData" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in submitData.licenseList" :key="index">
              <el-card class="license-card">
                <i class="license-close-icon" @click="delLicense(index)"></i>
                <el-row>
                  <el-col :span="10">
                    <el-upload
                      action="http://127.0.0.1"
                      :before-upload="beforeUpload"
                      :file-list="fileLists"
                      :show-file-list="fileType"
                      :on-preview="showfileUrl"
                      :on-remove="handleDelete">
                      <img v-if="isImg  && !fileType" :src="addForm.certificateUrl" class="detail-img">
                      <img v-if="isPdf  && !fileType" src="../../../../assets/img/icon/pdf.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
                      <img v-if="isWord  && !fileType" src="../../../../assets/img/icon/word.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
                      <img v-if="isExcel  && !fileType" src="../../../../assets/img/icon/excel.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
                      <el-row>
                        <el-button size="small" type="primary">重新上传附件</el-button>
                      </el-row>
                    </el-upload>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="单证类型:" :prop="'licenseList.'+index+'.documentType'" :rules="rules.documentType">
                      <el-select placeholder="请选择单证类型" v-model="item.documentType"
                      remote filterable clearable
                      @focus="tipsFillMessage('saasEdocCode','SAAS_EDOC_CODE')"
                      :remote-method="checkParamsList"
                      ref="saasEdocCode" dataRef='saasEdocCode'
                      style="width:100%">
                        <el-option
                          v-for="(item,i) in saasEdocCode"
                          :key="'licenses'+index+i+item.documentType"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="单证编号:" prop="documentNo">
                      <el-input clearable size="mini" :maxlength="30" v-model="item.documentNo" :disabled=isDetail></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            </el-row>
        </el-form>
        <el-col :span="24" class="query-btn">
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="submit">确认</el-button>
          <el-button style="padding:8px 20px 5px 20px;" size="small" @click="$router.go(-1)">取消</el-button>
        </el-col>
    </el-row>
  </section>
</template>

<script>
import util from '../../../../common/util'
import commonParam from '../../../../common/commonParam'
export default {
  data () {
    return {
      rules: {
        documentType: [{ required: true, message: '请选择单证类型', trigger: 'change' }]
      },
      submitData: {
        licenseList: [
          {
            documentNo: '',
            documentType: '',
            documentUrl: ''
          }
        ]
      },
      saasEdocCode: [],
      selectObj: {
        obj: '',
        params: ''
      },
      licenses: [],
      fileLists: [], // 存放文件
      fileType: true,
      isImg: false,
      isPdf: false,
      isWord: false,
      isExcel: false
    }
  },
  created () {
    this.decPid = this.$route.query.decPid
    this.getCommonParams()
    this.querylist()
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('editJobs') === -1) {
        return
      }
      this.submitData.licenseList = []
      this.getCommonParams()
      this.querylist()
    }
  },
  methods: {
    // 列表
    querylist () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/business/queryEditAttachList',
        data: {decPid: this.decPid},
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.submitData.licenseList = util.isEmpty(res.result) ? [] : res.result
        }
      })
    },
    // 删除业务单证
    delLicense (index) {
      this.submitData.licenseList.splice(index, 1)
    },
    // 保存
    submit () {
      this.$refs['submitData'].validate((valId) => {
        if (!valId) {
          return false
        }
        this.$store.dispatch('ajax', {
          url: 'API@/saas-document-center/business/edit',
          data: this.submitData,
          router: this.$router,
          success: (res) => {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.$router.push({name: 'jobDetailList'})
          }
        })
      })
    },
    // 上传图片前的格式及大小判断
    beforeUpload (file) {
      this.fileLists = []
      if (!util.getFileTypeByName(file.name)) {
        this.$message({
          message: '上传文件暂时只支持图片/PDF/word/Excel格式',
          type: 'error'
        })
        this.$emit('closeEditUpload')
      } else if ((file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp') && !(Math.ceil(file.size / 1024) <= 2048)) {
        this.$message({
          message: '上传图片大小不能超过2MB',
          type: 'error'
        })
        this.$emit('closeEditUpload')
      } else if (util.getFileTypeByName(file.name) && !(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp') && !(Math.ceil(file.size / 1024) <= 10240)) {
        this.$message({
          message: '上传文件大小不能超过10MB',
          type: 'error'
        })
      } else {
        let param = new FormData()
        param.append('multiFile', file, file.name)
        this.$store.dispatch('upload', {
          url: 'FILE@/saas-upload/upload/uploadFile',
          data: param,
          isLoad: false,
          router: this.$router,
          success: (res) => {
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp') {
              this.submitData.licenseList[0].documentUrl = res.result.url
              this.fileType = false
              this.isImg = true
              this.isPdf = false
              this.isWord = false
              this.isExcel = false
            } else {
              this.fileLists.push({
                name: res.result.name,
                url: res.result.url
              })
              if (file.type === 'application/pdf') {
                this.fileType = false
                this.isImg = false
                this.isPdf = true
                this.isWord = false
                this.isExcel = false
              } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                this.submitData.licenseList[0].documentUrl = res.result.url
                this.fileType = false
                this.isImg = false
                this.isPdf = false
                this.isWord = true
                this.isExcel = false
              } else if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                this.submitData.licenseList[0].documentUrl = res.result.url
                this.fileType = false
                this.isImg = false
                this.isPdf = false
                this.isWord = false
                this.isExcel = true
              }
            }
          }
        })
      }
      return false
    },
    // 预览
    showfileUrl (file) {
      console.log('预览' + file)
      util.fileView(file.url)
    },
    // 文件点击事件
    showfile (url) {
      if (!util.isEmpty(url)) {
        util.fileView(url)
      }
    },
    // 提示需要填写的内容
    tipsFillMessage (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
      }
    },
    // 获取公共字典list
    getCommonParams () {
      let par = ['SAAS_EDOC_CODE']
      let tableNames = commonParam.isRequire(par)
      if (tableNames.length > 0) {
        this.$store.dispatch('ajax', {
          url: 'API@/saas-dictionary/dictionary/getParam',
          data: {
            'tableNames': tableNames
          },
          router: this.$router,
          success: (res) => {
            commonParam.saveParams(res.result)
            this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_EDOC_CODE')).slice(0, 10)
          }
        })
      } else {
        this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_EDOC_CODE')).slice(0, 10)
      }
    },
    checkParamsList (query) {
      let keyValue = query.toString().trim()
      let list = JSON.parse(window.localStorage.getItem(this.selectObj.params))
      let filterList = []
      if (util.isEmpty(keyValue)) {
        this[this.selectObj.obj] = list.slice(0, 10)
      } else {
        filterList = list.filter(item => {
          let str = item.codeField + '-' + item.nameField
          return str.toLowerCase().indexOf(keyValue.toLowerCase()) > -1
        })
        this[this.selectObj.obj] = filterList.slice(0, 10)
      }
    },
    // 导入
    upload (decPid) {
      this.$router.push({
        path: '/dataCenter/jobsLicense/importLicense',
        query: {
          decPid: decPid
          // ownerName: ownerName,
          // ownerCodeScc: ownerCodeScc,
          // bossId: bossId,
          // seqNo: seqNo
        }
      })
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

<template>
  <section class='sys-main'>
     <!-- 头部 -->
    <el-row class='sys-header'>
      <!-- 返回按钮 -->
      <el-row class='mg-b-15'>
        <el-col :span="18">
          <span @click="$router.go(-1)" class="sys-back-btn"><i class="back-btn"></i>返回</span>
        </el-col>
      </el-row>
      <!-- 返回按钮 end-->
    </el-row>
    <el-row class = "query-table">
      <el-col :span="18" :offset="3">
        <el-form label-width="150px" :model="addForm" ref="addForm" :rules="rule" size="mini" label-position="right">
          <el-form-item label="委托企业" prop="corpName">
            <el-autocomplete
                size='mini' style="width:100%"
                placeholder="输入2个字后搜索"
                :maxlength="20"
                v-model="addForm.corpName"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false">
            </el-autocomplete>
          </el-form-item>
          <el-form-item  label="证书名称" prop="certificateName">
            <el-input size="mini" clearable :maxlength="30" v-model="addForm.certificateName"></el-input>
          </el-form-item>
          <el-form-item  label="证书编号" prop="certificateNo">
            <el-input size="mini" clearable :maxlength="30" v-model="addForm.certificateNo"></el-input>
          </el-form-item>
          <el-form-item label="到期时间" prop="expiryDate">
            <el-date-picker style="width:100%" size="mini" type="datetime" placeholder="选择到期时间" v-model="addForm.expiryDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="ifWarning">
            <el-checkbox label="需要进行到期预警" v-model="addForm.ifWarning" name="type" true-label='1' false-label='0'></el-checkbox>
          </el-form-item>
          <el-form-item label="附件:">
            <el-upload
              action="http://127.0.0.1"
              :before-upload="beforeUpload"
              :file-list="fileLists"
              :show-file-list="fileType"
              :on-preview="showfileUrl"
              :on-remove="handleDelete">
              <img v-if="isImg  && !fileType" :src="addForm.certificateUrl" class="detail-img">
              <img v-if="isPdf  && !fileType" src="../../../../../assets/img/icon/pdf.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
              <img v-if="isWord  && !fileType" src="../../../../../assets/img/icon/word.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
              <img v-if="isExcel  && !fileType" src="../../../../../assets/img/icon/excel.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
              <el-button size="small" type="primary">上传附件</el-button>
              </el-upload>
              <!-- <img class="detail-img" v-if="!fileType" :src="addForm.certificateUrl"> -->
          </el-form-item>
          <el-row class="query-btn">
            <el-button style="padding:8px 20px 5px 20px;" size="small" @click="$router.go(-1)">取消</el-button>
            <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="submit">确认</el-button>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import util from '../../../../../common/util'
export default {
  data () {
    return {
      rule: {
        corpName: [{ required: true, validator: this.checkValid, message: '请输入委托企业', trigger: 'blur' }],
        certificateName: [{ required: true, message: '请输入证书名称', trigger: 'blur' }],
        certificateNo: [{ required: true, message: '请输入证书编号', trigger: 'blur' }],
        expiryDate: [{ required: true, message: '请选择到期时间', trigger: 'change' }]
      },
      addForm: {
        corpName: '',
        certificateName: '',
        certificateNo: '',
        expiryDate: '',
        ifWarning: '1',
        certificateUrl: ''
      },
      corpListOptions: [],
      fileLists: [], // 存放文件
      fileType: true,
      isImg: false,
      isPdf: false,
      isWord: false,
      isExcel: false
    }
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('addCertificate') === -1) {
        return
      }
      this.rest()
    }
  },
  created () {
    this.corpList()
    this.type = this.$route.params.type
    this.certificatePid = this.$route.params.rowId
    if (this.type === 'edit') {
      this.queryEdit()
    } else {
      this.rest()
    }
  },
  mounted () {

  },
  methods: {
    // 重置
    rest () {
      this.addForm = {
        corpName: '',
        certificateName: '',
        certificateNo: '',
        expiryDate: '',
        ifWarning: '1',
        certificateUrl: ''
      }
      this.$nextTick(() => {
        this.$refs['addForm'].clearValidate()
      })
    },
    queryEdit () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/certificate/queryDetail',
        data: {pid: this.certificatePid},
        router: this.$router,
        success: (res) => {
          this.addForm = {
            corpName: res.result.corpName,
            certificateName: res.result.certificateName,
            certificateNo: res.result.certificateNo,
            expiryDate: res.result.expiryDate,
            ifWarning: res.result.ifWarning,
            certificateUrl: res.result.certificateUrl
          }
        }
      })
    },
    // 校验
    checkValid (rule, value, callback) {
      if (util.isEmpty(value)) {
        this.$refs['addForm'].clearValidate()
        callback(new Error(''))
      } else {
        const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
        if (!pattern.test(value)) {
          this.$refs['addForm'].clearValidate()
          callback(new Error(''))
        } else {
          callback()
        }
      }
    },
    // 委托企业
    corpList () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/dccommon/queryCorps',
        data: {},
        router: this.$router,
        success: (res) => {
          if (res.success) {
            let json = JSON.stringify(res.result)
            json = json.replace(/ownerName/g, 'value')
            this.corpListOptions = JSON.parse(json)
          }
        }
      })
    },
    // 输入2个字后搜索
    querySearch (queryString, cb) {
      if (this.addForm.corpName.length < 2) {
        return
      }
      let restaurants = this.corpListOptions
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results.slice(0, 10))
    },
    createFilter (queryString) {
      return (restaurant) => {
        if (util.isEmpty(restaurant.value)) {
          return false
        } else {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        }
      }
    },
    // 更多上传
    addLicense () {
      this.addForm.licenseList.push({
        servicePath: '',
        licenseId: ''
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
              this.addForm.certificateUrl = res.result.url
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
                this.addForm.certificateUrl = res.result.url
                this.fileType = false
                this.isImg = false
                this.isPdf = false
                this.isWord = true
                this.isExcel = false
              } else if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                this.addForm.certificateUrl = res.result.url
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
    // 附件删除
    handleDelete (file, fileList) {
      console.log('删除' + file, fileList)
      // for (let i = 0; i < this.fileLists.length; i++) {
      //   if (file.name === this.fileLists[i].name) {
      //     this.fileLists.splice(i, 1)
      //     this.addForm.certificateUrl = ''
      //   }
      // }
    },
    // 保存
    submit () {
      let url = ''
      if (this.type === 'edit') {
        url = 'API@/saas-document-center/certificate/edit'
      } else {
        url = 'API@/saas-document-center/certificate/save'
      }
      if (this.fileLists.length > 0 && this.fileType) {
        this.addForm.certificateUrl = this.fileLists[0].url
      }
      this.addForm.expiryDate = util.dateFormat(this.addForm.expiryDate, 'yyyy-MM-dd hh:mm:ss')
      this.addForm.corpName = this.addForm.corpName
      this.addForm.certificateName = this.addForm.certificateName
      this.addForm.certificateNo = this.addForm.certificateNo
      this.addForm.ifWarning = this.addForm.ifWarning
      this.saveForm(url)
    },
    // 保存接口请求
    saveForm (url) {
      this.$refs['addForm'].validate((valId) => {
        if (!valId) {
          return false
        }
        this.$store.dispatch('ajax', {
          url: url,
          data: this.addForm,
          router: this.$router,
          success: (res) => {
            let message = ''
            if (this.type === 'edit') {
              message = '修改成功'
            } else {
              message = '保存成功'
            }
            this.$message({
              message: message,
              type: 'success'
            })
            this.$router.go(-1)
          }
        })
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
  .license-add{
    cursor: pointer;
    span{
      margin-left: 5px;
    }
  }
  .license-close-icon{
      width: 20px;
      height: 20px;
      display: inline-block;
      background: url('../../../../../assets/img/icon/close.png') no-repeat;
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
  .avatar-uploader-icon {
    border: 1px solid #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
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
        background: url('../../../../../assets/img/icon/back.png') no-repeat center center;
        background-size: 100%;
        vertical-align: middle;
    }
}
</style>

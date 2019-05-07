<template>
  <section class='sys-main'>
    <el-row class = "query-condition">
      <el-row>
        <el-button type="primary" icon="fa fa-upload" size="small" style="margin: 10px 0px" @click="upload(decPid, ownerCodeScc)">&nbsp;导入</el-button>
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
                    :before-upload="(e)=>{beforeUpload(e,item)}"
                    :file-list="fileLists"
                    :show-file-list="item.fileType"
                    :on-preview="showfileUrl"
                    :on-remove="(e)=>{handleDelete(e,item)}">
                      <img v-if="item.isImg && !item.fileType" :src="item.documentUrl" class="detail-img">
                      <img v-if="item.isPdf && !item.fileType" src="../../../../assets/img/icon/pdf.png" @click="showfile(item.documentUrl)" class="detail-img">
                      <img v-if="item.isWord && !item.fileType" src="../../../../assets/img/icon/word.png" @click="showfile(item.documentUrl)" class="detail-img">
                      <img v-if="item.isExcel && !item.fileType" src="../../../../assets/img/icon/excel.png" @click="showfile(item.documentUrl)" class="detail-img">
                      <el-button size="small" type="primary" v-else>上传附件</el-button>
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
                          :key="'licenseList'+index+i+item.documentType"
                          :label="item.codeField + '-' + item.nameField"
                          :value="item.codeField">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="单证编号:" :prop="'licenseList.'+index+'.documentNo'" :rules="rules.documentNo">
                      <el-input clearable size="mini" :maxlength="30" v-model="item.documentNo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            </el-row>
        </el-form>
        <el-col :span="24" class="query-btn">
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="submit">确认</el-button>
          <el-button style="padding:8px 20px 5px 20px;" size="small" @click="toDetail(ownerCodeScc)">取消</el-button>
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
        documentNo: [{ required: true, message: '请输入单证编号', trigger: 'blur' }]
      },
      fileLists: [],
      decPid: '',
      ownerCodeScc: '',
      submitData: {
        licenseList: [{
          documentNo: '',
          documentType: '',
          documentTypeValue: '',
          documentUrl: '',
          fileLists: [], // 存放文件
          fileType: true,
          isImg: false,
          isPdf: false,
          isWord: false,
          isExcel: false
        }]
      },
      saasEdocCode: [],
      selectObj: {
        obj: '',
        params: ''
      }
    }
  },
  created () {
    this.decPid = this.$route.query.decPid
    this.ownerCodeScc = this.$route.query.ownerCodeScc
    this.submitData.licenseList = [{
      documentNo: '',
      documentType: '',
      documentTypeValue: '',
      documentUrl: '',
      fileLists: [],
      fileType: true,
      isImg: false,
      isPdf: false,
      isWord: false,
      isExcel: false
    }]
    this.getCommonParams()
    this.querylist()
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('editJobs') === -1) {
        return
      }
      this.decPid = this.$route.query.decPid
      this.ownerCodeScc = this.$route.query.ownerCodeScc
      this.submitData.licenseList = [{
        documentNo: '',
        documentType: '',
        documentTypeValue: '',
        documentUrl: '',
        fileLists: [],
        fileType: true,
        isImg: false,
        isPdf: false,
        isWord: false,
        isExcel: false
      }]
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
        success: (res) => {
          this.submitData.licenseList = util.isEmpty(res.result) ? [] : res.result
          this.submitData.licenseList.forEach(item => {
            this.tipsFillMessage('saasEdocCode', 'SAAS_EDOC_CODE')
            this.checkParamsList(item.documentType)
            let url = item.documentUrl
            if (!util.isEmpty(url)) {
              let suffix = util.getFileTypeByName(url)
              if (suffix === 'image/jpeg' || suffix === 'image/png' || suffix === 'image/gif' || suffix === 'image/bmp') {
                item.fileType = false
                item.isImg = true
                item.isPdf = false
                item.isWord = false
                item.isExcel = false
              } else {
                if (suffix === 'application/pdf') {
                  item.fileType = false
                  item.isImg = false
                  item.isPdf = true
                  item.isWord = false
                  item.isExcel = false
                } else if (suffix === 'application/msword' || suffix === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                  item.fileType = false
                  item.isImg = false
                  item.isPdf = false
                  item.isWord = true
                  item.isExcel = false
                } else if (suffix === 'application/vnd.ms-excel' || suffix === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                  item.fileType = false
                  item.isImg = false
                  item.isPdf = false
                  item.isWord = false
                  item.isExcel = true
                }
              }
              item.fileLists = [{url: item.documentUrl}]
            }
          })
          this.submitData.licenseList.push({})
          this.submitData.licenseList.pop()
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
        let list = []
        list = this.submitData.licenseList
        for (let i = 0; i < list.length; i++) {
          for (let j = list.length - 1; j > i; j--) {
            if (list[i].documentNo === list[j].documentNo && list[i].documentType === list[j].documentType) {
              this.$message({
                message: '此单证类型和单证编号已存在',
                type: 'error'
              })
              return
            }
          }
        }
        let data = {
          ownerCodeScc: this.ownerCodeScc,
          decPid: this.decPid,
          attachs: this.submitData.licenseList
        }
        this.$store.dispatch('ajax', {
          url: 'API@/saas-document-center/business/edit',
          data: data,
          router: this.$router,
          success: (res) => {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.$router.push({
              path: '/dataCenter/jobsLicense/jobDetailList',
              query: {
                ownerCodeScc: this.ownerCodeScc
              }
            })
          }
        })
      })
    },
    // 上传图片前的格式及大小判断
    beforeUpload (file, row) {
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
            row.documentUrl = res.result.url
            row.fileLists = []
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp') {
              row.fileType = false
              row.isImg = true
              row.isPdf = false
              row.isWord = false
              row.isExcel = false
            } else {
              row.fileLists.push({
                name: res.result.name,
                url: res.result.url
              })
              if (file.type === 'application/pdf') {
                row.fileType = false
                row.isImg = false
                row.isPdf = true
                row.isWord = false
                row.isExcel = false
              } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                row.fileType = false
                row.isImg = false
                row.isPdf = false
                row.isWord = true
                row.isExcel = false
              } else if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                row.fileType = false
                row.isImg = false
                row.isPdf = false
                row.isWord = false
                row.isExcel = true
              }
            }
          }
        })
      }
      return false
    },
    // 附件删除
    handleDelete (file, fileList, row) {
      for (let i = 0; i < this.row.fileLists.length; i++) {
        if (file.name === this.row.fileLists[i].name) {
          this.row.fileLists.splice(i, 1)
          this.row.documentUrl = ''
        }
      }
    },
    // // 预览
    showfileUrl (file) {
      // util.fileView(file.url)
    },
    // 文件点击事件
    showfile (url) {
      // if (!util.isEmpty(url)) {
      //   util.fileView(url)
      // }
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
    upload (decPid, ownerCodeScc) {
      this.$router.push({
        path: '/dataCenter/jobsLicense/importLicense',
        query: {
          decPid: decPid,
          ownerCodeScc: ownerCodeScc
        }
      })
    },
    // 跳转到详情页面
    toDetail (ownerCodeScc) {
      this.$router.push({
        path: '/dataCenter/jobsLicense/jobDetailList',
        query: {
          ownerCodeScc: ownerCodeScc
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

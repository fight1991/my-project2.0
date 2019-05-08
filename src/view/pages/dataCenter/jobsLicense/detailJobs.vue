<template>
  <section class='sys-main'>
    <el-row class = "query-condition">
        <el-form label-width="100px" :model="submitData" ref="submitData">
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in submitData.licenseList" :key="index">
              <el-card class="license-card">
                <el-row>
                  <el-col :span="10">
                    <el-upload
                    action="http://127.0.0.1"
                    :before-upload="(e)=>{beforeUpload(e,item)}"
                    :file-list="fileLists"
                    :show-file-list="item.fileType"
                    :on-preview="showfileUrl">
                    <img v-if="item.isImg  && !item.fileType" :src="item.documentUrl" @click="showfile(item.documentUrl)" class="detail-img">
                    <img v-if="item.isPdf  && !item.fileType" src="../../../../assets/img/icon/pdf.png" @click="showfile(item.documentUrl)" class="detail-img">
                    <img v-if="item.isWord  && !item.fileType" src="../../../../assets/img/icon/word.png" @click="showfile(item.documentUrl)" class="detail-img">
                    <img v-if="item.isExcel  && !item.fileType" src="../../../../assets/img/icon/excel.png" @click="showfile(item.documentUrl)" class="detail-img">
                    </el-upload>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="单证类型:">
                      {{ item.documentTypeValue }}
                    </el-form-item>
                    <el-form-item label="单证编号:" prop="licensePath">
                      {{ item.documentNo }}
                    </el-form-item>
                    <el-form-item label="上传时间:">
                      {{ item.updateTime|date() }}
                    </el-form-item>
                    <el-form-item label="上传人:">
                      {{ item.updateUserName }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            </el-row>
        </el-form>
        <el-col :span="24" class="query-btn">
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="toEdit(decPid,ownerCodeScc)">编辑</el-button>
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="toDetail(ownerCodeScc)">确认</el-button>
        </el-col>
    </el-row>
  </section>
</template>

<script>
import util from '../../../../common/util'
export default {
  data () {
    return {
      decPid: '',
      ownerCodeScc: '',
      fileLists: [], // 存放文件
      submitData: {
        licenseList: [
          {
            documentUrl: '',
            documentTypeValue: '',
            documentNo: '',
            updateTime: '',
            updateUserName: '',
            fileLists: [], // 存放文件
            fileType: true,
            isImg: false,
            isPdf: false,
            isWord: false,
            isExcel: false
          }
        ]
      }
    }
  },
  created () {
    this.decPid = this.$route.query.decPid
    this.ownerCodeScc = this.$route.query.ownerCodeScc
    this.submitData.licenseList = []
  },
  mounted () {
    this.$nextTick(() => {
      this.querylist()
    })
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('detailJobs') === -1) {
        return
      }
      this.decPid = this.$route.query.decPid
      this.ownerCodeScc = this.$route.query.ownerCodeScc
      this.submitData.licenseList = []
      this.querylist()
    }
  },
  methods: {
    // 列表
    querylist () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/business/queryAttachList',
        data: {decPid: this.decPid},
        router: this.$router,
        isPageList: true,
        success: (res) => {
          let licenseList = util.isEmpty(res.result) ? [] : res.result
          licenseList.forEach(item => {
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
            }
          })
          this.submitData.licenseList = licenseList
        }
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
    // 预览
    showfileUrl (file) {
      util.fileView(file.url)
    },
    // 文件点击事件
    showfile (url) {
      if (!util.isEmpty(url)) {
        util.fileView(url)
      }
    },
    // 跳转到编辑页面
    toEdit (decPid, ownerCodeScc) {
      this.$store.commit('CloseTab', this.$route.name)
      this.$router.push({
        path: '/dataCenter/jobsLicense/editJobs',
        query: {
          decPid: decPid,
          ownerCodeScc: ownerCodeScc
        }
      })
    },
    // 跳转到详情页面
    toDetail (ownerCodeScc) {
      this.$store.commit('CloseTab', this.$route.name)
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

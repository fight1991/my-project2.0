<template>
  <section class='sys-main'>
     <!-- 头部 -->
    <el-row class = "query-condition">
      <el-row>
        <el-col :span="8" :xs='24'>
          委托企业:{{resultTopData.id}}
        </el-col>
        <el-col :span="8" :xs='24'>
          报关单系统编号:{{resultTopData.id + ''}}
        </el-col>
        <el-col :span="8" :xs='24'>
          接单编号:{{resultTopData.id + ''}}
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="8" :xs='24'>
          统一编号:{{resultTopData.id}}
        </el-col>
        <el-col :span="8" :xs='24'>
          报关单号:{{resultTopData.id + ''}}
        </el-col>
      </el-row>
    </el-row>
      <!-- 头部 end-->
      <!-- 主显示框 -->
    <div class='query-table'>
      <el-form label-width="100px" :model="submitData" ref="submitData" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="12" :xs='24' v-for="(item,index) in submitData.licenseList" :key="index">
              <el-card class="license-card">
                <i class="license-close-icon" v-if="index !== 0" @click="delLicense(index)"></i>
                <el-row>
                  <el-col :span="12" :xs='24'>
                    <el-form-item label="单证类型:" :prop="'licenseList.'+index+'.licenseId'" :rules="rules.licenseSelect">
                      <el-select size="mini" v-model="item.licenseId"
                        filterable
                        @change="licenseInfo(item.licenseId,index)" clearable placeholder="请选择">
                        <el-option
                          v-for="(item,k) in licenses"
                          :key="'licenses'+index+k+item.licenseId"
                          :label="item.serviceName"
                          :value="item.licenseId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" :xs='24'>
                    <el-form-item label="单证编号:" prop="licensePath">
                      <el-input clearable size="mini" :maxlength="30" v-model="item.licensePath"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="单证文件:">
                    <el-upload
                      action="http://127.0.0.1"
                      :before-upload="beforeUpload"
                      :file-list="fileLists"
                      :show-file-list="fileType"
                      :on-preview="showfileUrl"
                      :on-remove="handleDelete">
                      <img v-if="submitData.licenseList  && !fileType" :src="submitData.licenseList" class="detail-img">
                      <el-button size="small" type="primary">上传附件</el-button>
                      </el-upload>
                      <img class="detail-img" v-if="!fileType" :src="submitData.licenseList">
                      <!-- <span v-if="isPdf" style="cursor:pointer;text-decoration:underline;" @click="showfile(resultDetail.businessLicenseUrl)">企业营业执照.pdf</span> -->
                  </el-form-item>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <span class="license-add" @click="addLicense"><img class="pointer" src="../../../../assets/img/icon/btn-add.png"/><span>上传更多业务单证</span></span>
          </el-row>
          <el-row class="query-btn">
            <el-button style="padding:8px 20px 5px 20px;" size="small" @click="$router.go(-1)">取消</el-button>
            <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="submit">确认</el-button>
          </el-row>
        </el-form>
    </div>
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
      resultTopData: {
        decPid: '',
        ownerName: '',
        ownerCodeScc: '',
        bossId: '',
        seqNo: ''
      },
      submitData: {
        licenseList: [
          {
            licensePath: '',
            licenseId: ''
          }
        ]
      },
      fileLists: [], // 存放文件
      fileType: true,
      licenses: []
    }
  },
  created () {
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('importLicense') === -1) {
        return
      }
      this.resultTopData = this.$route.query
      this.submitData.licenseList = []
    }
  },
  methods: {
    // 更多上传
    addLicense () {
      this.submitData.licenseList.push({
        servicePath: '',
        licenseId: ''
      })
    },
    // 保存
    submit () {},
    // 上传图片前的格式及大小判断
    beforeUpload (file, info) {
      if (!(file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || (info === '0' && file.type === 'application/pdf'))) {
        if (info === '0') {
          this.$message({
            message: '上传文件暂时只支持jpg/png/gif/pdf格式',
            type: 'error'
          })
        } else {
          this.$message({
            message: '上传图片暂时只支持jpg/png/gif格式',
            type: 'error'
          })
        }
        this.$emit('closeEditUpload')
      } else if (file.type !== 'application/pdf' && !(Math.ceil(file.size / 1024) <= 2048)) {
        this.$message({
          message: '上传图片大小不能超过2MB',
          type: 'error'
        })
        this.$emit('closeEditUpload')
      } else if (file.type === 'application/pdf' && !(Math.ceil(file.size / 1024) <= 10240)) {
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
            if (info === '0') {
              if (file.type === 'application/pdf') {
                this.fileLists.push({
                  name: res.result.name,
                  url: res.result.url
                })
                this.fileType = true
              } else {
                this.resultDetail.businessLicenseUrl = res.result.url
                this.fileType = false
              }
            } else if (info === '1') {
              this.resultDetail.adminConfirmation = res.result.url
            } else if (info === '2') {
              this.resultDetail.idCardFront = res.result.url
            } else {
              this.resultDetail.idCardBak = res.result.url
            }
          }
        })
      }
      return false
    },
    // pdf 预览
    showfileUrl (file) {
      util.fileView(file.url)
    },
    // 附件删除
    handleDelete (file, fileList) {
      for (let i = 0; i < this.fileLists.length; i++) {
        if (file.name === this.fileLists[i].name) {
          this.fileLists.splice(i, 1)
          this.resultDetail.businessLicenseUrl = ''
        }
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

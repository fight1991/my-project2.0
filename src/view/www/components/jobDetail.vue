<template>
  <div class="detail-css">
    <div class="mainer">
      <el-row class="detail-header">
        <el-col :span="20">
          <div class="header-info">
            <h2 class="detail-title">{{jobDetail.jobName}}</h2>
            <p class="detail-company">{{formatType(jobDetail.company)}}</p>
            <div class="content-list">
              <div class="content-area" v-if="jobDetail.area">
                <img src="../../../assets/www-img/images/address.png" class="area-img" alt="">
                <span>{{jobDetail.area}}</span>
              </div>
              <div class="content-info">
                <span class="mr26" v-if="jobDetail.sex">
                  <img src="../../../assets/www-img/images/Gender.png" class="area-img" alt="">
                  <span>{{formatType(jobDetail.sex)}}</span>
                </span>
                <span class="mr26" v-if="jobDetail.education">
                  <img src="../../../assets/www-img/images/Education.png" class="area-img" alt="">
                  <span>{{jobDetail.education}}</span>
                </span>
                <span class="mr26" v-if="jobDetail.workYears">
                  <img src="../../../assets/www-img/images/Years.png" class="area-img" alt="">
                  <span>{{jobDetail.workYears}}</span>
                </span>
                <span class="mr26" v-if="jobDetail.workNature">
                  <img src="../../../assets/www-img/images/position.png" class="area-img" alt="">
                  <span>{{formatType(jobDetail.workNature)}}</span>
                </span>
                <span class="mr26" v-if="jobDetail.salary">
                  <img src="../../../assets/www-img/images/salary.png" class="area-img" alt="">
                  <span>{{jobDetail.salary}}</span>
                </span>
                <span class="mr26" v-if="jobDetail.count">
                  <img src="../../../assets/www-img/images/Number.png" class="area-img" alt="">
                  <span>{{jobDetail.count}}人</span>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <button class="resumeBtn"  @click.prevent="openDialog">简历投递</button>
        </el-col>
      </el-row>
      <div class="detail-content">
        <div>
          <p>岗位职责：</p>
          <div v-html="jobDetail.duty">{{jobDetail.duty}}</div>
        </div>
        <div class="mt26">
          <p>任职要求：</p>
          <div v-html="jobDetail.requirement">{{jobDetail.requirement}}</div>
        </div>
        <div class="mt26">
          <p>上班地址：</p>
          <div>{{jobDetail.workAdd}}</div>
        </div>
        <div class="mt26">
          <p>联系方式：</p>
          <div v-html="jobDetail.contact">{{jobDetail.contact}}</div>
        </div>
      </div>
    </div>
    <el-dialog title="投递简历" :visible.sync="visableflag" v-if="visableflag" width="30%" :close-on-click-modal='false' class="dialog">
      <el-row class="mg-b-15">
        <el-form ref="dialogForm" label-width="65px" :model="dialogForm" :rules="rule">
          <el-col :span="18" :offset="3">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="dialogForm.userName" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="dialogForm.mobile" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="dialogForm.code" ref="mobileCode" :maxlength="4"></el-input>
              <el-button class="sendCode" @click="sendCode" :disabled="timerId>0? true:false">获取验证码</el-button>
            </el-form-item>
            <el-form-item label="简历" prop="url">
              <el-upload
                action="http://127.0.0.1"
                :before-upload="UploadFun"
                :on-remove="handleRemove"
                :file-list="fileList"
                :limit="1">
                <el-button size="mini" type="primary">上传</el-button>
                <div slot="tip" class="el-upload__tip">文件大小不超过10M</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="sendResume">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from '../../../common/util'
export default {
  data () {
    return {
      rules: {
        'userName': [{required: true, message: '请输入姓名', trigger: 'blur'}],
        'mobile': [{required: true, message: '请输入手机号', trigger: 'change'}],
        'code': [{required: true, message: '请输入验证码', trigger: 'blur'}],
        'url': [{required: true, message: '请上传附件', trigger: 'change'}]
      },
      jobId: '',
      jobDetail: {
        jobName: '',
        company: '',
        area: '',
        sex: '',
        education: '',
        workYears: '',
        workNature: '',
        salary: '',
        count: '',
        duty: '',
        requirement: '',
        workAdd: '',
        contact: ''
      },
      visableflag: false,
      dialogForm: {
        name: '',
        mobile: '',
        code: '',
        corpName: '',
        email: ''
      },
      fileList: [],
      format: [
        {
          value: ' ',
          label: '不限'
        }, {
          value: 'M',
          label: '男'
        }, {
          value: 'F',
          label: '女'
        }, {
          value: 'full',
          label: '全职'
        }, {
          value: 'part',
          label: '兼职'
        }, {
          value: 'longnows',
          label: '朗新一诺(苏州)信息科技有限公司'
        }, {
          value: 'longshine',
          label: '朗新金关信息科技有限公司'
        }
      ] // 格式化
    }
  },
  created () {
    if (this.$route.query) {
      this.jobId = this.$route.query.jobId
      this.getJobDetail()
    }
  },
  watch: {

  },
  methods: {
    // 职位详情
    getJobDetail () {
      let data = {
        company: 'longshine',
        source: ['ccba'],
        jobId: this.jobId,
        page: {
          pageSize: 200,
          pageIndex: 1
        }
      }
      this.$store.dispatch('ajax', {
        url: 'API@/plat-manager/jobManage/getJobDetail',
        data: data,
        router: this.$router,
        success: (res) => {
          if (!util.isEmpty(res.result)) {
            let jobDetail = res.result
            jobDetail.duty = res.result.duty
            jobDetail.requirement = res.result.requirement
            jobDetail.contact = res.result.contact
            jobDetail.area = res.result.area
            if (jobDetail.duty.indexOf('$') !== -1) {
              jobDetail.duty = this.brContent(jobDetail.duty)
            }
            if (jobDetail.requirement.indexOf('$') !== -1) {
              jobDetail.requirement = this.brContent(jobDetail.requirement)
            }
            if (jobDetail.contact.indexOf('$') !== -1) {
              jobDetail.contact = this.brContent(jobDetail.contact)
            }
            if (jobDetail.area.indexOf('+') !== -1) {
              jobDetail.area = jobDetail.area.replace(/\+/g, '、')
            }
            this.jobDetail = jobDetail
          }
        }
      })
    },
    // 简历投递
    sendResume () {},
    // 投递弹窗
    openDialog () {
      this.visableflag = true
    },
    // 换行
    brContent (val) {
      let brContent = ''
      if (val.indexOf('$') !== -1) {
        brContent = val.replace(/\$/g, '<br>')
      } else {
        brContent = val
      }
      return brContent
    },
    // 上传
    UploadFun (file) {
      this.fileList = []
      if (!(Math.ceil(file.size / 1024) <= 10240)) {
        this.$message({
          message: '上传文件大小不能超过10MB',
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
          isLoad: false,
          success: (res) => {
            this.fileList.push({
              name: res.result.name,
              url: res.result.url
            })
          }
        })
      }
      return false
    },
    // 格式化
    formatType (val) {
      for (let i in this.format) {
        if (this.format[i].value === val) {
          return this.format[i].label
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-css {
  padding-top: 60px;
  padding-bottom: 60px;
  .detail-header {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
    .header-info {
      .detail-title{
        color: #333;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .detail-company {
        color: #666;
        font-size: 14px;
        margin-bottom: 20px;
      }
      .content-list {
         color: #666;
         font-size: 14px;
       .area-img {
         width: 20px;
         height: 20px;
         margin-right: 8px;
         display: inline-block;
       }
       .content-area {
         line-height: 24px;
       }
       .content-info {
         padding-top: 10px;
       }
     }
    }
    .resumeBtn {
      width: 150px;
      height: 46px;
      font-size: 16px;
      background-color: #0A5CA0;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .detail-content {
    padding-top: 18px;
    color: #333;
    font-size: 14px;
    line-height: 24px;
  }
  .mr26 {
    margin-right: 26px;
  }
  .mt26 {
    margin-top: 20px;
  }
  .dialog {
    .sendCode {
      position: absolute;
      right: 28px;
      top: 8px;
      border: none;
      border-left: 1px solid #ccc;
      border-radius: 0;
      box-sizing: border-box;
      padding: 5px 5px 5px 10px;
      width:90px;
    }

  }
}
</style>

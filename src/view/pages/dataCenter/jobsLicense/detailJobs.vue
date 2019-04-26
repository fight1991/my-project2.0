<template>
  <section class='sys-main'>
    <el-row class = "query-condition">
        <el-form label-width="100px" :model="submitData" ref="submitData">
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item,index) in submitData.licenseList" :key="index">
              <el-card class="license-card">
                <el-row>
                  <el-col :span="10">
                    <img v-if="isImg" :src="item.documentUrl" class="detail-img">
                    <img v-if="isPdf" src="../../../../assets/img/icon/pdf.png" @click="showfile(item.documentUrl)" class="detail-img">
                    <img v-if="isWord" src="../../../../assets/img/icon/word.png" @click="showfile(item.documentUrl)" class="detail-img">
                    <img v-if="isExcel" src="../../../../assets/img/icon/excel.png" @click="showfile(item.documentUrl)" class="detail-img">
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="单证类型:">
                      {{ item.documentType }}
                    </el-form-item>
                    <el-form-item label="单证编号:" prop="licensePath">
                      {{ item.documentNo }}
                    </el-form-item>
                    <el-form-item label="上传时间:">
                      {{ item.updateTime }}
                    </el-form-item>
                    <el-form-item label="上传人:">
                      {{ item.updateUser }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            </el-row>
        </el-form>
        <el-col :span="24" class="query-btn">
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="toEdit(decPid)">编辑</el-button>
          <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="$router.go(-1)">确认</el-button>
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
      submitData: {
        licenseList: [
          {
            documentUrl: '',
            documentType: '',
            documentNo: '',
            updateTime: '',
            updateUser: ''
          }
        ]
      },
      isImg: false,
      isPdf: false,
      isWord: false,
      isExcel: false
    }
  },
  created () {
    this.decPid = this.$route.query.decPid
    this.querylist()
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
          this.submitData.licenseList = util.isEmpty(res.result) ? [] : res.result
        }
      })
    },
    // 文件点击事件
    showfile (url) {
      if (!util.isEmpty(url)) {
        util.fileView(url)
      }
    },
    // 跳转到编辑页面
    toEdit (decPid) {
      this.$router.push({
        name: 'editJobs',
        query: {
          decPid: decPid
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

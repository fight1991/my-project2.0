<template>
  <section class='sys-main'>
    <el-row class = "query-condition">
        <el-form label-width="150px" :model="addForm" size="mini" label-position="right">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="委托企业" :class="{ 'require-color': controller.requireColor &&  !isDetail }"  prop="licenseList" >
                <!-- <el-autocomplete class='sys-certified'
                    size='mini' :readonly="isDetail"
                    placeholder="输入2个字后搜索"
                    :class='ctrlState.styleValue'
                    v-model="dataCompanyForm.companyName"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="false"
                    @select="handleSelect">
                  <template slot="append" v-if="ctrlState.stateValue != ''">
                    <i></i>
                    <span v-text="ctrlState.stateValue"></span>
                  </template>
                </el-autocomplete> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="许可证类型" :class="{ 'require-color': controller.requireColor &&  !isDetail }"  prop="licensePath" ref="licTypeCode">
                <el-select size="mini" filterable v-model="addForm.licTypeCode" class="select-Color" v-if="!isDetail" style="width:100%">
                  <el-option
                    v-for="item in LicTypeList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                  <span v-if="isDetail" v-text="resultDetail.corpTypeName"></span>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :xs='24'>
              <el-form-item label="许可证编号:" :class="{ 'require-color': controller.requireColor &&  !isDetail }"  prop="licensePath">
                <el-input clearable size="mini" :maxlength="30" v-model="addForm.licTypeCode" :readonly="isDetail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs='24'>
              <el-form-item label="有效截止日期" :class="{ 'require-color': controller.requireColor &&  !isDetail }"  prop="licensePath">
                <el-date-picker size="mini" type="datetime" style="width:100%" v-model="addForm.licTypeCode" :disabled="isDetail"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :xs='24'>
              <el-form-item label="上传时间" prop="licensePath">
                <el-input clearable size="mini" v-model="addForm.licTypeCode" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs='24'>
              <el-form-item label="可用次数" :class="{ 'require-color': controller.requireColor &&  !isDetail }" prop="licensePath" >
                <el-select style="width:100%"
                  v-model="addForm.licTypeCode"
                  :disabled="isDetail"
                  filterable remote clearable
                  placeholder="请选择许可证可用次数">
                  <el-option label="一批一证" value="0"></el-option>
                  <el-option label="非一批一证" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="涉证商品" prop="licensePath" >
                <el-table class='sys-table-table'
                  border highlight-current-row size="mini"
                  :data="goodsList">
                  <el-table-column label="商品名称" min-width="100" prop="gName"></el-table-column>
                  <el-table-column label="商品编号" min-width="100" prop="gNo">
                    <template slot-scope="scope">
                      {{scope.row.gNo}}
                    </template>
                  </el-table-column>
                  <el-table-column label="申报数量" min-width="100">
                    <template slot-scope="scope">
                      <el-input clearable size="mini" v-model="declaredQuantity" :readonly="isDetail">{{scope.row.ID+''}}</el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="剩余可用数量" min-width="100" prop="availableQuantity">
                    <template slot-scope="scope">
                      {{scope.row.availableQuantity+''}}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button type="text" @click="deleteGoods(scope.row.roleId)" title="删除"><i class="fa fa-times-circle f-18"></i></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <span class="license-add" @click="addLicense"><img class="pointer" src="../../../../../assets/img/icon/btn-add.png"/><span>增加涉证商品</span></span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="许可证文件:">
              <el-upload
                action="http://127.0.0.1"
                :before-upload="beforeUpload"
                :file-list="fileLists"
                :show-file-list="fileType"
                :on-preview="showfileUrl"
                :on-remove="handleDelete">
                <img v-if="licenseList  && !fileType" :src="licenseList" class="detail-img">
                </el-upload>
                <img class="detail-img" v-if="!fileType" :src="licenseList">
                <el-button size="small" type="primary">点击图片重新上传</el-button>
                <!-- <span v-if="isPdf" style="cursor:pointer;text-decoration:underline;" @click="showfile(resultDetail.businessLicenseUrl)">企业营业执照.pdf</span> -->
            </el-form-item>
          </el-row>
          <el-row class="query-btn">
            <el-button style="padding:8px 20px 5px 20px;" size="small" @click="$router.go(-1)">取消</el-button>
            <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="submit">确认</el-button>
          </el-row>
        </el-form>
    </el-row>
  </section>
</template>

<script>
import util from '../../../../../common/util'
export default {
  data () {
    return {
      rules: {
        licenseList: [{ required: true, message: '请输入委托企业', trigger: 'blur' }],
        licenseSelect: [{ required: true, message: '请选择许可证类型', trigger: 'change' }],
        licensePath: [{ required: true, message: '请输入许可证编号', trigger: 'blur' }]
        // licensePath: [{ required: true, message: '请选择有效截止日期', trigger: 'change' }],
        // licensePath: [{ required: true, message: '请输入涉证商品', trigger: 'blur' }]
      },
      controller: {
        requiredColor: true
      },
      LicTypeList: [],
      isDetail: false,
      addForm: {
        licTypeCode: ''
      },
      licenseList: [],
      fileLists: [], // 存放文件
      fileType: true,
      licenses: [],
      goodsList: []
    }
  },
  created () {

  },
  methods: {
    // 更多上传
    addLicense () {
      this.addForm.licenseList.push({
        servicePath: '',
        licenseId: ''
      })
    },
    // 保存
    submit () {},
    // 格式化许可证类型
    formateLicenseType (val) {
      let label = ''
      for (let x in this.LicTypeList) {
        if (val === this.LicTypeList[x].value) {
          label = this.LicTypeList[x].text
          break
        }
      }
      return label
    },
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
    },
    deleteGoods () {}
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

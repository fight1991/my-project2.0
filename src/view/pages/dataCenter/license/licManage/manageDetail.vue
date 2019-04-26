<template>
  <section class='sys-main'>
    <el-row class = "query-condition">
        <el-form label-width="150px" :model="addForm" size="mini" label-position="right">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="委托企业"  prop="corpName" >
                <el-autocomplete
                size='mini' style="width:100%"
                :disabled="isDetail"
                placeholder="输入2个字后搜索"
                :maxlength="20"
                v-model="addForm.corpName"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false">
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="许可证类型"  prop="licenseType" ref="licenseType">
                <el-select placeholder="请选择许可证类型" v-model="addForm.licenseType"
                remote filterable clearable
                :disabled="isDetail"
                @focus="tipsFillMessage('saasLicType','SAAS_LIC_TYPE')"
                :remote-method="checkParamsList"
                ref="licTypeCode" dataRef='licTypeCode'
                style="width:100%">
                  <el-option
                    v-for="item in saasLicType"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :xs='24'>
              <el-form-item label="许可证编号:"  prop="licenseNo">
                <el-input clearable size="mini" :maxlength="30" v-model="addForm.licenseNo" :disabled="isDetail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs='24'>
              <el-form-item label="有效截止日期"  prop="expiryDate">
                <el-date-picker size="mini" type="datetime" style="width:100%" v-model="addForm.expiryDate" :disabled="isDetail"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :xs='24'>
              <el-form-item label="上传时间" prop="updateTime">
                <el-input clearable size="mini" v-model="addForm.updateTime" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs='24'>
              <el-form-item label="可用次数" prop="availableNum" >
                <el-select style="width:100%"
                  v-model="addForm.availableNum"
                  :disabled="isDetail"
                  filterable remote clearable
                  placeholder="请选择许可证可用次数">
                  <el-option label="一批一证" value="1"></el-option>
                  <el-option label="非一批一证" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="涉证商品">
                <el-table class='sys-table-table'
                  border highlight-current-row size="mini"
                  :data="goodsList">
                  <el-table-column label="商品名称" min-width="100" prop="gName">
                    <template slot-scope="scope">
                      {{scope.row.gName}}
                    </template>
                  </el-table-column>
                  <el-table-column label="商品编号" min-width="100" prop="gNo">
                    <template slot-scope="scope">
                      {{scope.row.gNo}}
                    </template>
                  </el-table-column>
                  <el-table-column label="申报数量" min-width="100">
                    <template slot-scope="scope">
                      <el-input clearable size="mini" v-model="declaredQuantity" :disabled="isDetail">{{scope.row.declaredQuantity+''}}</el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="剩余可用数量" min-width="100" prop="availableQuantity">
                    <template slot-scope="scope">
                      {{scope.row.availableQuantity+''}}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button type="text" @click="deleteGoods(scope.row.relatedGoodsPid)" title="删除" v-if="isDetail"><i class="fa fa-times-circle f-18"></i></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <span class="license-add" @click="addRelatedGoods"><img class="pointer" src="../../../../../assets/img/icon/btn-add.png"/><span>增加涉证商品</span></span>
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
              :on-preview="showfileUrl">
              <img v-if="isImg  && !fileType" :src="addForm.certificateUrl" class="detail-img">
              <img v-if="isPdf  && !fileType" src="../../../../../assets/img/icon/pdf.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
              <img v-if="isWord  && !fileType" src="../../../../../assets/img/icon/word.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
              <img v-if="isExcel  && !fileType" src="../../../../../assets/img/icon/excel.png" @click="showfile(addForm.certificateUrl)" class="detail-img">
              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
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
import commonParam from '../../../../../common/commonParam'
export default {
  data () {
    return {
      rules: {
        corpName: [{ required: true, message: '请输入委托企业', trigger: 'blur' }],
        licenseType: [{ required: true, message: '请选择许可证类型', trigger: 'change' }],
        licenseNo: [{ required: true, message: '请输入许可证编号', trigger: 'blur' }],
        expiryDate: [{ required: true, message: '请选择有效截止日期', trigger: 'change' }],
        availableNum: [{ required: true, message: '请选择可用次数', trigger: 'change' }]
      },
      controller: {
        requiredColor: true
      },
      LicTypeList: [],
      isDetail: false,
      addForm: {
        corpName: '',
        licenseType: '',
        licenseNo: '',
        expiryDate: '',
        updateTime: '',
        availableNum: '',
        goodsList: [
          {
            gNo: '',
            gName: '',
            declaredQuantity: ''
          }
        ]
      },
      type: '',
      corpListOptions: [], // 委托企业
      fileLists: [], // 存放文件
      fileType: true,
      isImg: false,
      isPdf: false,
      isWord: false,
      isExcel: false,
      licenses: [],
      saasLicType: [],
      selectObj: {
        obj: '',
        params: ''
      },
      goodsList: []
    }
  },
  created () {
    this.reset()
    this.corpList()
    this.getCommonParams()
    this.type = this.$route.params.type
    this.id = this.$route.params.id
    if (this.type === 'detail') {
      this.isDetail = true
    } else {
      this.isDetail = false
    }
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('manageDetail') === -1) {
        return
      }
      this.reset()
      this.corpList()
      this.getCommonParams()
    }
  },
  methods: {
    // 重置
    reset () {
      this.addForm = {
        corpName: '',
        licenseType: '',
        licenseNo: '',
        expiryDate: '',
        updateTime: '',
        availableNum: '',
        goodsList: [
          {
            gNo: '',
            gName: '',
            declaredQuantity: ''
          }
        ]
      }
    },
    // 更多上传
    addRelatedGoods () {
      this.goodsList.push({
        licenseType: '',
        licenseUrl: '',
        licenseNo: '',
        expiryDate: '',
        availableNum: ''
      })
    },
    // 保存
    submit () {
      this.$refs['addForm'].validate((valId) => {
        if (!valId) {
          return false
        }
        this.$store.dispatch('ajax', {
          url: 'API@/saas-document-center/license/edit',
          data: this.addForm,
          router: this.$router,
          success: (res) => {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.$router.go(-1)
          }
        })
      })
    },
    // 刪除
    deleteGoods (index) {
      this.goodsList.splice(index, 1)
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
    // 提示需要填写的内容
    tipsFillMessage (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
      }
    },
    // 获取公共字典list
    getCommonParams () {
      let par = ['SAAS_LIC_TYPE']
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
            this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_LIC_TYPE')).slice(0, 10)
          }
        })
      } else {
        this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_LIC_TYPE')).slice(0, 10)
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

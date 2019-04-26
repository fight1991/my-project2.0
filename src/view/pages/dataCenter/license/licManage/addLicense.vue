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
        <el-form label-width="150px" :model="addForm" :rules="rules" size="mini" label-position="right">
          <el-row :gutter="20">
            <el-col :span="12">
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
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-card class="license-card" v-for="(item,index) in addForm.licenseList" :key="index">
              <i class="license-close-icon" v-if="index !== 0" @click="delLicense(index)"></i>
              <el-row>
                <el-col :span="12">
                <el-form-item label="许可证类型:" :prop="'licenseList.'+index+'.licenseType'" :rules="rules.licenseType">
                  <el-select placeholder="请选择许可证类型" v-model="item.licenseType"
                  remote filterable clearable
                  @focus="tipsFillMessage('saasLicType','SAAS_LIC_TYPE')"
                  :remote-method="checkParamsList"
                  ref="licTypeCode" dataRef='licTypeCode'
                  style="width:100%">
                    <el-option
                      v-for="(item,i) in saasLicType"
                      :key="'licenses'+index+i+item.licenseType"
                      :label="item.codeField + '-' + item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="许可证文件:" :prop="'licenseList.'+index+'.licenseUrl'" :rules="rules.licenseUrl">
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
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="12" :xs='24'>
                  <el-form-item label="许可证编号:" :prop="'licenseList.'+index+'.licenseNo'" :rules="rules.licenseNo">
                    <el-input clearable size="mini" :maxlength="30" v-model="item.licenseNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :xs='24'>
                  <el-form-item label="有效截止日期" :prop="'licenseList.'+index+'.expiryDate'" :rules="rules.expiryDate">
                    <el-date-picker size="mini" type="datetime" style="width:100%" v-model="item.expiryDate"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" :xs='24'>
                  <el-form-item label="可用次数" :prop="'licenseList.'+index+'.availableNum'" :rules="rules.availableNum">
                    <el-select v-model="item.availableNum" style="width:100%"
                      filterable remote clearable placeholder="请选择许可证可用次数">
                      <el-option label="一批一证" value="0"></el-option>
                      <el-option label="非一批一证" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :xs='24'>
                  <el-form-item label="涉证商品:">
                    <el-input clearable size="mini" :maxlength="30" v-model="item.goodsList" @focus="openGoodsDialog"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-row>
          <el-row>
            <span class="license-add" @click="addLicense"><img class="pointer" src="../../../../../assets/img/icon/btn-add.png"/><span>上传更多许可证</span></span>
          </el-row>
          <el-row class="query-btn">
            <el-button style="padding:8px 20px 5px 20px;" size="small" @click="$router.go(-1)">取消</el-button>
            <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="submit">确认</el-button>
          </el-row>
        </el-form>
    </el-row>
    <el-dialog title="涉证商品" :visible.sync="goodsDialogVisible" width="950px" :before-close='beforeClose'>
        <el-form :model="goodsDialogForm" ref="goodsDialogForm" :rules="dialogRule" size="mini">
          <el-row>
            <el-col :span="18" :offset="4">
              <el-row :gutter="10" style="margin-bottom:10px" v-for="(item,index2) in goodsDialogForm" :key="index2">
                <el-col :span="7">
                  <el-form-item :prop="'goodsDialogForm.'+index2+'.gNo'" :rules="dialogRule.gNo">
                    <el-input size="mini" clearable v-model="item.gNo" placeholder="请输入商品编号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item>
                    <el-input size="mini" clearable v-model="item.gName" placeholder="请输入商品名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item :prop="'goodsDialogForm.'+index2+'.declaredQuantity'" :rules="dialogRule.declaredQuantity">
                    <el-input size="mini" clearable v-model="item.declaredQuantity" placeholder="请输入申报数量"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-button type="text" title="删除" @click="deleteGood(index2)"  v-if="goodsDialogForm.length > '1'"><i class="fa fa-times-circle-o"></i></el-button>
                </el-col>
              </el-row>
              <el-row>
                <span class="license-add" @click="addGood"><img class="pointer" src="../../../../../assets/img/icon/btn-add.png"/><span>填写更多涉证商品</span></span>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer">
          <el-button class="layer-btn-primary" @click="saveDialogForm">确定</el-button>
          <el-button class="layer-btn" @click="cancleDialogForm">取消</el-button>
        </span>
    </el-dialog>
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
        // licenseUrl: [{ required: true, message: '', trigger: '' }],
        licenseNo: [{ required: true, message: '请输入许可证编号', trigger: 'blur' }],
        expiryDate: [{ required: true, message: '请选择有效截止日期', trigger: 'change' }],
        availableNum: [{ required: true, message: '请选择可用次数', trigger: 'change' }]
      },
      dialogRule: {
        gNo: [{ required: true, message: '请输入商品编号', trigger: 'blur' }],
        declaredQuantity: [{ required: true, message: '请输入申报数量', trigger: 'blur' }]
      },
      goodsDialogForm: [{
        gNo: '',
        gName: '',
        declaredQuantity: ''
      }],
      goodsDialogVisible: false,
      addForm: {
        corpName: '',
        corpSccCode: '',
        goodsList: [
          {
            gNo: '',
            gName: '',
            declaredQuantity: ''
          }
        ],
        licenseList: [
          {
            licenseType: '',
            licenseUrl: '',
            licenseNo: '',
            expiryDate: '',
            availableNum: ''
          }
        ]
      },
      fileLists: [], // 存放文件
      corpListOptions: [], // 委托企业
      fileType: true,
      isImg: false,
      isPdf: false,
      isWord: false,
      isExcel: false,
      saasLicType: [],
      selectObj: {
        obj: '',
        params: ''
      }
    }
  },
  created () {
    this.getCommonParams()
    this.corpList()
    if (this.$route.query.corpSccCode) {
      this.reset()
      this.addForm.corpSccCode = this.$route.query.corpSccCode
      this.addForm.corpName = this.$route.query.corpName
    } else {
      this.reset()
    }
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('addLicense') === -1) {
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
        corpSccCode: '',
        goodsList: [],
        licenseList: [
          {
            licenseType: '',
            licenseUrl: '',
            licenseNo: '',
            expiryDate: '',
            availableNum: ''
          }
        ]
      }
      this.saasLicType = JSON.parse(window.localStorage.getItem('SAAS_LIC_TYPE')).slice(0, 10)
    },
    // 保存
    saveDialogForm () {
      this.goodsList = this.goodsDialogForm
      this.goodsDialogVisible = false
    },
    // 取消
    cancleDialogForm () {
      this.goodsDialogForm = [{
        gNo: '',
        gName: '',
        declaredQuantity: ''
      }]
      this.$nextTick(() => {
        this.$refs['goodsDialogForm'].clearValidate()
      })
      this.goodsDialogVisible = false
    },
    beforeClose () {
      this.goodsDialogForm = [{
        gNo: '',
        gName: '',
        declaredQuantity: ''
      }]
      this.$nextTick(() => {
        this.$refs['goodsDialogForm'].clearValidate()
      })
      this.goodsDialogVisible = false
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
    // 涉证商品弹窗
    openGoodsDialog () {
      this.goodsDialogVisible = true
    },
    // 更多上传许可证
    addLicense () {
      this.addForm.licenseList.push({
        licenseType: '',
        licenseUrl: '',
        licenseNo: '',
        expiryDate: '',
        availableNum: ''
      })
    },
    // 删除许可证
    delLicense (index) {
      this.addForm.licenseList.splice(index, 1)
    },
    // 更多商品
    addGood () {
      this.goodsDialogForm.push({
        gNo: '',
        gName: '',
        declaredQuantity: ''
      })
    },
    // 删除商品
    deleteGood (index) {
      this.goodsDialogForm.splice(index, 1)
    },
    // 保存
    submit () {
      this.$refs['addForm'].validate((valId) => {
        if (!valId) {
          return false
        }
        this.$store.dispatch('ajax', {
          url: 'API@/saas-document-center/license/save',
          data: this.addForm,
          router: this.$router,
          success: (res) => {
            this.$message({
              message: '新建成功',
              type: 'success'
            })
            this.$router.go(-1)
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
      for (let i = 0; i < this.fileLists.length; i++) {
        if (file.name === this.fileLists[i].name) {
          this.fileLists.splice(i, 1)
          this.resultDetail.businessLicenseUrl = ''
        }
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
.layer-btn-primary {
      height: 32px;
      line-height: 32px;
      margin: 0 6px;
      padding: 0 15px;
      border: 1px solid #4898d5;
      border-radius: 2px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
      background-color: #2e8ded;
      color: #fff;
    }
  .layer-btn {
    height: 32px;
    line-height: 32px;
    margin: 0 6px;
    padding: 0 15px;
    border: 1px solid #d8d8d8;
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    color: #333333;
  }
</style>

<template>
  <section class='sys-main'>
     <!-- 头部 -->
    <el-row class='sys-header'>
      <!-- 返回按钮 -->
      <el-row class='mg-b-15'>
        <el-col :span="18">
          <span @click="back" class="sys-back-btn"><i class="back-btn"></i>返回</span>
        </el-col>
      </el-row>
      <!-- 返回按钮 end-->
    </el-row>
    <el-row class = "query-table">
        <el-form label-width="150px" :model="addForm" ref="addForm" :rules="rules" size="mini" label-position="right">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="委托企业" prop="corpName">
                <el-autocomplete
                size='mini' style="width:100%"
                placeholder="输入2个字后搜索"
                :maxlength="20"
                :disabled="isDetailAdd"
                v-model="addForm.corpName"
                :fetch-suggestions="querySearch"
                @select="handleSelect($event)"
                :trigger-on-focus="false">
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-card class="license-card" v-for="(item,index) in addForm.submitDataList" :key="index">
              <i class="license-close-icon" v-if="index !== 0" @click="delLicense(index)"></i>
              <el-row>
                <el-col :span="12">
                <el-form-item label="许可证类型:" :prop="'submitDataList.'+index+'.info.licenseType'" :rules="rules.licenseType">
                  <el-select placeholder="请选择许可证类型" v-model="item.info.licenseType"
                  remote filterable clearable
                  @focus="tipsFillMessage('saasLicType','SAAS_LICENSEDOCU')"
                  :remote-method="checkParamsList"
                  ref="licTypeCode" dataRef='licTypeCode'
                  style="width:100%">
                    <el-option
                      v-for="(item,i) in saasLicType"
                      :key="'saasLicType'+index+i+item.licenseType"
                      :label="item.codeField + '-' + item.nameField"
                      :value="item.codeField">
                    </el-option>
                  </el-select>
                </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="许可证文件:" :prop="'submitDataList.'+index+'.info.licenseUrl'" :rules="rules.licenseUrl">
                  <el-upload
                    action="http://127.0.0.1"
                    :before-upload="(e)=>{beforeUpload(e,item)}"
                    :file-list="fileLists"
                    :show-file-list="item.info.fileType"
                    :on-preview="showfileUrl"
                    :on-remove="(e)=>{handleDelete(e,item)}">
                    <img v-if="item.info.isImg  && !item.info.fileType" :src="item.info.licenseUrl" class="detail-img">
                    <img v-if="item.info.isPdf  && !item.info.fileType" src="../../../../../assets/img/icon/pdf.png" @click="showfile(item.info.licenseUrl)" class="detail-img">
                    <img v-if="item.info.isWord  && !item.info.fileType" src="../../../../../assets/img/icon/word.png" @click="showfile(item.info.licenseUrl)" class="detail-img">
                    <img v-if="item.info.isExcel  && !item.info.fileType" src="../../../../../assets/img/icon/excel.png" @click="showfile(item.info.licenseUrl)" class="detail-img">
                    <el-button size="small" type="primary" v-if="item.info.fileType">上传附件</el-button>
                  </el-upload>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="12" :xs='24'>
                  <el-form-item label="许可证编号:" :prop="'submitDataList.'+index+'.info.licenseNo'" :rules="rules.licenseNo">
                    <el-input clearable size="mini" :maxlength="30" v-model="item.info.licenseNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :xs='24'>
                  <el-form-item label="有效截止日期" :prop="'submitDataList.'+index+'.info.expiryDate'" :rules="rules.expiryDate">
                    <el-date-picker size="mini" type="date" style="width:100%" v-model="item.info.expiryDate"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" :xs='24'>
                  <el-form-item label="可用次数" :prop="'submitDataList.'+index+'.info.availableNum'" :rules="rules.availableNum">
                    <el-select v-model="item.info.availableNum" style="width:100%"
                      filterable remote clearable placeholder="请选择许可证可用次数">
                      <el-option label="一批一证" value="1"></el-option>
                      <el-option label="非一批一证" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :xs='24'>
                  <el-form-item label="涉证商品:" :prop="'submitDataList.'+index+'.info.goodInput'" :rules="rules.goodInput">
                    <el-input clearable size="mini" v-model="item.info.goodInput" @focus="openGoodsDialog(index)"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-card>
          </el-row>
          <el-row>
            <span class="license-add" @click="addLicense"><img class="pointer" src="../../../../../assets/img/icon/btn-add.png"/><span>上传更多许可证</span></span>
          </el-row>
          <el-row class="query-btn">
            <el-button style="padding:8px 20px 5px 20px;" size="small" @click="back">取消</el-button>
            <el-button type="primary" style="padding:8px 20px 5px 20px;" size="small" @click="submit">确认</el-button>
          </el-row>
        </el-form>
    </el-row>
    <el-dialog
    title="涉证商品"
    :close-on-click-modal="false"
    :visible.sync="goodsDialogVisible"
    v-show="goodsDialogVisible"
    :before-close='beforeClose'
    width="640px">
      <el-form :model="goodsDialog" ref="goodsDialog" :rules="dialogRule" size="mini" label-position="right">
        <el-row>
          <el-col :span="21" :offset="3">
            <el-row :gutter="10" style="margin-bottom:10px" v-for="(item2,index2) in goodsDialog.goods" :key="index2">
              <el-col :span="7">
                <el-form-item :prop="'goods.'+index2+'.gNo'" :rules="dialogRule.gNo">
                  <el-input size="mini" clearable v-model="item2.gNo" placeholder="请输入商品编号" :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item>
                  <el-input size="mini" clearable v-model="item2.gName" placeholder="请输入商品名称" :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :prop="'goods.'+index2+'.declaredQuantity'" :rules="dialogRule.declaredQuantity">
                  <el-input size="mini" clearable v-model="item2.declaredQuantity" placeholder="请输入申报数量" :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button type="text" title="删除" @click="deleteGood(index2)"  v-if="goodsDialog.goods.length > '1'"><i class="fa fa-times-circle-o"></i></el-button>
              </el-col>
            </el-row>
            <el-row>
              <span class="license-add" @click="addGood"><img class="pointer" src="../../../../../assets/img/icon/btn-add.png"/><span>填写更多涉证商品</span></span>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="sys-dialog-footer" style="text-align:center;">
        <el-button class="layer-btn-primary" @click="saveDialogForm">确定</el-button>
        <el-button class="layer-btn" @click="cancleDialogForm">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import validator from '../../../../../common/validator'
import util from '../../../../../common/util'
import commonParam from '../../../../../common/commonParam'
export default {
  data () {
    return {
      index: '',
      goodsDialog: {
        goods: [{
          gNo: '',
          gName: '',
          declaredQuantity: ''
        }]
      },
      rules: {
        corpName: [{ required: true, validator: this.checkValid, message: '请输入委托企业', trigger: 'change' }],
        licenseType: [{ required: true, message: '请选择许可证类型', trigger: 'change' }],
        licenseUrl: [{ required: true, message: '请选择上传文件', trigger: 'change' }],
        licenseNo: [{ required: true, message: '请输入许可证编号', trigger: 'blur' }],
        expiryDate: [{ required: true, message: '请选择有效截止日期', trigger: 'change' }],
        availableNum: [{ required: true, message: '请选择可用次数', trigger: 'change' }],
        goodInput: [{ required: true, message: '请输入涉证商品', trigger: 'change' }]
      },
      dialogRule: {
        gNo: [{ required: true, validator: this.checkValidNum, message: '请输入商品编号(数字)', trigger: 'blur' }],
        gName: [{ validator: this.checkValid, message: '商品名称为中英文', trigger: 'blur' }],
        declaredQuantity: [{ required: true, validator: validator.Zz0, message: '请输入申报数量', trigger: 'blur' }]
      },
      isDetailAdd: false,
      goodsDialogVisible: false,
      addForm: {
        corpName: '',
        ownerCodeScc: '',
        submitDataList: [{
          info: {
            corpName: '',
            ownerCodeScc: '',
            licenseType: '',
            licenseTypeValue: '',
            licenseUrl: '',
            licenseNo: '',
            expiryDate: '',
            availableNum: '',
            fileLists: [], // 存放文件
            fileType: true,
            isImg: false,
            isPdf: false,
            isWord: false,
            isExcel: false,
            goodInput: ''
          },
          goods: []

        }]
      },
      info: {
        corpName: '',
        ownerCodeScc: '',
        licenseType: '',
        licenseTypeValue: '',
        licenseUrl: '',
        licenseNo: '',
        expiryDate: '',
        availableNum: '',
        fileLists: [], // 存放文件
        fileType: true,
        isImg: false,
        isPdf: false,
        isWord: false,
        isExcel: false
      },
      fileLists: [], // 存放文件
      corpListOptions: [], // 委托企业
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
    if (this.$route.query.corpName) {
      this.reset()
      this.addForm.ownerCodeScc = this.$route.query.ownerCodeScc
      this.addForm.corpName = this.$route.query.corpName
      this.isDetailAdd = true
    } else {
      this.reset()
      this.isDetailAdd = false
    }
  },
  watch: {
    '$route': function (to, from) {
      // 初始化组件
      if (to.path.indexOf('addLicense') === -1) {
        return
      }
      this.corpList()
      this.getCommonParams()
      if (this.$route.query.corpName) {
        this.reset()
        this.addForm.ownerCodeScc = this.$route.query.ownerCodeScc
        this.addForm.corpName = this.$route.query.corpName
        this.isDetailAdd = true
      } else {
        this.reset()
        this.isDetailAdd = false
      }
    }
  },
  methods: {
    // 返回按钮
    back () {
      this.$router.push({
        name: 'license'
      })
    },
    // 校验
    checkValid (rule, value, callback) {
      if (util.isEmpty(value)) {
        this.$refs['goodsDialog'].clearValidate()
        callback(new Error(''))
      } else {
        const pattern = /^[A-Za-z\u4e00-\u9fa5]+$/
        if (!pattern.test(value)) {
          this.$refs['goodsDialog'].clearValidate()
          callback(new Error(''))
        } else {
          callback()
        }
      }
    },
    // 校验
    checkValidNum (rule, value, callback) {
      if (util.isEmpty(value)) {
        this.$refs['goodsDialog'].clearValidate()
        callback(new Error(''))
      } else {
        const pattern = /^[0-9]+$/
        if (!pattern.test(value)) {
          this.$refs['goodsDialog'].clearValidate()
          callback(new Error(''))
        } else {
          callback()
        }
      }
    },
    // 更多商品
    addGood () {
      this.goodsDialog.goods.push({
        gNo: '',
        gName: '',
        declaredQuantity: ''
      })
    },
    // 删除商品
    deleteGood (index2) {
      this.goodsDialog.goods.splice(index2, 1)
    },
    handleSelect (item) {
      this.addForm.ownerCodeScc = item.ownerCodeScc
      this.addForm.corpName = item.value
    },
    // 重置
    reset () {
      this.addForm = {
        corpName: '',
        ownerCodeScc: '',
        submitDataList: [{
          info: {
            corpName: '',
            ownerCodeScc: '',
            licenseType: '',
            licenseTypeValue: '',
            licenseUrl: '',
            licenseNo: '',
            expiryDate: '',
            availableNum: '',
            fileLists: [], // 存放文件
            fileType: true,
            isImg: false,
            isPdf: false,
            isWord: false,
            isExcel: false,
            goodInput: ''
          },
          goods: []
        }]
      }
      this.$nextTick(() => {
        this.$refs['addForm'].clearValidate()
      })
      this.saasLicType = JSON.parse(window.localStorage.getItem('SAAS_LICENSEDOCU')).slice(0, 10)
    },
    // 保存
    saveDialogForm () {
      this.addForm.submitDataList[this.index].goods = util.simpleClone(this.goodsDialog.goods)
      if (this.goodsDialog.goods.length > 1) {
        for (let i = 0; i < this.goodsDialog.goods.length; i++) {
          this.addForm.submitDataList[this.index].info.goodInput += this.goodsDialog.goods[i].gNo + ','
        }
        this.addForm.submitDataList[this.index].info.goodInput = this.addForm.submitDataList[this.index].info.goodInput.substr(0, this.addForm.submitDataList[this.index].info.goodInput.length - 1)
      } else {
        this.addForm.submitDataList[this.index].info.goodInput = this.goodsDialog.goods[0].gNo
      }
      this.goodsDialogVisible = false
    },
    // 取消
    cancleDialogForm () {
      this.addForm.submitDataList[this.index].goods = []
      this.goodsDialog.goods = [{
        gNo: '',
        gName: '',
        declaredQuantity: ''
      }]
      this.goodsDialogVisible = false
    },
    beforeClose () {
      this.addForm.submitDataList[this.index].goods = []
      this.goodsDialog.goods = [{
        gNo: '',
        gName: '',
        declaredQuantity: ''
      }]
      this.goodsDialogVisible = false
    },
    // 委托企业
    corpList () {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-document-center/dccommon/queryLicenseCorps',
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
    openGoodsDialog (index) {
      this.index = index
      this.addForm.submitDataList[index].info.goodInput = ''
      if (this.addForm.submitDataList[index].goods.length === 0) {
        this.goodsDialog.goods = [{
          gNo: '',
          gName: '',
          declaredQuantity: ''
        }]
      } else {
        this.goodsDialog.goods = this.addForm.submitDataList[index].goods
      }
      this.goodsDialogVisible = true
    },
    // 更多上传许可证
    addLicense () {
      this.fileLists = []
      this.addForm.submitDataList.push({
        info: {
          corpName: '',
          ownerCodeScc: '',
          licenseType: '',
          licenseTypeValue: '',
          licenseUrl: '',
          licenseNo: '',
          expiryDate: '',
          availableNum: '',
          fileLists: [], // 存放文件
          fileType: true,
          isImg: false,
          isPdf: false,
          isWord: false,
          isExcel: false,
          goodInput: ''
        },
        goods: []
      })
    },
    // 删除许可证
    delLicense (index) {
      this.addForm.submitDataList.splice(index, 1)
    },
    // 保存
    submit () {
      this.$refs['addForm'].validate((valId) => {
        if (!valId) {
          return false
        }
        let list = []
        list = this.addForm.submitDataList
        for (let i = 0; i < list.length; i++) {
          for (let j = list.length - 1; j > i; j--) {
            if (list[i].info.licenseNo === list[j].info.licenseNo && list[i].info.licenseType === list[j].info.licenseType) {
              this.$message({
                message: '许可证类型和许可证编号已存在',
                type: 'error'
              })
              return
            }
          }
          list[i].info.corpName = this.addForm.corpName
          list[i].info.ownerCodeScc = this.addForm.ownerCodeScc
          list[i].info.expiryDate = util.dateFormat(list[i].info.expiryDate, 'yyyy-MM-dd')
          for (let k = 0; k < list[i].goods.length; k++) {
            if (util.isEmpty(list[i].goods[k].gNo) || util.isEmpty(list[i].goods[k].declaredQuantity)) {
              this.$message({
                message: '商品编号和商品数量不能为空',
                type: 'error'
              })
              return
            }
          }
        }
        this.$store.dispatch('ajax', {
          url: 'API@/saas-document-center/license/save',
          data: {list: this.addForm.submitDataList},
          router: this.$router,
          success: (res) => {
            this.$message({
              message: '新建成功',
              type: 'success'
            })

            this.$router.push({
              path: '/dataCenter/licenses/license/detailListLicense',
              query: {
                sccCode: this.addForm.ownerCodeScc
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
            row.info.licenseUrl = res.result.url
            if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp') {
              row.info.fileType = false
              row.info.isImg = true
              row.info.isPdf = false
              row.info.isWord = false
              row.info.isExcel = false
            } else {
              row.info.fileLists.push({
                name: res.result.name,
                url: res.result.url
              })
              if (file.type === 'application/pdf') {
                row.info.fileType = false
                row.info.isImg = false
                row.info.isPdf = true
                row.info.isWord = false
                row.info.isExcel = false
              } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                row.info.fileType = false
                row.info.isImg = false
                row.info.isPdf = false
                row.info.isWord = true
                row.info.isExcel = false
              } else if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                row.info.fileType = false
                row.info.isImg = false
                row.info.isPdf = false
                row.info.isWord = false
                row.info.isExcel = true
              }
            }
          }
        })
      }
      return false
    },
    // 预览
    showfileUrl (file) {
      // util.fileView(file.url)
    },
    // 文件点击事件
    showfile (url) {
      // if (!util.isEmpty(url)) {
      //   util.fileView(url)
      // }
    },
    // 附件删除
    handleDelete (file, fileList, row) {
      // for (let i = 0; i < this.row.info.fileLists.length; i++) {
      //   if (file.name === this.row.info.fileLists[i].name) {
      //     this.row.info.fileLists.splice(i, 1)
      //     this.row.info.licenseUrl = ''
      //   }
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
      let par = ['SAAS_LICENSEDOCU']
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
            this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_LICENSEDOCU')).slice(0, 10)
          }
        })
      } else {
        this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_LICENSEDOCU')).slice(0, 10)
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

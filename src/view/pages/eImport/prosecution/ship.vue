<template>
  <section class='sys-main'>
    <!-- 查询条件 -->
    <div class = "query-condition">
      <!-- -->
      <el-form label-width="150px" :model="shipForm" size="mini" label-position="right">
        <el-row :gutter="10">
          <el-col :span="8">
              <el-form-item label="进出境关别" prop='iEPort'>
                <el-select placeholder="" v-model="shipForm.iEPort"
                  filterable clearable remote default-first-option
                  @focus="tipsFillMessage('saasCustomsRel1','SAAS_CUSTOMS_REL')"
                  :remote-method="checkParamsList"
                  style="width:100%">
                  <el-option
                    v-for="item in saasCustomsRel1"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入/离境口岸" prop='entyPortCode'>
                <el-select placeholder="" v-model="shipForm.entyPortCode"
                  filterable clearable remote default-first-option
                  @focus="tipsFillMessage('saasInlandPort1','SAAS_INLAND_PORT')"
                  :remote-method="checkParamsList"
                  style="width:100%">
                  <el-option
                    v-for="item in saasInlandPort1"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运输方式" prop='trafMode'>
                <el-select placeholder="" v-model="shipForm.trafMode"
                  filterable clearable remote default-first-option
                  :remote-method="checkParamsList"
                  @focus="tipsFillMessage('saasTransportType1','SAAS_TRANSPORT_TYPE')"
                  style="width:100%">
                  <el-option
                    v-for="item in saasTransportType1"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="24" class='query-btn'>
            <el-button size="mini" type="primary" @click="searchShipForm" style="padding: 8px 20px;">查询</el-button>
            <el-button size="mini" @click="resetShipForm" style="padding: 8px 20px;">重置</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
    </div>
    <!-- 主显示框 -->
    <div class='query-table'>
      <!-- 操作 -->
       <el-row class="op-btn">
        <el-button @click="openFun('add', 'add')" icon="fa fa-plus fa-lg" size="mini">&nbsp;新增</el-button>
        <el-button @click="deleteInfo" icon="fa fa-trash-o fa-lg" size="mini">&nbsp;删除</el-button>
         <el-upload
          style="display: inline-block;"
          action="http://127.0.0.1"
          :before-upload="beforeUpload"
          :show-file-list="false">
          <el-button size="mini" icon="fa fa-sign-in fa-lg">&nbsp;导入</el-button>
        </el-upload>
        <span class="span-right">已选择{{checkedNum}}项</span>
      </el-row>
      <!-- 列表 list -->
      <el-table class='sys-table-table' :data="shipList"
         @selection-change="shipListChange"
         border highlight-current-row size="mini">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="text" icon="fa fa-pencil-square-o" title="编辑" @click="openFun('edit', scope.row)"></el-button>
            <el-button size="mini" type="text" icon="fa fa-search" title="详情" @click="openFun('view', scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="进出境关别" prop="iEPortValue" min-width="80"></el-table-column>
        <el-table-column label="入/离境口岸" prop="entyPortCodeValue" min-width="110"></el-table-column>
        <el-table-column label="运输方式" prop="trafModeValue" min-width="100"></el-table-column>
      </el-table>
      <!--分页-->
      <el-row class='sys-page-list'>
        <el-col :span="24" align="right">
            <page-box :pagination='paginationInit' @change="pageList"></page-box>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="运输方式提示"
      :visible.sync="trafModeTipsVisible"
      :before-close='beforeClose'
      width="400px">
      <el-form label-width="100px" size="mini" :rules="rules"
       label-position="right" :model="shipDialogForm" ref='shipDialogForm'>
          <el-row >
            <el-col :span="24">
              <el-form-item label="进出境关别" prop='iEPort'>
                <el-select placeholder="" v-model="shipDialogForm.iEPort"
                  filterable clearable remote default-first-option
                  @focus="tipsFillMessage('saasCustomsRel2','SAAS_CUSTOMS_REL')"
                  :remote-method="checkParamsList"  :disabled="isDetail"
                  style="width:100%">
                  <el-option
                    v-for="item in saasCustomsRel2"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="24">
              <el-form-item label="入/离境口岸" prop='entyPortCode'>
                <el-select placeholder="" v-model="shipDialogForm.entyPortCode"
                  filterable clearable remote default-first-option
                  @focus="tipsFillMessage('saasInlandPort2','SAAS_INLAND_PORT')"
                  :remote-method="checkParamsList"  :disabled="isDetail"
                  style="width:100%">
                  <el-option
                    v-for="item in saasInlandPort2"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="24">
              <el-form-item label="运输方式" prop='trafMode'>
                <el-select placeholder="" v-model="shipDialogForm.trafMode"
                  filterable clearable remote default-first-option
                  @focus="tipsFillMessage('saasTransportType2','SAAS_TRANSPORT_TYPE')"
                  :remote-method="checkParamsList"  :disabled="isDetail"
                  style="width:100%">
                  <el-option
                    v-for="item in saasTransportType2"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="!isDetail">
        <el-button class="layer-btn-primary" @click="saveDialogForm">确定</el-button>
        <el-button class="layer-btn" @click="cancleDialogForm" >取消</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../../../common/util'
import commonParam from '../../../../common/commonParam'
export default {
  name: 'ship',
  data () {
    return {
      shipForm: {
        iEPort: '', // 进出境关别
        entyPortCode: '', // 入/离境口岸
        trafMode: '' // 运输方式
      },
      checkedNum: '0',
      shipList: [], // table表加载数据
      saasCustomsRel1: [], // 进出境关别
      saasCustomsRel2: [], // 进出境关别
      saasInlandPort1: [], // 口岸参数
      saasInlandPort2: [], // 口岸参数
      saasTransportType1: [], // 运输方式
      saasTransportType2: [], // 运输方式
      checkedData: [], // 选中得数据
      trafModeTipsVisible: false, // 控制新增编辑时的弹出框
      isDetail: false, // 查看置灰
      shipDialogForm: {
        pid: '', // 主键
        iEPort: '', // 进出境关别
        entyPortCode: '', // 入/离境口岸
        trafMode: '' // 运输方式
      },
      selectObj: {
        obj: '',
        params: ''
      },
      rules: {
        iEPort: [
          { required: true, message: '请选择进出境关别', trigger: 'blur' }
        ],
        trafMode: [
          { required: true, message: '请选择进运输方式', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.paginationInit = this.$store.state.pagination
    this.getCommonParams()
    this.searchShipForm()
  },
  mounted () {
  },
  methods: {
    // 重置
    resetShipForm  () {
      this.shipForm = {
        iEPort: '', // 进出境关别
        entyPortCode: '', // 入/离境口岸
        trafMode: '' // 运输方式
      }
      this.saasCustomsRel1 = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 10)
      this.saasInlandPort1 = JSON.parse(window.localStorage.getItem('SAAS_INLAND_PORT')).slice(0, 10)
      this.saasTransportType1 = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE')).slice(0, 10)
      this.searchShipForm()
    },
    beforeClose () {
      this.resetDialogForm()
      this.$refs['shipDialogForm'].resetFields()
      this.trafModeTipsVisible = false
    },
    // 打开弹出框
    openFun (type, row) {
      this.resetDialogForm()
      if (type === 'view') {
        this.shipDialogForm = row
        this.isDetail = true
      } else if (type === 'edit') {
        this.shipDialogForm = row
        this.isDetail = false
      } else {
        this.isDetail = false
      }
      this.trafModeTipsVisible = true
    },
    // 删除 操作
    deleteInfo () {
      if (this.checkedData.length === 0) {
        this.$message({
          message: '选择一条数据',
          type: 'error'
        })
        return false
      }
      let pidList = []
      for (let i in this.checkedData) {
        pidList.push(this.checkedData[i].pid)
      }
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/decParam/common/delDecTrafRel',
        data: {
          'list': pidList
        },
        router: this.$router,
        success: (res) => {
          if (res.code === '0000') {
            this.$message(res.message)
            this.pageList(this.$store.state.pagination)
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }
      })
    },
    shipListChange (value) {
      this.checkedData = value
      this.checkedNum = value.length
    },
    // 查询
    searchShipForm () {
      this.pageList(this.$store.state.pagination)
    },
    // 分页列表
    pageList (pagination) {
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/decParam/common/getDecTrafList',
        data: {
          ...this.shipForm,
          page: pagination
        },
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.shipList = res.result
          this.paginationInit = res.page
        }
      })
    },
    // 提示需要填写的内容
    tipsFillMessage (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
      }
    },
    // 上传文件
    beforeUpload (file) {
      if (!(file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        this.$message({
          message: '上传文件只支持execl格式',
          type: 'error'
        })
        this.$emit('closeEditUpload')
      } else if (!(Math.ceil(file.size / 1024) <= 2048)) {
        this.$message({
          message: '上传文件大小不能超过2MB',
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
          success: (res) => {
            this.fileList = []
            this.fileList.push(res.result)
            this.upLoadExcel(this.fileList)
          }
        })
      }
      return false
    },
    // 导入
    upLoadExcel (fileList) {
      let data = {
        httpUrl: fileList[0].url,
        type: '01'
      }
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/decParam/common/importDecTrafRelExcel',
        data: data,
        router: this.$router,
        success: (res) => {
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.pageList(this.$store.state.pagination)
        }
      })
    },
    // 获取公共字典list
    getCommonParams () {
      let par = ['SAAS_TRANSPORT_TYPE', 'SAAS_INLAND_PORT', 'SAAS_CUSTOMS_REL']
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
            this.saasCustomsRel1 = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 10)
            this.saasCustomsRel2 = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 10)
            this.saasInlandPort1 = JSON.parse(window.localStorage.getItem('SAAS_INLAND_PORT')).slice(0, 10)
            this.saasInlandPort2 = JSON.parse(window.localStorage.getItem('SAAS_INLAND_PORT')).slice(0, 10)
            this.saasTransportType1 = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE')).slice(0, 10)
            this.saasTransportType2 = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE')).slice(0, 10)
          }
        })
      } else {
        this.saasCustomsRel1 = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 10)
        this.saasCustomsRel2 = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 10)
        this.saasInlandPort1 = JSON.parse(window.localStorage.getItem('SAAS_INLAND_PORT')).slice(0, 10)
        this.saasInlandPort2 = JSON.parse(window.localStorage.getItem('SAAS_INLAND_PORT')).slice(0, 10)
        this.saasTransportType1 = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE')).slice(0, 10)
        this.saasTransportType2 = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE')).slice(0, 10)
      }
    },
    checkParamsList (query) {
      let keyValue = query.toString().trim()
      let list = JSON.parse(window.localStorage.getItem(this.selectObj.params))
      let filterList = []
      if (util.isEmpty(keyValue)) {
        // this[this.selectObj.obj] = list.slice(0, 10)
      } else {
        filterList = list.filter(item => {
          let str = item.codeField + '-' + item.nameField
          return str.toLowerCase().indexOf(keyValue.toLowerCase()) > -1
        })
        this[this.selectObj.obj] = filterList.slice(0, 10)
      }
    },
    // 保存
    saveDialogForm () {
      if (this.shipDialogForm.iEPort === this.shipForm.iEPort) {
        this.$message({
          message: '该进出口关别已经存在',
          type: 'error'
        })
        return false
      }
      this.$refs['shipDialogForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('ajax', {
            url: 'API@/dec-common/decParam/common/saveDecTrafRel',
            data: this.shipDialogForm,
            router: this.$router,
            success: (res) => {
              if (res.code === '0000') {
                this.$message(res.message)
                this.resetDialogForm()
                this.$refs['shipDialogForm'].resetFields()
                this.trafModeTipsVisible = false
                this.pageList(this.$store.state.pagination)
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
            }
          })
        }
      })
    },
    cancleDialogForm () {
      this.resetDialogForm()
      this.$refs['shipDialogForm'].resetFields()
      this.trafModeTipsVisible = false
    },
    resetDialogForm () {
      this.shipDialogForm = {
        pid: '', // 主键
        iEPort: '', // 进出境关别
        entyPortCode: '', // 入/离境口岸
        trafMode: '' // 运输方式
      }
      this.saasCustomsRel2 = JSON.parse(window.localStorage.getItem('SAAS_CUSTOMS_REL')).slice(0, 10)
      this.saasInlandPort2 = JSON.parse(window.localStorage.getItem('SAAS_INLAND_PORT')).slice(0, 10)
      this.saasTransportType2 = JSON.parse(window.localStorage.getItem('SAAS_TRANSPORT_TYPE')).slice(0, 10)
    }
  }
}
</script>

<style scoped lang="less">
  .query-main {
    padding: 20px;
    font-size:12px;
    font-family: Arial,Microsoft YaHei,SimSun;
    height: 100%;
    overflow: auto;
  }
  .query-condition {
    background-color: #fff;
    padding: 20px;
  }
  .query-table {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
  }
  .op-btn {
    margin-bottom: 14px;
  }
  .query-btn {
    text-align: center;
  }
  .icon-btn {
    display: inline-block;
    width: 15px;
    height: 15px;
  }
  .m-r-10{
    margin-right: 10px;
  }
  .span-right{
    float: right;
    margin-right: 5%;
    color: #0b93f3;
    margin-top: 6px;
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
  .el-select-dropdown__item.selected {
        background: #0080ff;
        color: #ffffff;
    }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
      background: #dbed8a;
      font-weight: bold;
  }
  .el-select-dropdown__item {
      font-size: 12px;
      padding: 0 15px;
      height: 22px;
      line-height: 22px;
      border: #c0c0c0 solid 1px;
  }
  .el-select-dropdown__list {
      padding: 0;
  }
</style>

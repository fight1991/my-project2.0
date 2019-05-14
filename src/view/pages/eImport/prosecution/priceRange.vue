<template>
    <section class='sys-main'>
      <!-- 头部 -->
      <el-row class = "query-condition">
      <!-- 查询条件 -->
        <el-form :label-width="labelFormWidth.seven" label-position="right" :model="queryForm" ref="queryForm">
          <el-row :gutter="56">
          <el-col :span="6" :xs="12">
            <el-form-item label="进出口标识标志" prop='type'>
              <el-select placeholder="" size="mini" v-model="queryForm.type"
                filterable clearable style="width:100%">
                <el-option
                  v-for="item in iEList"
                  :key="item.codeField"
                  :label="item.nameField"
                  :value="item.codeField">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="境内收发货人">
              <el-input size="mini" clearable v-model="queryForm.tradeName" :maxlength="70"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="商品名称">
              <el-input size="mini" clearable v-model="queryForm.gName" :maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="商品编码">
              <el-input size="mini" clearable v-model="queryForm.codeTs" :maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" class="query-btn">
          <el-col :span="24">
            <el-button size="mini" type="primary" style="padding: 8px 20px;" @click="searchQueryForm">查询</el-button>
            <el-button size="mini" style="padding: 8px 20px;" @click="resetQueryForm">重置</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
        </el-form>
      </el-row>
      <!-- 头部 end-->
      <!-- 主显示框 -->
      <div class='query-table'>
        <!-- 按钮 -->
        <el-row class="mg-b-15">
          <el-button size="mini" class="list-btns list-icon-add" @click="openFun('add', 'add')"><i></i>&nbsp;新增</el-button>
          <el-button size="mini" class="list-btns list-icon-delete" @click="deleteFun"><i></i>&nbsp;删除</el-button>
          <div class="airvehicle-list-drop">
          <el-popover popper-class="airvehicle-table-popper">
            <ul>
              <li v-for="(item,index) in thList" :key="index">
                <el-checkbox size="mini" v-model="item.value">{{item.text}}</el-checkbox>
              </li>
            </ul>
            <el-button size="mini" class="list-btns list-btn-drop" icon="list-icon-dropdown" slot="reference"></el-button>
          </el-popover>
        </div>
          <span class="span-right" style="font-size: 14px; color: #4c4c4c;">
            已选择<span style="color:#409EFF;">{{checkedNum}}</span>项
          </span>
        </el-row>
        <!-- 列表 list -->
        <el-table class='sys-table-table' height="400px"
          border highlight-current-row size="mini"
          :data="priceList"
          @selection-change="selectVal">
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column label="进出口标识标志" min-width="100" prop="type" v-if="thList[0].value">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.type=="I"?"进口":(scope.row.type=="E"?'出口':'')}}</div>
            </template>
          </el-table-column>
          <el-table-column label="境内收发货人" min-width="150" prop="tradeName" v-if="thList[1].value">

          </el-table-column>
          <el-table-column label="商品编码" min-width="150" prop="codeTs" v-if="thList[2].value">
          </el-table-column>
          <el-table-column label="商品名称" min-width="150" prop="gName" v-if="thList[3].value">
          </el-table-column>
          <el-table-column label="规格型号" min-width="150" prop="gModel" v-if="thList[4].value">
          </el-table-column>
          <el-table-column label="单价" min-width="80" prop="declPrice" v-if="thList[5].value">
            <template slot-scope="scope">
              <div class='sys-td-r'>{{scope.row.declPrice+''}}</div>
            </template>
          </el-table-column>
          <el-table-column label="币制" min-width="100" prop="tradeCurrValue" v-if="thList[6].value">
            <template slot-scope="scope">
              <div class='sys-td-c'>{{scope.row.tradeCurrValue}}</div>
            </template>
          </el-table-column>
          <el-table-column label="浮动区间" min-width="80" prop="bandArea" v-if="thList[7].value">
          <template slot-scope="scope">
            <div class='sys-td-r'>{{scope.row.bandArea+''}}%</div>
          </template>
          </el-table-column>
            <el-table-column label="原产国" min-width="100" prop="originCountryValue" v-if="thList[8].value">
            </el-table-column>
          <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class='sys-td-c'>
              <el-button size="mini" class="table-icon list-icon-edit" type="text" title="编辑" @click="openFun('edit',scope.row)"><i></i></el-button>
              <el-button size="mini" class="table-icon list-icon-look" type="text" title="详情" @click="openFun('view',scope.row)"><i></i></el-button>
            </div>
          </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row class='sys-page-list'>
            <el-col :span="24" align="right">
                <page-box :pagination='paginationInit' @change="queryList"></page-box>
            </el-col>
        </el-row>
      </div>
      <el-dialog title="价格提示" :visible.sync="priceDialogVisible" :close-on-click-modal="false" width="950px">
        <el-form label-width="126px" :model="priceDialogForm" ref="priceDialogForm" size="mini" label-position="right" class="order-label" :rules="rules" @keyup.enter.native="switchFoucsByEnter">
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="进出口标识标志" prop='type'>
                <el-select placeholder="" v-model="priceDialogForm.type"
                  filterable clearable
                  :disabled="isDetail"
                  ref="type" dataRef ='type'
                  style="width:100%">
                  <el-option
                    v-for="item in iEList"
                    :key="item.codeField"
                    :label="item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="境内收发货人" prop='tradeName'>
                <el-input v-model="priceDialogForm.tradeName" ref="tradeName" dataRef ='tradeName' :disabled="isDetail" :maxlength="70"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原产国(地区)" prop='originCountry'>
                <el-select placeholder="" v-model="priceDialogForm.originCountry"
                  filterable clearable remote default-first-option
                  :disabled="isDetail"
                  ref="originCountry" dataRef ='originCountry'
                  @focus="tipsFillMessage('countryParams','SAAS_COUNTRY')"
                  :remote-method="checkParamsList"
                  style="width:100%">
                  <el-option
                    v-for="item in countryParams"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="商品编号" prop='codeTs'>
                <el-input v-model="priceDialogForm.codeTs"
                  ref="codeTs" dataRef ='codeTs'
                  autofocus="true"
                  :maxlength="10" :disabled="isDetail"
                 @keyup.enter.native="queryHistoryGoods"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品名称" prop='gName'>
                <el-input v-model="priceDialogForm.gName" ref="gName" dataRef ='gName' :disabled="isDetail" :maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格型号" prop="gModel">
                <el-input v-model="priceDialogForm.gModel" ref="gModel" dataRef ='gModel' :disabled="isDetail" :maxlength="255"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
            <el-form-item label="单价" prop='declPrice'>
              <el-input v-model="priceDialogForm.declPrice" ref="declPrice" dataRef ='declPrice' :disabled="isDetail" :maxlength="19"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="币制" prop='tradeCurr'>
                <el-select placeholder="" v-model="priceDialogForm.tradeCurr"
                  filterable clearable remote default-first-option
                  :disabled="isDetail"
                  ref="tradeCurr" dataRef ='tradeCurr'
                  @focus="tipsFillMessage('curryParams','SAAS_CURR')"
                  :remote-method="checkParamsList"
                  style="width:100%">
                  <el-option
                    v-for="item in curryParams"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="价格浮动区间(%)" prop ='bandArea'>
                <el-input  v-model="priceDialogForm.bandArea"
                ref="bandArea" dataRef ='bandArea'
                enter = 'no' @keyup.enter.native="saveDialogForm"
                :disabled="isDetail" :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer"  v-if="!isDetail">
          <el-button size="mini" type="primary" @click="saveDialogForm" :disabled="isDetail">确定</el-button>
          <el-button size="mini" @click="cancleDialogForm" :disabled="isDetail">取消</el-button>
        </span>
      </el-dialog>
      <el-dialog
      title="历史商品数据"
      :visible.sync="historyGoodsVisible"
      class="sys-dec-class"
      :close-on-click-modal="false"
      :show-close='true'
      width="640px">
       <history-goods :initParams="initHistory"  @backDatas="historyGoodsData"  @cancLeData="historyGoodsCompnent"  v-if="historyGoodsVisible"></history-goods>
    </el-dialog>
    </section>
</template>
<script>
import util from '../../../../common/util'
import commonParam from '../../../../common/commonParam'
export default {
  components: {
    'history-goods': resolve => require(['./component/historyGoods.vue'], resolve)
  },
  name: 'priceRange',
  data () {
    return {
      priceList: [], // 表格数据
      priceDialogVisible: false, // 新增组件控制
      checkedNum: 0, // 被选中的数量
      checkedData: [], // 选中得数据
      queryForm: {// 列表查询条件
        type: '',
        tradeName: '',
        gName: '',
        codeTs: ''
      },
      priceDialogForm: {
        pid: '', // 主键
        type: 'I',
        tradeName: '',
        originCountry: '',
        gName: '',
        codeTs: '',
        gModel: '',
        declPrice: '',
        tradeCurr: '',
        bandArea: ''
      },
      isDetail: false, // 查看详情置灰
      historyGoodsVisible: false, // 历史商品数据弹出框
      initHistory: {},
      pages: {},
      rules: {
        type: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        codeTs: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ],
        tradeName: [
          { required: true, message: '请输入境内收发货人', trigger: 'blur' }
        ],
        gName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        gModel: [
          { required: true, message: '请输入规格型号', trigger: 'blur' }
        ],
        tradeCurr: [
          { required: true, message: '请选择币制', trigger: 'change' }
        ],
        declPrice: [
          { required: true, message: '请输入单价,整数最多14位小数最多4位', validator: this.checkValid, trigger: 'blur' }
        ],
        bandArea: [
          { required: true, message: '请输入价格浮动区间,整数最多5位小数最多4位', validator: this.checkValid, trigger: 'blur' }
        ],
        originCountry: [
          { required: true, message: '请选择原产国', trigger: 'change' }
        ]
      },
      ruleRegx: {
        'declPrice': '^\\d{1,14}(\\.\\d{1,4})?$|^$',
        'bandArea': '^\\d{1,5}(\\.\\d{1,4})?$|^$'
      },
      iEList: [
        {
          codeField: '',
          nameField: '全部'
        },
        {
          codeField: 'E',
          nameField: '出口'
        }, {
          codeField: 'I',
          nameField: '进口'
        }],
      thList: [{
        value: true,
        text: '进出口标识标志'
      }, {
        value: true,
        text: '境内收发货人'
      }, {
        value: true,
        text: '商品编码'
      }, {
        value: true,
        text: '商品名称'
      }, {
        value: true,
        text: '规格型号'
      }, {
        value: true,
        text: '单价'
      }, {
        value: true,
        text: '币制'
      }, {
        value: true,
        text: '单价浮动区间'
      }, {
        value: true,
        text: '原产国'
      }],
      countryParams: [], // 国家参数
      curryParams: [], // 币制参数
      selectObj: {
        obj: '',
        params: ''
      }
    }
  },
  watch: {},
  created () {
    this.paginationInit = this.$store.state.pagination
    this.getCommonParams()
    this.searchQueryForm()
  },
  methods: {
    // 查询
    searchQueryForm () {
      this.queryList(this.$store.state.pagination)
    },
    // 重置
    resetQueryForm () {
      this.queryForm = {// 列表查询条件
        type: '',
        tradeName: '',
        gName: '',
        codeTs: ''
      }
    },
    // 列表
    queryList (pagination) {
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/decParam/common/getPriceList',
        data: {
          ...this.queryForm,
          page: pagination
        },
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.priceList = res.result.list
          this.paginationInit = res.page
        }
      })
    },
    // 打开弹出框
    openFun (type, row) {
      this.resetDialogForm()
      if (type === 'view') {
        this.priceDialogForm = row
        this.priceDialogForm.declPrice = row.declPrice + ''
        this.priceDialogForm.bandArea = row.bandArea + ''
        this.isDetail = true
      } else if (type === 'edit') {
        this.priceDialogForm = row
        this.priceDialogForm.declPrice = row.declPrice + ''
        this.priceDialogForm.bandArea = row.bandArea + ''
        this.isDetail = false
      } else {
        this.isDetail = false
      }
      this.priceDialogVisible = true
    },
    // 删除
    deleteFun () {
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
        url: 'API@/dec-common/decParam/common/delDecPriceInfo',
        data: {
          'list': pidList
        },
        router: this.$router,
        success: (res) => {
          if (res.code === '0000') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.queryList(this.$store.state.pagination)
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }
      })
    },
    // 保存
    saveDialogForm () {
      this.$refs['priceDialogForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('ajax', {
            url: 'API@/dec-common/decParam/common/saveDecPriceInfo',
            data: this.priceDialogForm,
            router: this.$router,
            success: (res) => {
              if (res.code === '0000') {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.priceDialogVisible = false
                this.queryList(this.$store.state.pagination)
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
    // 取消
    cancleDialogForm () {
      this.priceDialogVisible = false
    },
    // 选中
    selectVal (val) {
      this.checkedData = val
      this.checkedNum = val.length
    },
    // 重置弹出框表单
    resetDialogForm () {
      this.priceDialogForm = {
        pid: '', // 主键
        type: 'I',
        tradeName: '',
        originCountry: '',
        gName: '',
        codeTs: '',
        gModel: '',
        declPrice: '',
        tradeCurr: '',
        bandArea: ''
      }
      this.$nextTick(() => {
        this.$refs['priceDialogForm'].clearValidate()
      })
      this.searchQueryForm()
      this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_CURR')).slice(0, 10)
      this.countryParams = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY')).slice(0, 10)
    },
    // 历史商品数据弹出框
    queryHistoryGoods () {
      if (util.isEmpty(this.priceDialogForm.type) || this.priceDialogForm.codeTs.length === 0) {
        return
      }
      this.initHistory = {
        iEFlag: this.priceDialogForm.type,
        codeTs: this.priceDialogForm.codeTs
      }
      this.historyGoodsVisible = true
    },
    // 历史商品数据
    historyGoodsData (param) {
      let decList = util.simpleClone(param.goodsInfo)
      this.priceDialogForm.codeTs = decList.codeTs
      this.priceDialogForm.tradeName = decList.tradeName
      this.priceDialogForm.gName = decList.gName
      this.priceDialogForm.gModel = decList.gModel
      this.priceDialogForm.tradeCurr = decList.tradeCurr
      this.priceDialogForm.declPrice = decList.declPrice
      this.priceDialogForm.originCountry = decList.originCountry
      this.selectObj = {
        obj: 'curryParams',
        params: 'SAAS_CURR'
      }
      this.checkParamsList(this.priceDialogForm.tradeCurr)
      this.selectObj = {
        obj: 'countryParams',
        params: 'SAAS_COUNTRY'
      }
      this.checkParamsList(this.priceDialogForm.originCountry)
      this.historyGoodsVisible = false
    },
    // 取消选择历史商品数据
    historyGoodsCompnent () {
      this.historyGoodsVisible = false
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
      let par = ['SAAS_CURR', 'SAAS_COUNTRY']
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
            this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_CURR')).slice(0, 10)
            this.countryParams = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY')).slice(0, 10)
          }
        })
      } else {
        this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_CURR')).slice(0, 10)
        this.countryParams = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY')).slice(0, 10)
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
    // 校验
    checkValid (rule, value, callback) {
      let name = rule.field
      if (!value && !rule.required) {
        callback()
      }
      if ((!this.ruleRegx[name] && !value) || (rule.required && !value)) { // 校验规则不存在且输入为空值
        this.$refs['priceDialogForm'].clearValidate([name])
        callback(new Error(rule.message))
        return
      }
      let reg = new RegExp(this.ruleRegx[name])
      if (!reg.test(value)) {
        this.$refs['priceDialogForm'].clearValidate([name])
        callback(new Error(rule.message))
      } else {
        callback()
      }
    },
    // 调用切换焦点的方法
    switchFoucsByEnter (e) {
      e.srcElement.blur()
      // 获取当前焦点所在的 form表单
      let form = e.srcElement.form
      // 获取form表单下的所有 input
      let focusable = form.querySelectorAll('input')
      let newFocusable = []
      // 排除 disabled 属性的 input
      for (let n in focusable) {
        if (focusable[n].disabled === false) {
          newFocusable.push(focusable[n])
        }
      }
      focusable = newFocusable
      // 排除disabled元素
      let index
      for (let i in focusable) {
        if (e.srcElement === focusable[i]) {
          index = i
          break
        }
      }
      // 下一个元素
      let next = focusable[parseInt(index) + 1]
      // 上一个元素
      let prev = focusable[parseInt(index) - 1]
      if (e.shiftKey) { // shift+enter 光标向上个元素移动
        if (prev) {
          if (e.srcElement.attributes.shiftEnter && e.srcElement.attributes.shiftEnter.nodeValue === 'no') {
            return false
          } else {
            if (e.srcElement.parentElement.offsetParent.attributes.class.nodeValue === 'el-select el-select--mini') {
              let ref = e.srcElement.parentElement.offsetParent.attributes.dataRef.nodeValue
              this.$refs[ref].blur()
            }
            prev.focus()
          }
        }
      } else if (e.ctrlKey && this.localName === 'textarea') { // Ctrl+enter 在textaera中换行
        let myValue = '\n'
        let t = e.srcElement
        if (document.selection) { // ie<9
          t.focus()
          let sel = document.selection.createRange()
          sel.text = myValue
          t.focus()
          sel.moveStart('character', -1)
        } else if (t.selectionStart || t.selectionStart === '0') { // 现代浏览器
          let startPos = t.selectionStart
          let endPos = t.selectionEnd
          let scrollTop = t.scrollTop
          t.value = t.value.substring(0, startPos) + myValue + t.value.substring(endPos, t.value.length)
          t.focus()
          // 因为myValue回车显示为\n
          t.selectionStart = startPos + myValue.length
          t.selectionEnd = startPos + myValue.length
          t.scrollTop = scrollTop
        } else {
          t.value += myValue
          t.focus()
        }
      } else {
        if (e.srcElement.localName === 'textarea') { // enter 光标向下个元素移动
          e.preventDefault()
          e.stopPropagation()
        }
        // 下个元素存在
        if (next) {
          if (e.srcElement.attributes.enter && e.srcElement.attributes.enter.nodeValue === 'no') {
            return false
          } else {
            if (e.srcElement.parentElement.offsetParent.attributes.class.nodeValue === 'el-select el-select--mini') {
              let ref = e.srcElement.parentElement.offsetParent.attributes.dataRef.nodeValue
              this.$refs[ref].blur()
            }
            next.focus()
            next.select()
          }
        }
      }
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
  .query-btn {
    text-align: center;
  }
  .m-r-10{
    margin-right: 10px;
  }
  .span-right{
    float: right;
    margin-right: 2%;
    color: #0b93f3;
    margin-top: 6px;
  }
  .airvehicle-table-popper{
    min-width: auto;
    ul{
        li{
            line-height: 20px;
            .el-checkbox__label{
                font-size: 12px;
            }
        }
    }
  }
  .airvehicle-list-drop {
    float: right;
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

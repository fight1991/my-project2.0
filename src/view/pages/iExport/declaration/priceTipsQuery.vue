<template>
  <section class='query-main'>
    <!-- 查询条件 -->
    <div class = "query-condition">
      <!-- -->
      <el-form label-width="80px" :model="QueryPriceTipsForm" size="mini" label-position="right" >
        <el-row :gutter="50">
          <el-col :span="6">
              <el-form-item label="业务类型" prop='type'>
                <el-select placeholder="" v-model="QueryPriceTipsForm.type"
                  filterable clearable style="width:100%">
                  <el-option
                    v-for="item in iEList"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <el-col :span="6">
            <el-form-item label="境内收发货人" >
              <el-input v-model="QueryPriceTipsForm.tradeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品名称">
              <el-input v-model="QueryPriceTipsForm.gName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品编号">
              <el-input v-model="QueryPriceTipsForm.codeTs"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="24" class='query-btn'>
            <el-button size="mini" type="primary" @click="queryPriceTipsList" style="padding: 8px 20px;">查询</el-button>
            <el-button size="mini" @click="resetQueryPriceTipsForm" style="padding: 8px 20px;">重置</el-button>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
    </div>
    <!-- 主显示框 -->
    <div class='query-table'>
      <!-- 操作 -->
       <el-row class="op-btn">
        <el-button @click="openAddPage"  size="mini"><span class="icon-btn icon-btn-add"></span>新增</el-button>
        <el-button @click="openEditPage"  size="mini"><span class="icon-btn icon-btn-edit"></span>编辑</el-button>
        <el-button @click="deleteInfo"  size="mini"><span class="icon-btn icon-btn-delete"></span>删除</el-button>
      </el-row>
      <!-- 列表 list -->
      <el-table class='sys-table-table' :data="priceTipsList"
         @selection-change="priceTipsListChange"
         border highlight-current-row size="mini"  height="400">
         <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column label="业务类型" prop="type" min-width="150"></el-table-column>
        <el-table-column label="境内收发货人" prop="tradeName" min-width="150"></el-table-column>
        <el-table-column label="商品名称" prop="gName" min-width="150"></el-table-column>
        <el-table-column label="商品编号" prop="codeTs" min-width="100"></el-table-column>
        <el-table-column label="规格型号" prop="gModel" min-width="150"></el-table-column>
        <el-table-column label="币制" prop="tradeCurrValue" min-width="100"></el-table-column>
        <el-table-column label="单价" prop="declPrice" min-width="80"></el-table-column>
        <el-table-column label="浮动区间" prop="bandArea" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.bandArea}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="原产国地区" prop="originCountryValue" min-width="100"></el-table-column>
      </el-table>
      <!--分页-->
      <el-row class='sys-page-list'>
        <el-col :span="24" align="right">
            <page-box @change="pageList()"></page-box>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="价格提示"
      :visible.sync="priceTipsVisible"
      :before-close='beforeClose'
      width="900px">
      <el-form label-width="100px" size="mini" :rules="rules" @keyup.enter.native="switchFoucsByEnter"
       label-position="right" :model="priceTipsForm" ref='priceTipsForm'>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="业务类型" prop='type'>
                <el-select placeholder="" v-model="priceTipsForm.type"
                  @change="iEFlagChange" filterable clearable
                  ref="type" dataRef ='type'
                  style="width:100%">
                  <el-option
                    v-for="item in iEList"
                    :key="item.codeField"
                    :label="item.codeField + '-' + item.nameField"
                    :value="item.codeField">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品编号" prop='codeTs'>
                <el-input v-model="priceTipsForm.codeTs"
                  ref="codeTs" dataRef ='codeTs'
                  autofocus="true"
                 @keyup.enter.native="queryHistoryGoods"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="境内收发货人" prop='tradeName'>
                <el-input v-model="priceTipsForm.tradeName"
                ref="tradeName" dataRef ='tradeName'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品名称" prop='gName'>
                <el-input v-model="priceTipsForm.gName"
                ref="gName" dataRef ='gName'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格型号" prop='gModel'>
                <el-input v-model="priceTipsForm.gModel"
                ref="gModel" dataRef ='gModel'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="币制" prop='tradeCurr'>
                <el-select placeholder="" v-model="priceTipsForm.tradeCurr"
                  filterable clearable remote default-first-option
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
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="单价" prop='declPrice'>
                <el-input v-model="priceTipsForm.declPrice"
                ref="declPrice" dataRef ='declPrice'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="价格浮动区间(%)" prop ='bandArea' required>
                <el-input  v-model="priceTipsForm.bandArea"
                ref="bandArea" dataRef ='bandArea'
                placeholder="填写1~99"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="originCountryShow">
              <el-form-item label="原产国(地区)" prop='originCountry'>
                <el-select placeholder="" v-model="priceTipsForm.originCountry"
                  filterable clearable remote default-first-option
                  ref="originCountry" dataRef ='originCountry'
                  enter = 'no' @keyup.enter.native="savePriceTips"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="layer-btn-primary" @click="savePriceTips" >确定</el-button>
        <el-button class="layer-btn" @click="canclePriceTips" >取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="历史商品数据"
      :visible.sync="historyGoodsVisible"
      class="sys-dec-class"
      :show-close='true'
      width="640px">
       <history-goods :initParams="initHistory"  @backDatas="historyGoodsData"  @cancLeData="historyGoodsCompnent"  v-if="historyGoodsVisible"></history-goods>
    </el-dialog>
  </section>
</template>

<script>
import util from '@/common/util'
import historyGoods from './component/historyGoods.vue'
export default {
  components: {
    historyGoods
  },
  name: 'priceTipsQuery',
  data () {
    var bandAreaLimit = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输浮动区间'))
      } else if (!(/^[1-9][0-9]?$/.test(value))) {
        callback(new Error('请输入1~99的数字'))
      } else {
        callback()
      }
    }
    return {
      QueryPriceTipsForm: {
        type: '', // 业务类型
        codeTs: '', // 商品编号
        tradeName: '', // 境内收发货人
        gName: '' // 商品名称
      },
      priceTipsList: [], // table表加载数据
      countryParams: [], // 国家参数
      curryParams: [], // 币制参数
      checkedData: [], // 选中得数据
      iEList: [
        {
          codeField: 'E',
          nameField: '出口报关'
        }, {
          codeField: 'I',
          nameField: '进口报关'
        }],
      priceTipsVisible: false, // 控制新增编辑时的弹出框
      priceTipsForm: {
        pid: '', // 主键
        type: 'I', // 业务类型
        codeTs: '', // 商品编号
        tradeName: '', // 境内收发货人
        gName: '', // 商品名称
        gModel: '', // 规格型号
        tradeCurr: '', // 币制
        declPrice: '', // 单价
        bandArea: '', // 浮动区间
        originCountry: '' // 原产国
      },
      selectObj: {
        obj: '',
        params: ''
      },
      historyGoodsVisible: false, //
      initHistory: {},
      originCountryShow: true,
      rules: {
        type: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        codeTs: [
          { required: true, message: '请输入10位商品编号', trigger: 'blur' }
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
          { required: true, message: '请选择币制', trigger: 'blur' }
        ],
        declPrice: [
          { required: true, message: '请输入单价', trigger: 'blur' }
        ],
        bandArea: [
          { validator: bandAreaLimit, trigger: 'blur' }
        ],
        originCountry: [
          { required: true, message: '请选择原产国', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCommonParams()
  },
  mounted () {
  },
  methods: {
    resetQueryPriceTipsForm  () {
      this.QueryPriceTipsForm = {
        type: '', // 业务类型
        codeTs: '', // 商品编号
        tradeName: '', // 境内收发货人
        gName: '' // 商品名称
      }
    },
    // 打开新增页面
    openAddPage () {
      this.priceTipsVisible = true
    },
    beforeClose () {
      this.resetPriceTipsForm()
      this.$refs['priceTipsForm'].resetFields()
      this.priceTipsVisible = false
    },
    // 打开编辑页面
    openEditPage () {
      if (this.checkedData.length !== 1) {
        this.messageTips('选择一条数据,且只能选择一条数据', 'error')
        return false
      }
      this.priceTipsForm = util.simpleClone(this.checkedData[0])
      this.priceTipsForm.declPrice = this.removeZero(this.priceTipsForm.declPrice)
      this.selectObj = {
        obj: 'curryParams',
        params: 'SAAS_CURR'
      }
      this.checkParamsList(this.priceTipsForm.tradeCurr)
      this.selectObj = {
        obj: 'countryParams',
        params: 'SAAS_COUNTRY'
      }
      this.checkParamsList(this.priceTipsForm.originCountry)
      this.priceTipsVisible = true
    },
    // 删除 操作
    deleteInfo () {
      if (this.checkedData.length === 0) {
        this.messageTips('选择一条数据', 'error')
        return false
      }
      let pidList = []
      for (let i in this.checkedData) {
        pidList.push(this.checkedData[i].pid)
      }
      this.$post({
        url: 'API@/dec-common/decParam/common/delDecPriceInfo',
        data: {
          'list': pidList
        },
        success: (res) => {
          this.messageTips(res.message, 'success')
          this.pageList()
        }
      })
    },
    priceTipsListChange (value) {
      this.checkedData = value
    },
    // 报关单列表查询
    queryPriceTipsList () {
      this.$store.commit('pageInit')
      this.pageList()
    },
    // 分页列表
    pageList () {
      this.$post({
        url: 'API@/dec-common/decParam/common/getPriceList',
        data: this.QueryPriceTipsForm,
        isPageList: true,
        success: (res) => {
          this.priceTipsList = res.result
          this.total = res.page.total
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
    // 获取公共字典list
    getCommonParams () {
      let par = ['SAAS_CURR', 'SAAS_COUNTRY']
      this.$post({
        useStorage: true,
        storageKey: par,
        hasStorageCallback: () => {
          this.getDataFromStorage()
        },
        url: 'API@/saas-dictionary/dictionary/getParam',
        data: {
          'tableNames': par
        },
        success: (res) => {
          this.getDataFromStorage()
        }
      })
    },
    getDataFromStorage () {
      this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_CURR')).slice(0, 10)
      this.countryParams = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY')).slice(0, 10)
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
    queryHistoryGoods () {
      if (util.isEmpty(this.priceTipsForm.type) || this.priceTipsForm.codeTs.length !== 10) {
        return
      }
      this.initHistory = {
        iEFlag: this.priceTipsForm.type,
        codeTs: this.priceTipsForm.codeTs
      }
      this.historyGoodsVisible = true
    },
    historyGoodsData (param) {
      let decList = util.simpleClone(param.goodsInfo)
      this.priceTipsForm.tradeName = decList.tradeName
      this.priceTipsForm.gName = decList.gName
      this.priceTipsForm.gModel = decList.gModel
      this.priceTipsForm.tradeCurr = decList.tradeCurr
      this.priceTipsForm.declPrice = this.removeZero(decList.declPrice)
      this.priceTipsForm.originCountry = decList.originCountry
      this.selectObj = {
        obj: 'curryParams',
        params: 'SAAS_CURR'
      }
      this.checkParamsList(this.priceTipsForm.tradeCurr)
      this.selectObj = {
        obj: 'countryParams',
        params: 'SAAS_COUNTRY'
      }
      this.checkParamsList(this.priceTipsForm.originCountry)
      this.historyGoodsVisible = false
    },
    // 取消选择历史商品数据
    historyGoodsCompnent () {
      this.historyGoodsVisible = false
    },
    iEFlagChange (value) {
      if (value === 'I') {
        this.originCountryShow = true
      } else {
        this.originCountryShow = false
      }
    },
    // 保存
    savePriceTips () {
      this.$refs['priceTipsForm'].validate((valid) => {
        if (valid) {
          this.$post({
            url: 'API@/dec-common/decParam/common/saveDecPriceInfo',
            data: this.priceTipsForm,
            success: (res) => {
              this.messageTips(res.message, 'success')
              this.resetPriceTipsForm()
              this.$refs['priceTipsForm'].resetFields()
              this.priceTipsVisible = false
              this.pageList()
            }
          })
        }
      })
    },
    canclePriceTips () {
      this.resetPriceTipsForm()
      this.$refs['priceTipsForm'].resetFields()
      this.priceTipsVisible = false
    },
    resetPriceTipsForm () {
      this.priceTipsForm = {
        pid: '', // 主键
        type: 'I', // 业务类型
        codeTs: '', // 商品编号
        tradeName: '', // 境内收发货人
        gName: '', // 商品名称
        gModel: '', // 规格型号
        tradeCurr: '', // 币制
        declPrice: '', // 单价
        bandArea: '', // 浮动区间
        originCountry: '' // 原产国
      }
      this.curryParams = JSON.parse(window.localStorage.getItem('SAAS_CURR')).slice(0, 10)
      this.countryParams = JSON.parse(window.localStorage.getItem('SAAS_COUNTRY')).slice(0, 10)
    },
    removeZero (value) {
      if (util.isEmpty(value)) {
        return ''
      } else {
        return parseFloat(value) === 0 ? '' : parseFloat(value)
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
    // background-color: #f5f5f5;
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
    vertical-align: sub;
    margin-right: 5px;
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

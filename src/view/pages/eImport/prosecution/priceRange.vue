<template>
    <section class='sys-main'>
      <!-- 头部 -->
      <el-row class = "query-condition">
      <!-- 查询条件 -->
        <el-form label-width="100px" label-position="right" :model="queryForm" ref="queryForm">
          <el-row :gutter="10">
          <el-col :span="6" :xs="12">
            <el-form-item label="进出口标识" prop='type'>
              <el-select placeholder="" v-model="queryForm.type"
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
          <el-col :span="6" :xs="12">
            <el-form-item label="境内收发货人">
              <el-input size="mini" clearable v-model="queryForm.tradeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="商品名称">
              <el-input size="mini" clearable v-model="queryForm.gName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :xs="12">
            <el-form-item label="商品编码">
              <el-input size="mini" clearable v-model="queryForm.codeTs"></el-input>
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
        <el-row class="op-btn">
          <el-button size="mini" @click="openAddPage" icon="fa fa-plus fa-lg">&nbsp;新增</el-button>
          <el-button size="mini" @click="deleteFun" icon="fa fa-trash-o fa-lg">&nbsp;删除</el-button>
          <div class="airvehicle-list-drop">
          <el-popover popper-class="airvehicle-table-popper">
            <ul>
              <li v-for="(item,index) in thList" :key="index">
                <el-checkbox size="mini" v-model="item.value">{{item.text}}</el-checkbox>
              </li>
            </ul>
            <el-button size="mini" icon="fa fa-list fa-lg" slot="reference"></el-button>
          </el-popover>
        </div>
          <span class="span-right">已选择{{checkedNum}}项</span>
        </el-row>
        <!-- 列表 list -->
        <el-table class='sys-table-table'
          height="400" border highlight-current-row size="mini"
          :data="priceList"
          @selection-change="selectVal">
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button size="mini" type="text" icon="fa fa-pencil-square-o" title="编辑" @click="openEditPage(scope.row)"></el-button>
            <el-button size="mini" type="text" icon="fa fa-search" title="详情" @click="openDetailPage(scope.row)"></el-button>
          </template>
          </el-table-column>
          <el-table-column label="进出口标识" min-width="80" prop="type" v-if="thList[0].value">
          </el-table-column>
          <el-table-column label="境内收发货人" min-width="150" prop="tradeName" v-if="thList[1].value">
          </el-table-column>
          <el-table-column label="商品编码" min-width="100" prop="codeTs" v-if="thList[2].value">
          </el-table-column>
          <el-table-column label="商品名称" min-width="150" prop="gName" v-if="thList[3].value">
          </el-table-column>
          <el-table-column label="规格型号" min-width="150" prop="gModel" v-if="thList[4].value">
          </el-table-column>
          <el-table-column label="单价" min-width="80" prop="declPrice" v-if="thList[5].value">
          </el-table-column>
          <el-table-column label="币制" min-width="100" prop="tradeCurrValue" v-if="thList[6].value">
          </el-table-column>
          <el-table-column label="浮动区间" min-width="80" prop="bandArea" v-if="thList[7].value">
          <template slot-scope="scope">
            <span>{{scope.row.bandArea}}%</span>
          </template>
        </el-table-column>
          <el-table-column label="原产国" min-width="80" prop="originCountryValue" v-if="thList[8].value">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-row class='sys-page-list'>
            <el-col :span="24" align="right">
                <page-box @change="queryList()"></page-box>
            </el-col>
        </el-row>
      </div>
      <el-dialog title="价格提示" :visible.sync="priceDialogVisible" width="950px" :before-close='beforeClose'>
        <el-form label-width="150px" :model="priceDialogForm" ref="priceDialogForm" size="mini" label-position="right" class="order-label" :rules="rules" @keyup.enter.native="switchFoucsByEnter">
          <el-row>
            <el-col :span="8">
              <el-form-item label="进出口标识" prop='type'>
                <el-select placeholder="" v-model="priceDialogForm.type"
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
              <el-form-item label="境内收发货人" prop='tradeName'>
                <el-input v-model="priceDialogForm.tradeName" ref="tradeName" dataRef ='tradeName' :readonly="isDetail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品名称" prop='gName'>
                <el-input v-model="priceDialogForm.gName" ref="gName" dataRef ='gName' :readonly="isDetail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="商品编码" prop='codeTs'>
                <el-input v-model="priceDialogForm.codeTs" autofocus="true" ref="codeTs" dataRef ='codeTs' :readonly="isDetail" @keyup.enter.native="queryHistoryGoods"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格型号" prop="gModel">
                <el-input v-model="priceDialogForm.gModel" ref="gModel" dataRef ='gModel' :readonly="isDetail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="单价" prop='declPrice'>
              <el-input v-model="priceDialogForm.declPrice" ref="declPrice" dataRef ='declPrice' :readonly="isDetail"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
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
              <el-form-item label="价格浮动区间(%)" prop ='bandArea' required>
                <el-input  v-model="priceDialogForm.bandArea" ref="bandArea" dataRef ='bandArea' :readonly="isDetail"
                placeholder="填写1~99"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="originCountryShow">
              <el-form-item label="原产国(地区)" prop='originCountry'>
                <el-select placeholder="" v-model="priceDialogForm.originCountry"
                  filterable clearable remote default-first-option
                  :disabled="isDetail"
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
          <el-button class="layer-btn-primary" @click="saveDialogForm" :readonly="isDetail">确定</el-button>
          <el-button class="layer-btn" @click="cancleDialogForm" :readonly="isDetail">取消</el-button>
        </span>
      </el-dialog>
    </section>
</template>
<script>
import util from '../../../../common/util'
import commonParam from '../../../../common/commonParam'
export default {
  name: 'priceRange',
  data () {
    return {
      priceList: [], // 表格数据
      priceDialogVisible: false, // 新增组件控制
      checkedNum: 0, // 被选中的数量
      queryForm: {// 列表查询条件
        type: '',
        tradeName: '',
        gName: '',
        codeTs: ''
      },
      priceDialogForm: {
        pid: '', // 主键
        type: '',
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
      originCountryShow: true,
      pages: {},
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
          { required: true, message: '请选择币制', trigger: 'change' }
        ],
        declPrice: [
          { required: true, message: '请输入单价', trigger: 'blur' }
        ],
        bandArea: [
          { required: true, message: '', validator: this.checkValid, trigger: 'blur' }
        ],
        originCountry: [
          { required: true, message: '请选择原产国', trigger: 'change' }
        ]
      },
      iEList: [
        {
          codeField: 'E',
          nameField: '出口报关'
        }, {
          codeField: 'I',
          nameField: '进口报关'
        }],
      thList: [{
        value: true,
        text: '进出口标识'
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
      }]
    }
  },
  countryParams: [], // 国家参数
  curryParams: [], // 币制参数
  selectObj: {
    obj: '',
    params: ''
  },
  watch: {},
  created () {
    this.getCommonParams()
  },
  methods: {
    // 查询
    searchQueryForm () {
      this.$store.commit('pageInit')
      this.queryList()
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
    queryList () {
      this.$store.dispatch('ajax', {
        url: 'API@/dec-common/decParam/common/getPriceList',
        data: this.queryForm,
        router: this.$router,
        isPageList: true,
        success: (res) => {
          this.priceList = res.result
          this.total = res.page.total
        }
      })
    },
    // 打开新增页面
    openAddPage () {
      this.priceDialogVisible = true
      this.initSelected(this.priceSelectDown, this.priceDialogForm)
      this.getCommonParams()
    },
    // 删除
    deleteFun () {

    },

    // 保存
    saveDialogForm () {},
    // 取消
    cancleDialogForm () {},
    // 多选框
    selectVal (val) {
      this.selectData = val
    },
    // 关闭弹出框
    beforeClose () {
      this.resetDialogForm()
      this.$refs['priceDialogForm'].resetFields()
      this.priceDialogVisible = false
    },
    resetDialogForm () {
      this.priceDialogForm = {
        pid: '', // 主键
        type: '',
        tradeName: '',
        originCountry: '',
        gName: '',
        codeTs: '',
        gModel: '',
        declPrice: '',
        tradeCurr: '',
        bandArea: ''
      }
    },
    // 根据进出口类型控制原产国是否显示
    iEFlagChange (value) {
      if (value === 'I') {
        this.originCountryShow = true
      } else {
        this.originCountryShow = false
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
    // 提示需要填写的内容
    tipsFillMessage (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
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
    // 重复次数校验
    checkValid (rule, value, callback) {
      if (util.isEmpty(value)) {
        this.$refs['priceDialogForm'].clearValidate([name])
        callback(new Error('请输浮动区间'))
      } else if (this.submitData.repeatCount !== '0') {
        const pattern = /^[1-9][0-9]?$/
        if (!pattern.test(value)) {
          this.$refs['priceDialogForm'].clearValidate([name])
          callback(new Error('99的数字'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    switchFoucsByEnter (e) {
      // 给input的父元素form表单绑定keyup时间 由input触发(事件冒泡)
      // 找到所有input,并转化成数组
      let inputBox = Array.from(e.target.form.querySelectorAll('input'))
      // 过滤掉属性为readonly 或placeholder为空值input
      let newInputBox = inputBox.filter(v => {
        return (!v.readOnly || v.placeholder) && !v.disabled
      })
      // 找到目标元素在newInputBox中的位置
      let index = newInputBox.findIndex(v => {
        return e.target === v
      })
      // 下一个元素获取焦点
      if (index < newInputBox.length - 1) {
        newInputBox[index + 1].focus()
      }
    }
  }
}
</script>
<style scoped lang="less">
.query-main {
    // background-color: #e5f2ff;
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
    margin-right: 5px;
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

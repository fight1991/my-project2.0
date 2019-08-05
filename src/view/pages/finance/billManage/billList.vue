<template>
  <section class='sys-main costList'>
    <el-row class='query-condition'>
      <el-form :label-width="labelFormWidth.four"  :model="QueryForm" size="mini" label-position="right">
        <!-- 查询条件-->
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="开票企业">
              <el-autocomplete style="width:100%;"
                class="inline-input" :maxlength="30" clearable
                v-model="QueryForm.settleCompanyNames"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                placeholder="请选择">
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="委托企业">
              <el-select v-model="QueryForm.entrustCompanyNames" size="mini" clearable  style="width:100%;">
                <el-option key="0" :label="'应收'" :value="true"></el-option>
                <el-option key="1" :label="'应付'" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="币制">
              <el-select  v-model="QueryForm.curr" placeholder="币制"
                filterable clearable remote default-first-option
                @focus="tipsFill('currList','SAAS_CURR')"
                :remote-method="checkParamsList"
                style="width:100%">
                <el-option
                  v-for="item in currList"
                  :key="item.codeField"
                  :label="item.codeField + '-' + item.nameField"
                  :value="item.codeField">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发票类型">
              <el-select v-model="QueryForm.invoiceType" size="mini" clearable style="width:100%;">
                <el-option key="0" :label="'待审核'" :value="'1'"></el-option>
                <el-option key="6" :label="'审核退回'" :value="'2'"></el-option>
                <el-option key="9" :label="'待对账'" :value="'3'"></el-option>
                <el-option key="13" :label="'对账驳回'" :value="'4'"></el-option>
                <el-option key="14" :label="'对账确认'" :value="'5'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="操作人">
              <el-select v-model="QueryForm.createUserName" size="mini" clearable style="width:100%;">
                <el-option key="0" :label="'未开票'" :value="'0'"></el-option>
                <el-option key="6" :label="'已开票'" :value="'1'"></el-option>
                <el-option key="9" :label="'部分开票'" :value="'2'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票日期">
              <el-date-picker
                style="width:100%"
                v-model="dates"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                 end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 查询条件 end-->
      </el-form>
      <el-row class="query-btn" style="text-align:center">
        <el-button size="mini" type="primary" @click="getAccountList($store.state.pagination)">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-row>
    </el-row>
    <!-- 列表表格开始 -->
    <div class='query-table-finance'>
      <el-row class="table-btn">
        <!-- <el-button size="mini" class="list-btns list-icon-checkP" @click="accountCheck('verifys')"><i></i>批量审核确认</el-button> -->
        <!-- <el-button size="mini" class="list-btns list-icon-check" @click="accountCheck('rejects')"><i></i>批量审核驳回</el-button> -->
        <!-- 对账单导出选项 -->
        <el-dropdown trigger="click" @command="getAccountItem" placement="bottom-start">
          <el-button size="mini" class="list-btns list-icon-exportO">
            <i class="other"></i>对账单导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="1" :key="1">普通Excel样式导出</el-dropdown-item>
            <el-dropdown-item :command="2" :key="2">金蝶样式导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-table class='sys-table-table' align="left"
        :data="invoiceTableList" border highlight-current-row height="530px"  ref="invoiceTable"
        @select="chooseSelectBox"
        @row-click="chooseSelectRow"
        @select-all="chooseSelectBoxAll">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column label="发票号" min-width="100" prop="invoiceNum">
        </el-table-column>
        <el-table-column label="发票企业" min-width="100" prop="settleCompanyNames" align="left">
        </el-table-column>
        <el-table-column label="委托企业" min-width="100" prop="entrustCompanyNames" align="left">
        </el-table-column>
        <el-table-column label="发票类别" min-width="80" prop="invoiceTypeValue" align="center">
        </el-table-column>
        <el-table-column label="币制" min-width="80" prop="curr" align="center">
        </el-table-column>
        <el-table-column label="发票金额" min-width="100" prop="amount" align="center">
        </el-table-column>
        <el-table-column label="操作人" min-width="100" prop="createUserName" align="center">
        </el-table-column>
        <el-table-column label="开票日期" min-width="100" prop="createDate" align="center">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80" align="center">
          <template slot-scope="scope">
            <div class="sys-td-c">
              <el-button type="text" title="查看" class="table-icon list-icon-look" @click.stop="goToAccountDetail('look', scope.row.accountBillId)"><i></i></el-button>
              <!-- <el-button type="text" title="账单审核" class="table-icon list-icon-subimtCheck" @click.stop="goToAccountDetail('check', scope.row.accountBillId)"><i></i></el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='sys-page-list mg-b-30'>
        <el-col :span="24" align="right">
          <page-box :pagination='paginationInit' @change="getInvoiceList"></page-box>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import util from '@/common/util'
import commonParam from '@/common/commonParam'
export default {
  data () {
    return {
      dates: '',
      QueryForm: {
        createStartDate: '', // 开票日期
        createEndDate: '',
        createUserName: '', // 操作人
        entrustCompanyNames: '', // 委托企业
        invoiceType: '', // 发票类型
        settleCompanyNames: '' // 开票企业
      },
      invoiceTableList: [],
      // 查询的字典字段
      tableNameList: {
        tableNames: [
          'SAAS_CURR' // 币制
        ]
      },
      currList: [],
      selectObj: {
        obj: '',
        params: ''
      },
      paginationInit: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: mapState({ // 查看vuex中当前登录的userId
    currentUser (state) {
      return state.userLoginInfo.userId
    }
  }),
  created () {
    this.getCommonParam()
    this.getSettleCompanyInfo()
    this.paginationInit = this.$store.state.pagination
    this.getAccountList(this.$store.state.pagination)
  },
  methods: {
    // 获取账单企业列表
    getSettleCompanyInfo () {
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/account/getSettleCompanyInfo',
        data: {},
        router: this.$router,
        success: ({result}) => {
          this.settleCompanyList = result || []
        }
      })
    },
    querySearch (queryString, cb) {
      let results = []
      if (this.settleCompanyList.length === 0) return cb(results)
      let restaurants = this.settleCompanyList
      if (queryString.trim().length > 1) {
        results = restaurants.filter(v => {
          return (v && v.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
        })
      }
      if (results.length === 0) return cb(results)
      let tempArr = results.map(item => ({value: item}))
      cb(tempArr)
    },
    // 判断缓存中是否有数据
    getCommonParam () {
      let map = {tableNames: []}
      map.tableNames = commonParam.isRequire(this.tableNameList.tableNames)
      if (map.tableNames.length > 0) {
        this.getCommonParams(map)
      }
    },
    // 获取公共字典list
    getCommonParams (datas) {
      this.$store.dispatch('ajax', {
        url: 'API@/saas-dictionary/dictionary/getParam',
        data: datas,
        router: this.$router,
        success: (res) => {
          commonParam.saveParams(res.result)
        }
      })
    },
    checkParamsList (query) {
      if (query !== '') {
        let keyValue = query.toString().trim()
        let list = JSON.parse(localStorage.getItem(this.selectObj.params))
        let filterList = []
        if (util.isEmpty(keyValue)) {
          this[this.selectObj.obj] = list.slice(0, 30)
        } else {
          filterList = list.filter(item => {
            let str = item.codeField + '-' + item.nameField
            return str.toLowerCase().indexOf(keyValue.toLowerCase()) > -1
          })
          this[this.selectObj.obj] = filterList.slice(0, 30)
        }
      } else {
        if (!util.isEmpty(JSON.parse(localStorage.getItem(this.selectObj.params)))) {
          this[this.selectObj.obj] = JSON.parse(localStorage.getItem(this.selectObj.params)).slice(0, 30)
        }
      }
    },
    // 创建字典参数列表
    tipsFill (obj, params) {
      this.selectObj = {
        obj: obj,
        params: params
      }
    },
    // 获取账单列表
    getInvoiceList (pagination) {
      if (this.dates && this.dates.length > 0) {
        this.QueryForm.createStartDate = this.dates[0]
        this.QueryForm.createEndDate = this.dates[1]
      } else {
        this.QueryForm.createStartDate = ''
        this.QueryForm.createEndDate = ''
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/invoice/gets',
        data: {
          ...this.QueryForm,
          page: pagination
        },
        router: this.$router,
        success: res => {
          this.paginationInit = res.page
          this.invoiceTableList = res.result || []
        }
      })
    },
    // 重置查询条件
    resetForm () {
      this.QueryForm = {
        createStartDate: '',
        createEndDate: '',
        createUserName: '',
        entrustCompanyNames: '',
        invoiceType: '',
        settleCompanyNames: ''
      }
      this.dates = ''
    },
    // 将json字符串转换成字符串
    jsonToString (json) {
      let obj = JSON.parse(json)
      let arr = []
      for (let k in obj) {
        arr.push(k + ':' + obj[k].toLocaleString())
      }
      return arr.join(' + ')
    },
    // 勾选选择框
    chooseSelectBox (selection, row) {
      this.accountBillIds = selection.map(v => {
        return v.accountBillId
      })
      this.selectionRow = [...selection]
    },
    // 勾选选择框
    chooseSelectBoxAll (selection) {
      this.accountBillIds = selection.map(v => {
        return v.accountBillId
      })
      this.selectionRow = [...selection]
    },
    // 点击表格行 单选
    chooseSelectRow (row, column, event) {
      this.$refs['accountTable'].clearSelection()
      this.$refs['accountTable'].toggleRowSelection(row, true)
      this.accountBillIds = [row.accountBillId]
      this.selectionRow = [row]
    },
    // 批量审核驳回/确认
    accountCheck (type, verifyMsg = '') {
      if (this.accountBillIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择一条或多条对账单'
        })
        return
      }
      let url = type === 'rejects' ? 'account/rejects' : 'account/verifys'
      this.$store.dispatch('ajax', {
        url: `API@saas-finance/${url}`,
        data: {
          accountBillIds: this.accountBillIds,
          verifyMsg
        },
        router: this.$router,
        success: res => {
          this.getAccountList(this.$store.state.pagination)
        }
      })
    },
    // 导出
    getAccountItem (type) {
      if (this.accountBillIds.length > 1 || this.accountBillIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择一条对账单导出'
        })
        return
      }
      let url = type === 1 ? 'account/exportExcel' : 'account/exportJin'
      this.$store.dispatch('ajax', {
        url: `API@saas-finance/${url}`,
        data: {
          accountBillId: this.accountBillIds[0]
        },
        router: this.$router,
        success: ({result}) => {
          result && window.open(result, '_blank')
        }
      })
    },
    // 跳转详情/审核
    goToAccountDetail (type, id) {
      this.$router.push({
        name: 'accountManage-detail',
        query: {
          accountBillId: id,
          type,
          setTitle: type === 'look' ? '对账单详情' : '对账单审核',
          setId: 'accountManage-detail' + id
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
.query-table-finance {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.table-btn {
  padding-bottom: 15px;
}
</style>

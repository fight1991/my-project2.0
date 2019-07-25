<template>
  <section class='sys-main costList'>
    <el-row class='query-condition'>
      <el-form :label-width="labelFormWidth.six"  :model="QueryForm" size="mini" label-position="right">
        <!-- 查询条件-->
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="账单企业">
              <el-autocomplete style="width:100%;"
                class="inline-input" :maxlength="30" clearable
                v-model="QueryForm.settleCompanyName"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                placeholder="请选择">
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收付类型">
              <el-select v-model="QueryForm.feeFlag" size="mini" clearable  style="width:100%;">
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
            <el-form-item label="对账状态">
              <el-select v-model="QueryForm.reconStatus" size="mini" clearable style="width:100%;">
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
            <el-form-item label="开票状态">
              <el-select v-model="QueryForm.invoiceStatus" size="mini" clearable style="width:100%;">
                <el-option key="0" :label="'未开票'" :value="'0'"></el-option>
                <el-option key="6" :label="'已开票'" :value="'1'"></el-option>
                <el-option key="9" :label="'部分开票'" :value="'2'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="平账状态">
              <el-select v-model="QueryForm.flatStatus" size="mini" clearable style="width:100%;">
                <el-option key="0" :label="'未平账'" :value="'0'"></el-option>
                <el-option key="6" :label="'已平账'" :value="'1'"></el-option>
                <el-option key="9" :label="'部分平账'" :value="'2'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账单生成时间">
              <el-date-picker
                style="width:100%"
                v-model="dates"
                type="datetime"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作人">
              <el-input v-model="QueryForm.createUserId" size="mini" clearable :maxlength="15"></el-input>
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
    <div class='query-table'>
      <el-row class="table-btn">
        <el-button size="mini" class="list-btns list-icon-checkP" @click="accountCheck('verifys')"><i></i>批量审核确认</el-button>
        <el-button size="mini" class="list-btns list-icon-check" @click="accountCheck('rejects')"><i></i>批量审核驳回</el-button>
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
        :data="accountTableList" border highlight-current-row height="530px"  ref="accountTable"
        @select="chooseSelectBox"
        @row-click="chooseSelectRow"
        @select-all="chooseSelectBoxAll">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column label="账单企业" min-width="100" prop="settleCompanyName">
        </el-table-column>
        <el-table-column label="收付类型" min-width="100" prop="feeFlagValue" align="center">
        </el-table-column>
        <el-table-column label="含税总额" min-width="100" prop="feeRateAmount" align="right">
          <template slot-scope="scope">
            {{jsonToString(scope.row.feeRateAmount)}}
          </template>
        </el-table-column>
        <el-table-column label="操作人" min-width="80" prop="createUserName" align="center">
        </el-table-column>
        <el-table-column label="账单生成时间" min-width="140" prop="createDate" align="center">
        </el-table-column>
        <el-table-column label="对账状态" min-width="100" prop="reconStatusValue" align="center">
        </el-table-column>
        <el-table-column label="开票状态" min-width="100" prop="invoiceStatusValue" align="center">
        </el-table-column>
        <el-table-column label="平账状态" min-width="100" prop="flatStatusValue" align="center">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80" align="center">
          <template slot-scope="scope">
            <div class="sys-td-c">
              <el-button type="text" title="账单查看" class="table-icon list-icon-look" @click.stop="goToAccountDetail('look', scope.row.accountBillId)"><i></i></el-button>
              <el-button type="text" title="账单审核" class="table-icon list-icon-subimtCheck" @click.stop="goToAccountDetail('check', scope.row.accountBillId)"><i></i></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class='sys-page-list mg-b-30'>
        <el-col :span="24" align="right">
          <page-box :pagination='paginationInit' @change="getAccountList"></page-box>
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
      accountBillIds: [],
      selectionRow: [],
      settleCompanyList: [],
      QueryForm: {
        createDate: '', // 生成时间
        createUserId: '', // 输入姓名
        curr: '', // 币制传英文缩写如CNY、USD
        feeFlag: '',
        flatStatus: '', // 平账状态0未平账1已平账2部分平账
        invoiceStatus: '', // 对账状态1待审核，2审核退回，3待对账，4对账驳回，5对账确认
        settleCompanyName: '' // 账单企业
      },
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
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
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
    getAccountList (pagination) {
      this.QueryForm.createDate = this.dates || ''
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/account/gets',
        data: {
          ...this.QueryForm,
          page: pagination
        },
        router: this.$router,
        success: res => {
          this.paginationInit = res.page
          this.accountTableList = res.result || []
        }
      })
    },
    // 重置查询条件
    resetForm () {
      this.QueryForm = {
        createDate: '',
        createUserId: '',
        curr: '',
        feeFlag: '',
        flatStatus: '',
        invoiceStatus: '',
        settleCompanyName: ''
      }
      this.dates = ''
    },
    // 将json字符串转换成字符串
    jsonToString (json) {
      let obj = JSON.parse(json)
      let arr = []
      for (let k in obj) {
        arr.push(k + ':' + obj[k])
      }
      return arr.toString()
    },
    // 勾选选择框
    chooseSelectBox (selection, row) {
      this.accountBillIds = selection.map(v => {
        return v.accountBillId
      })
      this.selectionRow = selection
    },
    // 勾选选择框
    chooseSelectBoxAll (selection) {
      this.accountBillIds = selection.map(v => {
        return v.accountBillId
      })
      this.selectionRow = selection
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
      let url = type === 'rejects' ? 'account/rejects' : 'account/verifys'
      this.$store.dispatch('ajax', {
        url: `API@saas-finance/${url}`,
        data: {
          accountBillIds: this.accountBillIds,
          verifyMsg
        },
        router: this.$router,
        success: res => {
        }
      })
    },
    // 导出
    getAccountItem (type) {
      if (this.accountBillIds.length > 1 || this.accountBillIds.length === 0) {
        this.$message({
          type: 'error',
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
          setTitle: type === 'look' ? '对账单详情' : '对账单审核'
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
.table-btn {
  padding-bottom: 15px;
}
</style>

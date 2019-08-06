<template>
  <section class='sys-main flatList'>
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
            <el-form-item label="平账状态">
              <el-select v-model="QueryForm.flatStatus" size="mini" clearable style="width:100%;">
                <el-option key="0" :label="'未平账'" :value="0"></el-option>
                <el-option key="1" :label="'已平账'" :value="1"></el-option>
                <el-option key="2" :label="'部分平账'" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="账单生成日期">
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
        <el-button size="mini" type="primary" @click="getBillList($store.state.pagination)">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-row>
    </el-row>
    <!-- 列表表格开始 -->
    <div class='query-table-finance'>
      <el-row class="table-btn">
        <el-button size="mini" class="list-btns list-icon-pa"><i></i>平账</el-button>
        <el-button size="mini" class="list-btns list-icon-paR"><i></i>平账记录</el-button>
      </el-row>
      <el-table class='sys-table-table' align="left"
        :data="billTableList" border highlight-current-row height="530px"  ref="billTable"
        @select="selectParentRow"
        @select-all="selectParentRowAll"
        @expand-change="expandChange">
        <el-table-column type="selection" width="40">
        </el-table-column>
        <el-table-column type="expand" width="50" label="展开">
          <!-- 展开项 -->
          <template slot-scope="scope">
            <el-table class='sys-table-table'
              :ref="'childrenTable' + scope.row.curr + scope.row.accountBillId"
              v-if="scope.row.options && scope.row.options.length > 0" align="left"
              :data="scope.row.options" border
              @select="selectChildrenRow"
              @select-all="selectChildrenRowAll">
              <el-table-column type="selection" width="45">
              </el-table-column>
              <el-table-column label="接单编号" min-width="140" prop="orderNo">
              </el-table-column>
              <el-table-column label="报关单号" min-width="140" prop="decNo">
              </el-table-column>
              <el-table-column label="提单号" min-width="140" prop="billNo">
              </el-table-column>
              <el-table-column label="费用项" min-width="100" prop="feeOptionName">
              </el-table-column>
              <el-table-column label="金额" min-width="100" prop="taxPrice" align="right">
              </el-table-column>
              <el-table-column label="委托企业" min-width="100" prop="entrustCompanyName">
              </el-table-column>
              <el-table-column label="开航/放行日" min-width="100" prop="sailDay" align="right">
              </el-table-column>
              <el-table-column label="平账状态" min-width="80" prop="flatStatusValue" align="right">
              </el-table-column>
              <el-table-column label="平账时间" min-width="100" prop="flatDate" align="center">
              </el-table-column>
              <el-table-column label="入账时间" min-width="100" prop="entryDate" align="center">
              </el-table-column>
              <el-table-column label="操作人" min-width="100" prop="flatUserName" align="center">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="账单企业" min-width="150" prop="settleCompanyName">
        </el-table-column>
        <el-table-column label="收付类型" min-width="80" prop="feeFlagValue" align="center">
        </el-table-column>
        <el-table-column label="币制" min-width="80" prop="curr" align="center">
        </el-table-column>
        <el-table-column label="含税总额" min-width="80" prop="taxPrice" align="right">
        </el-table-column>
        <el-table-column label="已平账金额" min-width="100" prop="isTaxPrice" align="right">
        </el-table-column>
        <el-table-column label="待平账金额" min-width="100" prop="waitTaxPrice" align="right">
        </el-table-column>
        <el-table-column label="账单生成时间" min-width="160" prop="createDate" align="center">
        </el-table-column>
        <el-table-column label="平账状态" min-width="100" prop="flatStatusValue" align="center">
        </el-table-column>
      </el-table>
      <el-row class='sys-page-list mg-b-30'>
        <el-col :span="24" align="right">
          <page-box :pagination='paginationInit' @change="getBillList"></page-box>
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
        startDate: '', // 平账开始时间
        endDate: '',
        flatUserName: '', // 平账人
        flatStatus: '', // 0未平账1已平账2部分平账
        feeFlag: '', // 应收true，应付false
        curr: '', // 币制
        settleCompanyName: '' // 账单企业
      },
      expandRow: {},
      billTableList: [],
      accountBillOptionIds: [], // 费用项id
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
    this.getBillList(this.$store.state.pagination)
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
    // 获取平账对账单列表
    getBillList (pagination) {
      if (this.dates && this.dates.length > 0) {
        this.QueryForm.startDate = this.dates[0]
        this.QueryForm.endDate = this.dates[1]
      } else {
        this.QueryForm.startDate = ''
        this.QueryForm.endDate = ''
      }
      this.paginationInit = pagination
      this.$store.dispatch('ajax', {
        url: 'API@saas-finance/balance/getAccountBills',
        data: {
          ...this.QueryForm,
          page: pagination
        },
        router: this.$router,
        success: res => {
          this.paginationInit = res.page
          if (res.result && res.result.length > 0) {
            res.result.forEach(v => {
              v.unique = v.curr + v.accountBillId
              v.options.forEach(item => {
                item.unique = v.curr + v.accountBillId
              })
            })
            this.billTableList = res.result
          } else {
            this.billTableList = []
          }
        }
      })
    },
    // 重置查询条件
    resetForm () {
      this.QueryForm = {
        startDate: '',
        endDate: '',
        flatUserName: '',
        flatStatus: '',
        feeFlag: '',
        curr: '',
        settleCompanyName: ''
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
    // 勾选父表单 单行
    selectParentRow (parent, row) {
      if (parent && parent.length === 0) {
        this.accountBillOptionIds = []
        this.$refs['childrenTable' + row.curr + row.accountBillId] && this.$refs['childrenTable' + row.curr + row.accountBillId].clearSelection()
        return
      }
      this.accountBillOptionIds = []
      this.$refs['childrenTable' + row.curr + row.accountBillId] && this.$refs['childrenTable' + row.curr + row.accountBillId].clearSelection()
      parent.forEach(item => {
        this.$refs['childrenTable' + item.curr + item.accountBillId] && this.$refs['childrenTable' + item.curr + item.accountBillId].clearSelection()
        let temp = item.options.map(v => {
          this.$refs['childrenTable' + item.curr + item.accountBillId] && this.$refs['childrenTable' + item.curr + item.accountBillId].toggleRowSelection(v, true)
          return v.accountBillOptionId
        })
        this.accountBillOptionIds.push(...temp)
      })
    },
    // 勾选父表单 全选
    selectParentRowAll (parentAll) {
      if (parentAll && parentAll.length === 0) {
        this.accountBillOptionIds = []
        return
      }
      this.accountBillOptionIds = []
      parentAll.forEach(item => {
        let temp = item.options.map(v => v.accountBillOptionId)
        this.accountBillOptionIds.push(...temp)
      })
    },
    // 勾选子表单 单行
    selectChildrenRow (child, row) {
      let tempThis = [...this.accountBillOptionIds]
      let temp = child.map(v => v.accountBillOptionId)
      // 去重处理
      this.accountBillOptionIds = [...new Set([...tempThis, ...temp])]
      // 如果child的长度===父options的长度 说明全选了
      if (child.length === this.expandRow[row.unique].options) {
        let row = this.billTableList.find(v => v.unique === row.unique)
        this.$refs['billTable'].toggleRowSelection(row, true)
      } else {
        this.$refs['billTable'].toggleRowSelection(this.expandRow[row.unique], false)
      }
    },
    // 勾选子表单 全选
    selectChildrenRowAll (children) {
      let tempThis = [...this.accountBillOptionIds]
      let temp = children.map(v => v.accountBillOptionId)
      // 去重处理
      this.accountBillOptionIds = [...new Set([...tempThis, ...temp])]
      // 找到父行
      if (children.length > 0) { // 全选
        let flag = children[0].unique
        let row = this.billTableList.find(v => v.unique === flag)
        this.$refs['billTable'].toggleRowSelection(row, true)
      }
    },
    // 展开行发生变化
    expandChange (row) {
      console.log(row)
      this.expandRow[row.unique] = row
      let id = row.options[0].accountBillOptionId
      // 如果父行已经勾选了,则子表全选
      if (this.accountBillOptionIds.indexOf(id) > -1) {
        row.options.forEach(v => {
          this.$nextTick(() => {
            this.$refs['childrenTable' + row.curr + row.accountBillId].toggleRowSelection(v, true)
          })
        })
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
.query-table-finance {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.table-btn {
  padding-bottom: 15px;
}
</style>
